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
    Node (char value) {
        this.value = value;
        this.next  = null;
    }
}

/**
 * Class that print out all values of linked list
 */
class traverse {

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
     * print out linked list recursively
     * 
     * @param head   first Node in LinkedList. 
     * @param output output of entire linkedlist.
     * @return int 0 for success
     */
    public static int traverseRecur(Node head, String output) {
        if (head == null) {
            System.out.println(output + "null");
            return 1;
        }

        return traverseRecur(head.next, output + head.value + " -> ");
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

        // Non recursive function calls.
        traverse(a);

        System.out.println("------ RECURSION ------");

        // Recursive function calls.
        traverseRecur(a, "");
    }
}