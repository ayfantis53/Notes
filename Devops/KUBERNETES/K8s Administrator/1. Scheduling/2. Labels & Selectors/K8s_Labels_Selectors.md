## LABELS & SELECTORS
-------------------------------------------------------------
```bash
# Select pod using labels
kubectl get pods --selector app=App1

kubectl get pods --selector app=App1,Function=Front-end
```