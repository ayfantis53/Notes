## DOCKER 
-------------------------------------------------------------
### what storage is best for high performance ephemeral data like caches in production in docker?
- For high-performance, ephemeral data (caches) in production Docker, `tmpfs` mounts are the best choice.
    * store data directly in the host memory (RAM)
    * offering the lowest latency and highest I/O speed. 
    * Data is lost when the container stops, making it perfect for non-persistent, high-speed caching.
- Top Storage Options for Ephemeral Docker Caches
    1. `tmpfs` Mounts (Best for Performance):
        * **How it works**: Mounts a filesystem in the host's RAM. No data is written to disk.
        * **Use case**: Caching, session tokens, temporary encryption keys, or reducing disk I/O.
        * **Usage**: docker run --tmpfs /path/in/container <image>.
        * **Limitation**: Consumes RAM, so cache size must be monitored.
    2. `emptyDir` (Best for Kubernetes):
        * **How it works**: A directory created on the node's disk when a pod is scheduled.
        * **Use case**: Temporary caches or logs.
        * **Performance**: Faster than node storage if configured with medium: Memory (acts like tmpfs).
### what is a tmpf mount in docker?
- a storage option that allows you to store data directly in the host machine's system memory (RAM) rather than on the disk. 
- It is one of three main ways to manage data in Docker, alongside Volumes and Bind Mounts. 
- Key Characteristics:
    * **Non-Persistent**: Unlike volumes or bind mounts, data in a tmpfs mount is volatile. When a container stops, the tmpfs mount is removed and all files written to it are permanently lost.
    * **High Performance**: Because data is stored in RAM, read and write operations are significantly faster than disk-based storage, making it ideal for performance-sensitive tasks.
    * **Linux Exclusive**: This feature is only available when running Docker on Linux hosts.
    * **Security**: Since the data never hits the physical disk, it is a preferred method for storing sensitive information (like secrets or keys) that you do not want to persist in the container's writable layer.
- Common Use Cases:
    * **Sensitive Data**: Storing secrets, passwords, or credentials that should only exist while the application is running.
    * **High-Volume I/O**: Caching, session management, or transient state data that would otherwise cause unnecessary wear on SSDs/HDDs.
    * **Read-Only Containers**: When a container is run with a read-only root filesystem, a tmpfs mount can provide a small writable area for the application to function (e.g., for /tmp or /run). 
- How to Use tmpfs Mounts
    ```bash
    # This is a quick way to mount a temporary filesystem at a specific path, but it does not allow for advanced configuration
    docker run -d --name my-container --tmpfs /app/cache nginx:latest

    # The --mount flag is more verbose and is required if you need to set size limits or file permissions. It is also the only option compatible with Docker Swarm services.
    # tmpfs-size: Limits the amount of RAM used (default is unlimited).
    # tmpfs-mode: Sets the file permissions in octal (e.g., 1770 for restricted access).
    docker run -d --name my-container --mount type=tmpfs,destination=/app/cache,tmpfs-size=100m,tmpfs-mode=1770 nginx:latest
    ```
### how to limit the size of a docker volume using the local driver
- Limiting the size of a Docker volume using the built-in `local` driver is not supported directly through a simple "size" flag for standard persistent volumes. 
- However, you can achieve this by leveraging Linux mount options, which the local driver can pass to the host's kernel. 
1. Using a `tmpfs` Volume (Non-Persistent)
    - The simplest way to enforce a size limit is by using tmpfs, which is a volatile, memory-based storage. 
    - This is ideal for temporary data or caches. 
    ``` bash
    # Command Line:
    docker volume create --driver local --opt type=tmpfs --opt device=tmpfs --opt o=size=100m my_limited_volume
    ```

    ```yaml
    # Docker Compose
    volumes:
        my_limited_volume:
            driver: local
            driver_opts:
                type: tmpfs
                device: tmpfs
                o: "size=100m"
    ```
2. Using `XFS` Project Quotas (Persistent)
    - To limit a standard persistent volume, you must use a host filesystem that supports quotas, such as XFS. 
        1. Format a partition or disk with XFS and mount it with the pquota option (e.g., in /etc/fstab).
        2. Create the volume by pointing the local driver to a specific directory on that XFS mount.
        3. Apply the quota using the xfs_quota tool on the host to the specific directory OneUptime - XFS Quotas Guide. 
3. Using a Loopback Device (Standard Filesystems)
    - If you cannot reformat your drive to XFS, you can create a virtual disk file (sparse file) of a fixed size, format it, and mount it as a volume.
        1. Create the disk image: truncate -s 1G volume.img
        2. Format it: mkfs.ext4 volume.img
        3. Create the Docker volume:
        ```bash
        docker volume create --driver local --opt type=ext4 --opt device=/path/to/volume.img --opt o=loop my_fixed_volume
        ```
### command to prune unused docker secrets
``` bash
docker secret rm $(docker secret ls -q)
```

### docker flag that ensures a docker container runs in a read only mode but allows specific writable directories
- To run a Docker container with a read-only root filesystem while allowing writes to specific directories, you use the `--read-only` flag in combination with `--tmpfs` or `--volume mounts`. 
- Key Flags:
    * `--read-only`: This flag mounts the container's entire root filesystem as read-only, preventing any changes to the image's files. It is a security best practice to prevent attackers from persisting malware or modifying application binaries.
    * `--tmpfs`: According to the official Docker documentation, this flag allows you to mount a temporary, in-memory writable directory. It is ideal for non-persistent data like logs or temporary files.
    * `-v` or `--volume`: Use these to mount persistent writable directories from the host or a managed volume. By default, Docker volumes are read-write unless you explicitly append :ro. 
- Examples of Implementation
    ``` bash
    # Docker command
    docker run -d --read-only --tmpfs /var/cache/nginx --tmpfs /var/run --tmpfs /tmp nginx
    ```

    ``` yaml
    #  Docker Compose
    services:
        web:
            image: nginx
            read_only: true
            tmpfs:
            - /var/cache/nginx
            - /var/run
            - /tmp
    ```
### what is macvlan in docker and what is its scope
- a Docker network driver that assigns a unique MAC address to each container's virtual network interface, making them appear as physical devices directly connected to the network. 
- It bypasses Docker host bridging, allowing containers to communicate directly with external networks. Scope is Local, operating on a single Linux host.
- Key Aspects of Docker Macvlan:
    * **Performance**: It provides higher network throughput and lower latency because it eliminates the need for port mapping and Linux bridging.
    * **Direct Connectivity**: Containers are treated as physical machines, receiving IPs directly from your network’s subnet.
    * **Requirements**: Requires Linux kernel 3.9 or higher. It is not supported in rootless mode, and not on Docker Desktop for Windows/Mac.
    * **Isolation**: While they connect to the physical network, Macvlan networks are separated from each other. 
- Scope and Limitations:
    * **Local Scope**: Macvlan is designed for the individual Docker host (node). It is not a swarm-scope driver, meaning it cannot span multiple hosts without external orchestration.
    * **Host Dependency**: It requires a physical interface (e.g., eth0) on the host, which is then divided into sub-interfaces.
    * **Host-to-Container Limitation**: By default, containers using a Macvlan network cannot communicate with the Docker host itself, as this would require routing traffic through the physical network and back.
