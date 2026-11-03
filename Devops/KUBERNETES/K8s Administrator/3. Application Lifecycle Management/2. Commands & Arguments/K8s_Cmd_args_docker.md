## Commands & Arguments for Docker
-------------------------------------------------------------

### Basic Commands
```bash
# list all running containers
docker ps

# list all containers
docker ps -a
```

### Overwriting CMD in Dockerfile
```bash
# Override default cmd command
docker run $IMAGE $COMMAND

# example
docker run ubuntu sleep5
```

### Writing CMD
```Dockerfile
# CMD sleep 5
CMD["sleep", "5"]
```

```bash
# Build Image
docker build -t $IMAGE_NAME .

# Run Image
docker run $IMAGE_NAME
```

### Entrypoint
- Cleanup Args
    ```Dockerfile
    FROM Ubuntu
    ENTRYPOINT["sleep"]
    ```

    ```bash
    docker run ubuntu-sleeper 10
    ```

- CMD provides default args
- ENTRYPOINT defines executable commands

### Combine Both
```Dockerfile
FROM Ubuntu
ENTRYPOINT["sleep"]
CMD["5"]
```