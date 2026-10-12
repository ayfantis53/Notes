## FILE_SEPARATION
-------------------------------------------------------------

- Inventory
    * File Structure
        - project
            - playbook.yml
            - inventory
                - inventory
                - host_vars
                    - web1.yml
                    - web2.yml
                    - web3.yml
            - group_vars
                - web_servers.yml
        - opt/apps/common-data/email
            - info.yml
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