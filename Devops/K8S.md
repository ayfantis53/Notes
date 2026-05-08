## KUBERNETES 
-------------------------------------------------------------
### Nodes
- Node is a worker machine (either a physical server or a virtual machine) that runs containerized applications.
- **Control Plane**
    * manages each node and contains all the necessary services to run Pods.
1. **Core Node Components**
    - These are the essential processes that must run on every node for it to function within the cluster: 
    1. **Kubelet**:
        * The primary `node agent` that communicates with the Control Plane.
        * ensures that the containers described in `PodSpecs` are running and healthy on the node.
    2. **Kube-proxy**:
        * A network proxy that maintains network rules on the node. 
        * It handles internal and external network communication for services
        * implementing load balancing and routing to the correct pods.
    3. **Container Runtime**: 
        * The software responsible for actually running the containers. 
        * Kubernetes supports various runtimes through the Container Runtime Interface (`CRI`) 
            * such as containerd, `CRI-O`, or `Docker Engine`.
2. **Node Status and Metadata**
    - The Control Plane tracks the state of each node through several properties:
    1. **Addresses**: 
        * Includes the `HostName`, `ExternalIP` (accessible from outside the cluster), and `InternalIP` (routable only within the cluster).
    2. **Conditions**: 
        * Reports the health status of the node, such as `Ready`, `MemoryPressure`, `DiskPressure`, or `NetworkUnavailable`.
    3. **Capacity and Allocatable**: 
        * Defines the total resources available (`CPU`, `memory`, `storage`) and the amount currently available for scheduling pods.
    4. **Info**: 
        * General information about the node, such as the kernel version, Kubernetes version (kubelet/kube-proxy), and operating system.
3. **Node Management Features**
    - Administrators use these tools to control how workloads are placed on nodes: 
    1. **Labels and Selectors**: 
        * Key-value pairs used to identify nodes and target specific workloads to them using a `nodeSelector`.
    2. **Taints and Tolerations**: 
        * Taints allow a node to "repel" certain pods unless those pods have a matching "toleration," often used to dedicate nodes to specific tasks like GPU processing.
    3. **Node Lease**: 
        * A heartbeat mechanism where each node has an associated Lease object in the `kube-node-lease` namespace to signal its availability to the Control Plane.  
4. **Optional Add-ons and Agents**
    1. **CNI Plugins**:
        - The Container Network Interface (e.g., Calico, Flannel) manages pod-to-pod networking across different nodes.
    2. **CSI Plugins**:
        - The Container Storage Interface handles the mounting of external storage volumes to the node.
    3. **Log/Metric Agents**:
        - Optional tools like Fluentd or Prometheus Node Exporter that collect logs and system metrics for cluster-wide observability. 

### Pods
- the smallest and most fundamental deployable unit.
    * represents a single instance of a running process in your cluster
    * serves as a "logical host" for one or more containers.
- Key Characteristics
    1. **Smallest Unit**: 
        - Kubernetes does not manage individual containers; instead, it manages and schedules Pods.
    2. **Shared Resources**: 
        - All containers within a single Pod share the same IP address, network namespace, and storage volumes.
    3. **Localhost Communication**: 
        - Because they share a network namespace, multiple containers in the same Pod can communicate with each other using localhost.
    4. **Ephemeral Nature**: 
        - Pods are temporary and disposable. If a Pod fails or the node it resides on dies, Kubernetes does not "repair" it; instead, it replaces it with a new instance.
    5. **Co-location**: 
        - All containers in a Pod are guaranteed to be scheduled on the same physical or virtual machine (node).
- Types of Pods
    1. **Single-Container Pods**: 
        - The most common use case where a Pod wraps a single container. 
        - Kubernetes treats the Pod as a wrapper for that process.
    2. **Multi-Container Pods**: 
        - Used for "tightly coupled" containers that need to share resources. 
        - A common pattern is the Sidecar, where a secondary container performs auxiliary tasks like logging or monitoring for the main application container.
- Lifecycle Phases
    1. **Pending**: 
        - The Pod has been accepted by the system but is waiting for container images to download or for the scheduler to find a suitable node.
    2. **Running**: 
        - The Pod is bound to a node and at least one container is running or starting.
    3. **Succeeded**: 
        - All containers have terminated successfully (exit code 0) and will not be restarted.
    4. **Failed**: 
        - All containers have terminated, but at least one failed (non-zero exit code).
    5. **Unknown**: 
        - The state cannot be determined, usually due to communication issues with the node.


### Daemon Sets
- ensures that a specific pod runs on all (or a subset of) nodes within a cluster.
- As nodes are added, the DaemonSet automatically adds pods, and as nodes are removed, it removes the pods
    * ensuring one copy of the pod exists per node.
