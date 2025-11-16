#include <iostream>
#include <stack>
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

/// @brief Depth First Search Find if a value is in a Binary Tree
/// @param root   first Node in Binary Tree. 
/// @param target value to find in Binary Tree. 
/// @returns [bool] if value was found in tree
auto findDFS(Node* root, char target) -> bool
{
    std::stack<Node*> nodes;

    nodes.push(root);

    while (!nodes.empty()) 
    {
        Node* current = nodes.top();
        nodes.pop();
        if (current->value == target)
        {
            std::cout << "[" << target << "] FOUND in tree!" << std::endl;
            return true;
        }

        if (current->right) { nodes.push(current->right); }
        if (current->left)  { nodes.push(current->left);  }
    }

    std::cout << "[" << target << "] NOT FOUND in tree!" << std::endl;
    return false;
}

/// @brief Breadth First Search Find if a value is in a Binary Tree
/// @param root   first Node in Binary Tree. 
/// @param target value to find in Binary Tree. 
/// @returns [bool] if value was found in tree
auto findBFS(Node* root, char target) -> bool
{
    std::queue<Node*> nodes;

    nodes.push(root);

    while (!nodes.empty()) 
    {
        Node* current = nodes.front();
        nodes.pop();
        if (current->value == target)
        {
            std::cout << "[" << target << "] FOUND in tree!" << std::endl;
            return true;
        }

        if (current->right) { nodes.push(current->right); }
        if (current->left)  { nodes.push(current->left);  }
    }

    std::cout << "[" << target << "] NOT FOUND in tree!" << std::endl;
    return false;
}

/// @brief Depth First Search Find if a value is in a Binary Tree Recursion
/// @param root   first Node in Binary Tree. 
/// @param target value to find in Binary Tree. 
/// @returns [bool] if value was found in tree
auto findDFSRecurs(Node* root, char target) -> bool
{
   if (!root)                 { return false; }
   if (root->value == target) { return true;  }

   bool foundInLeft = findDFSRecurs(root->left, target) ;
   if (foundInLeft) { return true; }

   bool foundInRight = findDFSRecurs(root->right, target) ;
   if (foundInRight) { return true; }

   return false;
}

/// @brief Prints the result of our recursive DFS
/// @param isFound result of recursive call.
/// @param target  what we were loking for.
/// @returns void
auto printResult(bool isFound, char target) -> void 
{
    if (isFound) 
    {
        std::cout << "[" << target << "] FOUND in tree!" << std::endl;
    }
    else
    {
        std::cout << "[" << target << "] NOT FOUND in tree!" << std::endl;
    }
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
    std::cout << "--------- DFS ---------" << std::endl;
    findDFS(a, 'a');
    findDFS(a, 'b');
    findDFS(a, 'c');
    findDFS(a, 'd');
    findDFS(a, 'e');
    findDFS(a, 'f');
    findDFS(a, 'g');

    std::cout << "--------- BFS ---------" << std::endl;
    findBFS(a, 'a');
    findBFS(a, 'b');
    findBFS(a, 'c');
    findBFS(a, 'd');
    findBFS(a, 'e');
    findBFS(a, 'f');
    findBFS(a, 'g');

    std::cout << "---- RECURSION DFS ----" << std::endl;

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