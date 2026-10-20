## KUBERNETES TROUBLESHOOTING COMMANDS
-------------------------------------------------------------

### GET Command

```bash
# get all resources across all namespaces.
kubectl get all -A

# get yaml output of a resource.
kubectl get $RESOURCE $REOURCE_ID -o yaml

# get yaml output of a resource narrow your search.
kubectl get $RESOURCE $REOURCE_ID -o yaml | grep $WHAT_TO_SEARCH

# get json output of a resource narrow your search.
kubectl get $RESOURCE $REOURCE_ID -o=jsonpath='{$OBJ.$WHAT_TO_SEARCH}' | jq

# Crazy command
kubectl get $RESOURCE --all-namespaces -o wide --field-selector spec.nodeName=node01
```

### DESCRIBE Command

```bash
# describe a resources.
kubectl describe -n $NAMESPACE $RESOURCE
```

### GET EVENTS Command

```bash
# displays timeline of significant state changes, errors, & system decisions across resources.
kubectl get events -n $NAMESPACE
```

### LOGS Command

```bash
# get logs of a resource.
kubectl logs -n $NAMESPACE $RESOURCE

## MULTIPLE CONTAINERS ##
# get logs of all containers in a resource.
kubectl logs -n $NAMESPACE $RESOURCE --all-containers

# get logs of all containers in a resource.
kubectl logs -n $NAMESPACE -c $CONTAINER_NAME

## MULTIPLE PODS ##
kubectl get deploy -n $NAMESPACE $REOURCE_ID -o yaml | grep labels -A5
kubectl logs -n $NAMESPACE -l $LABEL=$LABEL_NAME

## TIMESTAMPS ##
# SHow timestamps.
kubectl logs --timestamps

# specify a time.
kubectl logs $REOURCE_ID --since=10s

## FOLLOW ##
# See logs in real time
kubectl logs -f
```

### EXEC Command

```bash
# Allows you to execute commands in a running container.
kubectl exec -n $NAMESPACE $RESOURCE_ID -- $COMMAND

# Allows you to execute commands in an interactive shell in a running container.
kubectl exec -n $NAMESPACE $RESOURCE_ID -it -- /bin/bash
```

### PORT-FORWARDING Command

```bash
# Allows to access internal cluster resources from within your local network without
# the need of having to expose these services to the internet (useful for testing phase).
kubectl get svc
kubectl port-forward svc/$SERVICE_ID 8000:80

# In another terminal.
curl localhost:8000
```

### CAN-I Command

```bash
# Allows you to answer question of if you have permission to perform action.
kubectl auth can-i $ACTION $RESOURCE -n $NAMESPACE

# find out who is current user
kubectl auth whoami

kubectl get roles

kubectl get rolebindings

# SPECIFIC USER ##
# Allows you to answer question of if user has permission to perform action.
kubectl auth can-i $ACTION $RESOURCE -n $NAMESPACE --as=$USER

# Get more information on why action is OR is not allowed
kubectl auth can-i $ACTION $RESOURCE -n $NAMESPACE --as=$USER --v=10
```

### TOP Command

```bash
kubectl top $RESOURCE

# Examples
kubectl top nodes
kubectl top pods -o wide
```

### EXPLAIN Command

```bash
# Tells you about different kubernetes resources.
kubectl explain $RESOURCE

# Get more information.
kubectl explain $RESOURCE --recursive
```

### DIFF Command

```bash
# Gets difference of resource defined on cluster vs defined in a file
kubectl diff -f $MANIFEST_FILE
```

### DEBUG Command

- minimize pod disruptions.
- distroless images (minimum images which only has what application requires) no shell.
- crashed container (container keeps kicking you out of container because it crashes).

```bash
# Attach containers to running containers.
kubectl debug $POD_ID -it --image=$IMAGE_NAME

kubectl debug $POD_ID --image=$IMAGE_NAME -it --copy-to=$DEBUG_POD --share-processes
```