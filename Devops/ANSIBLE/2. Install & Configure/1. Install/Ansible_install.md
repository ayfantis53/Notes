## INSTALL
-------------------------------------------------------------

- Control Node (Only linux)
    * where all Ansible software is installed and configured.
    * where all playbooks and code are stored.
- When installing will create defaults
    * Create default inventory file at `etc/ansible/hosts`
    * Create default configuration file at `etc/ansible/ansible.cfg`
- Different ways to install Ansible
    ```bash
    ## -------- EXTRA PACKAGES FOR ENTERPRISE LINUX -------- ##
    sudo yum install epel-release -y

    ## -------- INSTALLATION ANSIBLE -------- ##
    # Redhat or CentOS
    sudo yum install ansible -y

    # Fedora
    sudo dnf install ansible

    # Ubuntu
    sudo apt-get install ansible

    # PIP
    sudo pip install ansible
    ```