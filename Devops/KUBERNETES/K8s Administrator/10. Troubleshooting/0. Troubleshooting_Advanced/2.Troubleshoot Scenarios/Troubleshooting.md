## TROUBLESHOOTING SCENARIOS
-------------------------------------------------------------

### IMAGE PULL ERRORS
- image names mispelled
- secrets not cofigured correctly
- incorrect tag in image url
    ```bash
    # Check if a url is reachable
    nslookup $WEB_URL

    # Edit a pod
    kubectl edit pod $MISCONFIGURED_POD


### CRASH LOOP BACKOFF
- exit code 1 means an `application error`.
    * logs are more helpful for application errors.
- volumes without corresponding volume-mounts.
    - nginx.conf no such file or directory is a volumemount error.
- incorrect permissions on files.
- `OOMKilled`: Pod exceeds memory requests and limits.
    * update `resources.limits.memory` to a gigher number.
- exit code of 137 means got an `external sigkill`.
    * Events are helpful in external sigkills.
    * liveness probe delays too small cause problems.
- exit code of 127 means `Tried to access non-existent file`. 


### PENDING PODS
- Insufficient resources
    * decrease resource requests (CPU requests)
- node selector (misconfigured labels)
    ```bash
    kubectl label nodes $NODE_ID type=$TYPE_NAME
    ```
- missing toleration (untolerated taint)
    * add correct toleration


### MISSING PODS
- Namespace `resource quotas`
    * limits pods that can run in a namespace
    * applied by system administrators on testing namespaces
    ```bash
    # Edit spec.hard.pods
    kubectl edit resourcequota -n $NAMESPACE pod-quota
    ```
- 


### SCHRODINGERS DEPLOYMENT
- matching labels (round robining pods with non unique labels)
    * Services have same `spec.selector` values.
    * put the same `template.metadata.labels` in multiple different deployments.
    * need to add a unique label to service so apps dont switch between eachother.
- shared label selectors will result in indiscriminate traffic routing, leading to the
    potential misrouting of requests between the two services.
    ```bash
    # Show labels
    kubectl get pods -l $LABEL_NAME=$LABEL_VALUE

    # Show the IPs each service is going to forward traffic to.
    kubectl get endpoints

    # Add a unique label to fix service having too many unecessary endpoints.
    ```


### CREATE CONTAINER ERRORS
- Container Creation
    1. Pull Image.
    2. Generating Container Configuration.
        - `CreateContainerConfigError`: Something wrong with configuration 
            * secrets file missing
            * config-map missing.
            * key nonexistent in either config-map or secret.
    3. Create Container
        - `CreateContainerError`: Something happens preventing container runtime from creating container.
            * No command specified
                - no entrypoint defined on image
                - no entrypoint defined on the `pod.spec` 
                - provide a command for container to start `pod.spec.containers.command`
            * Incorrect Image specifcation
            * Runtime Error
            * Insufficient Resources
            * Missing mounted object
    4. Start Container.
        - `RunContainerError` happens here
            *  If error makes it to start container it will go into `CrashLoopBackoff` state


### CONFIG OUT OF DATE
- Debugging
    ```bash
    kubectl exec -n $NAMEPACE -it $POD_ID -- /bin/sh
    printenv | grep $VAR_NAME
    ```
- Changes in config map dont prompt pods to restart, need to restart manually or pod wont update to new configmap.
- Resources dont change in place in Kubernetes.
    ```bash
    # Restart deployment to get updated configmap values.
    kubectl rollout restart deployment -n $NAMEPACE $DEPLOYMENT_ID
    ```
- **Reloader** is a github repo that addresses this problem.
    * Add to manifest files
        ```yaml
        metadata:
            annotations:
                reloader.stakater.com/auto: "true"
        ```
    * Run commands
        ```bash
        kubectl apply -f https://raw.githubusercontent.com/stakater/Reloader/master/deployments/kubernetes/reloader.yaml
        ```


### ENDLESSLY TERMINATING PODS
- Finalizers block resource from being deleted
    ```yaml
    metadata:
        finalizer:
            - example.com/block/deletion
    ```
- Delete a pod stuck in termintaing state
    ```bash
    # after deleting finalizer
    kubectl delete $RESOURCE_ID --grace-period=0 --force
    ```


### FIELD IMMUTABILITY
- Cant change things in place that will change behavior of your pods.


### ENABLE SERVICE LINKS
- Argument list too long
- Debugging
    ```bash
    kubectl exec -n $NAMEPACE -it $POD_ID -- /bin/sh
    printenv | grep $VAR_NAME
    ```
- If you have service A, B, and C are running on cluster
    * Add Service D and it will inherit all environment variables from other 3 services.
- Disable automatic injection of environment variables related to services in the pod.
    ```yaml
    # deployment yaml
    spec:
        template:
            spec:
                enableServiceLinks: false   # is defaulted to true in k8s
    ```

    * Use a DNS plugin in the cluster for resolving and accessing services.


### INTERNS CAN SEE OUR SECRETS!
- `ClusterRoleBinding`
    * grants permission to to multiple users or service accounts accross namespaces at once.
    * cannot reference Roles
        - ClusterRoleBindings are intended to bind ClusterRoles, not Roles. ClusterRoles are 
        designed to grant permissions across the entire cluster or multiple namespaces, 
        whereas Roles are namespace-specific.
- A `RoleBinding` is required to link the Role(which defines permissions) to the ServiceAccount
    * Without this binding, applications wont have permissions to create ConfigMaps, even if the role permits it.
    * RoleBindings can bind a service account from one namespace to a role in another namespace.
    * Connect ClusterRoles to subjects (users oir service accounts), but they only grant access within namespace specified
        in the binding, ensuring access control boundaries.
    * the roleRef in a RoleBinding does not allow for a namespace specification because RoleBindings cannot reference
        Service Accounts from any namespace.
- Service accounts need to be correctly bound to a Role
    * RoleBindings and Service accounts don't need to exist in the same namespace

```bash
kubectl get roles -n $NAMESPACE $ROLE_NAME -o yaml

