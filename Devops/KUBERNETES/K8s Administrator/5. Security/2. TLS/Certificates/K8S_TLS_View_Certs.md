## VIEW TLS CERTIFICATES IN KUBERNETES
-------------------------------------------------------------

- Perform a health check of all certificates in cluster
    * how was cluster set up
        - from scratch?
        - automated provisioning tool i.e kubeadm?
    * commands
        ```bash
        # List of all certificate files used and their corresponding info.
        # Command used to start api server has all the information all certificates it uses.
        cat /etc/kubernetes/manifests/kube-apiserver.yaml

        # Take each certificate and look inside it and find more details about that certificate.
        openssl x509 -in /etc/kubernetes/pki/apiserver.crt -text -noout
        ```
    | Certificate Path                                 | CN Name                       | ALT Names | Organization   | Issuer       | Expiration |
    | ------------------------------------------------ | ----------------------------- | --------- | -------------- | ------------ | ---------- |
    | /etc/kubernetes/pki/apiserver.crt                | kube-apiserver                |           |                | kubernetes   |            |
    | /etc/kubernetes/pki/apiserver.key                |                               |           |                |              |            |
    | /etc/kubernetes/pki/ca.crt                       | kubernetes                    |           |                | kubernetes   |            |
    | /etc/kubernetes/pki/apiserver-kubelet-client.crt | kube-apiserver-kubelet-client |           | system:masters | kubernetes   |            |
    | /etc/kubernetes/pki/apiserver-kubelet-client.key |                               |           |                |              |            |
    | /etc/kubernetes/pki/apiserver-etcd-client.key    | kube-apiserver-etcd-client    |           | system:masters | self         |            |
    | /etc/kubernetes/pki/apiserver-etcd-client.key    |                               |           |                |              |            |
    | /etc/kubernetes/pki/etcd/ca.crt                  | kubernetes                    |           |                | kubernetes   |            |

- Inspecting Service Logs
    ```bash
    # Cluster was created by you by scratch
    journalctl -u etcd.service -l

    # Cluster was created by kubeadm
    kubectl logs etcd-master

    ## If core component like api-server is done kubectl wont work so go one level down to docker to fetch logs.
    # Get id
    crictl ps -a

    # Get logs of container id
    crictl logs $CONTAINER_ID
    ```



## CERTIFICATES API IN KUBERNETES
-------------------------------------------------------------

- CA is really just the pair of certificate files that we generated.
    * whoever gains access to these files can sign any certificate for k8s environment.
    * files need to be stored and protected in a safe environment.
- Certificates places on kubernetes master node (CA Server).
    * kubeadm does the same thing.
    * automate signing requests with `Certificates API`
        - can send certificate signing request directly to kubernetes through an API call.
        - When admin requests a certificate signing request.
            1. Create CertificateSigningRequest Object
                ```bash
                # First user creates a key.
                openssl genrsa -out $USER.key 2048

                # Generate Certificate Signing request using the key & send the request to the administrator.
                openssl req -new -key $USER.key -subj "/CN=$USER" -out $USER.csr

                # Admin takes the key and creates a certificatesigning object.
                vi $USER-csr.yaml
                kubectl apply -f $USER-csr.yaml

                # Specify the base 64 encoded Certificate Request in certificatesigning object.
                cat $USER.csr | base64 -w 0
                ```
            2. Review Requests
                ```bash
                # All signing requests can be seen by administrators by running.
                kubectl get csr

                # View the certidicate in a yaml format.
                kubectl get csr $USER -o yaml
                echo $TEXT | base64 --decode

                # Delete CSR object.
                kubectl delete csr $USER
                ```
            3. Approve Requests
                ```bash
                # Approve the request
                kubectl certificate approve $USER
                # Deny the request
                kubectl certificate deny $USER
                ```
            4. Share Certs to Users
        - All certificate operations are carried out by controller manager.
            * csr approving
            * csr-signing
                ```bash
                # If anyone nedds to sign certificates they need the CA Servers root certificate & private key.
                cat /etc/kubernetes/manifests/kube-controller-manager.yaml
                ```

        
