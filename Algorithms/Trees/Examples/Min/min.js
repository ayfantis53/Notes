/** ---------------------------------------------
 * 
 * Find minimum value of a Binary Tree
 --------------------------------------------- */

 /**
 *  Class that defines our Node
 */
class Node {
    /**
     * Creates an Instance of Node
     * @param {Number} value data of our Node.
     */
    constructor(value) {
        this.value = value;
        this.left  = null;
        this.right = null;
    }
};

/**
 * Depth First Search find min of a Binary Tree
 * 
 * @param {Node} root first Node in Binary Tree. 
 * @returns void
 */
const minDFS = (root) => {
    let min   = Infinity;
    let nodes = [ root ];

    while (nodes.length > 0) {
        let current = nodes.pop();
        if (current.value < min) {
            min = current.value;
        }

        if (current.right) { nodes.push(current.right); }
        if (current.left)  { nodes.push(current.left); }
    }

    console.log(`[${min}] is the MINIMUM of all tree nodes`);
    return;
}

/**
 * Breadth First Search find min of a Binary Tree
 * 
 * @param {Node} root first Node in Binary Tree. 
 * @returns void
 */
const minBFS = (root) => {
    let min   = Infinity;
    let nodes = [ root ];

    while (nodes.length > 0) {
        let current = nodes.shift();
        if (current.value < min) {
            min = current.value;
        }

        if (current.right) { nodes.push(current.right); }
        if (current.left)  { nodes.push(current.left); }
    }

    console.log(`[${min}] is the MINIMUM of all tree nodes`);
    return;
}

/**
 * Depth First Search find min of a Binary Tree recursively
 * 
 * @param {Node} root first Node in Binary Tree. 
 * @returns void
 */
const minDFSRecurs = (root, min = 0) => {
    if (!root) { return Infinity; }

    const RightMin = minDFSRecurs(root.right);
    const leftMin  = minDFSRecurs(root.left);

    return Math.min(root.value, RightMin, leftMin)
}

// Main Code

const a = new Node(5);
const b = new Node(7);
const c = new Node(4);
const d = new Node(8);
const e = new Node(3);
const f = new Node(9);

a.left  = b;
a.right = c;
b.left  = d;
b.right = e;
c.right = f;

// Non recursive function calls.
console.log("--------- DFS ---------");
minDFS(a);

console.log("--------- BFS ---------");
minBFS(a);

// Recursive function calls.
console.log("------ RECURSION ------")
console.log(`[${minDFSRecurs(a)}] is the MINIMUM of all tree nodes`);


// ---------------------
//        TREE
// ---------------------
//          5
//         / \
//        7   4
//       / \   \
//      8   3   9