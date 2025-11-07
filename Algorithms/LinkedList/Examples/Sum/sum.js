/** ---------------------------------------------
 * 
 * Sum a linked list
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
 * sums all values of linked list
 * 
 * @param {Node} head first Node in LinkedList.
 * @returns void
 */
const sum = (head) => {
    let sum     = 0;

    while (head !== null) {
        sum += head.value;
        head = head.next;
    }

    console.log(`The Iterative Sum of the linked list is: ${sum}`);
}

 /**
 * sums all values of linked list recursively.
 * 
 * @param {Node} head  first Node in LinkedList..
 * @param {Number} sum total value of all nodes added together.
 * @returns void
 */
const sumRecur = (head, sum) => {
    if (head === null) { 
        console.log(`The Iterative Sum of the linked list is: ${sum}`)
        return 0;
    }

    return sumRecur(head.next, head.value + sum);
}

// Main Code

let a = new Node(2);
let b = new Node(4);
let c = new Node(6);
let d = new Node(8);

a.next = b;
b.next = c;
c.next = d;

// Non recursive function calls.
sum(a);

console.log("------ RECURSION ------")

// Recursive function calls.
sumRecur(a, 0)