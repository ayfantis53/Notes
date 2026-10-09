## VARIABLES & REGISTERING
-------------------------------------------------------------

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