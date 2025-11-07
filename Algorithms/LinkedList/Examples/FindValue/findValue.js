/** ---------------------------------------------
 * 
 * Find a Node in linked list
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
}

/**
 * Find a value in a LinkedList
 * 
 * @param {Node}   head   first Node in LinkedList. 
 * @param {String} target value to find in LinkedList.
 * @returns void
 */
const findValue = (head, target) => {

    let count = 1;

    while (head !== null) {
        if (head.value === target) {
            console.log(`Found value ${target} at the NODE: ${count}`);
            return;
        }

        head = head.next;
        count++;
    }

    console.log(`No Value of ${target} found in linked list`);
}

/**
 * Find a value in a LinkedList recursively.
 * 
 * @param {Node}   head   first Node in LinkedList. 
 * @param {String} target value to find in LinkedList.
 * @param {Number} count  node iteration we are on.
 * @returns void
 */
const findValueRecur = (head, target, count) => {
    if (head === null) {
        console.log(`No Value of ${target} found in linked list`);
        return;
    }

    if (head.value === target) {
        console.log(`Found value ${target} at the NODE: ${count}`);
        return;
    }

    return findValueRecur(head.next, target, ++count);
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
findValue(a, 'A');
findValue(a, 'B');
findValue(a, 'C');
findValue(a, 'D');
findValue(a, 'E');

console.log("------ RECURSION ------")

// Recursive function calls.
findValueRecur(a, 'A', 1);
findValueRecur(a, 'B', 1);
findValueRecur(a, 'C', 1);
findValueRecur(a, 'D', 1);
findValueRecur(a, 'E', 1);