## Install Kubernetes with Kubeadm
-------------------------------------------------------------

### Deployment with Kubeadm
- Kubeadm helps us create a multi node cluster using Kubernetes best practices.
- Steps to setup a Kubernetes cluser with Kubeadm tool.
    1. Have multiple systems or Virtual Machines provisioned for configuring a cluster.
        - Once system is created designate one node as master & the rest as worker nodes.
    2. Install a container runtime on the hosts (nodes).
    3. Install kubadm tool on all the nodes.
        - helps us bootstrap the k8s solution by installing.
        - configuring all the components in the right order.
    4. Initialize master server.
        - all the required components are installed and configured on the master server.
    5. Pod Network.
        - special network that master and worker nodes talk on.
    6. Join the worker nodes to the master Node.

