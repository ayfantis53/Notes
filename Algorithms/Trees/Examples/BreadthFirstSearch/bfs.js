/** ---------------------------------------------
 * 
 * Breadth First Search of a Binary Tree
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
 * Breadth First Search of a Binary Tree
 * 
 * @param {Node} root first Node in Binary Tree. 
 * @returns [array] of all nodes in depth first search order
 */
const bfs = (root) => {
    if (!root) { return []; }

    let result = [];
    let nodes  = [ root ];

    while (nodes.length > 0) {
        let current = nodes.shift();
        result.push(current.value);

        if (current.left)  { nodes.push(current.left);  }
        if (current.right) { nodes.push(current.right); }
    }

    return result;
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
console.log(bfs(a));

console.log("No Recursive function calls since recusive code utilizes stack and we need a queue for this.")


// ---------------------
//        TREE
// ---------------------
//          a
//         / \
//        b   c
//       / \   \
//      d   e   f
