## FUNCTIONS
-------------------------------------------------------------
- String Functions
    ```yaml
    {{ upper .Values.image.repository}}                 # image: NGINX

    {{ quote .Values.image.repository}}                 # image: "nginx"

    {{ replace "x" "y" .Values.image.repository}}       # image: "nginy"

    {{ shuffle .Values.image.repository}}               # image: "xgnix"
    ```


## PIPELINES
-------------------------------------------------------------
- bash example
    ```bash
    echo "abcd" | tr a-z A-Z    # ABCD
    ```

- Combining GOLANG Functions
    ```yaml
    {{ .Values.image.repository | upper | quote | shuffle }}              # image: NG"XNI"
    ```


## RANGES
-------------------------------------------------------------
```yaml
{{- with .Values.serviceAccount.create }}
apiVersion: v1
kind: ServiceAccount
metadata:
  name: {{ $.Values.serviceAccount.name }}
  labels:
    {{- range $key, $val := $.Values.serviceAccount.labels }}
    {{ $key }}: {{ $val }}
    {{- end }}
    app: webapp-color
{{- end }}
```


## CONDITIONALS
-------------------------------------------------------------
|   Function  |          Purpose         |
| :---------: | :----------------------: |
|     eq      |          equal           |
|     ne      |        not equal         |
|     lt      |        less than         |
|     le      |  less than or equal to   |
|     gt      |       greater than       |
|     ge      | greater than or equal to |
|     not     |         negation         |
|    empty    |      value is empty      |
