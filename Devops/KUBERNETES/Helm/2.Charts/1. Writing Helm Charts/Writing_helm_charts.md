## WRITING HELM CHARTS
-------------------------------------------------------------
- Initialize
    ```bash
    helm create nginx-chart

    ls nginx-chart
    ```

- templating in helm is in go language
- Other objects (case sensitive)
    ```yaml
    .Release.Name               Chart.Name              Capabalities.KubeVersion
    .Release.Namespace          Chart.ApiVersion        Capabalities.ApiVersions
    .Release.IsUpgrade          Chart.Version           Capabalities.Helmersion             Values.replicaCount
    .Release.IsInstall          Chart.Type              Capabalities.GitCommit              Values.image
    .Release.Revision           Chart.Keywords          Capabalities.GitTreeState
    .Release.Service            Chart.Home              Capabalities.GoVersion
    ```

## VERIFY HELM CHARTS
-------------------------------------------------------------
1. Linting
    ```bash
    # Run lint command and specify path to chart.
    helm lint ./nginx-chart
    ```
2. Template
    ```bash
    # Run template command and specify path to chart.
    helm template ./nginx-chart

    # More verbosity
    helm template ./nginx-chart --debug
    ```
    - any variables not specified will just be in caps as values.
3. Dry Run
    ```bash
    # Run dry-run to pretend to install so we can catch more in depth errors.
    helm install hello-world-1 ./nginx-chart --dry-run
    ```

- how to Install the CRDs for gateway.net
    ```bash
    kubectl apply --server-side -f https://github.com/kubernetes-sigs/gateway-api/releases/download/v1.6.1/standard-install.yaml
    ```