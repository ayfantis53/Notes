## PACKAGING & SIGNING CHARTS
-------------------------------------------------------------
- Packaging
    ```bash
    helm package ./nginx-chart
    ```

- Helm provenance & Integrity
    ```bash
    # Generate private key
    gpg --quick-generate-key "John Smith"

    # More secure
    gpg --full-generate-key "John Smith"

    # Convert New format to old format
    gpg --export-secret-keys >~/.gnugp/secring.gpg
    ```

- Signing and Verifying Helm charts
    ```bash
    helm package --sign --key "John Smith" --keyring ~/.gnugp/secring.gpg ./nginx-chart

    # nginx-chart   nginx-chart-0.1.0.tgz   nginx-chart-0.1.0.tgz.prov

    # Check hash
    ls 

    sha256sum nginx-chart-0.1.0.tgz
    ```

- Verify Signature
    ```bash
    helm verify ./nginx-chart-0.1.0.tgz

    gpg --export 'John Smith' > mypublickey

    helm verify  --keyring ./mypublickey ./nginx-chart-0.1.0.tgz

    # After chart users download public key using below After they can verify
    gpg --rcv-keys --keyserver keyserver.ubuntu.com 8D40FE0CACC3FED4AD12C17180BA57AAFAAD1CA5

    # Verify on installation
    helm install --verify nginx-chart-0.1.0
    ```


## UPLOADING CHARTS
-------------------------------------------------------------
- package
- has `package` `index.yaml` `provenance`
    ```bash
    ls

    mkdir nginx-chart-files

    cp nginx-chart-0.10.tgz     nginx-chart-0.10.tgz.provn nginx-chart-files/

    helm repo index nginx-chart-files/ --url https://example.com/charts
    # index.yaml has info

    helm repo add our-cool-charts https://example-charts.storage.googleapis.com

    helm repo list

    helm install my-new-release our-cool-charts/nginx-chart
    ```