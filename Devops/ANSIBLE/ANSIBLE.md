## ANSIBLE 
-------------------------------------------------------------


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


### OTHER TOPICS
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