kubectl get rolebindings.rbac.authorization.k8s.io $ROLEBINDING_NAME -o yaml

kubectl auth can-i -n $NAMESPACE get pods --as-group=$GROUP --as=$USER --v=10
kubectl auth can-i --as=$USER--namespace=$NAMESPACE '*' '*' --v=10

kubectl edit clusterrolebindings.rbac.authorization.k8s.io $RESOURCE_NAME

kubectl delete clusterrolebinding $RESOURCE_NAME
```


## UNREACHABLE PODS AND LEAKY NETWORKS
```bash
kubectl get netpol -n $NAMESPACE
```

- beware of AND vs OR in network policies
    ```yaml
     #AND both conditions will be applied
    spec:
        ingress:
        - from:
            - namespaceSelector:
                matchLabels:
                    env: qa
              podSelector:
                matchLabels:
                    app: api
    ---
    # OR 
    spec:
        ingress:
        - from:
            - namespaceSelector:
                matchLabels:
                    env: qa
            - podSelector:
                matchLabels:
                    app: api
    ```
- network policies are additive (specific dominate the general)
- beware of default behaviors


### INGRESS
- How does an Ingress differ from a Service of type LoadBalancer?
    * It can expose multiple services over a single IP address, while LoadBalancer exposes each service on its own IP.
- the role of an Ingress Controller in a Kubernetes cluster
    * It implements the Ingress resource and handles HTTP/HTTPS traffic routing.
- the purpose of a rewrite target annotation in an nginx ingress.
    * It modifies the request path before routing.

    ```bash
    kubectl get ingress

    curl -v $ADDRESS/$SVC

    # Port forward
    kubectl port-forward svc/$SERVICE_NAME $TARGET_PORT:$OLD_PORT

    curl localhost:$TARGET_PORT
    ```


### MULTI-ATTACH VOLUME ERRORS
- When you restart a pod
    * old pod is attached to pvc new pod wants to attach to
- Stupid solution
    ```bash
    # FIRST
    kubectl scale deployment $RESOURCE_NAME --replicas=0 -n $NAMESPACE

    # THEN
    kubectl scale deployment $RESOURCE_NAME --replicas=1 -n $NAMESPACE
    ```
- Rolling Update Error (not desirable for high availability)
    - Rolling update
        * allows gradual replacement of pods
            ```yaml
            maxSurge: 25%           # how many extra pods that can be created temporarily during update process
            maxUnavailable: 25%     # number of pods that can be unavailable during update
            ```
        * no disruptions during an update
    - Recreate
        * Old versions terminated and new ones started after
        * Application that does not support multiple versions
        * fixes error of volumes. Ensures 2 pods to attach to same PVC since pod only starts after first is terminated.
            ```yaml
            spec:
                strategy:
                    type: RollingUpdate

            ---
            spec:
                strategy:
                    type: Recreate
            ```
- Error happens because pods exist on different nodes RWO Error
    * Every K8s persistent volume is associated with a storage class
    * only supports certain access modes
        ```bash
        kubectl get pvc

        # check if a PVC is bound to a PV?
        kubectl describe pvc
        ```
    * RWO and RWX refer to the node and not pods
    * RWO will not work if pods are scattered across multiple nodes
    * Underlying storages need to support the read write access mode you set.
        ```yaml
        volumes:
            - name: logger-volume
              persistentVolumeClaim:
                claimName: azure-file
        ```
- difference between a Persistent Volume (PV) and a Persistent Volume Claim (PVC)
    * A Persistent Volume (PV) is a piece of storage in the cluster that has been provisioned by an administrator or dynamically provisioned using Storage Classes. It is a resource in the cluster just like a node is a cluster resource. A Persistent Volume Claim (PVC) is a request for storage by a user. It is similar to a Pod in that Pods consume node resources and PVCs consume PV resources. Pods can request specific levels of resources (CPU and Memory); similarly, PVCs can request specific size and access modes (e.g., they can be mounted once read/write or many times read-only).
- Which access mode allows multiple Pods on different nodes to read and write to the same volume?
    * ReadWriteMany (RWX) because this access mode allows multiple Pods on different nodes to read and write to the same volume. 'ReadWriteOnce (RWO)' allows read/write access by a single node, and 'ReadOnlyMany (ROX)' allows multiple nodes to read but not write.
- Which storage class parameter should be checked to ensure a volume can be resized dynamically?
    * The allowVolumeExpansion parameter in a StorageClass specifies whether the volumes created from this storage class can be dynamically resized. If this parameter is set to true, the volume can be resized without deleting and recreating it. Other parameters like reclaimPolicy, volumeBindingMode, and provisioner do not directly relate to volume resizing capabilities.
- What is a likely cause if a PVC is in the Pending state and cannot be bound to a PV?
    * A PVC can remain in the Pending state for several reasons. The requested storage class might not exist, meaning there is no provisioner available to create the PV. The access mode requested by the PVC might not match any available PV, making it impossible to bind. Additionally, the available PVs might have insufficient capacity to meet the PVC's request. Therefore, all these factors need to be considered when troubleshooting a PVC in the Pending state.
- 