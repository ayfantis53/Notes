## OTHER TOPICS
-------------------------------------------------------------
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