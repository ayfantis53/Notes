## ESCALATE PRIVELEGES
-------------------------------------------------------------

- Become super user (sudo) `become: yes`
- Become method-sudo `become_method: doas`

- Commands to set sudo
```bash
## Highest precedence
ansible-playbook --become --become-method=doas --become-user=nginx

# Prompt for password
ansible-playbook --become --become-method=doas --ask-become-pass
```