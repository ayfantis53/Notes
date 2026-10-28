## PRIORITY CLASSES
-------------------------------------------------------------
- Higher number priority gets place first
- Get policies
    ```bash
    kubectl get priorityclasses

    kubectl describe priorityclass $PRIORITY_CLASS_NAME
    ```
- Can compare the priority classes on both pods using the following command
    ```bash
    kubectl get pods -o custom-columns="NAME:.metadata.name,PRIORITY:.spec.priorityClassName"
    ```
- Preemptive policies
    ```yaml
    # kills existing workload if lower priority exists on node.
    preemptionPolicy: PreemptLowerPriority

    # Makes the pods will wait to be scheduled in scheduling queue.
    preemptionPolicy: never
    ```