- Use Cases:
    * **Legacy Applications**: Applications that require direct access to the physical network or require specific MAC addresses.
    * **Network Monitoring**: Running tools like traffic analyzers that need to see all packets on the wire.
    * **High-Performance Networking**: Environments where avoiding NAT (Network Address Translation) latency is critical.
    * **VLAN Trunking**: Support for tagging network traffic using VLANs.
    ``` bash
    # To create a macvlan network, you must specify the parent interface and subnet
    docker network create -d macvlan --subnet=192.168.1.0/24 --gateway=192.168.1.1 -o parent=eth0 my-macvlan-net
    ```

### how to pause a container without terminating in docker
- Single container
```bash
# To Pause: Use docker pause followed by the container name or ID.
docker pause <container_name_or_id>

# To Unpause: Use docker unpause to resume exactly where the processes left off.
docker unpause <container_name_or_id>
```
- Multi container
``` bash
# You can pause all currently running containers at once using the following command.
docker pause $(docker ps -q)

# If you are using Docker Compose, you can pause all services defined in your docker-compose.yml file
docker compose pause
```

- Verification: To check if a container is currently paused, you can filter your container list or use docker inspect:
``` bash
docker ps --filter "status=paused"
# OR
docker inspect --format='{{.State.Status}}' <container_name>
```

### which docker kernel feature needs extra configuration
- Docker kernel features requiring extra configuration often relate to advanced security
- resource management, or networking, 
    * including User Namespaces, Cgroups (specifically memory/swap limits), AppArmor/SELinux
        1. **User Namespaces (userns-remap)**: 
            - To enhance security, you must configure Docker to map the root user inside the container to a non-privileged user on the host, which requires subuid/subgid setup.
        2. **Resource Constraints (Cgroups)**: 
            - While basic resource limits work, enabling swap limit capabilities or tuning kernel-level CPU scheduler (--rt-sched) often requires manual configuration.
        3. **Security Modules (AppArmor/SELinux)**: 
            - While often enabled by default on supported distributions, creating custom profiles for strictly restricted containers requires extra work.
        4. **Network Drivers (IPVLAN/MACVLAN)**: 
            - Using these advanced drivers requires configuring the host kernel's network stack.
        5. **Kernel Parameter Tuning (sysctl)**: 
            - Modifying kernel parameters (e.g., net.core.somaxconn) for container networking needs specific flags or compose file updates. 
    * specialized network drivers like IPVLAN. 
- While Docker works out-of-the-box, these advanced features require host-level tuning to enhance isolation and resource control.

### which docker option ensures a containers filesystem is read only
- The Docker option that ensures a container's entire root filesystem is mounted as read-only is the `--read-only` flag. 
- By default, Docker containers are created with a writable layer that allows processes to modify files. 
- Using the `--read-only` flag removes this writable layer, forcing the application to store any persistent or temporary data in explicitly defined locations like volumes or tmpfs mounts. 
``` bash
# Docker CLI command
docker run --read-only <image-name>
```
```yaml
# Docker Compose
services:
  app:
    image: my-app
    read_only: true
```
- Important Considerations
    * Application Failures: Many applications (like Nginx or database engines) expect to write to temporary directories (e.g., /tmp, /var/run, or /var/cache). If you enable --read-only, these applications may fail to start unless you also provide writable locations for those specific paths.
    * Handling Writes: You can combine `--read-only` with other flags to allow limited writes to specific areas while keeping the rest of the system locked:
        * `--tmpfs`: Mounts a temporary, memory-backed filesystem for non-persistent data (e.g., `docker run --read-only --tmpfs /tmp my-image`).
        * `-v` or `--mount`: Uses persistent volumes for data that must survive container restarts.

### how does dockers image scanning feature integrate with vulnerability management
- Docker image scanning is a foundational component of modern vulnerability management
- transitioning security from a final "checkpoint" to a continuous process integrated throughout the software development lifecycle (SDLC).
- It functions by decomposing images into their constituent layers and software components to identify known security flaws before they can be exploited in production. 
1. Automated Detection and Inventory 
    - The core of image scanning is the automated creation of a Software Bill of Materials (SBOM), which serves as a complete inventory of every package, library, and configuration within an image. 
        * **Component Analysis**: Scanners unpack image layers to identify OS packages (e.g., from Alpine or Ubuntu) and application-level dependencies (e.g., npm, pip, Maven).
        * **CVE Matching**: This inventory is cross-referenced against real-time vulnerability databases, such as the National Vulnerability Database (NVD) and vendor-specific advisories, to flag Common Vulnerabilities and Exposures (CVEs).
        * **Beyond CVEs**: Advanced tools also scan for misconfigurations (e.g., running as root), exposed secrets like API keys, and license compliance issues. 
2. Integration with the Vulnerability Management Lifecycle
    - Image scanning is not a one-time event; it is embedded into several stages of the vulnerability management lifecycle: 
        * **Shift-Left Security (Build-Time)**: Tools like Docker Scout and Snyk allow developers to scan images locally during development or automatically during CI/CD. This enables "gating," where builds are automatically failed if they contain critical vulnerabilities.
        * **Registry Scanning (Storage)**: Scanners continuously monitor images at rest in registries like Docker Hub or Harbor. Since new vulnerabilities are discovered daily, an image that was "clean" at build time may become "vulnerable" while sitting in storage.
        * **Continuous Monitoring (Runtime)**: Integration with runtime security platforms (e.g., Sysdig or Wiz) provides context on which vulnerabilities are actually "in-use" by active containers, helping teams prioritize fixes for exploitable paths. 
3. Risk Prioritization and Remediation
    - A major challenge in vulnerability management is "alert fatigue." Modern scanning features help manage this through: 
        * **Contextual Analysis**: Tools prioritize risks based on exploitability, network exposure, and whether the vulnerable package is actually loaded in memory.
        * **Remediation Guidance**: Scanners often provide specific recommendations, such as the exact base image version to upgrade to to resolve a set of CVEs.
        * **EX Attestations**: Using the Vulnerability Exploitability eXchange (VEX) standard, organizations can suppress false positives for vulnerabilities that are technically present but not exploitable in their specific environment. 
4. Popular Integration Tools
    | Tool | Primary Integration Point | Key Feature |
    | ---- | ------------------------- | ----------- |
    | Docker Scout | Docker Desktop, CLI, Hub | Built-in remediation advice and base image recommendations. |
    | Snyk Container | IDE, Git, CI/CD | Developer-focused with automated fix Pull Requests. |
    | Trivy | CLI, Registry | Open-source, lightweight, and supports multiple artifact types. |
    | Wiz / Prisma Cloud | Cloud / Registry | Full-lifecycle protection with "graph-based" risk prioritization. |
    | Clair | Container Registries | Static analysis engine commonly used in Quay and Harbor. |

### How can a container use a specific Docker volume
- To use a specific Docker volume with a container, you must map the volume to a path within the container’s filesystem at the time of creation. 
- Docker provides two primary ways to do this: 
    1. using the docker run command for individual containers 
        ``` bash
        # CLI using --mount
        # source: The name of your existing volume (e.g., my-existing-volume).
        # target: The path inside the container where you want to access the data.
        docker run -d --name my-container --mount source=my-existing-volume,target=/app/data my-image:latest 

        # using -v Shortcut: This is a more concise syntax commonly used in quick commands.
        docker run -d -v my-existing-volume:/app/data my-image:latest
        ```
    2. using a docker-compose.yml file for multi-container setups. 
        ``` yaml
        services:
            web:
                image: nginx:latest
                volumes:
                - my-data-vol:/usr/share/nginx/html

            volumes:
            my-data-vol:
                external: true  # Set to 'true' if the volume already exists outside this file
        ```
