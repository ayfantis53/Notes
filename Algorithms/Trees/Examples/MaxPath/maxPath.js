/** ---------------------------------------------
 * 
 * Find max path of a Binary Tree
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
 * Depth First Search find max path of a Binary Tree
 * 
 * @param {Node} root first Node in Binary Tree. 
 * @returns [void]
 */
const maxPathDFS = (root) => {
    let sum = 0;
    let nodes = [ root ];

    while (nodes.length > 0) {
        let current = nodes.pop();
        sum += current.value;
        
        if (current.left && current.left.value > current.right.value) { 
            nodes.push(current.left);  
        }
        else if (current.right && current.left.value < current.right.value) { 
            nodes.push(current.right); 
        }
        else {
            continue;
        }
    }

    console.log(`[${sum}] is the MAX PATH of tree`);
    return;
}

/**
 * Breadth First Search find max path of a Binary Tree
 * 
 * @param {Node} root first Node in Binary Tree. 
 * @returns [void]
 */
const maxPathBFS = (root) => {
    let sum = 0;
    let nodes = [ root ];

    while (nodes.length > 0) {
        let current = nodes.shift();
        sum += current.value;
        
        if (current.left && current.left.value > current.right.value) { 
            nodes.push(current.left);  
        }
        else if (current.right && current.left.value < current.right.value) { 
            nodes.push(current.right); 
        }
        else {
            continue;
        }
    }

    console.log(`[${sum}] is the MAX PATH of tree`);
    return;
}

/**
 * Depth First Search find max path of a Binary Tree recursively
 * 
 * @param {Node} root first Node in Binary Tree. 
 * @returns [Number] the sum of max path of nodes
 */
const maxPathDFSRecurs = (root) => {
    if (!root) { return -Infinity; }
    if (!root.left && !root.right) { return root.value; }

    const maxChildPathSum = Math.max(maxPathDFSRecurs(root.left), maxPathDFSRecurs(root.right));
    return root.value + maxChildPathSum;
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
maxPathDFS(a);

console.log("--------- BFS ---------");
maxPathBFS(a);

// Recursive function calls.
console.log("------ RECURSION ------");
console.log(`[${maxPathDFSRecurs(a)}] is the MAX PATH of tree`);


// ---------------------
//        TREE
// ---------------------
//          5
//         / \
//        7   4
//       / \   \
//      8   3   9