- What Are They Used For?
    * **Cluster Log Collection**: 
        - Running log forwarders like Fluentd, Vector, or Logstash.
    * **Node Monitoring Agents**: 
        - Running monitoring agents like Prometheus Node Exporter or Datadog Agent to gather node metrics.
    * **Networking Plugins**: 
        - Running network CNI plugins like Calico, Flannel, or Cilium on every node for network connectivity.
    * **Security Agents**: 
        - Running node-level security scanners such as Falco.
- Key Characteristics
    * **Node-Level Management**:
        - Unlike Deployments that distribute replicas across the cluster, DaemonSets guarantee one pod per designated node.
    * **Automatic Updates**:
        - When nodes are added/removed, the DaemonSet updates automatically.
    * **Tolerations**:
        - DaemonSet pods often automatically possess tolerations for node.kubernetes.io/not-ready and node.kubernetes.io/unreachable.
    * **Usage Case**:
        - Ideal for node-level agents that do not need to be accessed by a Service, but need to act locally on the node.

### Stateful Sets
- API objects used to manage stateful applications, 
    * databases or distributed systems, that require stable network identities, persistent storage, and ordered deployment/scaling.
- Unlike Deployments, they provide unique, persistent identifiers (`pod-name-0, pod-name-1`) that remain with pods across rescheduling
- Key Features & Uses of StatefulSets:
    * **Stable Network Identity**: 
        - Pods receive a sticky hostname from the governing service, crucial for clustered applications.
    * **Persistent Storage**: 
        - They use `volumeClaimTemplates` to attach persistent volumes to pods, ensuring data survives pod restarts and rescheduling.
    * **Ordered Deployment & Scaling**: 
        - Pods are created, updated, or deleted sequentially (`0` to `N - 1`).
    * **Ordered Rolling Updates**: 
        - StatefulSets support automated, ordered updates to applications, maintaining data integrity.
- Common Use Cases:
    1. **Databases**: 
        - Running databases like MySQL, PostgreSQL, MongoDB, or Cassandra.
    2. **Distributed Systems**: 
        - Managing distributed systems like ZooKeeper, Kafka, or Elasticsearch.
    3. **Stateful Services**: 
        - Any application needing to maintain state, data, or a unique identity.


## INTERVIEW QUESTIONS
-------------------------------------------------------------
### What is Kubernetes?
- an open-source platform for automating the deployment, scaling, and management of containerized workloads and services.
- It groups containers into logical units for easy management and discovery.

###  What does K8s mean?
- K8s is simply shorthand for Kubernetes. 
- The '8' represents the eight letters between the initial 'K' and the final 's' in the word Kubernetes.

### What is container orchestration?
- Container orchestration is about automating the operational tasks required to run containerized workloads and services
    * including deploying, managing, scaling, and networking containers.

### How are Kubernetes and Docker related?
- Docker is a tool for building, distributing, and running individual containers. 
- Kubernetes is a system for managing and orchestrating clusters of containers, regardless of which runtime is used (though Docker is common).

### What is a Pod?
- A Pod is the smallest operational unit in Kubernetes. 
- It's an abstraction that represents a group of one or more containers, 
    * sharing the same network namespace and storage volumes.

### What is a Node in Kubernetes?
- A Node is a worker machine in a Kubernetes cluster. 
- It can be a virtual or physical machine and is where Pods are deployed and executed. 
- The Kubernetes control plane manages the Nodes

### What is the role of the Kubernetes Master?
- The Kubernetes Master, or Control Plane, is responsible for managing the cluster state and coordinating operations. 
- It includes components like the API server, etcd, scheduler, and controller manager.

### What is etcd?
- a consistent and highly-available distributed key-value store used as Kubernetes' backing store for all cluster data. 
- It holds the configuration and state of the cluster.

### How does Kubernetes handle container networking?
- Kubernetes provides a flat network space where every Pod gets its own IP address. 
- Communication between Pods is enabled by network plugins (CNI). 
- Services provide stable IPs for accessing groups of Pods.

### What is a Service in Kubernetes?
- A way to expose an application running on a set of Pods as a network service.
- It provides a stable IP address and DNS name, abstracting away changes to Pod IPs due to scaling or restarts.

### Explain the difference between a Deployment and a StatefulSet.
- Deployments are used for stateless applications; 
    * they manage Pods via ReplicaSets and are ideal for rolling updates. 
- StatefulSets are for stateful applications:
    * ensuring ordered deployment
    * stable network identities
    * managing persistent storage claims.

### What is a DaemonSet?
- A DaemonSet ensures that all (or some) Nodes run a copy of a Pod. 
- It's typically used for cluster-wide services like log collection agents or node monitoring agents.

