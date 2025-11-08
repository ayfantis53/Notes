/** ---------------------------------------------
 * 
 * Reverse a linked list
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
        this.next  = null;
    }
};

/**
 * Reverse a linkedlist
 * 
 * @param {Node}   head   first Node in LinkedList. 
 * @returns Node of new head
 */
const reverse = (head) => {

    let previous = null;
    let current  = head;

    while (current !== null) {
        const next   = current.next;
        current.next = previous;
        previous     = current;
        current      = next;
    }

    return previous;
}

/**
 * Reverse a linkedlist Recursively
 * 
 * @param {Node} head     first Node in LinkedList. 
 * @param {Node} previous previous Node in LinkedList.
 * @returns Node of new head
 */
const reverseRecur = (head, previous = null) => {
    if (head === null) {
        return previous;
    } 

    const next = head.next;
    head.next  = previous;

    return reverseRecur(next, head);
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

// Main Code
let a = new Node('A');
let b = new Node('B');
let c = new Node('C');
let d = new Node('D');

a.next = b;
b.next = c;
c.next = d;

// Non recursive function calls.
traverse(reverse(a));

console.log("------ RECURSION ------")

a.next = b;
b.next = c;
c.next = d;
d.next = null;

// Recursive function calls.
reverseRecur(a);
traverse(d);