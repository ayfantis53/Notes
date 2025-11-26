**DYNAMIC PROGRAMMING**
------------------------------------------------------------
- `Dynamic programming`: 
    * is an algorithmic technique for solving complex problems by breaking them down into simpler, overlapping subproblems.
    * effective for optimization problems, where the goal is to find the best possible solution among a set of choices.
- The core idea behind dynamic programming relies on two key properties:
    1. `Optimal Substructure`: 
        * > An optimal solution to the overall problem can be constructed from optimal solutions to its subproblems. 
        * > This means that if you have the best solution for smaller parts of the problem
        * > you can combine them to get the best solution for the whole problem.
    2. `Overlapping Subproblems`: 
        * > The same subproblems are encountered and solved multiple times during the computation of a recursive solution. 
        * > Dynamic programming addresses this by storing the results of these subproblems.
        * > so they only need to be computed once. 
        * > called memoization (for top-down approaches) or tabulation (for bottom-up approaches).
- How it works:
    1. `Top-down (Memoization)`: 
        * > This approach starts with the main problem and recursively breaks it down into subproblems. 
        * > When a subproblem is solved, its result is stored (memoized) in a data structure (like an array or hash map). 
        * > If the same subproblem is encountered again, the stored result is retrieved instead of recomputing it.
    2. `Bottom-up (Tabulation)`: 
        * > This approach starts by solving the smallest subproblems first and then uses their solutions to build up the solutions for larger subproblems.
        * > eventually reaching the solution for the original problem. 
        * > The results are typically stored in a table (array) and filled in a systematic order.
- Memoization Recipe
    1. Make it work
        - visualize problem as a tree.
        - implement tree using recursion.
        - test it.
    2. Make it efficient
        - add a memo object.
        - add a base case to return memo values.
        - store return values into memo.
- Tabulation Recipe
    1. Visualize the problem as a table.
    2. Size the table based on the inputs.
    3. Initialize the table with default values.
    4. Seed the trivial answer into the table.
    5. Iterate through the table.
    6. Fill further positions based on the current position.

**REFERENCE**
------------------------------------------------------------
- [https://www.youtube.com/watch?v=oBt53YbR9Kk]