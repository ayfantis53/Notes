## Networking Basics
-------------------------------------------------------------

### 0. Switching, Routing, Gateways CNI
1. Switching
    - connects 2 hosts.
    - creates a network.
    - need an interface on each host (physical or virtual).
    ```bash
    # to see interfaces on the host.
    ip link
    > eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc
    > fq_codel state UP mode DEFAULT group default qlen 1000

    # Assign systems ip addresses.
    ip addr add 192.168.1.10/24 dev et

    # Check connection
    ping 192.168.1.11
    ```
2. Routing
    - Connects 2 networks together.
    - 2 ips assigned (1 on each network)
3. Gateway
    - connects to internet.
    ```bash
    # to see existing routing information on a system.
    route

    # Configure a gateway on system to reach other system (has to be configured on all systems).
    ip route add 192.168.2.0/24 via 192.168.1.1

    # Whether a host can forward packets between interfaces is governed by setting in file (default 0).
    cat /proc/sys/net/ipv4/ip_forward

    # Also need to edit file.
    etc/sysctl.conf
    ```
    - Also need to edit file 
        ```ini
        # etc/sysctl.conf
        net.ipv4.ip_forward = 1
        ```
4. Commands
    ```bash
    # list & modify interfaces on the host
    ip link

    # See ip addresses associated with those interfaces.
    ip addr

    # Set IP addresses on the interfaces.
    ip addr add 192.168.1.10/24 dev eth0

    # View the routing table
    route
    ip route

    # Add routes to the routing table.
    ip route add 192.168.1.10/24 via 192.168.2.1

    # Check if ip forwarding is enabled on a host.
    cat /proc/sys/net/ipv4/ip_forward
    ```
