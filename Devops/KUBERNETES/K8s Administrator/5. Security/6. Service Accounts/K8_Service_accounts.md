## SERVICE ACCOUNTS
-------------------------------------------------------------

### User accounts.
- used by humans.

### Service Accounts.
- used by applications or services (identity of a service) to interact with Kubernetes.
- associated with a token (used to authenticate a service account to k8s API).
- When a Kubernetes cluster is setup it creates a service account by name default in all name spaces.
    * Every namespace has a default service account.
    * default service account is automatically attached to the pod on creation.
    * When a service account is attached to a pod, Kubernetes:
        - Automatically creates a token & mounts as a projected volume.
        - Automatically rotates token.
        - Automatically expires then token when the pod is deleted. 
- commands
    ```bash
    # create a new service account run.
    kubectl create serviceaccount $NAME

    # list existing service accounts.
    kubectl get serviceaccount
    
    # see details of existing an service account.
    kubectl describe serviceaccount $SERVICE_ACCOUNT_NAME

    # pod details will show attached service accounts to pods.
    kubectl describe pod $POD_NAME | grep "Service Account"
    ```
- Service account gets mounted as a projected volume within the pod.
    - dynamic directory created in the pod at creation [/var/run/secrets/kubernetes.io/serviceaccount]
    - To see token available as a file
        ```bash
        kubectl exec -it $POD_NAME ls /var/run/secrets/kubernetes.io/serviceaccount
        ```
- Create Token
    * Pods or applications hosted within the kubernetes cluster this setup works fine.
    * If you want to create token to use outside of the token
        ```bash
        # Create token that defaults to an hour valid.
        kubectl create token $SERVICE_ACCOUNT

        # Create token with different validity time.
        kubectl create token $SERVICE_ACCOUNT --duration 2h

        # Decode the token
        jq -R 'split(".") | select(length > 0) | .[0],.[1] | @base64d | fromjson' <<< $TOKEN
        ```
    * Token can be used as an authentication bearer token when making a REST call to the kubernetes API.
        ```bash
        curl https://192.168.56.70:6443/api -insecure
            --header "Authorization: Bearer         "
        ```