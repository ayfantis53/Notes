/**
 * Class that defines our Node
 */
class Node {
    char value;
    Node next;

    // constructor to initialize a new node with data.
    Node(char value) {
        this.value = value;
        this.next  = null;
    }
}

/**
 * Class that performs our code.
 */
class Traverse {

    /**
     * print out linked list
     * 
     * @param head starting node
     */
    public static void printLinkedList(Node head) {
        Node current = head;

        while (current != null) {
            System.out.print(current.value);
            if (current.next != null){
                System.out.print(" -> ");
            }
                
            current = current.next;
        }

        System.out.println();
    }

    /**
     * Main function
     */
    public static void main(String[] args) {
      
        // create a hard-coded linked list:
        // 10 -> 20 -> 30 -> 40
        Node head           = new Node('A');
        head.next           = new Node('B');
        head.next.next      = new Node('C');
        head.next.next.next = new Node('D');

        printLinkedList(head);
    }
}