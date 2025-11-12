/** ---------------------------------------------
 * 
 * Depth First Search of a Binary Tree
 --------------------------------------------- */

 /**
 *  Class that defines our Node
 */
class Node {
    /**
     * Creates an Instance of Node
     * @param {String} value data of our Node.
     */
    constructor(value) {
        this.value = value;
        this.left  = null;
        this.right = null;
    }
};

/**
 * Depth First Search of a Binary Tree
 * 
 * @param {Node} root first Node in Binary Tree. 
 * @returns [array] of all nodes in depth first search order
 */
const dfs = (root) => {
    const result = [];
    const nodes  = [ root ];

    while (nodes.length > 0) {
        const current = nodes.pop();
        result.push(current.value);

        if (current.right) { nodes.push(current.right); }
        if (current.left)  { nodes.push(current.left); }
    }

    return result;
}

/**
 * Depth First Search of a Binary Tree Recursion
 * 
 * @param {Node} root first Node in Binary Tree.
 * @returns [array] of all nodes in depth first search order
 */
const dfsRecurs = (root) => {
    if (root === null) { return []; }

    const rightValues = dfsRecurs(root.right);
    const leftValues  = dfsRecurs(root.left);

    return [root.value, ...leftValues, ...rightValues];
}


// Main Code

const a = new Node('a');
const b = new Node('b');
const c = new Node('c');
const d = new Node('d');
const e = new Node('e');
const f = new Node('f');

a.left  = b;
a.right = c;
b.left  = d;
b.right = e;
c.right = f;

// Non recursive function calls.
console.log(dfs(a));

console.log("------ RECURSION ------")

// Recursive function calls.
console.log(dfsRecurs(a));



// ---------------------
//        TREE
// ---------------------
//          a
//         / \
//        b   c
//       / \   \
//      d   e   f
