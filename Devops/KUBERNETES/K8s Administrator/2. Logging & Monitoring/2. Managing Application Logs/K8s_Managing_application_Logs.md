## Managing Application Logs
-------------------------------------------------------------

### Logs Docker

```bash
# Run a container
docker run $CONTAINER_NAME

# wont see logs
docker run -d $CONTAINER_NAME

# See live log trail
docker logs -f $CONTAINER_NAME
```

### Logs Kubernetes

```bash
# create manifest
kubectl create -f $MANIFAST_FILE

# view logs
kubectl logs -f $POD_NAME

# Kubernetes pods can have multiple containers in them
kubectl logs -f $POD_NAME $CONTAINER_NAME
```
