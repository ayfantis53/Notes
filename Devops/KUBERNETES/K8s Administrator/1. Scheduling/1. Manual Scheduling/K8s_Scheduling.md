## SCHEDULING
-------------------------------------------------------------
### Manually schedule a node on cluster
- If there is no scheduler pods continue to be in a pending state
- NodeName
    * default is not set
    * scheduler looks through pods and looks for pods that dont have nodename set
    * once identified it sets nodename property to name of node by creating a binding object
    * Setting Nodename field in yaml will manually schedule pod 
- Binding Object
    * If pod is already created you cannot change the Nodename property.
    * If pod already exist you need to create a binding object and send a post request to the pods binding api.
        - has to be in json format.
- Check if scheduler missing
    ```bash
    kubectl get pods --namespace kube-system
    ```
