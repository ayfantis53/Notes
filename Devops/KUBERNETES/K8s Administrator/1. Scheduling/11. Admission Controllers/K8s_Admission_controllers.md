## ADMISSION CONTROLLERS
-------------------------------------------------------------

### Securing Kubernetes
- Running commands using kubectl
- Everytime we send a request the request goes to the api server pods created and data saved in etcd database
- Authentication done through certificates
    * .kube/config file has certificates 
    * authentication done through role base access controls

### RBAC
- CAN list PODs/Deployments/Services.
- CAN create PODs/Deployments/Services.
- CAN delete PODs/Deployments/Services.
- CAN create pods named blue or orange.
- CAN create pods within a namespace.

- CANNOT Only permit images from a certain registry.
- CANNOT permit runAs root user.
- CANNOT Only permit certain capabilities.
- CANNOT make Pod always have labels.

### Admission Controllers
- help implement better security measures to enforce how a cluster is used.
- Prebuilt in Kubernetes:
    * AlwaysPullImages
    * DefaultStorageClass
    * EventRatedLimit
    * NamespaceAutoProvision
    * NamespaceExists

    ```bash
    # to see a list of admission controllers enabled by default
    kube-apiserver -h | grep enable-admission-plugins

    # if running in a kubeadm based setup
    kubectl exec kube-apiserver-controlpane -n kube-system -- kube-apiserver -h | grep enable-admission-plugins
    ```

- kubelet -> Authentication -> Authorization -> Admission Controllers -> Create Pod

### Validating Admission Controllers
- Namespace exists
    * validates if namespace exists and rejects if it doesnt exist.

### Mutating Admission Controllers
- DefaultStorageClass
    * will create a storage class with every pvc.