import java.util.Queue;
import java.util.Stack;
import java.util.LinkedList;


/**
 * Class that defines our Node
 */
class Node {
    int  value;
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
 * Class that Find max path of a Binary Tree
 */
public class maxPath {
    /**
     * Depth First Search find max path of a Binary Tree
     * 
     * @param root first Node in Binary Tree. 
     * @returns [void]
     */
    public static void maxPathDFS (Node root) {
        int sum = 0;
        Stack<Node> nodes = new Stack<>();

        nodes.add(root);

        while (!nodes.isEmpty()) {
            Node current = nodes.pop();
            sum += current.value;
            
            if (current.left != null && current.left.value > current.right.value) { 
                nodes.add(current.left);  
            }
            else if (current.right != null && current.left.value < current.right.value) { 
                nodes.add(current.right); 
            }
            else {
                continue;
            }
        }

        System.out.println("[" + sum + "] is the MAX PATH of tree");
        return;
    }

    /**
     * Breadth First Search find max path of a Binary Tree
     * 
     * @param root first Node in Binary Tree. 
     * @returns [void]
     */
    public static void maxPathBFS(Node root) {
        int sum = 0;
        Queue<Node> nodes = new LinkedList<>();

        nodes.add(root);

        while (!nodes.isEmpty()) {
            Node current = nodes.remove();
            sum += current.value;
            
            if (current.left != null && current.left.value > current.right.value) { 
                nodes.add(current.left);  
            }
            else if (current.right != null && current.left.value < current.right.value) { 
                nodes.add(current.right); 
            }
            else {
                continue;
            }
        }

        System.out.println("[" + sum + "] is the MAX PATH of tree");
        return;
    }

    /**
     * Depth First Search find max path of a Binary Tree recursively
     * 
     * @param root first Node in Binary Tree. 
     * @returns [Int] the sum of max path of nodes
     */
    public static int maxPathDFSRecurs(Node root) {
        if (root == null) { return Integer.MIN_VALUE; }
        if (root.left == null && root.right == null) { return root.value; }

        int maxChildPathSum = Math.max(maxPathDFSRecurs(root.left), maxPathDFSRecurs(root.right));
        return root.value + maxChildPathSum;
    }


    /**
     * This is the main method, the entry point for any standalone Java application.
     * The Java Virtual Machine (JVM) looks for this specific method to start program execution.
     *
     * @param args An array of String objects that can receive command-line arguments
     *             passed to the program when it is executed.
     */
    public static void main(String[] args) {
        // Main Code
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
        maxPathDFS(a);

        System.out.println("--------- BFS ---------");
        maxPathBFS(a);

        // Recursive function calls.
        System.out.println("------ RECURSION ------");
        System.out.println("[" + maxPathDFSRecurs(a) + "] is the MAX PATH of tree");


        // ---------------------
        //        TREE
        // ---------------------
        //          5
        //         / \
        //        7   4
        //       / \   \
        //      8   3   9
    }
}
