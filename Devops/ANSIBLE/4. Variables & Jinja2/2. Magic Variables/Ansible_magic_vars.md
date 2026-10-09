## MAGIC VARIABLES
-------------------------------------------------------------

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