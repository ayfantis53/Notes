## Monitoring Cluster Components
-------------------------------------------------------------

### Node level metrics
* number of nodes in cluster
* how many of them are healthy
* performance metrics
    - cpu
    - network
    - disc utilization
* pod level metrics

### Kubernetes doesnt come with a full feature mouitoring solution
* Comes with open source solutions
    1. metrics server (Slimmed down version of heapster)
        * retrieves metrics from each k8s nodes & pods 
        * aggragates them and stores them in memory
        * only in memory and doesnt store results on disc (cannot see historical performance data)
        * kubelet (Agent on each node)
            - responsible for getting instructions from k8s api master server
            - cAdvisor (Subcomponent)
                * performance metrics from pods
                * expose them to api
        * Getting Started
            ```bash
            # minikube install
            minikube addons enable metrics-server

            # Other way
            git clone https://github.com/kubernetes-sigs/metrics-server.git
            kubectl create -f deploy/1.8+/

            # View performance metrics
            kubectl top node
            kubectl top pod
            ```
    2. prometheus
    3. elastic stack
* Proprietary solutions
    1. Datadog
    2. Dynatrace