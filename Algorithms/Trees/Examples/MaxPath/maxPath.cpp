#include <iostream>
#include <stack>
#include <queue>
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

/// @brief Depth First Search find max path of a Binary Tree
/// @param root first Node in Binary Tree. 
/// @return [void]
auto maxPathDFS(Node* root) -> void 
{
    int sum = 0;
    std::stack<Node*> nodes{};

    nodes.push(root);

    while (!nodes.empty()) {
        Node* current = nodes.top();
        nodes.pop();
        sum += current->value;
        
        if (current->left && current->left->value > current->right->value) 
        { 
            nodes.push(current->left);  
        }
        else if (current->right && current->left->value < current->right->value) 
        { 
            nodes.push(current->right); 
        }
        else 
        {
            continue;
        }
    }

    std::cout << "[" << sum << "] is the MAX PATH of tree" << std::endl;
    return;
}

/// @brief Breadth First Search find max path of a Binary Tree
/// @param root first Node in Binary Tree. 
/// @return [void]
auto maxPathBFS(Node* root) -> void 
{
    int sum = 0;
    std::queue<Node*> nodes{};

    nodes.push(root);

    while (!nodes.empty()) {
        Node* current = nodes.front();
        nodes.pop();
        sum += current->value;
        
        if (current->left && current->left->value > current->right->value) 
        { 
            nodes.push(current->left);  
        }
        else if (current->right && current->left->value < current->right->value)
        { 
            nodes.push(current->right); 
        }
        else 
        {
            continue;
        }
    }

    std::cout << "[" << sum << "] is the MAX PATH of tree" << std::endl;
    return;
}

/// @brief Depth First Search find max path of a Binary Tree recursively
/// @param root first Node in Binary Tree. 
/// @return [Int] the sum of max path of nodes
auto maxPathDFSRecurs(Node* root) -> int
{
    if (!root) { return std::numeric_limits<int>::min(); }
    if (!root->left && !root->right) { return root->value; }

    int maxChildPathSum = std::max(maxPathDFSRecurs(root->left), maxPathDFSRecurs(root->right));
    return root->value + maxChildPathSum;
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
    maxPathDFS(a);

    std::cout << "--------- BFS ---------" << std::endl;
    maxPathBFS(a);

    // Recursive function calls.
    std::cout << "------ RECURSION ------" << std::endl;
    std::cout << "[" << maxPathDFSRecurs(a) << "] is the MAX PATH of tree" << std::endl;


    // ---------------------
    //        TREE
    // ---------------------
    //          5
    //         / \
    //        7   4
    //       / \   \
    //      8   3   9
}