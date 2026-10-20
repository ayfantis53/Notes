## NODE SELECTORS
-------------------------------------------------------------
- Good when you have different nodes with different amount of resources
- Labeling a node
    ```bash
    kubectl label nodes $NODE_NAME $LABEL_KEY=$LABEL_VALUE

    # Example
    kubectl label nodes node01 size=Large
    ```
- Labels on a node
    ```bash
    # Find out what labels a node has
    kubectl describe node $NODE_NAME 

    # Add a label to a node
    kubectl label node $NODE_NAME $LABEL_KEY=$LABEL_VALUE
    ```
- For more complex conditions we use Node Affinity and Anti Affinity features


## NODE AFFINITY FEATURES
-------------------------------------------------------------
- To prevent our pods from being placed on their nodes.
- Helps provide advanced capabilities like AND or NOR to labels
- There are 2 states of a lifecycle of a pod when it comes to node affinity
    1. DuringScheduling
        - Is the state where a pod doesnt exist & is created for the first time
        - If you select `required` like in requiredDuringSchedulingIgnoredDuringExecution
            * if node with right affinity rules is not found pod will not be scheduled
        - If you select `preferred` like in preferredDuringSchedulingIgnoredDuringExecution
            * pod placement is not as important as it running
            * scheduler will ignore affinity rules if no matching rules found
    2. DuringExecution
        - Things are ignored because pod is already scheduled.