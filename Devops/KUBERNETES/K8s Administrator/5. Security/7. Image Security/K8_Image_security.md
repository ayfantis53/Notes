## IMAGE SECURITY
-------------------------------------------------------------

- Image name in pod defintion.
    ```yaml
    apiVersion: v1
    kind: Pod
    metadata:
        name: nginx-pod
    spec:
        containers:
            - name: nginx
              image: nginx 
    ```
- `image: nginx` is image or repo name
    * its acutally `image: docker/.iolibrary/nginx`
        - library is the user/account name
        - library is the name of default account where dockers official images are stored.
        - docker.io is the registry (default)
            * where all images are stored.
            * popular registries: grc.io (google)
            * host internal registries for private registries.
    * if you create your account and repositories

### Private Registry
- Commands
    ```bash
    # First login to your private registry.
    docker login $PRIVATE_REGISTRY.io

    # Run your image from the private registry.
    docker run $PRIVATE_REGISTRY_IMAGE_PATH
    ```
- Implemement authentication so kubernetes can get the credentials to access private registry.
    1. First create a secret object with credentials in it. Secret is of type docker registry.
        ```bash
        # Create secret
        kubectl create secret docker-registry $SECRET_NAME \
            --docker-server=private-registry.io \
            --docker-username=registry-user \
            --docker-password=registry-password \
            --docker-email=registry-user@org.com
        ```
    2. Add secret into in pod definition
        ```yaml
        apiVersion: v1
        kind: Pod
        metadata:
            name: nginx-pod
        spec:
            containers:
                - name: nginx
                  image: private-registry.io/apps/internal-app
            imagePullSecrets: {{ $SECRET_NAME }}
        ```

### Adhoc kubernetes commands
```bash
# Set a new image name for an image.
kubectl set image deployment $DEPLOYMENT_NAME nginx=$NEW_IMAGE_NAME
```