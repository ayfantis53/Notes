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
 * Class that Find a Node in linked list
 */
public class findValue {
    /**
     * Find a value in a LinkedList
     * 
     * @param head   first Node in LinkedList. 
     * @param target value to find in LinkedList.
     * @return void
     */
    public static void findValue(Node head, char target) {
        int count = 1;

        while (head != null) {
            if (head.value == target) {
                System.out.println("Found value " + target + "at the NODE: " + count);
                return;
            }

            head = head.next;
            count++;
        }

        System.out.println("No Value of " + target + " found in linked list");
    }

    /**
     * Find a value in a LinkedList Recursively
     * 
     * @param head   first Node in LinkedList. 
     * @param target value to find in LinkedList.
     * @param count  node iteration we are on.
     * @return int -1 for fail 0 for success
     */
    public static int findValueRecur(Node head, char target, int count) {
        if (head == null) {
            System.out.println("No Value of " + target + " found in linked list");
            return -1;
        }
        if (head.value == target) {
            System.out.println("Found value " + target + "at the NODE: " + count);
            return 0;
        }

        return findValueRecur(head.next, target, ++count);
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
        findValue(a, 'A');
        findValue(a, 'B');
        findValue(a, 'C');
        findValue(a, 'D');
        findValue(a, 'E');

        System.out.println("------ RECURSION ------");

        // Recursive function calls.
        findValueRecur(a, 'A', 1);
        findValueRecur(a, 'B', 1);
        findValueRecur(a, 'C', 1);
        findValueRecur(a, 'D', 1);
        findValueRecur(a, 'E', 1);
    }
}