/** ---------------------------------------------
 * 
 * Find a Value in linked list
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
 * Finds value of node that user chooses
 * 
 * @param {Node}   head   first Node in LinkedList. 
 * @param {Number} target value to find in LinkedList.
 * @returns void
 */
const getValue = (head, target) => {

    let count = 1;

    while (head !== null) {

        if (count === target) {
            console.log(`The value of the ${target} node is ${head.value}`);
            return;
        }

        head = head.next;
        count++;
    }

    console.log(`Linked list doesnt have ${target} Nodes!`);
}

/**
 * Finds value of node that user chooses recursively
 * 
 * @param {Node}   head   first Node in LinkedList. 
 * @param {Number} target value to find in LinkedList.
 * @param {Number} count  node iteration we are on.
 * @returns void
 */
const getValueRecur = (head, target, count) => {

    if (head === null) {
        console.log(`Linked list doesnt have ${target} Nodes!`);
        return;
    }
    if (count === target) {
        console.log(`The value of the ${target} node is ${head.value}`);
        return;
    }

    return getValueRecur(head.next, target, ++count);
}

// Main Code
let a = new Node('A');
let b = new Node('B');
let c = new Node('C');
let d = new Node('D');

a.next = b;
b.next = c;
c.next = d;

// Non recursive function calls.
getValue(a, 1);
getValue(a, 2);
getValue(a, 3);
getValue(a, 4);
getValue(a, 5);

console.log("------ RECURSION ------")

// Recursive function calls.
getValueRecur(a, 1, 1);
getValueRecur(a, 2, 1);
getValueRecur(a, 3, 1);
getValueRecur(a, 4, 1);
getValueRecur(a, 5, 1);
