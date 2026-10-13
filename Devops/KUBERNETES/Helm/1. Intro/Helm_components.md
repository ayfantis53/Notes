## HELM COMPONENTS
-------------------------------------------------------------
- When a Chart is applied a release is created
    * in each release has multiple revisions
        - anytime theres a change a new revision is created
    * metadata is data about data (saved as secrets)

- Charts: instructions needed to create kubernetes cluster

- Commands:
    ```bash
    helm install $RELEASE_NAME $CHART_NAME
    ```

## HELM DIRECTORY STRUCTURE
-------------------------------------------------------------
* Project
    - templates/
    - values.yaml
    - Chart.yaml
    - LICENCE
    - README.md
    - charts/

## HELM CLI
-------------------------------------------------------------
- Commands (--HELP)
    ```bash
    # Get info
    helm --help

    # Info about command
    helm repo --help

    # More in depth info about command
    helm repo update --help
    ```

- Commands (SEARCH)
    ```bash
    # Search for a project
    helm search hub $PROJECT_NAME
    helm search repo $PROJECT_NAME
    ```

- Commands (DEPLOYING)
    ```bash
    # Add project to your local helm setup
    helm repo add bitnami https://charts.bitnami.com/bitnami

    # Install charts
    helm install $RELEASE_NAME $REPOSITORY/$APPLICATION
    helm install my-release bitnami/wordpress

    # List all releases
    helm list

    # Uninstall
    helm uninstall my-release
    ```

- Commands (REPO)
    ```bash
    helm repo add

    helm repo index

    helm repo list

    helm repo remove

    helm repo update
    ```

## HELM CUSTOMIZE CHART PARAMETERS
-------------------------------------------------------------
- Set Chart values (--SET)
    ```bash
    helm install --set wordpressBlogName="Helm Tutorials" my-release bitnami/wordpress
    ```

- Can create a separate custon `values.yaml` file

- Want to modify builtin values.yaml
    ```bash
    helm pull bitnami/wordpress

    helm pull --untar bitnami/wordpress

    ls wordpress

    helm install my-release ./wordpress
    ```

## LIFECYCLE MANAGEMENT
-------------------------------------------------------------
- Each time we pull in a chart and install it we create a release.
- Command (--UPGRADE)
    ```bash
    helm install nginx-release bitnami/nginx --version 7.1.0

    helm upgrade nginx-release bitnami/nginx

    kubectl get pods

    kubectl describe pod $POD_ID

    helm history nginx-release
    ```

- Command (--RETURN TO PREVIOUS STATE)
    > Will create a new revision which is the same as previous state
    ```bash
    helm rollback nginx-release 1
    ```