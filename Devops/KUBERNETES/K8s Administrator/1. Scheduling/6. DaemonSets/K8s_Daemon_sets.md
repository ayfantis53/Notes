## DaemonSets
-------------------------------------------------------------
- Are like replica sets
    * runs one copy of your pod on each node in your cluster
    * whenever a new node is added the pod is added
    * one copy of pod is on each node
- Good for networking, loggers, or monitoring
- kube-proxy is a good use case of daemon set
    ```bash
    kubectl get daemonsets

    kubectl describe daemonsets
    ```
- Daemonset uses NodeAffinity and Default Scheduler to schedule pods