3. Sharing a Volume Between Containers
- You can mount the same volume to multiple containers simultaneously to share data between them. 
    * Method 1: Mount the same named volume to both containers using the commands above.
    * Method 2: Use the --volumes-from flag to copy all volume mounts from an existing container to a new one.
    ``` bash
    docker run -d --name container-b --volumes-from container-a my-image
    ```
- Important Considerations
    * **Existing Containers**: You cannot attach a volume to an already running container. You must stop and remove the container, then recreate it with the volume flags.
    * **Data Persistence**: Data in a volume persists even if the container is deleted. To see all existing volumes on your system, use the docker volume ls command.
    * **Permissions**: If you mount a volume to a non-empty directory in the container, the existing container files will be obscured by the volume's content. However, if the volume is empty, Docker typically populates it with the container's pre-existing data at that path. 

### what is the scope of the bridge network in docker
- The scope of the bridge network in Docker is local, meaning it operates only on a single Docker daemon host. 
- It acts as a private, software-defined bridge (docker) allowing containers connected to the same bridge network to communicate, while providing isolation from containers not connected to it.
- Key Aspects of Bridge Network Scope:
    * **Single-Host Limitation**: Bridge networks are designed for communication among containers running on the same host.
    * **Internal Isolation**: Containers on a bridge network are isolated from the host's network and other networks by default.
    * **External Access (NAT)**: Bridge networks use Network Address Translation (NAT) to allow containers to connect to the outside world, usually through the host's IP address.
    * **Port Mapping**: To allow external traffic to reach a container, ports must be explicitly published (forwarded) from the container to the host.
    * **Default Network**: Without specific configuration, new containers automatically connect to the default bridge network. 

### in docker swarm how can you restrict services to run only on nodes with specific label
- To restrict Docker Swarm services to run only on nodes with specific labels
- you must first assign labels to your nodes and then define placement constraints in your service configuration. 
1. Assign Labels to Nodes 
    - Use the docker node update command on a manager node to add custom metadata to a specific node. 
    ``` bash
    # Command: docker node update --label-add <key>=<value> <node-id-or-name>
    docker node update --label-add type=database worker-node-1
    ```
2. Restrict Service Placement
    - You can apply restrictions using either the CLI or a Compose (Stack) file. 
    - Using Docker Compose (Stack File) 
        * In your docker-compose.yml file, add a placement section under deploy. 
        * This is the recommended method for version-controlled infrastructure as noted by
        ``` yaml
        services:
            db:
                image: postgres:latest
                deploy:
                placement:
                    constraints:
                    - node.labels.type == database
        ```
    - Using the Docker CLI
    ``` bash
    # Create New Service:
    docker service create --name my-db --constraint "node.labels.type == database" postgres:latest

    # Update Existing Service:
    docker service update --constraint-add "node.labels.type == database" my-db
    ```
- Key Things to Remember
    * **Hard Requirement**: Placement constraints are strict. If no nodes match the label, the service will remain in a Pending state and will not start elsewhere, according to Docker Documentation.
    * **Multiple Labels**: You can add multiple constraints to a single service. The service will only run on nodes that satisfy all listed conditions.
    * **Operators**: You can use == (equals) or != (does not equal) to include or exclude nodes based on their labels.
    * **Built-in Labels**: Swarm also provides built-in constraints such as node.role == worker, node.role == manager, or node.hostname == server-1 for more basic filtering, as detailed in Docker Community Forums. 

