## HELM INSTALL
-------------------------------------------------------------
- Must have a functional kubernetes cluster & kubectl installed and configured
- Installation commands (Linux Installs)
    ```bash
    # If you have snap
    sudo snap install helm

    # If you have snap & you want more relaxed install with more access to host system
    sudo snap install helm --classic

    # For PKG
    pkg install helm

    # Installing hellm on a control plane
    curl -fsSL -o get_helm.sh https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3
    chmod 700 get_helm.sh
    ./get_helm.sh
    ```

- Check installation
    ```bash
    # Check version
    helm version

    # Get info
    helm --help
    ```

- Version Helm 3 got rid of Tiller and used RBAC instead.
