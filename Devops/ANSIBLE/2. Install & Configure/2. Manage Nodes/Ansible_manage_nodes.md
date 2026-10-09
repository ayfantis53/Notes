## MANAGE NODES
-------------------------------------------------------------

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