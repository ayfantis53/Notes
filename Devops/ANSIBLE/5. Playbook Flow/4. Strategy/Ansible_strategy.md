## STRATEGY
-------------------------------------------------------------
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