## KUBERNETES 
-------------------------------------------------------------

### CORE CONCEPTS
1. **CLUSTER ARCHITECTURE:**
    - Master Node: manages K8s cluster
        * Control plane components
            1. etcd: store data in key value format about cluster
            2. schedulers: identifies right node to place container based on resource requirements
            3. controllers: takes care of different areas
            4. kube-api server: primary management of k8s, orchestrates all operations within cluster.
    - Worker Nodes:
        * Components
            1. kubelet: agent runs on each node and listens for instructions from kube-api server
            2. kube-proxy service: necessary rules are in place to allow containers to reach eachother

### SCHEDULING
1. **MANUAL SCHEDULING:**
    - Scheduler goes through all pods and check for pods that dont have `spec.nodeName` set.
    - If no scheduler pods stay in pending state.
    - Set `nodeName` in manifest file and it will be scheduled.
    - If pod already running create a binding object and send a post request to pods binding API
    - See scheduler pods
        ```bash
        kubectl get pods --namespace kube-system
        ```

2. **LABELS & SELECTORS:**
    - Manifests
        ```yaml
        apiVersion: apps/v1
        kind: Replicaset
        metadata:
            labels: # Replicaset labels configured for other obect to find replicaset.
                app: App1
                function: front-end
            annotations:                 # Used record other details for informative reasons.
                buildversion: 1.34
        spec:
            replicas:: 3
            selector: # should match pod labels
                matchLabels:
                    app: App1
            template:
                metadata: # Pod labels
                    labels:
                        app: App1
                        function: front-end
        ```
    - Code
        ```bash
        kubectl get pods --selector $KEY=$VALUE
        ```