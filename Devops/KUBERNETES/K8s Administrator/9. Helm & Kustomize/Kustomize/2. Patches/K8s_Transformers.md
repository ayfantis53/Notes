## Patches
-------------------------------------------------------------

### What it does
- Kustomize patches provide another method to modifying Kubernetes configs.
- Unlike common transformers, patches provide a more "surgical" approach to targeting one or more specific sections in a Kubernetes resource.
- To create a patch 3 parameters must be provided:
    1. **Operation Type**: 
        - add
        - remove
        - replace.
    2. **Target**: What resource this patch should be applied on.
        - Kind
        - Version/Group
        - Name
        - Namespace
        - labelSelector
        - AnnotationSelector
    3. **Value**: What is the value that will either be replaced or added with (only needed for add/replace operations).

###  File Separation
#### Json 6902 patch Inline vs Seperate File
- Inline
    ```yaml
    # Kustomization.yaml
    patches:
        - target:
            kind: Deployment
            name: api-deployment
          patch: |-
            - op: replace
              path: /spec/replicas
              value: 5
    ```
- Separate File
    ```yaml
    # Kustomization.yaml
    patches:
        - path: replica-patch.yaml
          target:
            kind: Deployment
            name: api-deployment
    ```

    ```yaml
    # replica-patch.yaml
    - op: replace
      path: /spec/replicas
      calue: 5
    ```

#### Strategic Merge patch Inline vs Seperate File
- Inline
    ```yaml
    # Kustomization.yaml
    patches:
        patch: |-
          - apiVersion: apps/v1
            kind: Deployment
            metadata:
                name: api-deployment
            spec:
                replicas: 5
    ```
- Separate File
    ```yaml
    # Kustomization.yaml
    patches:
      - replica-patch.yaml
    ```

    ```yaml
    # replica-patch.yaml
    apiVersion: apps/v1
    kind: Deployment
    metadata:
        name: api-deployment
    spec:
        replicas: 5
    ```
