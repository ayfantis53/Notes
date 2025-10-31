/** ---------------------------------------------
 * 
 * Find a Node in linked list
 --------------------------------------------- */

/**
 *  Class that defines our Node
 */
class Node {
    /**
     * Creates an instance of Node.
     * @param {String} value value stored in Node.
     */
    constructor(value) {
        this.value = value;
        this.next  = null;
    }
}

// A -> B -> C -> D -> NULL

/**
 * Find a value in a LinkedList
 * 
 * @param {Node}   head first Node in LinkedList. 
 * @param {String} find value to find in LinkedList.
 * @returns 
 */
const findValue = (head, find) => {
    if (head.value === find) {
        console.log("Found value at head of linkedlist!");
        return;
    }

    let count = 1;

    while (head !== null) {
        if (head.value === find) {
            console.log(`Found value at linkedlist Node ${count}`);
            return;
        }

        head = head.next;
        count++;
    }
}

/**
 * Find a value in a LinkedList recursively
 * 
 * @param {Node}   head first Node in LinkedList. 
 * @param {String} find value to find in LinkedList.
 * @returns 
 */
const recursiveFindValue = (head, find, count) => {
    if (head === null) {
        return false;
    }
    if (head.value === find) {
        console.log(`Found value at linkedlist Node ${count}`);
    }

    return recursiveFindValue(head.next, find, ++count)
}

let a = new Node('A');
let b = new Node('B');
let c = new Node('C');
let d = new Node('D');

a.next = b;
b.next = c;
c.next = d;

findValue(a, 'B');
recursiveFindValue(a, 'B', 1);