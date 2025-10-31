/** ---------------------------------------------
 * 
 * Code to Sum a linked list
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

 // 3 -> 6 -> 9 -> 3 -> NULL

/**
 * sums all values of linked list
 * 
 * @param {Node} head The first node.
 */
const sumLinkedListValues = (head) => {
    let current = head;
    let sum     = 0;

    while (current !== null) {
        sum += current.value;
        current = current.next;
    }

    console.log(`The Iterative Sum of the linked list is: ${sum}`);
}

 /**
 * sums all values of linked list recursively.
 * 
 * @param {Node} head The first node.
 * @returns {number} The summ of all nodes in LinkedList.
 */
const sumRecursiveLinkedList = (head) => {
    if (head === null) { 
        return 0;
    }

    return head.value + sumRecursiveLinkedList(head.next);
}

let a = new Node(3);
let b = new Node(6);
let c = new Node(9);
let d = new Node(3);

a.next = b;
b.next = c;
c.next = d;

sumLinkedListValues(a);
console.log(`The Recursive Sum of the linked list is: ${sumRecursiveLinkedList(a)}`);;