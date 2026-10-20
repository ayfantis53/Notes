## Resource requirements
-------------------------------------------------------------
- CPU and memory
- `kube-scheduler` determines where a pod goes, takes into account resources each pod needs to be placed on node.
- If no sufficient resources on any nodes, pod will get stuck in pending state.
    * If you look at events using `kubectl describe pod` comman you will see `Insufficient cpu`
- Units
    * 1G (Gigabyte) = 1,000,000,000 bytes
    * 1M (Megabyte) = 1,000,000 bytes
    * 1K (Kilobyte) = 1,000 bytes

    * 1 Gi (Gibibyte) = 1,073,741,824 bytes
    * 1 Mi (Mebibyte) = 1,048,576 bytes
    * 1 Gi (Kibibyte) = 1,024 bytes
- If a pod tries to exceed resources of its specified limit.
    * System throttles cpu so it doesnt go beyond specified limit
    * container cannot use more container resources than its limit.
- If a container tries to use more memory resources than its limit.
    * If a pod tries to use more memory than its limit, it will be terminated. (`OOM`)
- Default
    * no cpu or memory request limit set.
    * can suffocate other pods or processes running on the node. 
- Limit Range
    * set default values to be saet of containers in pods.
    * applicable at namespace level.
- RosourceQuota
    * namespace level object that can be created to set hard limits on requests and limits.


### Edit a Pod
- Remember, you CANNOT edit specifications of an existing Pod other than the below.
    * spec.containers[*].image
    * spec.initContainers[*].image
    * spec.activeDeadlineSeconds
    * spec.tolerations
- For example, you cannot edit the environment variables, service accounts, and resource limits (all of which we will discuss later) of a running pod. But if you really want to, you have 2 options:
    1. Run the kubectl edit pod command. This will open the pod specification in an editor (vi editor). Then edit the required properties. When you try to save it, you will be denied. This is because you are attempting to edit a field on the pod that is not editable.
        * A copy of the file with your changes is saved in a temporary location.
        ```bash
        # You can then delete the existing pod by running the command:
        kubectl delete pod $RESOURCE_NAME

        # Then create a new pod with your changes using the temporary file
        kubectl create -f $PATH_TO_TEMP_FILE
        ```

    2. The second option is to extract the pod definition in YAML format to a file using the command
        ```bash
        kubectl get pod $RESOURCE_NAME -o yaml > $RESOURCE_NAME.yaml

        # Then make the changes to the exported file using an editor (vi editor). Save the changes
        vi my-new-pod.yaml

        # Then delete the existing pod
        kubectl delete pod $RESOURCE_NAME

        # Then create a new pod with the edited file
        kubectl create -f my-new-pod.yaml
        ```

### Edit Deployments
- With Deployments, you can easily edit any field/property of the Pod template. Since the pod template is a child of the deployment specification, with every change the deployment will automatically delete and create a new pod with the new changes. So if you are asked to edit a property of a Pod part of a deployment you may do that simply by running the command
    ```bash
    kubectl edit deployment $DEPLOYMENT_NAME
    ```