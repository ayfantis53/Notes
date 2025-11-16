#include <iostream>
#include <stack>
#include <queue>
#include <vector>
#include <limits>
#include <algorithm>

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

/// @brief Depth First Search find min of a Binary Tree
/// @param root first Node in Binary Tree.  
/// @returns [void]
auto minDFS(Node* root) -> void 
{
    int min = std::numeric_limits<int>::max();
    std::stack<Node*> nodes{};

    nodes.push(root);

    while (!nodes.empty()) 
    {
        Node* current = nodes.top();
        nodes.pop();
        if (current->value < min)
        {
            min = current->value;
        }

        if (current->right) { nodes.push(current->right); }
        if (current->left)  { nodes.push(current->left); }
    }

    std::cout << "[" << min << "] is the MINIMUM of all tree nodes" << std::endl;
    return;
}

/// @brief Breadth First Search find min of a Binary Tree
/// @param root first Node in Binary Tree.  
/// @returns [void]
auto minBFS(Node* root) -> void 
{
    int min = std::numeric_limits<int>::max();
    std::queue<Node*> nodes{};

    nodes.push(root);

    while (!nodes.empty()) 
    {
        Node* current = nodes.front();
        nodes.pop();
        if (current->value < min)
        {
            min = current->value;
        }

        if (current->right) { nodes.push(current->right); }
        if (current->left)  { nodes.push(current->left); }
    }

    std::cout << "[" << min << "] is the MINIMUM of all tree nodes" << std::endl;
    return;
}

/// @brief Depth First Search find min of a Binary Tree recursively
/// @param root first Node in Binary Tree.  
/// @returns [int] the minimum value in tree
auto minDFSRecurs(Node* root) -> int 
{
   if (!root) { return std::numeric_limits<int>::max(); }

   int leftMin  = minDFSRecurs(root->left); 
   int rightMin = minDFSRecurs(root->right);

   return std::min(root->value, std::min(leftMin, rightMin));
}

/// @brief Main Code
auto main() -> int
{
    Node* a = new Node(5);
    Node* b = new Node(7);
    Node* c = new Node(4);
    Node* d = new Node(8);
    Node* e = new Node(3);
    Node* f = new Node(9);

    a->left  = b;
    a->right = c;
    b->left  = d;
    b->right = e;
    c->right = f;

    // Non recursive function calls.
    std::cout << "--------- DFS ---------" << std::endl;
    minDFS(a);

    std::cout << "--------- BFS ---------" << std::endl;
    minBFS(a);

    // Recursive function calls.
    std::cout << "------ RECURSION ------" << std::endl;
    std::cout << "[" << minDFSRecurs(a) << "] is the SUM of all tree nodes" << std::endl;


    // ---------------------
    //        TREE
    // ---------------------
    //          1
    //         / \
    //        2   3
    //       / \   \
    //      4   5   6
}