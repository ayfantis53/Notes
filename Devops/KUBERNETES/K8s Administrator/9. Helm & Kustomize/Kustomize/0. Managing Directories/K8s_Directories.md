## Kustomize
-------------------------------------------------------------

### What it does
- **Solves**: If we deploy something to multiple environments
    * development (dev)
    * staging (stg)
    * production (prod)
- Comes builtin with kubectl

### Basics
- Base Config
    - values that everyone will share.
    - will have default variables.
- Overlays
    - will have variables that change based on environment.
    - customize behavior per environment.

### File Structure
- k8s/
    * base/
        - kustomization.yaml
        - nginx-depl.yaml
        - service.yaml
        - redis-depl.yaml
    * overlays/
        - dev/
            - kustomization
            - config-map.yaml
        - stg/
            - kustomization
            - config-map.yaml
        - prod/
            - kustomization
            - config-map.yaml
- k8s(helm)/
    * environments/
        - values.dev.yaml
        - values.stg.yaml
        - values.prod.yaml
    * templates/
        - nginx-deployment.yaml
        - nginx-service.yaml
        - db-deployment.yaml
        - db-service.yaml

### Installation
- Kubernetes cluster has to be running
- Can be installed on linux, windows or mac
    ```bash
    # Download script
    curl -s "https://raw.githubusercontent.com/kubernetes-sigs/kustomize/master/hack/install_kustomize.sh" | bash

    # Verify installation
    kustomize version --short
    ```

### Using Kustomize
- Write our kustomize.yaml file
    ```bash
    # apply our kustomize file
    kustomize build k8s/

    # apply our kustomize file and create a k8s cluster
    kustomize build k8s/ | kubectl apply -f -
    # To apply natively
    kubectl apply -k k8s/

    # cleanup our kustomize file and create a k8s cluster
    kustomize build k8s/ | kubectl delete -f k8s/
    ```

- Good to know
    ```bash
    # apply muliple directories
    kubectl apply -f $DIR_1 -f $DIR_2 -f $DIR_3
    ```