## Rolling Updates & Rollbacks
-------------------------------------------------------------

### Rollout & Versioning
- When you first create a deployment.
    * it triggers a rollout.
    * a new rollout creates a new replicaset which is recorded as a new deployment revision.
    * in the future when the application is updated.
        - a new rollout is triggered.
        - a new deployment revision is created.
    * helps us keep track of versions of deployment and allows us to rollback to a previous version if necessary.

    ```bash
    # Status of our rollout
    kubectl rollout status $DEPLOYMENT_NAME

    # See the revisions and history of rollout
    kubectl rollout history $DEPLOYMENT_NAME
    ```

### Deployment Strategies

1. **Recreate**
    - Destroy all current pods
    - Create new versions of application instances
    - Problem is Application is down
        * during the period when older versions are down.
        * no new versions are up.
2. **Rolling Update**
    - Dont destroy all of them at once.
    - bring down older versions 1 by 1 and bring new ones up.
    - default strategy. 

- Any time you update a manifest file it triggers a new Deployment affter running apply
    ```bash
    # Update manifest file
    kubectl apply -f $MANIFEST_FILE.yaml

    # Set image dynamically, doesnt update manifest file tho
    kubectl set image $DEPLOYMENT_NAME $OLD_IMAGE=$NEW_IMAGE

    # See info about rollout
    kubectl describe deployment $DEPLOYMENT_NAME
    ```

### Upgrades
- When a new deployment is created
    * It creates a new replicaset under the hood
    * Starts deploying containers there and takes down old pods
        ```bash
        # While upgrade is happening can see them using
        kubectl get replicasets
        ```

- If something is wrong with new revision
    * revert it back a version
        ```bash
        kubectl rollout undo deployment $DEPLOYMENT_NAME
        ```