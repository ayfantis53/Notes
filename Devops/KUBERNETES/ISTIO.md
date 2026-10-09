## ISTIO 
-------------------------------------------------------------

### TRAFFIC MANAGEMENT
-------------------------------------------------------------
1. GATEWAYS
    - `istio gateway`: loadbalancers that sit at the edge of the mesh.
        * manage inbound and outbound traffic to service mesh.
        * istio-ingress-gateway & istio-egress-gateway.
        * deploys ingress gatewas using `envoy` proxies.
        * catch all traffic through egress controller
        ```yaml
        apiVersion: networking.istio.io/v1alpha3
        kind: Gateway
        metadata:
            name: bookinginfo-gateway
        spec:
            selector: 
                istio: ingressgateway
            servers:
            - port:
                number: 80
                name: http
                protocol: HTTP
            hosts:
            - "bookinginfo.app"  
        ```
        > Gateway Commands
        ``` bash
        # List created gateways
        kubectl get gateway

        # View details about particular gateway
        kubectl describe gateway bookinginfo-gateway
        ```
2. VIRTUAL SERVICES
    