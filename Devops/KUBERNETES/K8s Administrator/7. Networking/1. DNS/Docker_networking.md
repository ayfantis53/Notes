## Docker Networking
-------------------------------------------------------------

- None network (No network, cannot talk to anyone or anything).
    ```bash
    docker run --network none $IMAGE_NAME
    ```
- Host network (attach to hosts network).
    ```bash
    docker run --network host $IMAGE_NAME
    ```
- Bridge network (docker internal private network (default)).
    ```bash
    docker run $IMAGE_NAME

    # show networks.
    docker network ls

    # .
    ip link ||  ip -n $ID link
    ip addr ||  ip -n $ID addr

    # docker uses command.
    ip link add docker0 type bridge

    # list the namespaces.
    ip netns

    # see namespace associated with each container.
    docker inspect $CONTAINER_ID

    # Create entry in nat table (how docker does it).
    iptables \
        -t nat \
        -A PREROUTING \
        -j DNAT \
        --dport 8080 \
        --to-destination 80
    ```

    
## Container Networking Interface
-------------------------------------------------------------