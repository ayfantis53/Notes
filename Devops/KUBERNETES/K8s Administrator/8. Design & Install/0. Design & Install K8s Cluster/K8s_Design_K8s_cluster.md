## Desig & Install a Kubernetes Cluster
-------------------------------------------------------------

### Designing a Kubernetes Cluster
- Ask
    1. What is purpose of cluster
        - Education
            * minikube
            * Single node cluster with kubeadm/GCP/AWS
        - Development & Testing
            * multi-node clister with a single master and multiple workers
            * setup using kubeadm tool or quick provision on GCP, AWS or AKS
        - Hosting Production Applications.
            * Highly available mutil-node cluster with multiple master nodes.
            * Kubeadm or GCP or Kops on AWS or other supported platforms.
            * Up to 5,000 Nodes
            * Up to 150,000 PODs in the cluster.
            * Up to 300,000 total containers.
            * Up to 100 PODs per node.
    2. What is the Cloud option (Clour or On prem)
        - One prem
            * Kubeadm
        - Cloud
            * GKE for GCP
            * EKS for AWS
            * Azure Kubernetes Service (AKS) for Azure.
    3. Workloads you'll run on the cluster
        - How many?
            * Virtual or physical machines.
            * Dedicate master nodes for control plane components only.
        - What kind?
            * Web
            * Big Data/Analytics
        - Application Resource Requirements
            * CPU Intensive
            * Memory Intensive
                1. High Performance - SSD-backed storage.
                2. Multiple Concurrent connections -Network-based storage.
                3. Persistent shared volumes for shared access across multiple PODs.
                4. Label nodes with specific disk types.
                5. Use Node Selectors to assign applications to nodes with specific disk types.
        - Traffic
            * Heavy Traffic
            * Burst Traffic


### Choosing Kubernetes Infrastructure
- Minikube
    * deploys a single node cluster easily.
    * relies on one of the virtualization softwares called virtualbox.
    * deploys VMs.
    * Single Node cluster.
- kubeadm can be used to deploy a single node or a multi-node cluster real quick.
    * must provision the required host with supported configuration yourself.
    * Requires VMs to be ready.
    * Single/Multi-Node cluster.

### Getting Started Production
- Turnkey solutions (Openshift, Vagrant, VMWare Cloud PKS, Cloud Foundry Container Runtime)
    * You provision VMs.
    * You configure VMs.
    * You use scripts to deploy Cluster.
    * You maintain VMs yourself.
    * E.g. Kubernetes on AWS using KOPs.
- Hosted Solutions (Openshift Online, Google K8s Engine (GKE), Azure K8s Service, Amazon Elastic container Service for K8s)
    * Kubernetes-as-a-service.
    * Provider provisions VMs.
    * Provider installs Kubernetes.
    * Provider maintains VMs.
    * E.g. Google Container Engine.


### Configuring High Availability
- What happens if you lose Master Node.
    * Everything keeps running until failures start happening.
- Multiple Master Nodes
    * Master Node host control plane components
        - API Server
        - Scheduler
        - etcd server
        - control Manager
    * High Availibility configuration means multiple Master nodes
        - how do you make multiple components on multiple master nodes work.
            * Run master nodes in Active, Standby mode.
            * because cant have multiple instances of apiserver or controller manager active.
                - leader-election process decides who is active and who is passive.
                ```bash
                # Tries to gain control of lock known as kube-controller-manager endpoint.
                kube-controller-manager --leader-elect true \
                                        --leader-elect-lease-duration 15s \
                                        --leader-elect-renew-deadline 10s \
                                        --leader-elect-retry-period 2s \
                ```
            * loadbalancer needed for api server on multiple node systems..
        - etcd
            * 2 topologies you can configure with kubernetes.
                1. **Stacked Topology**
                    - etcd is part of K8s master nodes.
                    - easier to setup.
                    - easier to manage.
                    - fewer servers.
                    - risk during failures.
                2. **External etcd Tolopolgy**
                    - separated from control plane nodes and ran on its own set of servers.
                    - less risky.
                    - harder to setup.
                    - more servers.
            * Api Server is only component that talks to etcd server.
                - need to make sure api server is pointed to correct address of etcd servers.
                    ```bash
                    cat /etc/systemd/system/kube-apiserver.service
                    ```
                    ```ini
                    [Service]
                    ExecStart=/usr/local/bin/kube-apiserver \\
                        --advertise-address=${INTERNAL_IP} \\
                        --allow-privileged=true \\
                        --apiserver-count=3 \\
                        --etcd-cafile=/var/lib/kubernetes/ca.pem \\
                        --etcd-certfile=/var/lib/kubernetes/kubernetes.pem \\
                        --etc-keyfile=/var/lib/kubernetes/kubernetes-key.pem \\
                        --etcd-servers=https://10.240.0.10:2379,https://1-.240.0.11:2379
                    ```
            * etcd is a distributed system. The api-server or any other component that wishes to talk to it can reach it at any of its instances.
                - this is why we specify a list of etcd servers in kube-api configuration.


### ETCD in High Availability
- What is ETCD
    * distributed: multiple servers
        - reads are easy
        - writes are only responsible on one of the instances
            * if any other nodes do a write they forward it to the leader and it processes the write
    - key-value store: Simple, Secure & Fast.
    - Install etcd on server
        ```bash
        # Download latest supported binary.
        wget -q --https-only \
            "https://github.com/coreos/etcd/releases/download/v3.3.9/etcd-v3.3.9-linux-amd-64.tar.gz"

        # Extract it.
        tar -xzf etcd-v3.3.9-linux-amd64.tar.gz

        # Create the required directory structure.
        mv etcd-v3.3.9-linux-amd-64/etcd* /usr/local/bin
        mkdir -p /etc/etcd /var/lib/etcd

        # Copy over the certificate files.
        cp ca.pem kubernetes-key.pem kubernetes.pem /etc/etcd
        ```
    - etcdctl
        ```bash
        # PUT request
        etcdctl put $KEY $VALUE

        # GET Request
        etcdctl get $KEY

        # GET Request all
        etcdctl get / --prefix --keys-only
        ```
- Leader Election RAFT
    * Random timers for initiating requests.
        - First one finishing the timer sends request to other nodes to become leader.
        - If other nodes dont recieve a notification from leader in some point of time, nodes initiate reelection process & new leader is elected.
- Quorum = N/2 + 1
    * Minimum number of nodes that must be available for the cluster to function properly or make a successful write.
    * recommended to select an odd number when deciding on nodes for quorum requirements.
        - even numbers can sometimes lead to cluster without quorum
            | Instances | Quorum | Fault Tolerance |
            | :-------- | :------ | :------------- |
            |     1     |    1    |        0       |
            |     2     |    2    |        0       |
            |     3     |    2    |        1       |
            |     4     |    3    |        1       |
            |     5     |    3    |        2       |
            |     6     |    4    |        2       |
            |     7     |    4    |        3       |
