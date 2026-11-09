## HELM COMPONENTS
-------------------------------------------------------------
- When a Chart is applied a release is created
    * in each release has multiple revisions
        - anytime theres a change a new revision is created
    * metadata is data about data (saved as secrets)

- **Charts**: instructions needed to create kubernetes cluster.
    * When a chart is applied to your cluster a release is created.
    * **release**: is a single installation of an application using a helm chart.
        * within each realease you can have multiple revisions.
        * **revisions**: are snapshots of the applications.
            - everytime a change is made to application a new revision is created.
- metadata saved in cluster in secrets.
    * helm will always know everything it did in the cluster.

- Commands:
    ```bash
    # deploys Helm chart package to K8s cluster, converting static templates to active cluster resources & tracking them as a single, versioned "release".
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
    # Get info.
    helm --help

    # Info about command.
    helm repo --help

    # More in depth info about command.
    helm repo update --help
    ```

- Commands (SEARCH)
    ```bash
    # Search for charts in Artifact Hub or your own hub instance.
    helm search hub $PROJECT_NAME

    # Search repositories for a keyword in charts.
    helm search repo $PROJECT_NAME
    ```

- Commands (DEPLOYING)
    ```bash
    # Add project to your local helm setup.
    helm repo add $RELEASE_NAME $CHART_URL
    #-- Example:
    helm repo add bitnami https://charts.bitnami.com/bitnami

    # Install charts.
    helm install $RELEASE_NAME $REPOSITORY/$APPLICATION
    #-- Example:
    helm install my-release bitnami/wordpress

    # List all releases with their info.
    helm list

    # Uninstall.
    helm uninstall my-release
    ```

- Commands (REPO)
    ```bash
    # Add a chart repository.
    helm repo add $RELEASE_NAME $CHART_URL

    # Generate an index file given a directory.
    helm repo index

    # list chart repositories.
    helm repo list

    # remove one or more chart repositories.
    helm repo remove

    # update information of available charts locally from chart repositories.
    helm repo update
    ```

## HELM CUSTOMIZE CHART PARAMETERS
-------------------------------------------------------------
- Set Chart values (--SET)
    ```bash
    # Override values set in values.yaml file.
    helm install --set wordpressBlogName="Helm Tutorials" my-release bitnami/wordpress
    ```

- Can create a separate custon `values.yaml` file

- Want to modify builtin values.yaml
    ```bash
    # pulls chart in an archived form & you have to uncompress it.
    helm pull bitnami/wordpress

    # have helm uncompress it
    helm pull --untar bitnami/wordpress

    # see all files part of chart
    ls wordpress

    # Once ready you can install the charts.
    helm install my-release ./wordpress
    ```

## LIFECYCLE MANAGEMENT
-------------------------------------------------------------
- Each time we pull in a chart and install it we create a release.
- Command (--UPGRADE)
    ```bash
    # Create a new release with specific version.
    helm install $RELEASE_NAME $REPOSITORY/$APPLICATION --version $VERSION_NUMBER
    #-- Example:
    helm install nginx-release bitnami/nginx --version 7.1.0

    # Find name of pods we created.
    kubectl get pods

    # See more details about image.
    kubectl describe pod $POD_ID

    # Upgrade the release (Creates a new revision).
    helm upgrade $RELEASE_NAME $REPOSITORY/$APPLICATION --version $VERSION_NUMBER
    #-- Example:
    helm upgrade nginx-release bitnami/nginx --version 18.3.6

    # See more details about a particular release.
    helm history $REVISION_NAME
    #-- Example:
    helm history nginx-release
    ```

- Command (--RETURN TO PREVIOUS STATE)
    - Creates new revision with exact same configuration as revision you rolledback to.
    - if on revision 2 you will be on revision 3 and not 1.
    ```bash
    # Will create a new revision which is the same as previous state.
    helm rollback $RELEASE_NAME
    helm rollback $RELEASE_NAME $REVISION_NUMBER
    #-- Example:
    helm rollback nginx-release
    helm rollback nginx-release 1
    ```