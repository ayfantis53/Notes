## ERROR HANDLING
-------------------------------------------------------------

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