import java.util.Queue;
import java.util.Stack;
import java.util.LinkedList;

/**
 * Class that defines our Node
 */
class Node {
    char value;
    Node left;
    Node right;

    /**
     *   constructor to initialize a new node with data.
     *  @param value data to set Node.
     */
    Node (char value) {
        this.value = value;
        this.left  = null;
        this.right = null;
    }
}

/**
 * Class Find if a value is in a Binary Tree
 */
public class find {
    /**
     * Depth First Search Find if a value is in a Binary Tree
     * 
     * @param root   first Node in LinkedList. 
     * @param target value to find in Binary Tree.
     * @return bool if value was found in tree
     */
    public static boolean findDFS(Node root, char target) {

        Stack<Node> nodes = new Stack<>();

        nodes.push(root);
        
        while (!nodes.empty()) {
            Node current = nodes.pop();
            if (current.value == target) {
                System.out.println("[" + target + "] FOUND in tree!");
                return true;
            }

            if (current.right != null) { nodes.push(current.right); }
            if (current.left  != null) { nodes.push(current.left);  }
        }

        System.out.println("[" + target + "] NOT FOUND in tree!");
        return false;
    }

    /**
     * Breadth First Search Find if a value is in a Binary Tree
     * 
     * @param root   first Node in Binary Tree.
     * @param target value to find in Binary Tree.
     * @return bool if value was found in tree
     */
    public static boolean findBFS(Node root, char target) {

        Queue<Node> nodes = new LinkedList<>();

        nodes.add(root);
        
        while (!nodes.isEmpty()) {
            Node current = nodes.remove();
            if (current.value == target) {
                System.out.println("[" + target + "] FOUND in tree!");
                return true;
            }

            if (current.right != null) { nodes.add(current.right); }
            if (current.left  != null) { nodes.add(current.left);  }
        }

        System.out.println("[" + target + "] NOT FOUND in tree!");
        return false;
    }

    /**
     * Depth First Search Find if a value is in a Binary Tree Recursion
     * 
     * @param root         first Node in Binary Tree.
     * @param combinedList list of all nodes we visited.
     * @return bool if value was found in tree
     */
    public static boolean findDFSRecurs(Node root, char target) {
        if (root == null)         { return false; }
        if (root.value == target) { return true;  }

        boolean foundInLeft = findDFSRecurs(root.left, target);
        if (foundInLeft) {
            return true;
        }
        boolean foundInRight = findDFSRecurs(root.right, target);
        if (foundInRight) {
            return true;
        }

        return false;
    }

    /**
     * Prints the result of our recursive DFS
     * 
     * @param isFound result of recursive call.
     * @param target  what we were loking for.
     * @returns void
     */
    public static void printResult(boolean isFound, char target) {
        if (isFound) {
            System.out.println("[" + target + "] FOUND in tree!");
        }
        else {
            System.out.println("[" + target + "] NOT FOUND in tree!");
        }
    }

    /**
     * This is the main method, the entry point for any standalone Java application.
     * The Java Virtual Machine (JVM) looks for this specific method to start program execution.
     *
     * @param args An array of String objects that can receive command-line arguments
     *             passed to the program when it is executed.
     */
    public static void main(String[] args) {
        Node a = new Node('a');
        Node b = new Node('b');
        Node c = new Node('c');
        Node d = new Node('d');
        Node e = new Node('e');
        Node f = new Node('f');

        a.left  = b;
        a.right = c;
        b.left  = d;
        b.right = e;
        c.right = f;

        // Non recursive function calls.
        System.out.println("--------- DFS ---------");
        findDFS(a, 'a');
        findDFS(a, 'b');
        findDFS(a, 'c');
        findDFS(a, 'd');
        findDFS(a, 'e');
        findDFS(a, 'f');
        findDFS(a, 'g');

        System.out.println("--------- BFS ---------");
        findBFS(a, 'a');
        findBFS(a, 'b');
        findBFS(a, 'c');
        findBFS(a, 'd');
        findBFS(a, 'e');
        findBFS(a, 'f');
        findBFS(a, 'g');

        System.out.println("---- RECURSION DFS ----");

        // Recursive function calls.
        printResult(findDFSRecurs(a, 'a'), 'a');
        printResult(findDFSRecurs(a, 'b'), 'b');
        printResult(findDFSRecurs(a, 'c'), 'c');
        printResult(findDFSRecurs(a, 'd'), 'd');
        printResult(findDFSRecurs(a, 'e'), 'e');
        printResult(findDFSRecurs(a, 'f'), 'f');
        printResult(findDFSRecurs(a, 'g'), 'g');

        // ---------------------
        //        TREE
        // ---------------------
        //          a
        //         / \
        //        b   c
        //       / \   \
        //      d   e   f
    }
}