### which docker option restricts a container from performing potentially unsafe system calls
- The Docker option used to restrict a container from performing potentially unsafe system calls (syscalls) is `--security-opt seccomp=....` 
- By default, Docker applies a default Seccomp (Secure Computing Mode) profile that restricts over 44 unsafe syscalls (such as mount, reboot, and kexec_load) to prevent container breakouts. 
- Key Details on Restricting System Calls:
    * **Default Behavior**: Docker automatically uses a default seccomp profile. It is rarely necessary to change it, but it can be disabled using `--security-opt seccomp=unconfined`.
    * **Custom Profiles**: You can apply a more restrictive profile by running:
        ``` bash
        docker run --security-opt seccomp=/path/to/profile.json ....
        ```
    * **Capabilities** (--cap-drop / --cap-add): Another way to restrict dangerous actions is by limiting Linux kernel capabilities (e.g., [DROP CAP_SYS_ADMIN](https://blaxel.ai/blog/container-escape)).
    * **No New Privileges**: Using --security-opt no-new-privileges prevents processes from gaining additional privileges.
- Seccomp filters the syscalls a process can make, acting as a gatekeeper between the container and the host kernel

### how to backup a docker volume without stopping the container
- Backing up a Docker volume without stopping the container is possible, but it carries a risk of data corruption if the application (like a database) writes to the volume during the backup process. 
1. Using a Sidecar Container (Recommended)
    - You can create a temporary "sidecar" container that mounts the target volume and archives its contents while the original container remains running. 
    ``` bash
    # Standard Archive Command: Run a BusyBox or Alpine container to create a tarball of the volume:
    # --volumes-from: Mounts all volumes from your running container.
    # -v $(pwd):/backup: Mounts your current host directory to store the backup file.
    docker run --rm --volumes-from <running_container_name> -v $(pwd):/backup busybox tar cvf /backup/backup.tar /path/to/data/in/container

    # Direct Volume Mount: If you know the volume name, you can mount it directly to avoid side effects:
    docker run --rm -v my_volume_name:/data -v $(pwd):/backup alpine tar czf /backup/my_volume_backup.tar.gz /data
    ```
2. Using the docker cp Command
- The Docker CP command allows you to copy files directly from a running container's filesystem (including mounted volumes) to your host. 
    * **Command**: docker cp <container_id>:/path/in/container /host/path/backup
    * **Pros**: Extremely simple and requires no extra images.
    * **Cons**: Does not preserve all filesystem metadata as effectively as tar.
3. Application-Level Backups (Safest for Databases) 
- For databases like MySQL or PostgreSQL, backing up the raw files while the service is running often results in a corrupted, unusable backup. 
- Instead, use the application's native dump tools via `docker exec`. 
    ``` bash
    # docker exec <container_name> pg_dump -U <username> <db_name> > backup.sql
    docker exec <container_name> pg_dump -U <username> <db_name> > backup.sql

    # MySQL/MariaDB Example: Use mysqldump
    docker exec <container_name> mysqldump -u <username> -p<password> <db_name> > backup.sql
    ```
4. Automated Tools
- If you need recurring, scheduled backups without manual intervention, several open-source tools can manage this:
    * **Offen Docker Volume Backup**: 
        - A popular lightweight tool that can send backups to local storage or S3. 
        - It includes an option to pause/stop containers if you eventually decide that data integrity is more important than 100% uptime.
    * **Backrest**: A web-based interface for managing restic backups of Docker volumes, supporting snapshots and incremental backups. 

### how does docker apparmor integration improve security
- Docker integration with AppArmor improves security primarily by implementing Mandatory Access Control (MAC), which enforces a "least privilege" environment at the Linux kernel level. 
- Unlike standard permissions that focus on users, AppArmor restricts what specific processes can do, even if those processes are running as the root user. 
- The following are the key ways Docker-AppArmor integration enhances security:
    * **Automated Containment via docker-default Profile**: Docker automatically generates and loads a default profile called docker-default for all containers. This profile acts as a safety net by blocking potentially dangerous operations such as mounting filesystems, writing to /proc or /sys files, and accessing sensitive host paths.
    * **Prevention of Container Breakouts**: AppArmor provides a crucial layer of defense against privilege escalation and container escape. Even if an attacker exploits a vulnerability to gain root access inside a container, AppArmor rules restrict the process's ability to interact with the host kernel or access host resources, preventing the attack from spreading beyond the container.
    * **Granular Control Over Resources**: Beyond the default settings, administrators can create custom profiles for specific applications (e.g., a web server or database). These profiles can define precise permissions for file system access, network communication, and process execution. For example:
        - **File Access**: Restricting a web server to only read from its own root directory.
        - **Capabilities**: Explicitly denying the ability to change file ownership (CHOWN) or use raw sockets (NET_RAW).
        - **Networking**: Limiting which network protocols (TCP/UDP) a container can use.
    * **Attack Surface Reduction**: By enforcing a "deny by default" stance for any action not explicitly allowed in a profile, AppArmor significantly reduces the attack surface of a container. A study cited by security researchers indicated that AppArmor profiles could mitigate up to 70% of vulnerabilities by simply making the exploitation path impossible.
    * **Safe Testing with "Complain" Mode**: AppArmor allows administrators to test security policies in Complain Mode before enforcing them. In this mode, the system logs policy violations without blocking them, allowing teams to fine-tune their security rules based on real application behavior without breaking functionality.     
- How to Use It
    ``` bash
    docker run --rm -it --security-opt apparmor=your-custom-profile-name your-image
    ```

### to create a new docker volume with a specific name what command is used
``` bash
docker volume create <volume_name>
```

### which storage driver allows docker to leverage advanced filesystem features like snapshots and compressions
- The Docker storage drivers that allow for advanced filesystem features like snapshots and compression are `btrfs` and `zfs`. 
- These drivers leverage the capabilities of their underlying backing filesystems to provide these features directly for Docker images and container layers.
- Top Storage Drivers for Advanced Features
    1. btrfs (B-tree File System):
        * **Snapshots**: Creates near-instantaneous, space-efficient, block-level copy-on-write (CoW) snapshots for containers and images.
        * **Compression**: Supports transparent, built-in compression (e.g., zstd, lzo) to significantly reduce disk usage.
        * **Use Case**: Ideal when using Linux distributions that support Btrfs (like Ubuntu or SLES) and require efficient snapshotting and storage savings.
    2. zfs (Zettabyte File System):
        * **Snapshots** & Clones: Provides high-performance snapshots and read-write clones, which are perfect for managing Docker image layers and container state.
        * **Compression** & Deduplication: Offers transparent compression and data deduplication to save storage space, in addition to strong checksumming for data integrity.
        * **Use Case**: Suited for environments where data integrity and storage efficiency are the highest priority. 
- Comparison of Advanced Drivers
    | Driver | Key Features | Best For |
    | ------ | ------------ | -------- |
    | btrfs	| CoW, snapshots, transparent compression, subvolumes | Snapshot-heavy workloads, built-in compression |
    | zfs | Snapshots, clones, compression, deduplication, check-summing | Data integrity, storage efficiency, databases |

### in overlay networks how is broadcast traffic handled across multiple hosts
- In overlay networks (like VXLAN, GRE, or Geneve), broadcast traffic—often categorized as BUM traffic (Broadcast, Unknown unicast, and Multicast)—is handled by encapsulating the original layer-2 frame into a layer-3 packet (typically UDP/IP) and sending it across the physical network (underlay) to other hosts.
- Because overlay networks create a virtualized Layer-2 network over a Layer-3 underlay, they must emulate broadcast capabilities. This is achieved through three primary mechanisms: 
    | Technique | Description | Usage Scenario |
    | --------- | ----------- | -------------- |
    | Multicast | Underlay network replicates broadcast traffic to members. | Large-scale, efficient networks. |
    | Head-End Replication | Source host sends unicast copies to every remote host. | Small-scale or limited underlay support. |
    | EVPN Control Plane|BGP directs traffic, converting broadcasts to unicast. | Modern, efficient Data Centers (DC). |

### what is the benefit of using Docker managed volumes over bind mounts
- Using Docker managed volumes over bind mounts is generally the preferred approach for production environments because they offer superior portability, security, and management capabilities.
-  While Docker bind mounts are simpler for local development—allowing you to directly map a host directory to a container—managed volumes provide a more robust abstraction that decouples your application from the specific host filesystem. 
    * Platform Independence and Portability
    * Superior Management via Docker CLI
    * Enhanced Security
    * Automatic Pre-population
    * Volume Driver Support
    * Optimized Performance
        | Feature  | Managed Volumes | Bind Mounts |
        | -------- | --------------- | ----------- |
        | Management | Docker CLI/API | Manual Host Filesystem |
        | Host Dependency | Low (Portable) | High (Tied to host paths) |
        | Initial Content | Can be pre-populated from image | Host always overrides container |
        | Best Use Case | Production data, databases, sharing data | Local development, config files |
        | Remote Storage | Supported via drivers | Not natively supported |

### what is the default encryption mode of swarm management data
- The default encryption mode for Docker Swarm management data (at-rest) is `AES-GCM` (Advanced Encryption Standard in Galois/Counter Mode). 
- This encryption applies automatically to the Raft logs—which contain the swarm's state, configurations, and secrets—located in the /var/lib/docker/swarm/raft/ directory.
- Key Aspects of Swarm Data Encryption
    * **At-Rest Encryption**: By default, since Docker 1.13, Swarm manager nodes encrypt their Raft logs on disk to protect secrets and configurations.
    * **In-Transit Encryption**: Swarm utilizes mutual TLS (mTLS) to authenticate, authorize, and encrypt communications between manager and worker nodes.
    * **Autolock Option**: While encryption is default, the keys used to encrypt these logs are also stored on disk. To increase security, you can initialize the swarm with [--autolock=true](https://docs.docker.com/engine/swarm swarm_manager_locking/). This requires manual entry of a key (unlock key) to restart managers, ensuring the decryption key is never stored on disk.
    * **Separation of Data Planes**: Note that while management data (control plane) is encrypted by default, the data plane (traffic between containers) is not encrypted unless the --opt encrypted flag is used during network creation.

### Docker, the registry config is based on
- The configuration for the Docker Registry (specifically the open-source Distribution implementation) is primarily based on a YAML file. This file defines how the registry behaves, where it stores data, and how it handles security and networking. 
- Below are the key components and formats that form the basis of Docker registry configuration:
    1. **YAML Configuration File**: The core of the registry's settings is a YAML file (usually named config.yml). It contains structured sections for Storage, Auth, and HTTP settings.
    2. **Environment Variables**: You can override any setting in the YAML file using environment variables. This is a common practice when running the registry as a container. For example, REGISTRY_STORAGE_FILESYSTEM_ROOTDIRECTORY overrides the storage path defined in the YAML file.
    3. **OCI Distribution Specification**: Modern registries, including Docker Hub, are based on the Open Container Initiative (OCI) Distribution Specification. This ensures that the registry API follows a standardized protocol for pushing and pulling images.
    4. **Storage Backends**: The registry config is highly dependent on the chosen Storage Driver. It can be configured to use local filesystems, Amazon S3, Azure Blob Storage, Google Cloud Storage, and more.
    5. **Authentication Mechanisms**: Registry security is based on various Access Control methods. This ranges from simple htpasswd files to token-based authentication using external authorization services.
    6. **Networking and TLS**: The HTTP section of the config file determines the listening address and port (default is 5000) and specifies the paths to TLS certificates for secure HTTPS communication.

### you require a container to istart only after anotrher one is healthy, how to do in docker
- To make one container wait for another to be healthy, you must combine the `healthcheck` and `depends_on` attributes in your `docker-compose.yml` file. 
1. Configure the "Dependency" Container 
    - You first define what makes the first container "healthy." The Compose Specification uses a healthcheck block to run a recurring test (like a curl command or a database ping). 
        * Example: A database container that is only "healthy" when it can accept connections. 
        ``` yaml
        services:
            db:
                image: postgres:latest
                healthcheck:
                test: ["CMD-SHELL", "pg_isready -U postgres"]
                interval: 10s
                timeout: 5s
                retries: 5
        ```
2. Configure the "Dependent" Container 
    - In the second service, use the long syntax of depends_on to specify that it should only start when the first service meets the service_healthy condition. 
        * Example: An API that waits for the database to be fully ready. 
        ``` yaml
          api:
            image: my-api-app
            depends_on:
            db:
                condition: service_healthy
        ```
3. Alternative: Using wait-for-it.sh 
    - If you cannot use Docker Compose or need to wait for a service outside your immediate compose file, use a script like wait-for-it or dockerize. These scripts are added to your container's entrypoint to block the main process until a specific TCP port is open. 
        * Usage Example:
        ``` bash
        # Inside your Dockerfile or entrypoint script
        ./wait-for-it.sh db:5432 -- npm start
        ```

### why might a container fail to asccess the default gateway on the macvlan network
- A container on a macvlan network often fails to access the default gateway because macvlan intentionally isolates the container from the host, blocking traffic between the container and the host’s interface (e.g., eth0). 
- Other causes include missing promiscuous mode on physical switches, IP address conflicts, or improper subnet configuration.
    1. **Host Isolation (By Design)**: By default, traffic from a container cannot reach its own Docker host's eth0 or any other IP address assigned to the host, as this is restricted by kernel module design for security.
    2. **Missing Host Macvlan Interface**: To communicate with the host, you must create a second macvlan interface on the host itself to act as a bridge for that traffic.
    3. **Promiscuous Mode Needed**: The physical NIC or upstream switch must have "promiscuous mode" enabled to handle multiple MAC addresses for a single interface.
    4. **Gateway IP Conflict**: The chosen --gateway IP might be in conflict with an existing IP address on the network or wrongly reserved within the Docker network creation.
    5. **Missing Routing/NAT**: If the container needs to access the internet, iptables rules must be configured to forward traffic, or it requires a proper route to the gateway on the network interface.

### what IPAM config parameter is mandatory to create an IPv6 enabled custom network Docker
- To create an IPv6-enabled custom network in Docker, the mandatory IPAM (IP Address Management) configuration parameter is the Subnet. 
- When you create a custom network (such as a bridge) with the --ipv6 flag enabled
- Docker requires you to explicitly define an IPv6 address range from which it can allocate addresses to containers. 
- Mandatory Configuration Details
    * **Subnet**: This parameter defines the CIDR range for the network. While Docker can automatically choose a Unique Local Address (ULA) if one is not provided, best practices and most custom configurations require an explicit Subnet definition in the IPAM config to ensure routability and prevent address conflicts.
    * **Flag Requirement**: To trigger IPv6 functionality, the --ipv6 flag (or enable_ipv6: true in Compose) must be present in the network creation command. 
- Example Implementations
    1. Using the Docker CLI
        - You can create the network by passing the subnet directly. If you omit the subnet, Docker may fail to assign global or specific local addresses unless a default pool is configured in the daemon. 
        ``` bash
        docker network create --ipv6 --subnet="2001:db8:1::/64" my_ipv6_network
        ```
    2. Using Docker Compose
        - In a docker-compose.yml file, the subnet must be nested under the ipam -> config section.
        ``` yaml
        networks:
            app_net:
                enable_ipv6: true
                ipam:
                config:
                    - subnet: "2001:db8:1::/64"
        ```

### what happens if two containers on a user defined bridge network expose the same internal port
- If two containers on a user-defined bridge network expose the same internal port, absolutely nothing happens to the internal network, as they operate in isolated network namespaces. 
- Containers on the same bridge network communicate via unique IP addresses or DNS names, allowing multiple containers to listen on the same internal port (e.g., 80) without conflict.
- What You Need to Know:
    * **Internal Communication**: Container A can reach container1:80 and Container B can reach container2:80 simultaneously without any collision, because internal traffic uses unique container IPs, not the host IP.
    * **External Port Mapping**: The conflict only occurs if you try to publish both containers to the same host port (e.g., -p 8080:80 for both). Docker will throw an error because the host port cannot be shared.
    * **Best Practice**: In user-defined bridge networks, you do not need to use the --expose flag to communicate between containers. Simply place them on the same network and use the container names for inter-container communication.

### docker option that ensures logs are automatically rotated to prevent disk space exhaustion
- To prevent disk exhaustion, use the json-file logging driver with max-size and max-file options. Setting `--log-opt max-size=10m --log-opt max-file=3` limits logs to 30MB total per container. 
- Alternatively, configure this globally in `/etc/docker/daemon.json` or use the local logging driver for automatic rotation.
- Recommended Log Rotation Options 
    * These options are added to the docker run command or docker-compose.yml: 
    * `--log-driver json-file`: Uses the JSON file logging driver (default).
    * `--log-opt max-size=[SIZE]`: Sets the maximum size of a log file before it is rotated (e.g., 10m, 100m, 1g).
    * `--log-opt max-file=[NUMBER]`: Sets the maximum number of rotated log files to keep (e.g., 3).
    * `--log-opt compress=true`: Compresses rotated logs to save further space.
- Example: Docker Run Command
``` bash
docker run -d --log-driver json-file --log-opt max-size=10m --log-opt max-file=3 nginx
```
- Example: Docker Compose
``` yaml
version: '3.8'
services:
  web:
    image: nginx
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
        compress: "true"
```
- Global Configuration (All Containers) 
    * To apply this to all future containers, edit or create /etc/docker/daemon.json and restart Docker: 
    ``` json 
    {
    "log-driver": "json-file",
    "log-opts": {
        "max-size": "10m",
        "max-file": "3",
        "compress": "true"
        }
    }
    ```

### docker command to have container have persistent volume but only read-only access
- To mount a persistent volume with read-only access in Docker, you can use either the shorthand `-v` flag or the more explicit `--mount` flag. 
- Both methods ensure that the container can read the data but cannot modify or delete it. 
``` bash
# Shorthand Method (-v):
# Add :ro (read-only) at the end of your volume mapping string.
docker run -v my_volume_name:/path/in/container:ro my_image

# Explicit Method (--mount):
#Use the readonly flag within the mount options. This is the recommended method for clarity according to Docker Documentation.
docker run --mount type=volume,source=my_volume_name,target=/path/in/container,readonly my_image
```

- Using Docker Compose
    * In a docker-compose.yml file, you can specify read-only access using either short or long syntax:
    ``` yaml
    # Short Syntax
    services:
        web:
            image: nginx
            volumes:
            - my_volume_name:/usr/share/nginx/html:ro

    # Long Syntax (Recommended for clarity):
    services:
        web:
            image: nginx
            volumes:
            - type: volume
                source: my_volume_name
                target: /usr/share/nginx/html
                read_only: true
    ```

- Verification
``` bash
docker inspect <container_id> --format '{{ .Mounts }}'
```

### why should multi stage builds be used when creating prodfuction Docker images
- Multi-stage builds are a standard best practice for creating production Docker images because they allow you to separate the build environment from the final execution environment. 
- This "build heavy, ship light" philosophy ensures your production containers are minimal, efficient, and secure. 
1. Significant Reduction in Image Size 
    - Traditional builds often result in bloated images because they include everything used during the build process. Multi-stage builds solve this by allowing you to selectively copy only essential artifacts into a final lightweight image.
        * Eliminate Build Tools: You can use a full SDK or compiler (like golang or maven) in the first stage and copy only the final binary or JAR to a tiny runtime image like Alpine Linux or Distroless.
        * Quantifiable Impact: Implementation can often reduce image sizes by 70% to 90%, such as shrinking a Node.js image from 500MB to under 30MB.
2. Enhanced Security
    - Reducing what is included in the production image directly improves your security posture.
        * Reduced Attack Surface: By removing package managers (like apt or npm), shells, and compilers, you provide fewer tools for an attacker to use if they gain access to the container.
        * Fewer Vulnerabilities: Smaller images contain fewer packages, which naturally reduces the number of CVEs that security scanners will flag.
        * Protection of Secrets: You can use an intermediate stage to handle sensitive credentials or build-time secrets without them leaking into the final image layers. 
3. Faster CI/CD and Deployment
    - Smaller images lead to operational efficiencies across your entire pipeline. 
        * Faster Pull/Push Times: Smaller images move across the network much faster, which reduces deployment downtime and speeds up horizontal scaling in clusters like Kubernetes.
        * Lower Storage Costs: Registry storage and bandwidth costs are significantly reduced when images are 10x smaller.
Parallelization: Modern build engines like BuildKit can run independent build stages concurrently, shortening the overall build time. 
4. Simplified Maintenance
    - Instead of maintaining separate Dockerfile.dev and Dockerfile.prod files, multi-stage builds allow you to manage the entire lifecycle in one place. 
        * Single Truth: You use one standardized Dockerfile for all environments, ensuring that the same build process is used for development, testing, and production.
        * Readable Pipeline: By naming stages (e.g., FROM node AS builder), you clearly define the purpose of each section, making the build logic easier for other developers to understand. 

### how to monitor only specific resource metrics (CPU and memory) of a running container without other stats. DOcker command
- To monitor only specific resource metrics for a single running container, you can use the docker stats command with the `--format` flag. 
- This flag allows you to filter the output to show only the columns you need.
``` bash
docker stats <container_name_or_id> --format "table {{.Name}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.MemPerc}}"
```
   * `docker stats <container_name_or_id>`: Targets a specific container instead of showing all running ones. Documentation for this can be found in the Docker CLI reference.
   * `--format`: Uses a Go template to define exactly which data to display.
   * `table`: This keyword (placed at the start of the format string) ensures that column headers like "NAME" and "CPU %" are included in the output for readability.
   * `{{.Name}}`: Displays the container name.
   * `{{.CPUPerc}}`: Displays the current CPU usage as a percentage.
   * `{{.MemUsage}}`: Displays the current memory usage and total limit (e.g., 15MiB / 1GiB).
   * `{{.MemPerc}}`: Displays the memory usage as a percentage of the limit.
   * `\t`: Inserts a tab space between the columns to keep them aligned. 

### Which driver allows docker volumes to persist data across different hosts in a swarm cluster
- To allow Docker volumes to persist and share data across different hosts in a Swarm cluster, you must use a multi-host volume driver or a third-party volume plugin. 
- The default local driver only stores data on the single host where the container is currently running. 
1.  Built-in NFS Driver (via local) 
    - The most common "out-of-the-box" solution is to use the standard local driver configured with NFS (Network File System) options. This allows the volume to mount a remote share that all nodes in your Swarm can access. 
        * How it works: Each node mounts the same remote NFS share into the container.
        * Example Usage:
        ``` bash
        docker volume create --driver local --opt type=nfs --opt o=addr=192.168.1.100,rw,nfsvers=4 --opt device=:/path/to/share my_shared_volume
        ```
2. Third-Party Volume Plugins
    - Several third-party plugins are specifically designed for multi-host persistence and "data portability" in Swarm: 
        * **vieux/sshfs**: Allows you to mount a remote directory via SSH. It is simple to set up for smaller environments where NFS is not available.
        * **REX-Ray**: A popular open-source storage orchestration engine that supports various backends like AWS EBS, Google Persistent Disk, and Azure Managed Disks.
        * **Portworx**: A high-performance, container-native storage solution that provides synchronous replication across nodes for high availability.
        * **GlusterFS / Ceph**: These distributed file systems can be integrated into Docker using specific plugins to provide a global namespace across all cluster nodes. 
3. Cloud-Specific Drivers
    - If you are running Swarm in a cloud environment, you can use drivers provided by the platform: 
        * **AWS EFS**: Can be used with the NFS configuration mentioned above to provide highly available shared storage.
        * **Azure File Storage**: Offers a dedicated plugin to mount SMB-based Azure shares as Docker volumes. 

### why might a container fail to resolve service names in a multi-nectwork swarm deployment
- In a multi-network Docker Swarm deployment, a container typically fails to resolve service names because of network isolation or misconfigured communication between nodes.
- Docker’s embedded DNS only resolves service names if the source and target services share at least one common user-defined Overlay Network. 
- Common reasons for resolution failure include:
    * **Lack of a Common Network**: Services can only resolve and communicate with each other if they are attached to the same overlay network. If Service A is on network_1 and Service B is on network_2, they will remain invisible to each other unless one is attached to both networks.
    * **Firewall Restrictions (Ports 7946 and 4789)**: Swarm uses a gossip protocol for control plane traffic (TCP/UDP 7946) and VXLAN for data plane traffic (UDP 4789). If these required Swarm ports are blocked by a firewall between nodes, the internal DNS records will not propagate correctly.
    * **Unhealthy Service Tasks**: Swarm may remove a service name from the internal DNS if all its tasks are failing health checks. When a service has zero healthy tasks, the DNS resolver might fall back to external name resolution, causing the internal name to "disappear."
    * **Ingress Network Limitations**: The default ingress network is designed for routing external traffic into the cluster. Service discovery (East-West traffic) is generally disabled on the ingress network. You must create a custom overlay network for internal service-to-service communication.
    * **Stale DNS Cache**: After a service update or redeploy, containers may occasionally hold stale VIP (Virtual IP) or task IP addresses. This is often seen when services are rapidly scaled up or down, or when a node is temporarily disconnected from the Swarm.
    * **Overlapping Subnets**: If multiple overlay networks or the host network have overlapping IP ranges, routing conflicts can prevent the embedded DNS (located at 127.0.0.11) from reaching the correct target.
    * **Endpoint Mode (VIP vs. DNSRR)**: By default, Swarm uses Virtual IPs (VIP). In some complex multi-network scenarios, switching to dnsrr (DNS Round Robin) via the endpoint_mode setting can resolve persistent resolution issues by bypassing the load-balancing VIP. 

### what storage driver is the default on most linux distribultions
- The default storage driver for Docker on most modern Linux distributions is overlay2. 
- It is favored for its high performance, low overhead, and broad compatibility with modern Linux kernels (version 4.0+)
- Key details regarding storage drivers:
    * **Overlay2**: Preferred, default driver for modern Docker setups.
    * **Devicemapper**: Historically used by default on older RHEL/CentOS systems, often using direct-lvm.
    * **Aufs**: A legacy driver, often used in older Ubuntu versions but considered deprecated for modern use.
    * **Btrfs/ZFS**: Used if the underlying host filesystem uses these file systems, enabling snapshots.
    * **Containerd snapshotters**: The default for Docker Engine 29.0 and later, replacing the classic storage drivers. 

### what is the solution to overcome problems in full software-based virtualization
- Overcoming problems in full software-based virtualization—primarily high CPU overhead, latency, and I/O bottlenecks—is achieved by shifting from pure software emulation to hardware-assisted virtualization (using CPU extensions) and paravirtualization (using optimized drivers). 
1. High Performance Overhead (CPU & Memory) 
    - Full software virtualization uses "binary translation" to intercept privileged instructions, which is slow. 
        * Hardware-Assisted Virtualization (Intel VT-x / AMD-V): Use modern CPUs with built-in virtualization extensions. This allows the guest OS to run privileged instructions directly on the processor without binary translation, reducing overhead to near-native speeds.
        * Enable Nested Paging (EPT/NPT): Utilize Extended Page Tables (Intel) or Nested Page Tables (AMD) to handle memory mapping directly in hardware, reducing the performance penalty of memory virtualization.
        * Allocate Proper Resources: Avoid CPU overcommitment (too many vCPUs per physical core) and ensure adequate physical RAM to prevent swapping. 
2. Slow I/O and Network Performance
    - Software emulation of network cards and disk controllers is inefficient. 
        * Use VirtIO Drivers (Paravirtualization): Install VirtIO drivers (or VMware Tools) within the guest OS. These "paravirtualized" drivers allow the guest to know it is virtualized and communicate directly with the hypervisor, bypassing expensive hardware emulation.
        * SR-IOV (Single Root I/O Virtualization): Allows a single physical PCIe device (like a NIC) to appear as multiple separate physical devices to the VMs, enabling near-native I/O performance.
        * Use SSDs/Storage Tiering: Move VM storage to high-speed SSDs and use caching solutions to alleviate I/O bottlenecks, especially the "I/O blender effect" where multiple VMs hit the storage simultaneously. 
3. Resource Contention ("Noisy Neighbors")
    - One VM can hog resources, affecting others. 
        * Resource Scheduling & Policies: Use Hypervisor features (e.g., VMware DRS) to balance VMs across multiple physical servers.
        * CPU Pinning & Reservation: Pin critical VMs to specific physical cores and guarantee minimum RAM/CPU amounts for important VMs to prevent performance bleed-over. 
4. Management Complexity and Security
    - Virtualization Management Tools: Use tools like vCenter or SCVMM to automate provisioning and manage VM sprawl.
        * Hardening Hypervisors: Disable unnecessary services in the host OS, apply regular patches, and segment network traffic using VLANs to improve security.
        * Snapshot Cleanup: Regularly delete old snapshots, as they can severely degrade disk performance and consume storage.

### Docker command that attaches a runningh container to a network without restarting it
- To attach a running container to a network without restarting it, use the docker network connect command. This allows you to dynamically add network interfaces to a container while it is active. 
``` bash
docker network connect <network-name> <container-name-or-id>
```

### Docker which namespoace isolates process IDs inside containers
- Docker uses the PID namespace to isolate process IDs inside containers.
- This specific namespace ensures that processes within a container have their own independent set of process IDs, separate from the host and other containers. 
- Key Features of the PID Namespace in Docker
    1. **Process ID 1 (init)**: When a new PID namespace is created, the first process started in that namespace is assigned PID 1. This process acts as the "init" system for the container, managing all other child processes. Even though the host may see this same process as a high-numbered PID (e.g., PID 4521), it appears as PID 1 to the container, as explained in this guide on PID isolation.
    2. **Restricted Visibility**: Processes inside a container can only see and interact with other processes within the same PID namespace. They cannot "peek" into the host's process list or see processes running in other containers, which prevents sensitive data leaks and unauthorized process signals (like kill).
    3. **Clean Termination**: If the process with PID 1 inside the container is terminated, the Linux kernel automatically kills all other processes within that same PID namespace to ensure no "zombie" processes remain, according to technical documentation on container internals. 
- Sharing or Overriding PID Isolation 
    * While isolation is the default, Docker provides options to modify this behavior for specific use cases (like debugging): 
        1. *Host Mode*: Using the flag --pid=host allows a container to share the host's PID namespace. This is useful for tools like top or strace that need to monitor the entire system, as detailed in the Docker Engine security docs.
        2. *Inter-Container Sharing*: You can share a PID namespace between two specific containers using --pid=container:<id>, which is a common pattern for "sidecar" containers that need to manage another application's processes. 
- Related Namespaces
    * The PID namespace is just one of several that Docker uses to provide full isolation. Others include: 
        1. **NET Namespace**: Isolates the network stack (IP addresses, routing).
        2. **MNT Namespace**: Isolates filesystem mount points.
        3. **User Namespace**: Maps container users (like root) to non-privileged users on the host for enhanced security. 

### When using docker build, which flag allows passing custom metadata labels to the image
- When using the docker build command, you can pass custom metadata labels to an image using the `--label` flag. 
- Key Features of Using the `--label` Flag
    * **Command Syntax**: The flag is used in the format docker build --label "<key>=<value>" .. You can specify the flag multiple times to add multiple labels to a single image.
    * **Overriding Dockerfile**: If a label with the same key is already defined in the LABEL instruction within the Dockerfile, the value provided via the --label CLI flag will override it.
    * **Quotations**: If a value contains spaces, it must be enclosed in quotes (e.g., --label "description=My project description").
    * **Viewing Metadata**: To verify the labels after a build, you can use the docker image inspect command and look for the "Labels" field in the JSON output. 
- Related Metadata Flags
    * While --label is the primary flag for standard metadata, newer Docker versions and Buildx offer additional ways to handle metadata: 
        1. `--annotation`: Available in docker buildx build, this adds OCI annotations to the image manifest or index, which is useful for integration with advanced registry tools like Docker Scout.
        2. `--metadata-file`: This flag writes the build result metadata (like image digests) into a JSON file on your local machine rather than embedding it inside the image. 

### what happens if a docker container is started with --cpus="1.5"
- When you start a Docker container with the --cpus="1.5" flag, you are setting a hard limit on the total CPU resources the container can consume. 
- This does not tie the container to a specific physical core; instead, it limits the container to 150% of a single CPU's worth of processing power across the entire host system.
- According to Docker's official documentation, here is exactly what happens:
    * **CFS Scheduler Quota**: Docker uses the Completely Fair Scheduler (CFS) to enforce this. Setting --cpus="1.5" is the modern, user-friendly equivalent of setting --cpu-period="100000" (100ms) and --cpu-quota="150000" (150ms) This means for every 100 milliseconds of real time, the container is allowed to use a total of 150 milliseconds of CPU time across all available cores.
    * Flexible Distribution: The container can use these 1.5 units in various ways. For example, it could use:
        1. 100% of one core and 50% of another.
        2. 25% of six different cores simultaneously.
        3. Any other combination that totals 1.5 CPUs worth of execution time.
    * **CPU Throttling**: If the container's processes attempt to exceed this 150ms quota within the 100ms period, the Linux kernel will throttle the container, essentially pausing its processes until the next time period begins. You can monitor this by checking docker stats or inspecting the container's NanoCpus value which should show 1500000000.
    * **Host Hardware Awareness**: The container will still "see" all of the host's CPU cores (e.g., in /proc/cpuinfo), but the kernel will limit how much time it can actually spend executing on them. This is a common point of confusion for applications that try to auto-tune their thread pools based on visible core counts; they may create too many threads and face heavy throttling.
    * **Multi-threading Efficiency**: If your application is single-threaded, it will never reach the 1.5 limit and will effectively be capped at 1.0 (100% of one core). Your application must be multi-threaded to utilize more than 1.0 CPU units.  

### docker command that can remove all stopped containers at once
``` bash
docker container prune

docker container prune -f

docker system prune
```

### docker command that allows a docker container to restart automatically on failure
- To configure a Docker container to restart automatically on failure, you use the `--restart` flag with the `on-failure` policy. 
- This policy ensures the container restarts only if it exits with a non-zero exit code (indicating a crash or error), rather than a successful exit or a manual stop. 
``` bash
# Restart on any failure:
docker run -d --restart on-failure <image_name>

# Restart on failure with a retry limit (e.g., 5 times):
docker run -d --restart on-failure:5 <image_name> 
```

### what is true regarding multi host Docker volumes using plugins like rexray or convoy
- Multi-host Docker volume plugins like REX-Ray and Convoy are designed to abstract storage backends (like AWS EBS, GCE Persistent Disks, or NFS) and make them accessible to containers across multiple Docker hosts. 
- They enable persistent data to follow a container if it moves between nodes.
- Key Truths About REX-Ray and Convoy
    * **Decoupled Lifecycle**: Volumes managed by these plugins are independent of the container's lifecycle. Data persists even if the container is removed, and in some scenarios, if the host fails.
    * **Multi-Host Capability**: These plugins allow a container running on any node in a Swarm to consume the same volume.
    * **Abstraction Layer**: They act as an intermediary, abstracting the vendor-specific APIs of cloud storage providers into the standard Docker volume command syntax (docker volume create).
    * **Backend Support**: REX-Ray supports various backends like AWS EBS, Azure Managed Disks, and GCE Persistent Disks. Convoy supports backends like NFS and device mapper.
    * **Stateless Services**: REX-Ray runs as a stateless service on every host to orchestrate the attach/detach operations of the volume.
- Limitations and Critical Considerations
    * **One-Host Mounting Limit**: A critical limitation of block-storage-based volumes (like EBS or GCE PD) used with REX-Ray is that they can only be mounted to one container host at a time.
    * **Detaching Latency**: If a task moves to a new node, the volume must be detached from the old host before attaching to the new one, which can take 30 seconds to 1 minute.
    * **Shared Storage Exception**: To achieve simultaneous read/write (R/W) access across multiple hosts, you must use a shared filesystem plugin (like REX-Ray with EFS).
    * **Plugin Installation**: The plugin must be installed on all Swarm nodes.
    * **State Management**: If using Docker Swarm, the volume driver's "Scope" should be configured to ensure that nodes understand a volume is global, not local.
- REX-Ray Specifics
    * **Project Maintenance**: REX-Ray was heavily used for EBS/GCE integration but saw a halt in project maintenance by Dell EMC, eventually being taken over by VMware.
    * **EBS/GCE Reliability**: The EBS (rexray/ebs) and GCE (rexray/gcepd) plugins are generally considered reliable, though user experience varies with others.
    * **Automatic Provisioning**: REX-Ray can create the underlying storage (e.g., the EBS volume) on demand if it does not exist when the container starts.
- Convoy Specifics
    * **Capabilities**: Similar to REX-Ray, Convoy supports snapshots, backups, and restores of volumes.
    * **Storage Type**: It supports both block device mapping and file-system-level sharing (NFS).

### what combination of runtime settings enhances container immutability and prevents persistent tampering in docker
- Enhancing container immutability and preventing persistent tampering in Docker requires a "defense-in-depth" approach, combining a read-only filesystem, non-root users, restricted kernel capabilities, and hardened security profiles.
1. Read-Only Root Filesystem (--read-only) 
    - This is the primary setting for immutability. It makes the container's root filesystem read-only, preventing attackers from creating, modifying, or deleting files, such as installing malware or updating binaries. 
    - Command: 
    ``` bash
    docker run --read-only <image>
    ``` 
2. Non-Root User (--user)
    - Running containers as a non-root user prevents an attacker from gaining root privileges inside the container, even if they exploit a vulnerability. This limits the ability to modify system files. 
    - Command:
    ``` bash
    docker run --user <non-root-uid> <image>
    ```
Dockerfile best practice: USER appuser 
3. Dropping Kernel Capabilities (--cap-drop) 
    - By default, Docker grants several Linux kernel capabilities to containers. Dropping all capabilities and only adding back those absolutely required (if any) reduces the attack surface, preventing actions like mount or raw sockets. 
    - Command:
    ``` bash
    docker run --cap-drop=ALL <image>
    ``` 
4. Preventing Privilege Escalation (--security-opt=no-new-privileges) 
    - This flag ensures that processes inside the container cannot gain new privileges (e.g., via setuid binaries), making it harder for attackers to elevate privileges even if they manage to compromise a non-root user. 
    - Command:
    ``` bash
    docker run --security-opt=no-new-privileges=true <image>
    ``` 
5. Seccomp or AppArmor Profiles (--security-opt) 
    - Applying customized, strict Linux Security Modules (seccomp, AppArmor, or SELinux) blocks dangerous system calls that are not needed by the containerized application. 
    - Command: 
    ``` bash
    docker run --security-opt seccomp=/path/to/profile.json <image> 
    ```
6. Writable Volumes Only Where Necessary (-v or --tmpfs) 
    - If the application needs to write logs or temporary data, mount those specific directories as temporary volumes (tmpfs) rather than writable directories in the root filesystem.

### command thast shows the number of times a swarm service task has been restarted
``` bash
docker service ps <service-name>
```
- How to Interpret the Output
    * **ID/NAME**: Identifies the task.
    * **CURRENT STATE**: Shows if the task is "Running" or "Shutdown" (failed).
    * **ERROR**: Displays the reason for a shutdown, such as "non-zero exit code" or container crashes.
    * **Repeated Entries**: If a task is restarting, you will see multiple lines for the same task slot (e.g., service.1) with different CURRENT STATE times and IDs
- Detailed Troubleshooting Commands
    * To find the exact restart count or investigate why a task is restarting, use these commands:
    ``` bash
    # View detailed status of a specific task
    docker inspect <task-id> --format '{{.Status.RestartCount}}'

    # Monitor restart events in real-time
    docker events --filter 'event=restart'

    # Check tasks that have recently failed or been shutdown
    docker service ps <service-name> -f "desired-state=shutdown"
    ```