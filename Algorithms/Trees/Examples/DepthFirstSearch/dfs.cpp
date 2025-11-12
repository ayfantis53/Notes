#include <iostream>
#include <stack>
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

/// @brief Depth First Search of a Binary Tree Recursion
/// @param root first Node in Binary Tree. 
/// @returns [array] of all nodes in depth first search order
auto dfs(Node* root) -> std::vector<char>
{
    std::stack<Node*> nodes;
    std::vector<char> result;

    nodes.push(root);

    while (!nodes.empty()) 
    {
        Node* current = nodes.top();
        nodes.pop();
        result.push_back(current->value);

        if (current->right) { nodes.push(current->right); }
        if (current->left)  { nodes.push(current->left);  }
    }

    return result;
}

/// @brief Depth First Search of a Binary Tree Recursion
/// @param root         first Node in LinkedList. 
/// @param combinedList list of all nodes we visited.
/// @returns [array] of all nodes in depth first search order
auto dfsRecurs(Node* root, std::vector<char>& combinedList) -> std::vector<char>
{
    if (!root) { return std::vector<char>(); }

    std::vector<char> rightValues = dfsRecurs(root->right, combinedList);
    std::vector<char> leftValues  = dfsRecurs(root->left, combinedList);

    combinedList.insert(combinedList.begin(), root->value);

    return combinedList;
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
int main()
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
    printValues(dfs(a));

    std::cout << "------ RECURSION ------" << std::endl;

    // Recursive function calls.
    std::vector<char> combinedList{};
    printValues(dfsRecurs(a, combinedList));    


    // ---------------------
    //        TREE
    // ---------------------
    //          a
    //         / \
    //        b   c
    //       / \   \
    //      d   e   f
}