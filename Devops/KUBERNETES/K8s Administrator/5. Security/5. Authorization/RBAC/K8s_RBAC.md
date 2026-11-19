## RBAC
-------------------------------------------------------------

- Inspect the environment and identify the authorization modes configured on the cluster.
    ```bash
    # and look for --authorization-mode.
    kubectl describe pod kube-apiserver-controlplane -n kube-system | grep -A 3
    ```
- Create a role
    * make a role object with role definition yaml file `developer-role.yaml`
    * rules that developers can be assigned.
    * for core group leave `apiGroups` as blank.
        ```bash
        # Create role using
        kubectl create -f $YAML_FILE
        ```
- Link user to that role
    * role binding object links a user to that role.
        ```bash
        # Create role-binding using
        kubectl create -f $YAML_FILE
        ```
- Both fall under the scope of namespaces.
    - can specify namespace under `metadata.namespace`
- Commands Generic
    ```bash
    # To view created roles.
    kubectl get roles

    # To list role bindings.
    kubectl get rolebindings.

    # To view more details about the role.
    kubectl describe role $NAME

    # To view more details about the role bindings.
    kubectl describe rolebinding $NAME
    ```
- Checking access
    ```bash
    # See if you can create deployments.
    kubectl auth can-i create deployments

    # See if you can delete nodes.
    kubectl auth can-i delete nodes

    # See if dev-user can create deployments.
    kubectl auth can-i create deployments --as dev-user

    # See if dev-user can create pods.
    kubectl auth can-i create pods --as dev-user
    ```

- Inspect the environment and identify the authorization modes configured on the cluster.
    ```bash
    # --authorization-mode
    kubectl describe pod kube-apiserver-controlplane -n kube-system
    ```
