/** ---------------------------------------------
 * 
 * Find value of a Node in linked list
 --------------------------------------------- */

/**
 * 
 */
class Node {
    /**
     * Creates an instance of Node.
     * @param {String} value value stored in Node.
     */
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

/**
 * Returns value of node that user chooses
 * 
 * @param {Node} head
 * @param {String} target
 */
const getValueOfNode = (head, target) => {
    
    let count = 1;

    while (head !== null) {
        if (count === target) {
            console.log(`The value of the target node is ${head.value}`);
            return;
        }

        head = head.next
        count += 1;
    }

    console.log(`NOT a value in linked list!`);
}

const a = new Node('A');
const b = new Node('B');
const c = new Node('C');
const d = new Node('D');

a.next = b;
b.next = c;
c.next = d;

getValueOfNode(a, 2)