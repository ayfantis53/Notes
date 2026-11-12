## TLS IN KUBERNETES
-------------------------------------------------------------

- Kubernetes cluster consists of master and worker nodes.
    * all communication must be secured and encrypted between nodes.
- Admin must establish secure TLS connection with kube-apiserver.
    * all interactions between services and their clients need to be secure.
    * communication with all components in kubernetes cluster must be secure.
        1. Server Certificates for Servers.
            - kube-apiserver
                * apiserver.crt
                * apiserver.key
            - etcd server
                * etcd-x-server.crt
                * etcd-x-server.key
            - kubelet server
                * kubelet.crt
                * kubelet.key
        2. Client Certificates for Clients.
            - Admin
                * admin.crt
                * admin.key
            - kube-apiserver
                * apiserver-kubelet-client.crt
                * apiserver-kubelet-client.key
            - kube-scheduler
                * scheduler.crt
                * scheduler.key
            - kube-apiserver etcd
                * apiserver-etcd-client.crt
                * apiserver-etcd-client.key
            - kube controller-manager
                * controller-manager.crt
                * controller-manager.key
            - kubelet server
                * kubelet-client.crt
                * kubelet-client.key
            - kube-proxy
                * kube-proxy.crt
                * kube-proxy.key
        - All talk through the kube api server.


## CERTIFICATE CREATION
-------------------------------------------------------------
- Different tools available
    * openssl
    * easyrsa
    * cfssl
- Generate a Certificate Authority (CA)
    * Create a private key
        ```bash
        # Generate keys.
        openssl genrsa -out ca.key 2048

        # Certificate Signing Request.
        openssl req -new -key ca.key -subj "/CN=KUBERNETES-CA" -out ca.csr

        # Sign Certificate
        openssl x509 -req -in ca.csr -signkey ca.key -out ca.crt
        ```
    * Generate Client certificates
        1. Admin User (Group system:masters)
            ```bash
            # Generate keys.
            openssl genrsa -out admin.key 2048

            # Certificate Signing Request.
            openssl req -new -key admin.key -subj "/CN=kube-admin/OU=system:masters" -out admin.csr

            # Sign Certificate
            openssl x509 -req -in admin.csr -CA ca.crt -CAkey ca.key -out admin.crt
            ```
            
            * Use certificate instead of username and password in REST API call
                ```bash
                # Can use certificate in a REST API call
                curl https://kube-apiserver:6443/api/v1/pods \
                    --key admin.key --cert admin.crt
                    --cacert ca.crt
                ```
            * Or can use kube-config.yaml
        2. Kube Scheduler, controller-manager & kube-proxy (System components part of kubernetes control plane)
            - name needs to be prefixed with name `system`
    * Generate Server certificates
        1. etcdserver
        2. kube-apiserver
            * some call it kubernetes
            * kubernetes.default.svc.cluster.local
                ```bash
                # Generate keys.
                openssl genrsa -out apiserver.key 2048

                # Certificate Signing Request.
                openssl req -new -key apiserver.key -subj "/CN=kube-apiserver" -out admin.csr

                # Sign Certificate
                openssl x509 -req -in apiserver.csr -CA ca.crt -CAkey ca.key -CAcreateserial -out \
                    apiserver.crt -extensions v3_req -extfile openssl.cnf -days 1000
                ```
            * Specify Alternate names (Create an openssl config file).
                ```ini
                # opnessl.conf
                [req]
                req_extensions = v3_req
                distinguished_name = req_distinguished_name
                [ v3_req ]
                basicConstraints = CA:FALSE
                keyUsage = nonRepudiation,
                subjectAltName = @alt_names
                [alt_names]
                DNS.1 = kubernetes
                DNS.2 = kubernetes.default
                DNS.3 = kubernetes.default.svc
                DNS.4 = kubernetes.default.svc.cluster.local
                IP.1 = 10.96.0.1
                IP.1 = 172.17.0.87
                ```
            * Consider the API client as certificates used by the API server while communicating as a client to etcd and kubelet servers.
                - the location of these certificates are passed into the kube-apiservers executable or service configuration file.
                    1. ca file needs to be passed in. (Every component needs CA certificate to verify its clients).
                    2. Then we provide the api server certificates and the TLS cert options.
                    3. Specify the client certifications used by kube-apiserver to connect to the etcd server (again with CA file).
                    4. The kube-apiserver client certificates to connect to the kubelets
        3. kubelet server
            - https api server that runs on each node. Responsible for managing the node.
            - Thats who api-server talks to monitor the node as well as sending information regarding what information to schedule on this node.
            - need a key certificate pair for each node in cluster.
            - What do you name these kubelets?
                * name them after their nodes.
                * once certificates are created use them in `kubelet-config.yaml` file.
            - Also need to generate set of client certificates used to communicate with kube-apiserver.
                * What do you name these certificates?
                    - system:node:node##
                * Nodes must be added to a group named system nodes