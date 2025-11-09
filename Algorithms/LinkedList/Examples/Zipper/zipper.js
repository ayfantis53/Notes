/** ---------------------------------------------
 * 
 * Zipper combine two linked lists
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
 * Zipper combine two linked lists
 * 
 * @param {Node} head1 first Node in first Linked List.
 * @param {Node} head2 first Node in second Linked List.
 * @returns Node of head1
 */
const zipper = (head1, head2) => {

    let count = 0;
    tail      = head1;
    current1  = head1.next;
    current2  = head2;

    while (current1 && current2) {
        if (count % 2 === 0) {
            tail.next = current2;
            current2  = current2.next
        }
        else {
            tail.next = current1;
            current1  = current1.next;
        }

        tail = tail.next;
        count++;
    }

    if (current1 !== null) { tail.next = current1; }
    if (current2 !== null) { tail.next = current2; }

    return head1;
};

/**
 * print out all values of linked list recursively
 * 
 * @param {Node} head1 first Node in first Linked List.
 * @param {Node} head2 first Node in second Linked List.
 * @returns Node of head1
 */
const zipperRecur = (head1, head2) => {
    if (!head1 && !head2) { return null; }
    if (!head1) { return head2; }
    if (!head2) { return head1; }

    const next1 = head1.next;
    const next2 = head2.next;

    head1.next = head2;
    head2.next = zipperRecur(next1, next2);

    return head1;
};

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

const a = new Node('A');
const c = new Node('C');
const e = new Node('E');
const g = new Node('G');

a.next = c;
c.next = e;
e.next = g;

const b = new Node('B');
const d = new Node('D');
const f = new Node('F');
const h = new Node('H');

b.next = d;
d.next = f;
f.next = h;

// Non recursive function calls.
traverse(zipper(a, b));

console.log("------ RECURSION ------")

a.next = c;
c.next = e;
e.next = g;
g.next = null;

b.next = d;
d.next = f;
f.next = h;
h.next = null;

// Recursive function calls.
zipperRecur(a, b);
traverse(a);