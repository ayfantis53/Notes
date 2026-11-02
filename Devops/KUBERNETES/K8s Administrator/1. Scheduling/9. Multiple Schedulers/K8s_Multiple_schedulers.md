## MULTIPLE SCHEDULERS
-------------------------------------------------------------

- You can write your own scheduler.
- Cluster can have multiple schedulers.
    * Each scheduler uses a sperate configuration file.
- Dont deploy as binary today, deploy as pod.


### Deploying an additional Scheduler
```bash
# Download kube scheduler binary and run it as a service with a set of options
wget https://storage.googleapis.com/kubernetes-release/release/v1.XX.0/bin/linux/amd64/kube-scheduler

# See if scheduler is running
kubectl get pods --namespace=kube-system
```

- If you assign a scheduler to a pod and the scheduler is not configured correctly, it will make the pod get stuck in the pending state.


### Check scheduler
- See which scheduler picked up which pod
    ```bash
    # look under "REASON" and "Scheduled" and check "SOURCE" is your scheduler
    kubectl get events -o wide
    ```