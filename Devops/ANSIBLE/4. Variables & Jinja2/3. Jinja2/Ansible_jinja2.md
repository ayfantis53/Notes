## JINJA2
-------------------------------------------------------------

- Basics
    - String manipulation
        ```ini
        The name is {{ my_name }} # The name is Bond
        The name is {{ my_name | upper }} # The name is BOND
        The name is {{ my_name | lower }} # The name is bond
        The name is {{ my_name | title }} # The name is Bond
        The name is {{ my_name | replace("Bond", "Bourne") }} # The name is Bourne
        The name is {{ first_name | default("James") }} {{ my_name }} # The name is James Bond
        ```

    - List and set manipulation
        ```ini
        {{ [1,2,3] | min }} # 1
        {{ [1,2,3] | max }} # 3
        {{ [1,2,3,2] | unique }} # 1,2,3
        {{ [1,2,3,4] | union([4,5]) }} # 1,2,3,4,5
        {{ [1,2,3,4] | intersect([4,5]) }} # 4
        {{ 100 | random }} # Random Number
        {{ ["The","name","is","Bond"] | join("") }} # The name is Bond
        ```

    - loops/Condition
        ```ini
        {%- for num in [0,1,2,3,4] %}
            {%- if number == 2 %}
                {{ number }}
            {% endif %}
        {% endfor %}
        ```

- Ansible Builtin Filters
    - File
        ```ini
        {{"/etc/hosts" | basename}}                     # hosts
        {{"c:\windows\hosts" | win_basename}}           # hosts
        {{"c:\windows\hosts" | win_splitdrive}}         # ["c:", "\windowa\hosts"]
        {{"c:\windows\hosts" | win_splitdrive | first}} # "c:"
        {{"c:\windows\hosts" | win_splitdrive | last}}  # "\windows\hosts"
        ```

- Add `.j2` to end of files that we plan on using jinja variables with.
    ```yaml
    # playbook.yml (using template module)
    tasks:
        - name: Copy index.html to remote servers
        template:
            src: index.html.j2
            dest: file/path/index.html
    ```
- When creating templates in roles
    * put them under a `template` directory
    * project
        - README.md
        - templates
        - tasks
        - handlers
        - vars
        - defaults
        - meta