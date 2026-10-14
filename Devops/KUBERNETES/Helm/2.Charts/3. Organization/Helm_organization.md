## NAMED TEMPLATES
-------------------------------------------------------------
- Used for repetetive code


## CHART HOOKS
-------------------------------------------------------------
- Types of Hooks
    1. Upgrade hooks
        ```bash
        helm install  # verify -> render -> pre-install hook -> install -> post-install hook
        ```
    1. Upgrade hooks
        ```bash
        helm delete  # verify -> render -> pre-delete hook -> delete -> post-delete hook
        ```
    1. Upgrade hooks
        ```bash
        helm upgrade  # verify -> render -> pre-upgrade hook -> upgrade -> post-upgrade hook
        ```
    1. Upgrade hooks
        ```bash
        helm rollback  # verify -> render -> pre-rollback hook -> rollback -> post-rollback hook
        ```

