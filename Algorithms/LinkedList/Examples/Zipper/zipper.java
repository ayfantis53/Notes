/**
 * Zipper combine two linked lists
 */
class Node {
    char value;
    Node next;

    /**
     *   constructor to initialize a new node with data.
     *  @param value data to set Node.
     */
    Node (char value) {
        this.value = value;
        this.next  = null;
    }
}

/**
 * Class Zipper combines two linked lists
 */
class zipper {

    /**
     * Zipper combine two linked lists
     * 
     * @param head1 first Node in first Linked List.
     * @param head2 first Node in second Linked List.
     * @return Node of head1
     */
    public static Node zipper(Node head1, Node head2) {

        int count     = 0;
        Node tail     = head1;
        Node current1 = head1.next;
        Node current2 = head2;

        while (current1 != null && current2 != null) {
            if (count % 2 == 0) {
                tail.next = current2;
                current2  = current2.next;
            }
            else {
                tail.next = current1;
                current1  = current1.next;
            }

            tail = tail.next;
            count++;
        }

        if (current1 != null) { tail.next = current1; }
        if (current2 != null) { tail.next = current2; }

        return head1;
    }

    /**
     * Zipper combine two linked lists recursively
     * 
     * @param head1 first Node in first Linked List.
     * @param head2 first Node in second Linked List.
     * @return Node of head1
     */
    public static Node zipperRecur(Node head1, Node head2) {
        if (head1 == null && head2 == null) { return null; }

        if (head1 == null) { return head2; }
        if (head2 == null) { return head1; }

        Node next1 = head1.next;
        Node next2 = head2.next;

        head1.next = head2;
        head2.next = zipperRecur(next1, next2);

        return head1;
    }

    /**
     * print out linked list
     * 
     * @param head first Node in LinkedList.
     * @return void
     */
    public static void traverse(Node head) {

        String output = "";

        while (head != null) {
            output += head.value + " -> ";
                
            head = head.next;
        }

        System.out.println(output + "null");
    }

    /**
     * This is the main method, the entry point for any standalone Java application.
     * The Java Virtual Machine (JVM) looks for this specific method to start program execution.
     *
     * @param args An array of String objects that can receive command-line arguments
     *             passed to the program when it is executed.
     */
    public static void main(String[] args) {
      
        Node a = new Node('A');
        Node c = new Node('C');
        Node e = new Node('E');
        Node g = new Node('G');

        a.next = c;
        c.next = e;
        e.next = g;

        Node b = new Node('B');
        Node d = new Node('D');
        Node f = new Node('F');
        Node h = new Node('H');

        b.next = d;
        d.next = f;
        f.next = h;

        // Non recursive function calls.
        traverse(zipper(a, b));

        System.out.println("------ RECURSION ------");

        // Recursive function calls.

        a.next = c;
        c.next = e;
        e.next = g;
        g.next = null;

        b.next = d;
        d.next = f;
        f.next = h;
        h.next = null;

        zipperRecur(a, b);
        traverse(a);
    }
}