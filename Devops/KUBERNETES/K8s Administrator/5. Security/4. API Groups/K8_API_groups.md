## API GROUPS
-------------------------------------------------------------

- interacting with api server
    ```bash
    # Get the version
    curl https://kube-master:6443/version

    # Get the list of pods
    curl https://kube-master:6443/api/v1/pods
    ```

- Kubernetes API is grouped into multiple such groups based on their purpose.
    1. `/metrics`, `/healthz`
        * monitor the health of the cluster.
    2. `/version`
        * to view the version of the cluster.
    3. Core `/api`, Named `/apis`
        * responisble for the cluster functionality.
            1. Core `/api` 
                * Where all core functionality exists `/v1`
                    - namespaces, pods, rc
                    - events, endpoints, nodes
                    - bindings, PV, PVC
                    - configmaps, secrets, services
            2. Named Groups `/apis`
                * more organized
                    - apps `/v1`
                        * Resources: 
                            - deployments
                                * verbs:
                                    - list
                                    - get
                                    - create
                                    - delete
                                    - update
                                    - watch
                            - replicasets
                            - statefulsets
                    - extensions 
                        * 
                    - /networking.k8s.io `/v1`
                        * Resources: /networkpolicies
                    - /storage.k8s.io `/v1`
                        * 
                    - authentication.k8s.io `/v1`
                        * Resources: deployments, replicasets, statefulsets
                    - certificates.k8s.io `/v1`
                        * Resources: /certificatesigningrequests
    4. `/logs`
        * integrating with 3rd party logging application

- list available api groups
    ```bash
    # list available api groups (usually wont be allowed access, since no authentication)
    curl https://localhost:6443 -k

    # Return all supported resource groups
    curl https://localhost:6443/apis -k | grep "name"
    ```
- Fixing authentication problem
    ```bash
    # list available api groups (using authentication)
    curl https://localhost:6443 -k
        --key admin.key
        --cert admin.crt
        --cacert ca.crt
    
    # Use kubectl proxy (launches proxy service locally on port 8001).
    # Uses credentials and certificates from your kubeconfig file.
    kubectl proxy
    ```

- Difference in kube-proxy and kubectl proxy
    * kube-proxy
        - Used to enable connectivity between pods and services accross different nodes in cluster.
    * kubectl-proxy
        - http proxy service created by kubectl utility to access kube-apiserver.