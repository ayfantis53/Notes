#include <iostream>
#include <stack>
#include <queue>
#include <vector>

/// @brief Class that defines our Node 
class Node 
{
public:
    /// @brief constructor to initialize a new node with data.
    /// @param value data to set Node.
    Node (int value) 
    {
        this->value = value;
        this->left  = nullptr;
        this->right = nullptr;
    }

    /// @brief data of our Node.
    int value;

    /// @brief pointer to left child.
    Node* left;

    /// @brief pointer to right child.
    Node* right;
};

/// @brief Depth First Search Sum all values of a Binary Tree
/// @param root   first Node in Binary Tree.  
/// @returns [void]
auto sumDFS(Node* root) -> void 
{
    int sum = 0;
    std::stack<Node*> nodes;

    nodes.push(root);

    while (!nodes.empty())
    {
        Node* current = nodes.top();
        nodes.pop();
        sum += current->value;

        if (current->left)  { nodes.push(current->left);  }
        if (current->right) { nodes.push(current->right); }
    }

    std::cout << "[" << sum << "] is the SUM of all tree nodes" << std::endl;
    return;
}

/// @brief Breadth First Search Sum all values of a Binary Tree
/// @param root   first Node in Binary Tree.  
/// @returns [void]
auto sumBFS(Node* root) -> void 
{
    int sum = 0;
    std::queue<Node*> nodes;

    nodes.push(root);

    while (!nodes.empty())
    {
        Node* current = nodes.front();
        nodes.pop();
        sum += current->value;

        if (current->left)  { nodes.push(current->left);  }
        if (current->right) { nodes.push(current->right); }
    }

    std::cout << "[" << sum << "] is the SUM of all tree nodes" << std::endl;
    return;
}

/// @brief Depth First Search Sum all values of a Binary Tree recursively
/// @param root   first Node in Binary Tree.  
/// @returns [void]
auto sumDFSRecurs(Node* root) -> int 
{
    if (!root) { return 0; }

    return root->value + sumDFSRecurs(root->right) + sumDFSRecurs(root->left);
}

/// @brief Main Code
auto main() -> int
{
    Node* a = new Node(1);
    Node* b = new Node(2);
    Node* c = new Node(3);
    Node* d = new Node(4);
    Node* e = new Node(5);
    Node* f = new Node(6);

    a->left  = b;
    a->right = c;
    b->left  = d;
    b->right = e;
    c->right = f;

    // Non recursive function calls.
    std::cout << "--------- DFS ---------" << std::endl;
    sumDFS(a);

    std::cout << "--------- BFS ---------" << std::endl;
    sumBFS(a);

    // Recursive function calls.
    std::cout << "------ RECURSION ------" << std::endl;
    std::cout << "[" << sumDFSRecurs(a) << "] is the SUM of all tree nodes" << std::endl;


    // ---------------------
    //        TREE
    // ---------------------
    //          1
    //         / \
    //        2   3
    //       / \   \
    //      4   5   6
}