## AUTHORIZATION
-------------------------------------------------------------

### Authorization Mechanisms
1. Node
    - kube-apiServer is access by users and kubelet for management purposes.
    - Internal access to APIs.
    - Handled by special authorizer known as the Node authorizer.
    - Any request coming from user or group named `system-node` is authorized by Node Authorizer.
    - Access within the cluster. 
2. Authorization Based Access Control (ABAC)
    - External access to the API.
    - Associating a user or group of users with a set of permissions.
    - Do this by creating a policy file with a set of policies defined in a json format.
        * pass this file into the api-server.
            ```json
            {"kind":"Policy", "spec": {"user": "dev-user", "namespace": "*", "resource": "pods", "apiGroup": "*"}}
            {"kind":"Policy", "spec": {"user": "dev-user-2", "namespace": "*", "resource": "pods", "apiGroup": "*"}}
            {"kind":"Policy", "spec": {"user": "dev-user-3", "namespace": "*", "resource": "pods", "apiGroup": "*"}}
            {"kind":"Policy", "spec": {"user": "dev-user-4", "namespace": "*", "resource": "pods", "apiGroup": "*"}}
            ```
        * Everytime you need to add or make a change in the security, you must edit this policy file manually and restart the kube-apiserver.
        * As such ABAC are difficult to manage.
2. Role Based Access Control (RBAC)
    - Make things easier
    - Instead of directly associating a user with a set of permissions we define a role.
    - We define a role with a set of permissions for developers.
4. Webhook
    - manage authorization externally
    - Open policy agent is a third party tool.
5. Always Allow
    - allows all request without performaing any authorization checks.
    - set using the `authorization-mode=AlwaysAllow` on kube-apiserver
    - If you dont set this option AlwaysAllow is the default.
        * can provide a comma seperated list of modes you wish to use `authorization-mode=Node,RBAC,Webhook`
6. Always Deny
    - denies all request without performaing any authorization checks.
    - set using the `authorization-mode=AlwaysDeny` on kube-apiserver