import java.util.List;
import java.util.Queue;
import java.util.Stack;
import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedList;

/**
 * Class that defines our Node
 */
class Node {
    int value;
    Node left;
    Node right;

    /**
     *   constructor to initialize a new node with data.
     *  @param value data to set Node.
     */
    Node (int value) {
        this.value = value;
        this.left  = null;
        this.right = null;
    }
}

/**
 * Class that Finds minimum value of a Binary Tree
 */
public class min {
    /**
     * Depth First Search find min of a Binary Tree
     * 
     * @param root first Node in Binary Tree. 
     * @return [void]
     */
    public static void minDFS(Node root) {
        int min = Integer.MAX_VALUE;
        Stack<Node> nodes = new Stack<>();

        nodes.push(root);

        while (!nodes.isEmpty()) {
            Node current = nodes.pop();
            if (current.value < min) {
                min = current.value;
            }

            if (current.right != null) { nodes.push(current.right); }
            if (current.left != null)  { nodes.push(current.left);  }    
        }

        System.out.println("[" + min + "] is the MINIMUM of all tree nodes");
        return;
    }

    /**
     * Breadth First Search find min of a Binary Tree
     * 
     * @param root first Node in Binary Tree. 
     * @return [void]
     */
    public static void minBFS(Node root) {
        int min = Integer.MAX_VALUE;
        Queue<Node> nodes = new LinkedList<>();

        nodes.add(root); 

        while (!nodes.isEmpty()) {
            Node current = nodes.remove();
            if (current.value < min) {
                min = current.value;
            }

            if (current.right != null) { nodes.add(current.right); }
            if (current.left != null)  { nodes.add(current.left);  }    
        }

        System.out.println("[" + min + "] is the MINIMUM of all tree nodes");
        return;
    }

    /**
     * Depth First Search find min of a Binary Tree Recursively
     * 
     * @param root first Node in Binary Tree. 
     * @return [void]
     */
    public static int minDFSRecurs(Node root) {
        if (root == null) { return Integer.MAX_VALUE; }

        int leftMin = minDFSRecurs(root.left);
        int rightMin = minDFSRecurs(root.right);

        return Math.min(root.value, Math.min(leftMin, rightMin));
    }

    /**
     * This is the main method, the entry point for any standalone Java application.
     * The Java Virtual Machine (JVM) looks for this specific method to start program execution.
     *
     * @param args An array of String objects that can receive command-line arguments
     *             passed to the program when it is executed.
     */
    public static void main(String[] args) {
        Node a = new Node(5);
        Node b = new Node(7);
        Node c = new Node(4);
        Node d = new Node(8);
        Node e = new Node(3);
        Node f = new Node(9);

        a.left  = b;
        a.right = c;
        b.left  = d;
        b.right = e;
        c.right = f;

        // Non recursive function calls.
        System.out.println("--------- DFS ---------");
        minDFS(a);

        System.out.println("--------- BFS ---------");
        minBFS(a);

        // Recursive function calls.
        System.out.println("------ RECURSION ------");
        System.out.println("[" + String.valueOf(minDFSRecurs(a)) + "] is the SUM of all tree nodes");


        // ---------------------
        //        TREE
        // ---------------------
        //          1
        //         / \
        //        2   3
        //       / \   \
        //      4   5   6

    }
}
