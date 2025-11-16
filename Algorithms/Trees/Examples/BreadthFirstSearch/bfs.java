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
public class bfs {
    /**
     * Depth First Search of a Binary Tree
     * 
     * @param root first Node in Binary Tree.
     * @return [array] of all nodes in depth first search order
     */
    public static List<Character> bfs(Node root) {

        List<Character> result = new ArrayList<>();
        Queue<Node>     nodes =  new LinkedList<>();

        nodes.add(root);
        
        while (!nodes.isEmpty()) {
            Node current = nodes.remove();
            result.add(current.value);

            if (current.left  != null) { nodes.add(current.left);  }
            if (current.right != null) { nodes.add(current.right); }
        }

        return result;
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
        System.out.println(bfs(a));

        System.out.println("No Recursive function calls since recusive code utilizes stack and we need a queue for this.");


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