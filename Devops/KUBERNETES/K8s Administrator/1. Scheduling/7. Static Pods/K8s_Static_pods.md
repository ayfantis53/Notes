## Static Pods
-------------------------------------------------------------
- Pods that are created by kubelet on its own without the API Server.
    - kubelet can only work at a pod level.
- Pass in location of directory with manifests as an option while running the service
    > kubelet.service
    ```
    ExecStart=/usr/local/bin/kubelet \\
        --container-runtime=remote  \\
        --container-runtime-endpoint=unix:///var/run/containerd/containerd.sock  \\
        --pod-manifest-path=/etc/kubernetes/manifests  \\
        --kube-config=/var/lib/kubelet/kubeconfig  \\
        --network-plugin=cni  \\
        --register-node=true  \\
        --v=2
    ```

    > kubeconfig.yaml
    ```
    staticPodPath: /etc/kubernetes/manifests
    ```
- can view using
    ```bash
    docker ps
    ```
    * Cant use kubectl because in this case none of the other server members are running meaning theres no api Server
        - And kubectl is a command that uses the kube-apiServer
- Kubelet can take in requests for creating pods from
    1. pod definition files from the static pods folder.
    2. http api endpoint (how kube-apiServer provides input to kubelet).
    * can do both at the same time.
- Can use static pods to deploy control plane nodes.
    ```bash
    kubectl get pods -n kube-system
    ```
- Find static pods exist in this cluster in all namespaces
    ```bash
    # and look for those with -<Node-Name> appended in the name.
    kubectl get pods --all-namespaces
    ```
- path of the directory holding the static pod definition files.
    ```bash
    # identify the config file - --config=/var/lib/kubelet/config.yaml
    ps -ef | grep /usr/bin/kubelet
    # Then check in the config file for staticPodPath.
    grep -i staticpod /var/lib/kubelet/config.yaml
    ```
- path of manifest directory `/etc/kubernetes/manifests`
- Create a static pod example
    ```bash
    kubectl run --restart=Never --image=busybox static-busybox --dry-run=client -o yaml --command -- sleep 1000 > /etc/kubernetes/manifests/static-busybox.yaml
    ```
- Delete a static pod
    ```bash
    kubectl get pods -o wide | grep $POD_NAME

    ssh $NODE_OF_POD

    ps -ef |  grep /usr/bin/kubelet
    grep -i staticpod /var/lib/kubelet/config.yaml

    # Delete path of that file
    ```

|                   Static Pods               |                DaemonSets                  |
| :------------------------------------------ | :----------------------------------------  |
| Created directly by the kubelet             | Managed by the DaemonSet controller        |
| Commonly used for control-plane components  | Commonly used for monitoring/logging agents|
| Not scheduled by the kube-scheduler         | Pods are scheduled by the default scheduler using NodeAffinity|