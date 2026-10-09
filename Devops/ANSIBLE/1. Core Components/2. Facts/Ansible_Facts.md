## ANSIBLE FACTS
-------------------------------------------------------------

### FACTS
- When you run a playbook and ansible connects to a target machine, it collects info:
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
- Adhoc command
    ```bash
    # Adhoc command to gather facts
    ansible -i inventory -m setup localhost | grep $WORD_TO_SEARCH
    ```