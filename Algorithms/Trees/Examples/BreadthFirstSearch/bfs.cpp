#include <iostream>
#include <queue>
#include <vector>

/// @brief Class that defines our Node 
class Node {
public:
    /// @brief constructor to initialize a new node with data.
    /// @param value data to set Node.
    Node(char value) 
    {
        this->value = value;
        left        = nullptr;
        right       = nullptr;
    }

    /// @brief data of our Node.
    char value;

    /// @brief pointer to left child.
    Node* left;

    /// @brief pointer to right child.
    Node* right;
};

/// @brief Breadth First Search of a Binary Tree
/// @param root  first Node in Binary Tree. 
/// @returns [array] of all nodes in depth first search order
auto bfs(Node* root) -> std::vector<char>
{
    std::queue<Node*> nodes;
    std::vector<char> result;

    nodes.push(root);

    while (!nodes.empty()) 
    {
        Node* current = nodes.front();
        nodes.pop();
        result.push_back(current->value);

        if (current->left)  { nodes.push(current->left);  }
        if (current->right) { nodes.push(current->right); }
    }

    return result;
}

/// @brief Prints out a vector
/// @param list vector of values to print.
auto printValues(std::vector<char> list) -> void
{
    int count = 0;

    std::cout << "[";

    for (const auto& it : list)
    {
        if (count == list.size() - 1)
        {
            std::cout << it;
        }
        else
        {
            std::cout << it << ", ";
        }
        count++;
    }
    std::cout << "]" << std::endl;
}

/// @brief Main Code
auto main() -> int
{
    Node* a = new Node('a');
    Node* b = new Node('b');
    Node* c = new Node('c');
    Node* d = new Node('d');
    Node* e = new Node('e');
    Node* f = new Node('f');

    a->left  = b;
    a->right = c;
    b->left  = d;
    b->right = e;
    c->right = f;

    // Non recursive function calls.
    printValues(bfs(a));

    std::cout << "No Recursive function calls since recusive code utilizes stack and we need a queue for this." << std::endl;


    // ---------------------
    //        TREE
    // ---------------------
    //          a
    //         / \
    //        b   c
    //       / \   \
    //      d   e   f
}