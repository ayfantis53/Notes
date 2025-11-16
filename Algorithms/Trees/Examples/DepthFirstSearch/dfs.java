import java.util.List;
import java.util.Stack;
import java.util.ArrayList;
import java.util.Collections;

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
 * Class that Depth First Search of a Binary Tree
 */
public class dfs {
    /**
     * Depth First Search of a Binary Tree
     * 
     * @param root first Node in Binary Tree.
     * @return [array] of all nodes in depth first search order
     */
    public static List<Character> dfs(Node root) {

        List<Character> result = new ArrayList<>();
        Stack<Node> nodes      = new Stack<>();

        nodes.push(root);
        
        while (!nodes.empty()) {
            Node current = nodes.pop();
            result.add(current.value);

            if (current.right != null) { nodes.push(current.right); }
            if (current.left  != null) { nodes.push(current.left);  }
        }

        return result;
    }

    /**
     * Depth First Search of a Binary Tree Recursion
     * 
     * @param root         first Node in Binary Tree.
     * @param combinedList list of all nodes we visited.
     * @return [array] of all nodes in depth first search order
     */
    public static List<Character> dfsRecurs(Node root, List<Character> combinedList) {
        if (root == null) { return Collections.emptyList(); }

        List<Character> rightValues = dfsRecurs(root.right, combinedList);
        List<Character> leftValues  = dfsRecurs(root.left, combinedList);

        combinedList.add(0, root.value);

        return combinedList;
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
        System.out.println(dfs(a));

        System.out.println("------ RECURSION ------");

        // Recursive function calls.
        List<Character> combinedList = new ArrayList<>();
        System.out.println(dfsRecurs(a, combinedList));



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