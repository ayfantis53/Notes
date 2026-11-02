## CONFIGURING SCHEDULER PROFILES
-------------------------------------------------------------

### Process of a pod being scheduled

1. Scheduling Queue
    - Extension Points
        * queueSort
    - Scheduling Plugins
        * PrioritySort
2. Filtering
    - Extension Points
        * prefilter
        * filter
        * postfilter
    - Scheduling Plugins
        * NodeResourcesFit
        * NodeName
        * NodeUnschedulable
        * NodeResourcesFit
        * TaintToleration
        * NodePorts
        * NodeAffinity
3. Scoring
    - Extension Points
        * prescore
        * score
        * reserve
    - Scheduling Plugins
        * NodeResourcesFit
        * ImageLocality
        * NodeResourcesFit
        * TaintToleration
        * NodeAffinity
4. Binding
    - Extension Points
        * permit
        * preBind
        * bind
        * postBind
    - Scheduling Plugins
        * DefaultBinder


### Change Default behaviors of plugins
- Can put multiple schedulers in the same binary.