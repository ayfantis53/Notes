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
    Node(int value) {
        this.value = value;
        this.left  = null;
        this.right = null;
    }
}

/**
 * Class Sums all values of a Binary Tree
 */
public class sum {
    /**
     * Depth First Search Sum all values of a Binary Tree
     * 
     * @param root first Node in Binary Tree.
     * @return [void]
     */
    public static void sumDFS(Node root) {
        int sum = 0;
        Stack<Node> nodes = new Stack<>();

        nodes.add(root);

        while (!nodes.isEmpty()) {
            Node current = nodes.pop();
            sum += current.value;
            
            if (current.right != null) { nodes.add(current.right); }
            if (current.left != null)  { nodes.add(current.left);  }
        }

        System.out.println("[" + sum + "] is the SUM of all tree nodes");
        return;
    }

    /**
     * Depth First Search Sum all values of a Binary Tree
     * 
     * @param root first Node in Binary Tree.
     * @return [void]
     */
    public static void sumBFS(Node root) {
        int sum = 0;
        Queue<Node> nodes = new LinkedList<>();

        nodes.add(root);

        while (!nodes.isEmpty()) {
            Node current = nodes.remove();
            sum += current.value;
            
            if (current.right != null) { nodes.add(current.right); }
            if (current.left != null)  { nodes.add(current.left);  }
        }

        System.out.println("[" + sum + "] is the SUM of all tree nodes");
        return;
    }

    /**
     * Depth First Search Sum all values of a Binary Tree Recursively
     * 
     * @param root first Node in Binary Tree.
     * @return [Int] of sum
     */
    public static int sumDFSRecurs(Node root) {
        if (root == null) { return 0; }

        return root.value + sumDFSRecurs(root.left) + sumDFSRecurs(root.right);
    }

    /**
     * This is the main method, the entry point for any standalone Java application.
     * The Java Virtual Machine (JVM) looks for this specific method to start program execution.
     *
     * @param args An array of String objects that can receive command-line arguments
     *             passed to the program when it is executed.
     */
    public static void main(String[] args) {
        Node a = new Node(1);
        Node b = new Node(2);
        Node c = new Node(3);
        Node d = new Node(4);
        Node e = new Node(5);
        Node f = new Node(6);

        a.left  = b;
        a.right = c;
        b.left  = d;
        b.right = e;
        c.right = f;

        // Non recursive function calls.
        System.out.println("--------- DFS ---------");
        sumDFS(a);

        System.out.println("--------- BFS ---------");
        sumBFS(a);

        // Recursive function calls.
        System.out.println("------ RECURSION ------");
        System.out.println("[" + String.valueOf(sumDFSRecurs(a)) + "] is the SUM of all tree nodes");


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
