## CONFIGURATION FILES
-------------------------------------------------------------

- Default configuration file at `/etc/ansible/ansible.cfg` when you install Ansible.
- Divided into many sections:
    1. defaults
    2. inventory
    3. privilege_escalation
    4. paramiko_connection
    5. ssh_connection
    6. persistent_connection
    7. colors
- If different directories require different configurations put a copy of file in each directory with necessary changes.
- Priority Chain
    1. local config file `/opt/playbooks/ansible-example.cfg`
    2. in users home directory `.ansible.cfg`
    3. Default configuration file at `/etc/ansible/ansible.cfg`
- Code
    ```bash
    ## -------- ANSIBLE CONFIGURATION VARIABLES -------- ##

    # If you want to store in a different directory.
    $ANSIBLE_CONFIG=/opt/ansible-web.cfg ansible-playbook playbook.yml

    # If you want to set adhoc.
    $ANSIBLE_GATHERING=explicit ansible-playbook playbook.yml

    ## -------- VIEW CONFIGURATION -------- ##

    # List all configurations.
    ansible-config list

    # Shows the current config file.
    ansible-config view

    # Shows the current settings.
    ansible-config dump
    ansible-config dump | grep GATHERING
    ```