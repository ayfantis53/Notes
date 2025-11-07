/**
 * Class that defines our Node
 */
class Node {
    int value;
    Node next;

    /**
     *   constructor to initialize a new node with data.
     *  @param value data to set Node.
     */
    Node (int value) {
        this.value = value;
        this.next  = null;
    }
}

public class sum {
    /**
     * sums all values of linked list
     * 
     * @param head first Node in LinkedList. 
     * @return void
     */
    public static void sum(Node head) {
        int sum = 0;

        while (head != null) {
            sum += head.value;
            head = head.next;
        }

        System.out.println("The Iterative Sum of the linked list is: " + sum);
    }

    /**
     * sums all values of linked list Recursively
     * 
     * @param head first Node in LinkedList. 
     * @param sum  total value of all nodes added together.
     * @return int 0 for success
     */
    public static int sumRecur(Node head, int sum) {
        if (head == null) {
            System.out.println("The Iterative Sum of the linked list is: " + sum);
            return 1;
        }

        return sumRecur(head.next, head.value + sum);
    }

    /**
     * This is the main method, the entry point for any standalone Java application.
     * The Java Virtual Machine (JVM) looks for this specific method to start program execution.
     *
     * @param args An array of String objects that can receive command-line arguments
     *             passed to the program when it is executed.
     */
    public static void main(String[] args) {
        Node a = new Node(2);
        Node b = new Node(4);
        Node c = new Node(6);
        Node d = new Node(8);

        a.next = b;
        b.next = c;
        c.next = d;

        // Non recursive function calls.
        sum(a);

        System.out.println("------ RECURSION ------");

        // Recursive function calls.
        sumRecur(a, 0);
    }
}
