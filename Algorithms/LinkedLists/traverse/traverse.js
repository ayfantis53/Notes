/** ---------------------------------------------
 * 
 * Code to traverse a linked list
 --------------------------------------------- */


/**
 *  Class that defines our Node
 */
class node {
    constructor(value) {
        this.value = value;
        this.next  = null;
    }
}

const a = new node('A');
const b = new node('B');
const c = new node('C');
const d = new node('D');

a.next = b;
b.next = c;
c.next = d;

// A -> B -> C -> D -> NULL

/**
 * print out linked list
 */
const printLinkedList = (head) => {
    let current = head;
    
    while (current !== null) {
        process.stdout.write(current.value.toString());
        if (current.next !== null) {   
            process.stdout.write(" -> ");
        }
        current = current.next;
    }

    console.log();
};

// Call our function
printLinkedList(a);