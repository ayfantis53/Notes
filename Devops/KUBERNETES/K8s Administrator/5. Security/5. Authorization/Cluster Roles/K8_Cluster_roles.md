## CLUSTER ROLES
-------------------------------------------------------------

- Cluster Roles and CLuster Role bindings.
    * used to give admins permissions to modify nodes, PVs or any other cluster resource.
- Cannot group nodes in a namespace, they are cluster wide resources.
    * Resources are categorized as either namespace or cluster scoped.
- Namespaced
    | Namespaced |              |
    | -----------| ------------ |
    | pods       | replicasets  |
    | jobs       | deployments  |
    | services   | secrets      |
    | roles      | rolebindings |
    | configmaps | PVC          |

    ```bash
    # See a full list of namespaced & non-namespaced resources.
    kubectl api-resources --namespaced=true
    ```
- Cluster Scoped
    | Cluster Scoped |          |
    | -------------- | ------------ |
    | nodes          | PV           |
    | clusterroles   |              |
    | clusterrolebindings |         |
    | certificatesigningrequests |  |
    | namespaces                  | |

    ```bash
    # See a full list of non-namespaced resources.
    kubectl api-resources --namespaced=false
    ```
