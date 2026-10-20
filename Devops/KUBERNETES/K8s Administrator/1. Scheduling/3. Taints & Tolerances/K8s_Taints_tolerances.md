## TAINTS & TOLERANCES
-------------------------------------------------------------
- Used to prevent other pods from other pods from being placed on our nodes.

### TAINTS
- Added to Nodes
    ```bash
    kubectl taint nodes $NODE_NAME $KEY=$VALUE:$TAINT_EFFECT
    ```
    * Differenct Taint-Effects
        1. `NoSchedule` pods will not be scheduled on node
        2. `PreferNoSchedule` system will try and avoid placing system on node but not guaranteed
        3. `NoExecute` new pods will not be scheduled on the node and existing nodes that dont tolerate node will be evicted
- Master Node has a taint that prevents all pods from being deployed on master node
    ```bash
    # To see that taint
    kubectl describe node kubemaster | grep Taint

    # Taints:       node-role.kubernetes.io/master:NoSchedule
    ```
- Commands for Taints
    ```bash
    # Check existing taints on a node
    kubectl describe node $NODE_NAME | grep -i taints

    # To untaint a node
    kubectl taint nodes controlplane node-role.kubernetes.io/control-plane:NoSchedule-

    # To see a what nodes pods are on
    kubectl get pods -o wide
    ```


### TOLERATIONS
- Are added to pods.
- Pods with certain tolerations arent guaranteed to go to pods with equivalent taints
