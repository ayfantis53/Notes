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
 * @param {Node}   root   first Node in Binary Tree. 
 * @param {String} target  value to find in Binary Tree.
 * @returns [array] of all nodes in depth first search order
 */
const findDFS = (root, target) => {
    const nodes  = [ root ];

    while (nodes.length > 0) {
        const current = nodes.pop();
        if (current.value === target) {
            console.log(`${target} FOUND in tree!`) 
            return true;
        }

        if (current.right) { nodes.push(current.right); }
        if (current.left)  { nodes.push(current.left); }
    }

    console.log(`${target} NOT FOUND in tree!`) 
    return false;
}

/**
 * Breadth First Search of a Binary Tree
 * 
 * @param {Node}   root   first Node in Binary Tree. 
 * @param {String} target  value to find in Binary Tree.
 * @returns [array] of all nodes in depth first search order
 */
const findBFS = (root, target) => {
    const nodes  = [ root ];

    while (nodes.length > 0) {
        const current = nodes.shift();
        if (current.value === target) {
            console.log(`${target} FOUND in tree!`) 
            return true;
        }

        if (current.right) { nodes.push(current.right); }
        if (current.left)  { nodes.push(current.left); }
    }

    console.log(`${target} NOT FOUND in tree!`) 
    return false;
}

/**
 * Depth First Search of a Binary Tree Recursion
 * 
 * @param {Node}   root   first Node in Binary Tree.
 * @param {String} target value to find in Binary Tree.
 * @returns [array] of all nodes in depth first search order
 */
const findDFSRecurs = (root, target) => {
    if (root === null)         { return false; }
    if (root.value === target) { return true; }

    const foundInLeft = findDFSRecurs(root.left, target);
    if (foundInLeft) {
        return true;
    }
    const foundInRight = findDFSRecurs(root.right, target);
    if (foundInRight) {
        return true;
    }

    return false;
}

/**
 * Prints the result of our recursive DFS
 * @param {*} isFound result of recursive call.
 * @param {*} target  what we were loking for.
 * @returns void
 */
const printResult = (isFound, target) => {
    if (isFound) {
        console.log(`${target} FOUND in tree!`);
    }
    else {
        console.log(`${target} NOT FOUND in tree!`);
    }
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
console.log("--------- DFS ---------")
findDFS(a, 'a');
findDFS(a, 'b');
findDFS(a, 'c');
findDFS(a, 'd');
findDFS(a, 'e');
findDFS(a, 'f');
findDFS(a, 'g');

console.log("--------- BFS ---------")
findBFS(a, 'a');
findBFS(a, 'b');
findBFS(a, 'c');
findBFS(a, 'd');
findBFS(a, 'e');
findBFS(a, 'f');
findBFS(a, 'g');

console.log("---- RECURSION DFS ----")

// Recursive function calls.
printResult(findDFSRecurs(a, 'a'), 'a');
printResult(findDFSRecurs(a, 'b'), 'b');
printResult(findDFSRecurs(a, 'c'), 'c');
printResult(findDFSRecurs(a, 'd'), 'd');
printResult(findDFSRecurs(a, 'e'), 'e');
printResult(findDFSRecurs(a, 'f'), 'f');
printResult(findDFSRecurs(a, 'g'), 'g');

// ---------------------
//        TREE
// ---------------------
//          a
//         / \
//        b   c
//       / \   \
//      d   e   f
