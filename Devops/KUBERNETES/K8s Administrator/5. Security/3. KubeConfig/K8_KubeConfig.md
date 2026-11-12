## KUBECONFIG
-------------------------------------------------------------

- We have seen hopw to generate certificate
- How a client uses certificate file and key to query the k8s REST API foa list of pods using curl.
    ```bash
    # Query Podlist with curl
    curl https://$KUBE_CLUSTER:$PORT/api/v1/pods \
        --key admin.key
        --cert admin.crt
        --cacert ca.crt
    
    # Query Podlist with kubectl
    kubectl get pods
        --server $KUBE_CLUSTER:$PORT
        --client-key admin.key
        --client-certificate admin.crt
        --certificate-authority ca.crt
    ```
- typing these everytime is tedious so you move it to a file called `kubeconfig` # ($HOME/.kube/config)
    ```bash
    # Query with kubeconfig file
    kubectl get pods
        --kubeconfig config
    ```
- Kubectl Config commands
    ```bash
    # View and modify current kubectl files.
    kubectl config view

    # View and modify current kubectl files (specified).
    kubectl config view --kubeconfig $FILE_NAME

    # Change current context to different user.
    kubectl config --kubeconfig=$FILE_NAME use-context $CONTEXT_NAME
    # Check current context.
    kubectl config --kubeconfig=$FILE_NAME current-context

    # More options.
    kubectl config -h
    ```

### Certificates in KubeConfig
- certificate authority
    ```yaml
    # Instead of providing file, can just provide the certificate data base64 encoded.
    certificate-authority: /etc/kubernetes/pki/ca.crt

    certificate-authority-data: 
    ```
    ```bash
    # encode to base 64 encryption.
    cat ca.crt | base 64

    # decode base 64 encrypted.
    echo "LS0...bnJ" | base 64 --decode
    ```

### KubeConfig Setup as default
- We don't want to specify the kubeconfig file option on each kubectl command.
- Set the my-kube-config file as the default kubeconfig file and make it persistent across all sessions without overwriting the existing ~/.kube/config. 
- Ensure any configuration changes persist across reboots and new shell sessions.
    ```bash
    vi ~/.bashrc

    source ~/.bashrc
    ```

    ```sh
    export KUBECONFIG=/root/my-kube-config
    # OR
    export KUBECONFIG=~/my-kube-config
    # OR
    export KUBECONFIG=$HOME/my-kube-config
    ```
- Fix Kubeconfig (make edits).
    ```bash
    kubectl config set-credentials dev-user \
    --client-certificate=/etc/kubernetes/pki/users/dev-user/dev-user.crt \
    --client-key=/etc/kubernetes/pki/users/dev-user/dev-user.key \
    --kubeconfig=/root/my-kube-config
    ```