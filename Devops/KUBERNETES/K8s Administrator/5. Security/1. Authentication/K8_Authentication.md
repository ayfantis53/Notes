## Authentication
-------------------------------------------------------------

- Accounts
    * Users
        - Admins
        - Developers
    * Service Accounts
        - Bots
        ```bash
        kubectl create serviceaccount $NAME

        kubectl get serviceaccount
        ```

- All user access is managed by api-server.
    ```bash
    kubectl

    curl https://kube-server-ip:6443/
    ```
    * kube-apiserver -> authenticate user -> process request
        - can authenticate
            1. static token file
            2. Certificates
            3. Identity Services

1. Static Token File
    ```ini
    # user-token-details.csv
    KpjCVbI7rCFAHYPkByTIzRb7gu1cUc4B,user10,u0010,group1
    rJjncHmvtXHc6M1WQddhtvNyyhgTdxSC,user11,u0011,group1
    mjpOFIEiFOKL9toikaRNtt59ePtczZSq,user12,u0012,group2
    PG41IXhs7QjqwWkmBkvgGT9g1OyUqZij,user13,u0013,group2
    ```

    ```bash
    # Pass to kube api-server.
    --token-auth-file=user-token-details.csv

    # While authenticating.
    curl -v -k https://master-node-ip:6443/api/v1/pods --header "Authorization: Bearer KpjCVbI7rCFAHYPkByTIzRb7gu1cUc4B"
    ```

    - Not a reccomended authentication mechanism.
    - Consider volume mount while providing the auth file in a kubeadm setup.
    - Setup Role-Based Authorization for new users.