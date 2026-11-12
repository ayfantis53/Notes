## Security Primitives
-------------------------------------------------------------

- What are risks and what action do you have to take to secure server.

1. Secure Hosts
    - should have root access disabled.
    - password based authentication disabled.
    - only ssh key based authentication available.
2. Controlling access to kube api-server.
    - who can access the server?
        * Static token file
        * Certificates
        * External Authentication Providers - LDAP
        * Service Accounts
    - what can they do?
        * RBAC Authorization
        * ABAC Authorization
        * Node Authorization
        * Webhook Mode
3. TLS Certificates
    * How all comoponents communicate with api-server.
4. Network Policies
    * restrict communication between pods.