### What is an Ingress in Kubernetes?
- Ingress exposes HTTP and HTTPS routes from outside the cluster to services within the cluster. 
- It provides rules for routing traffic based on hostnames and paths to specific Services.

### What is the purpose of an Operator?
- An Operator is a method of packaging, deploying, and managing a Kubernetes-native application. 
- It uses custom resources to automate operational tasks for complex applications, extending the Kubernetes API.

### What is the difference between ConfigMap and Secret?
- ConfigMaps are used to store non-confidential configuration data like
    * environment variables
    * command-line arguments.
- Secrets are designed for storing sensitive information more securely, such as 
    * passwords
    * tokens
    * keys

### What is a Namespace?
- Namespaces provide a mechanism for isolating groups of resources within a single cluster. 
- They are used to divide cluster resources between multiple users or teams and provide a scope for names.

### How do you update an application in Kubernetes?
- You typically update an application by changing the container image tag in the Deployment manifest. 
- When you apply the updated manifest, Kubernetes performs a rolling update, gradually replacing old Pods with new ones.

### What is the use of liveness and readiness probes?
- `Liveness` probes determine if a container is running; if it fails, the kubelet restarts the container. 
- `Readiness` probes determine if a container is ready to serve traffic; if it fails, the Service removes the Pod's IP.

### What are Persistent Volumes (PV) and Persistent Volume Claims (PVC)?
- a piece of storage in the cluster. 
- A `Persistent Volume Claim` (PVC) is a request for storage by a user. 
- Kubernetes binds a PVC to an available PV that meets the criteria.

### What is a Job and CronJob in Kubernetes?
- A `Job` creates one or more Pods and ensures that a specified number of them complete successfully. 
    * jobs are a specific Kubernetes controller used to run finite tasks and then stop, 
    * rather than running continuously like deployments. 
        1. batch processing
        2. database backups
        3. scripts—to completion a
- A `CronJob` manages Jobs that run on a repeating schedule, like a cron utility.
    * use CronJobs for periodic and recurring tasks that do not need to run continuously:
        1. **Database Backups**:  prevent data loss.
        2. **Maintenance & Cleanup**: clear caches, rotate log files, or removing temporary files to free up disk space.
        3. **Reporting**: Generating daily, weekly, or monthly analytics and business reports.
        4. **Communication**: Sending automated email reminders or notifications at fixed intervals.
        5. **Off-Peak Tasks**: Scheduling resource-heavy individual tasks for specific times when cluster likely to be idle.
        6. **Data Syncing**: Running periodic synchronization between different systems.

### How does Kubernetes ensure high availability?
- Kubernetes provides high availability through features like 
    1. Pod replication across Nodes via Deployments
    2. load balancing traffic across healthy Pod replicas with Services
    3. self-healing by automatically restarting failed containers or Pods.

### What is the default backend in Ingress?
- The default backend in an Ingress controller handles requests that do not match any of the defined rules. 
- It's typically configured to serve a default service, like a 404 page or a fallback application.

### What is GKE?
- GKE stands for Google Kubernetes Engine. 
- It is a managed service provided by Google Cloud Platform that simplifies the deployment, scaling, and management of Kubernetes clusters.

### How do you perform maintenance on a Kubernetes Node?
```bash 
    # To perform maintenance on a Node, you first drain it using 
    kubectl drain  --ignore-daemonsets

    # to safely evict all user Pods. After maintenance, you make it schedulable again with 
    kubectl uncordon
``` 

### How do you collect logs from Pods?
- For production, you typically implement a centralized logging solution like Fluentd or Logstash to collect, aggregate, and store logs from all Pods.
``` bash
    # You can get basic logs using 
    kubectl logs
```

### What is a Kubernetes Controller?
- A control loop that watches the state of the cluster and makes changes towards a desired state. 
- Examples include:
    1. Deployment Controller
    2. StatefulSet Controller
    3. Node Controller.

### Explain Horizontal Pod Autoscaling.
- Horizontal Pod Autoscaling (HPA) automatically adjusts the number of Pod replicas in a Deployment or StatefulSet based on observed metrics, most commonly average CPU utilization or memory, to handle fluctuating load.

### What is the role of kube-scheduler?
-  a control plane component that watches for newly created Pods with no assigned Node. It selects a Node for the Pod to run on based on factors like resource requirements, affinity/anti-affinity, and taints/tolerations.

### What are taints and tolerations?
- `Taints` are applied to Nodes to mark that they should not accept certain Pods. 
- `Tolerations` are applied to Pods to allow them to be scheduled on Nodes that have matching Taints. They work together to control Pod placement.