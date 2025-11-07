/** ---------------------------------------------
 * 
 * Traverse a linked list
 --------------------------------------------- */

 /**
 *  Class that defines our Node
 */
class Node {
    /**
     * Creates an instance of Node. 
     * @param {Number} value value stored in Node.
     */
    constructor(value) {
        this.value = value;
        this.next  = null;
    }
}

/**
 * print out all values of linked list
 * 
 * @param {Node} head first Node in Linked List.
 * @returns void
 */
const traverse = (head) => {
    
    output = "";

    while (head !== null) {
        output += head.value + " -> "

        head = head.next;
    }

    console.log(output + "null");
};

/**
 * print out all values of linked list recursively
 * 
 * @param {Node} head     first Node in Linked List.
 * @param {String} output output of entire linkedlist.
 * @returns void
 */
const traverseRecur = (head, output) => {
    
    if (head === null) {
        console.log(output + "null");
        return;
    }

    traverseRecur(head.next, output + head.value + " -> ");
};

// Main Code

const a = new Node('A');
const b = new Node('B');
const c = new Node('C');
const d = new Node('D');

a.next = b;
b.next = c;
c.next = d;

// Non recursive function calls.
traverse(a);

console.log("------ RECURSION ------")

// Recursive function calls.
traverseRecur(a, "");