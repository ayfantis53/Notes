## Autoscaling
-------------------------------------------------------------

### Horizontal Pod Autoscale

```bash
kubectl top pod $POD_NAME

kubectl scale deployment $DEPLOYMENT_NAME --replicas=3
```
- The kubectl scale command can be used to scale both deployments and statefulsets. 
    * When scaling a statefulset, Kubernetes ensures that the state and order of the pods are maintained
    * unlike in deployments where pods can be created and destroyed in any order.
- When you scale a deployment to a higher number of replicas than the cluster can support due to resource constraints, 
    * Kubernetes will create as many replicas as possible within the available resources. 
    * The remaining replicas will be in a pending state until sufficient resources are freed up or added to the cluster. 
    * This behavior allows Kubernetes to manage resources dynamically while maintaining the desired state as closely as possible.

- Horizontal pod autoscaler
    * Observe metrics
    * Adds pods
    * Balances thresholds
    * tracks multiple metrics
        ```bash
        kubectl autoscale deployment $APP_NAME \
            --cpu-percent=50 --min=1 --max=10

        kubectl get hpa

        kubectl delete hpa
        ```
    * Comes builtin to Kubernetes


### In-Place Pod Resizing
- Change a resource definition, it will kill pod and create a new pod.
    * can be disruptive
- Enable in-place pd resizing
    * set `FEATURE_GATES=InPlacePodVerticalScaling=true`
- Limitations
    * Only works for memory and CPU resources.
    * pod QoS Class cannot change.
    * Init containers and Ephemeral Containers cannot be resized.
    * Resource requests and limits cannot be removed once set.
    * A containers memory limit cant be set below with its current usage; if a container is put in this
        state, the resize remains "InProgesss" until the desired memory limit is feasible.
    * Windows pods cannot be resized as of now


### Vertical Pod Autoscaling
```bash
kubectl top pod $POD_NAME

kubectl edit deployment $DEPLOYMENT_NAME
```

- Vertical pod autoscaler
    * Observe metrics
    * Adds pods resources
    * Balances thresholds
- Do not come builtin, you have to apply it
    ```bash
    kubectl apply -f https://github.com/kubernetes/autoscaler/releases/latest/download/vertical-pod-autoscaler.yaml

    kubectl get pods -n kube-system | grep vpa

    kubectl describe vpa $VPA_NAME
    ```
- VPA Deployment comes with multiple components
    * VPA Admission Controller
        - mutates pod spec.
    * VPA Updater
        - detects pods that are running with suboptimal resources and evicts them.
        - gets info from recommender and if pod needs to be updated it evicts it and recreates it.
    * VPA Recomender
        - responsible for continuous monitoring of resource usage.
        * provides reccomendations on optimal CPU and memory values.
- 4 modes of updatemode in vertical autoscaler
    | Mode | Description|
    | --- | ------- |
    | Off | Only recommends; does not change anything |
    | Initial | Only changes on Pod creation; not later |
    | Recreate | Evicts pods if usage goes beyond range |
    | Recreate | Updates existing pods to recomended numbers-For now it behaves like recreate. But when support for "In-Place Update of pod resources is available, this mode is preferred |


### Difference in HPA and VPA

| Feature | VPA (Vertical Scaling) | HPA (Horizontal Scaling) |
| :---: | :---: | :---: |
| Scaling Method | Increases CPU and memory of existing pods | Adds/Removes Pods based on load |
| Pod behavior | Restarts pods to apply new resource values | Keeps existing pods running |
| Handles Traffic Spike | No, because it requires a pod restart | Yes, instantly adds more Pods |
| Optimizes Costs? | Prevents over-provisioning of CPU/memory | Avoids unecessary idle Pods |
| Best for | Stateful workloads, CPU/memory-heavy-apps (DBs, ML workloads) | Web apps, microservices, stateless services |
| Example use case | DBs(MySQL, Postgres), JVM based apps, AI/ML workloads | Web Servers(Nginx, API services) |