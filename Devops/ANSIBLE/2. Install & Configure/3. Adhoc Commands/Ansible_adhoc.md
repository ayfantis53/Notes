## ADHOC COMMANDS
-------------------------------------------------------------

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