/** ---------------------------------------------
 * 
 * Sum all values of a Binary Tree
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
 * Depth First Search Sum all values of a Binary Tree
 * 
 * @param {Node} root first Node in Binary Tree. 
 * @returns void
 */
const sumDFS = (root) => {
    let sum   = 0;
    let nodes = [ root ];

    while (nodes.length > 0) {
        let current = nodes.pop();
        sum += current.value;

        if (current.right) { nodes.push(current.right); }
        if (current.left)  { nodes.push(current.left);  }
    }

    console.log(`[${sum}] is the SUM of all tree nodes`)
    return;
}

/**
 * Breadth First Search Sum all values of a Binary Tree
 * 
 * @param {Node} root first Node in Binary Tree. 
 * @returns void
 */
const sumBFS = (root) => {
    let sum   = 0;
    let nodes = [ root ];

    while (nodes.length > 0) {
        let current = nodes.shift();
        sum += current.value;

        if (current.right) { nodes.push(current.right); }
        if (current.left)  { nodes.push(current.left);  }
    }

    console.log(`[${sum}] is the SUM of all tree nodes`);
    return;
}

/**
 * Depth First Search Sum all values of a Binary Tree recursively
 * 
 * @param {Node} root first Node in Binary Tree. 
 * @returns [Number] of sum
 */
const sumDFSRecurs = (root) => {
    if (!root) { return 0; }

    return root.value + sumDFSRecurs(root.left)+ sumDFSRecurs(root.right);
}

// Main Code

const a = new Node(1);
const b = new Node(2);
const c = new Node(3);
const d = new Node(4);
const e = new Node(5);
const f = new Node(6);

a.left  = b;
a.right = c;
b.left  = d;
b.right = e;
c.right = f;

// Non recursive function calls.
console.log("--------- DFS ---------");
sumDFS(a);

console.log("--------- BFS ---------");
sumBFS(a);

// Recursive function calls.
console.log("------ RECURSION ------");
console.log(`[${sumDFSRecurs(a)}] is the SUM of all tree nodes`);


// ---------------------
//        TREE
// ---------------------
//          1
//         / \
//        2   3
//       / \   \
//      4   5   6
