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