## Environment Variables
-------------------------------------------------------------

1. Key value pair in manifest
2. Config Maps
3. Secrets

### Config Maps
- 2 ways to make config maps
    1. **Imperative way**
        ```bash
        # All in terminal
        kubectl create configmap $CONFIG_NAME --from-literal=$KEY=$VALUE

        # Using file
        kubectl create configmap config_map_ex \
            --from-file=$PATH_TO_FILE

        # Example using cmd
        kubectl create configmap config_map_ex \
            --from-literal=APP_COLOR=blue \
            --from-literal=APP_MOD=prod
        ```
    2. **Declarative way**
        ```bash
        # Name config maps appropriately
        kubectl create -f $FILE_NAME
        ```

- Commands
    ```bash
    # List all configmaps
    kubectl get configmaps

    # Get info on all configmaps
    kubectl describe configmaps
    ```

- Config Maps in pods
    1. ENV
        ```yaml
        envFrom:
            - configMapRef:
                name: app-config
        ```
    2. Single ENV
        ```yaml
        env:
            - name: APP_COLOR
              valueFrom:
                configMapKeyRef:
                    name: app-config
                    key: APP_COLOR
        ```
    3. Volume
        ```yaml
        volumes:
            - name: app-config-colume
              configMap:
                name: app-config
        ```

### Secrets
- Similar to config maps except stored in an encoded or hashed format.
- Steps to work with secrets.
    1. Create Secret.
    2. Inject it into pod.
- 2 ways to make config maps.
    1. **Imperative way**
        ```bash
        kubectl create secret generic $SECRET_NAME \
            --from-literal=$KEY=$VALUE
        ```
    2. **Declarative way**
        ```bash
        # Name config maps appropriately
        kubectl create -f $FILE_NAME
        ```
- Commands
    ```bash
    # Encoding data to secret
    echo -n $WORD_TO_ENCODE | base64

    # Decoding data to secret
    echo -n $WORD_TO_ENCODE | base64 --decode

    # View Secrets
    kubectl get secrets

    # Get attributes of secrets
    kubectl describe secrets $SECRET_NAME

    # to see values as well
    kubectl get secret app-secret -o yaml
    ```

- Secrets in pods
    1. ENV
        ```yaml
        envFrom:
            - secretRef:
                name: app-secret
        ```
    2. Single ENV
        ```yaml
        env:
            - name: APP_COLOR
              valueFrom:
                secretKeyRef:
                    name: app-secret
                    key: APP_COLOR
        ```
    3. Volume
        ```yaml
        # Each attribute is created as a file in this case.
        volumes:
            - name: app-secret-colume
              secret:
                name: app-secret
        ```

- Notes on Secrets
    * Remember that secrets encode data in base64 format. Anyone with the base64 encoded secret can easily decode it. As such the secrets can be considered not very safe.
    * Secrets are not encrypted, so it is not safer in that sense. However, some best practices around using secrets make it safer. As in best practices like:
        1. Not checking in secret object definition files to source code repositories.
        2. Enabling Encryption at Rest for Secrets so they are stored encrypted in ETCD.
    * Also, the way Kubernetes handles secrets. Such as:
        1. A secret is only sent to a node if a pod on that node requires it.
        2. Kubelet stores the secret into a tmpfs so that the secret is not written to disk storage.
        3. Once the Pod that depends on the secret is deleted, kubelet will delete its local copy of the secret data as well.