## ROLES
-------------------------------------------------------------

- make work reusable
- default path for roles saved in `/etc/ansible/roles`
    * can edit roles path at `/etc/ansible/ansible.cfg`
        ```ini
        roles_path = /etc/ansible/roles
        ```
- Directory Structure
    * my-project
        - playbook.yml
        - roles
            - mysql
                - templates
                - tasks
                - handlers
                - vars
                - defaults
                - meta

- Code
    ```yml
    hosts: all
    roles:
        - role_you_want_to_use
    ```
- Ansible Galaxy has pre written roles
    ```bash
    ansible-galaxy install $ROLE_NAME

    # list roles
    ansible-galaxy list

    # view location of where roles are installed
    ansible-config dump | grep ROLE

    # install in current directory
    ansible-galaxy install $ROLE_NAME -p ./roles
    ``` 