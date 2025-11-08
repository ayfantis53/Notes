/**
 * Class that defines our Node
 */
class Node {
    char value;
    Node next;

    /**
     *   constructor to initialize a new node with data.
     *  @param value data to set Node.
     */
    Node(char value) {
        this.value = value;
        this.next  = null;
    }
}

/**
 * Reverse a linkedlist
 */
public class reverse {
    /**
     * Finds value of node that user chooses
     * 
     * @param head first Node in LinkedList. 
     * @return Node of new head
     */
    public static Node reverse(Node head) {

        Node current  = head;
        Node previous = null;
        
        while (current != null) {
            Node next    = current.next;
            current.next = previous;
            previous     = current;
            current      = next; 
        }

        return previous;
    }

    /**
     * Reverse a linkedlist Recursively
     * 
     * @param head     first Node in LinkedList. 
     * @param previous previous Node in LinkedList.
     * @return Node of new head
     */
    public static Node reverseRecur(Node head, Node previous) {
        if (head == null) {
            return previous;
        }

        Node next = head.next;
        head.next = previous;

        return reverseRecur(next, head);
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
        Node b = new Node('B');
        Node c = new Node('C');
        Node d = new Node('D');

        a.next = b;
        b.next = c;
        c.next = d;

        // // Non recursive function calls.
        traverse(reverse(a));

        System.out.println("------ RECURSION ------");

        // Recursive function calls.
        a.next = b;
        b.next = c;
        c.next = d;
        d.next = null;
        
        reverseRecur(a, null);
        traverse(d);
    }
}

