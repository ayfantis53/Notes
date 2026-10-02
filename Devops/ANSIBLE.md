## ANSIBLE 
-------------------------------------------------------------

### CORE COMPONENTS
1. **FACTS:**
    - When you run a playbook and asnible connects to a target machine, it collects info:
        * Basic system information: 
            - architecture
            - processor details, memory details
            - serial numbers
        * Host network connectivity: 
            - Different interfaces
            - IP addresses
        * Device information:
            - different disks
            - volumes, mounts
            - space available on all of them
            - date & time
    - Gathers all these facts using the `setup module` which runs automatically.
    - Config
        * `/etc/ansible/ansible.cfg` is where gathering is set to implicit so Ansible automatically gathers facts by default.
    - Code
        > NOTE: Ansible only gathers facts against hosts that are part of the playbook.
        ```yaml
        # ansible_facts is variable ansible stores all facts in.
        tasks:
            - name: "print facts"
            debug:
            var: ansible_facts
        
        # Dont gather facts
        ---
        - name: Example
            hosts: all
            gather_facts: no
        ```
    - Adhoc command
        ```bash
        # Adhoc command to gather facts
        ansible -i inventory -m setup localhost | grep $WORD_TO_SEARCH
        ```

2. **CONFIGURATION FILES:**
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
        # If you want to store in a different directory
        $ANSIBLE_CONFIG=/opt/ansible-web.cfg ansible-playbook playbook.yml

        # If you want to set adhoc
        $ANSIBLE_GATHERING=explicit ansible-playbook playbook.yml

        # List all configurations
        ansible-config list

        # Shows the current config file
        ansible-config view

        # Shows the current settings
        ansible-config dump
        ```


### INSTALL & CONFIGURE
1. **INSTALLING:**
    - Control Node (Only linux)
        * where all Ansible software is installed and configured.
        * where all playbooks and code are stored.
    - When installing will create defaults
        * Create default inventory file at `etc/ansible/hosts`
        * Create default configuration file at `etc/ansible/ansible.cfg`
    - Different ways to install Ansible
        ```bash
        ## EXTRA PACKAGES FOR ENTERPRISE LINUX ##
        sudo yum install epel-release -y

        ## INSTALLATION ANSIBLE ##
        # Redhat or CentOS
        sudo yum install ansible -y

        # Fedora
        sudo dnf install ansible

        # Ubuntu
        sudo apt-get install ansible

        # PIP
        sudo pip install ansible
        ```

2. **MANAGE NODES:**
    - Passwordless Secure Shell (SSH) Key-based authentication (between ansible controller & managed nodes)
        * Create a pair of keys (private and public) `id_rsa` & `id_rsa.pub`
        * place the contents of the public key on the remote system in `~/.ssh/authorized_keys`
        * Control Node
    - Control Node
        ```bash
        # Generate key
        ssh key-gen     ||      ssh-keygen -t rsa -f ~/.ssh/ansible

        # Transfer keys to Worker Nodes
        ssh -i id_rsa user1@server1

        ssh-copy-id -i id_rsa user1@server1     ||      ssh-copy-id -i $PATH_TO_SSH_PRIVATE_KEY $USER@$SERVER
        ```
    - Worker Node
        ```bash
        # See users with permissions
        cat ~/.ssh/authorized_keys
        ```
        * keys are associated with a specific user configured in authorized key file on remote server
        * Inventory file
            - Get rid of `ansible_ssh_pass=`
            - add `ansible_user=` since ansible defaults user to root.
            - make sure `ansible_ssh_private_key_file=` has correct path.

3. **ADHOC COMMANDS:**
    - One line commands to run ansible modules
        ```bash
        # Run Module
        ansible -m $MODULE $HOSTS

        # Run command
        ansible -a '$COMMAND' $HOSTS

        # Extra options
        ansible -a 'yum install nginx' --become --become-user nginx

        # combination
        ansible -m command -a date -i $INVENTORY_FILE $HOSTS$ > $FILE_OUTPUT$
        ```
    
4. **ESCALATE PRIVELEGES:**
    - Become super user (sudo) `become: yes`
    - Become method-sudo `become_method: doas`


### VARIABLES & JINJA2
1. **VARIABLES & REGISTERING:**
    - Example of variables in `inventory` file
        ```ini
        ex1 ansible_host=000.00.0.000
        ex2 ansible_host=000.00.0.001
        ex3 ansible_host=000.00.0.002

        [web-servers]
        ex1      # All web_servers hosts will get variables
        ex2
        ex3

        [web-servers:vars]
        dns_server=00.0.0.0
        ```
    - Example of variables in `playbook` file 
        ```yaml
        tasks:    
        - name: stat module help to find the file info
            stat:
                path: /var/run
            register: your_variable

        # for your reference, check the outputs of these
        - debug:
            var=your_variable.stat

        # your code goes here...
        - shell: echo "{{your_variable.stat}}" > /tmp/by_ansible
        ```
    - view output of a task without debug module
        ```bash
        ansible-playbook -i inventory playbook.yml -v
        ```

2. **MAGIC VARIABLES:**
    - Variables cannot be seen if they are on different hosts.
    - Magic variables:
        1. **hostvars:** Get variables from other hosts
            - `hostvars['host_name'].var_name`
            - `hostvars['host_name']['var_name']`
        2. **group:** Return all hosts under a given group
            - `{{ groups['group_name_from_inventory'] }}`
        3. **group_names:** Returns all groups current host is a part of
            - `{{ group_names }}`
        4. **inventory_hostname:** Returns name configured for the host in inventory file
            - `{{ inventory_hostname }}`

3. **JINJA2:**
    - Basics
        - String manipulation
            ```ini
            The name is {{ my_name }} # The name is Bond
            The name is {{ my_name | upper }} # The name is BOND
            The name is {{ my_name | lower }} # The name is bond
            The name is {{ my_name | title }} # The name is Bond
            The name is {{ my_name | replace("Bond", "Bourne") }} # The name is Bourne
            The name is {{ first_name | default("James") }} {{ my_name }} # The name is James Bond
            ```

        - List and set manipulation
            ```ini
            {{ [1,2,3] | min }} # 1
            {{ [1,2,3] | max }} # 3
            {{ [1,2,3,2] | unique }} # 1,2,3
            {{ [1,2,3,4] | union([4,5]) }} # 1,2,3,4,5
            {{ [1,2,3,4] | intersect([4,5]) }} # 4
            {{ 100 | random }} # Random Number
            {{ ["The","name","is","Bond"] | join("") }} # The name is Bond
            ```

        - Condition
            ```ini
            {%- for num in [0,1,2,3,4] %}
                {%- if number == 2 %}
                    {{ number }}
                {% endif %}
            {% endfor %}
            ```

    - Ansible Builtin Filters
        - File
            ```ini
            {{"/etc/hosts" | basename}}                     # hosts
            {{"c:\windows\hosts" | win_basename}}           # hosts
            {{"c:\windows\hosts" | win_splitdrive}}         # ["c:", "\windowa\hosts"]
            {{"c:\windows\hosts" | win_splitdrive | first}} # "c:"
            {{"c:\windows\hosts" | win_splitdrive | last}}  # "\windows\hosts"
            ```

    - Add `.j2` to end of files that we plan on using jinja variables with.
        ```yaml
        # playbook.yml (using template module)
        tasks:
            - name: Copy index.html to remote servers
            template:
                src: index.html.j2
                dest: file/path/index.html
        ```
    - When creating templates in roles
        * put them under a `template` directory


### ANSIBLE FLOW
1. **CONDITIONALS:**
    ```yaml
    tasks:
      - name: name
        job: job
        when: condition == 'something' and condition2 == 'something2'
    ``` 

2. **LOOPS:**
    ```yaml
    vars:
        items:
          - name: item1
            required: True
          - name: item2
            required: False
    tasks:
      - name: install "{{ item.name }}"
        job: job
        when: item.required == True
        loops: "{{ items }}"
    ```

3. **REGISTER:**
    ```yaml
    tasks:
      - name: name
        module: module
        register: result
    
      - name: name 2
        job: job
        when: result.stdout.find('down') != 1
    ```

4. **BLOCKS:**
    - groups code together
    - `rescue` section if block fails
    - `always` section to run always after block completes
        ```yaml
        tasks:
        - block:
            - name: task1
                module:
            - name: task2
                module2:
        - rescue:
            - mail:
                to: admin@company.com
                subject: failure
                body: job failed
        - always:
            - mail:
                to: admin@company.com
                subject: Job running
                body: job ran
    ``` 

5. **ERROR HANDLING:**
    - anything fails stop entire playbook
        ```yaml
        - name: example
          hosts: all
          any_errors_fatal: true
        ```
    - If a percentage of jobs fails stop entire playbook
        ```yaml
        - name: example
          hosts: all
          max_fail_percentage: 30
        ```
    - Ignore errors job will execute no matter what
        ```yaml
        - name: example
          hosts: all
          any_errors_fatal: true
          tasks:
            - name: job1
              module: module
            - name: job2
              module: module
              ignore_errors: yes
        ```
    - Fail only under certain condition
        ```yaml
        - name: example
          hosts: all
          any_errors_fatal: true
          tasks:
            - name: job2
              module: module
              failed_when: condition
        ```
    
5. **STRATEGY:**
    - Default ansible runs where all servers need to complete task before moving on
        ```yaml
        strategy: linear
        ```
    - Runs all tasks independently of servers and does not wait for other servers
        ```yaml
        strategy: free
        ```
    - Runs a set number at a time
        ```yaml
        serial: 3
        ```
    - ansible will only run as many servers as defined in `forks` variable
        * default is 5 in `etc/ansible/ansible.cfg`


### ANSIBLE INCLUDES & ROLES
1. **FILE SEPARATION:**
    - Inventory
        * Inventory file separated.
            ```ini
            # inventory/inventory
            [web_servers]
            web1
            web2
            ```

            ```ini
            # inventory/host_vars/web1.yml
            ansible_host: 000.00.0.000
            other_vars: example
            ```
            ```ini
            # inventory/host_vars/web2.yml
            ansible_host: 000.00.0.001
            other_vars: example
            ```
            ```ini
            # inventory/group_vars/web_servers.yml
            dns_server: 00.0.0.1    # Will be in every host vars as variable
            ```
        * Inventory commands
            ```bash
            # Return data from file in yaml format
            ansible-inventory -i inventory/ -y 
            ```
    - Variables
        * Location is not in local location
            ```yml
            tasks:
            - include_vars:
                file: /file/path/to/where/vars/stored.yml
                name: data_var_name
            - module:
                action: {{ data_var_name.var_you_want }}
            ```
    - Tasks
        * include Tasks
            ```yml
            # playbook.yml
            tasks:
                - include_tasks: tasks/db.yml
                - include_tasks: tasks/web.yml
            ```
            ```yml
            # tasks/db.yml
            - name: Install SQL Packages
            << code hidden >>
            ```
            ```yml
            # tasks/web.yml
            - name: Install dependencies
            << code hidden >>

            - name: Run web server
            << code hidden >>
            ```

2. **ROLES:**
    - make work reusable
    - default path for roles saved in `/etc/ansible/roles`
    - Code
        ```yml
        hosts: all
        roles:
            - role_you_want_to_use
        ```
    - Ansible Galaxy has pre written roles
        ```bash
        ansible-galaxy install $ROLE_NAME

        # view location of where roles are installed
        ansible-config dump | grep ROLE

        # install in current directory
        ansible-galaxy install $ROLE_NAME -p ./roles
        ``` 


### PTHER TOPICS
1. **ANSIBLE VAULT:**
    - default cypher is `AE256`
    - store data in encypted format
        ```bash
        # encrypt inventory
        ansible-vault encrypt inventory

        # decrypt inventory
        ansible-vault decrypt inventory --vault-password-file $PATH_TO_FILE

        # run commands with encrypted playbook
        ansible-playbook -i inventory --ask-vault-pass playbook.yml
        # pass in password with file (preferable a python file)
        ansible-playbook -i inventory --vault-password-file $PATH_TO_FILE playbook.yml

        # to view contents of encrypted file
        ansible-vault view inventory

        # Create an encrypted file
        ansible-vault create inventory
        ```