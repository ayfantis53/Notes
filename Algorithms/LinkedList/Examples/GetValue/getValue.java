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
 * Class that Finds value of node that user chooses
 */
public class getValue {
    /**
     * Finds value of node that user chooses
     * 
     * @param head   first Node in LinkedList. 
     * @param target value to find in LinkedList.
     * @return void
     */
    public static void getValue(Node head, int target) {

        int count = 1; 

        while (head != null) {
            if (count == target) {
                System.out.println("The value of the " + target + " node is " + head.value);
                return;
            }

            head = head.next;
            count++;
        }

        System.out.println("Linked list doesnt have " + target + " Nodes!");
    }

    /**
     * Finds value of node that user chooses recursively
     * 
     * @param head   first Node in LinkedList. 
     * @param target value to find in LinkedList.
     * @param count  node iteration we are on.
     * @return int -1 for fail 0 for success
     */
    public static int getValueRecur(Node head, int target, int count) {
        if (head == null) {
            System.out.println("Linked list doesnt have " + target + " Nodes!");
            return -1;
        }

        if (count == target) {
            System.out.println("The value of the " + target + " node is " + head.value);
            return 0;
        }

        return getValueRecur(head.next, target, ++count);
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
        getValue(a, 1);
        getValue(a, 2);
        getValue(a, 3);
        getValue(a, 4);
        getValue(a, 5);

        System.out.println("------ RECURSION ------");

        // Recursive function calls.
        getValueRecur(a, 1, 1);
        getValueRecur(a, 2, 1);
        getValueRecur(a, 3, 1);
        getValueRecur(a, 4, 1);
        getValueRecur(a, 5, 1);
    }
}
