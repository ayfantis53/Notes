#include <iostream>
#include <string>

/// @brief Class that defines our Node 
class Node {
public:
    /// @brief constructor to initialize a new node with data.
    /// @param value data to set Node.
    Node(std::string value) 
    {
        this->value = value;
        next        = nullptr;
    }

    /// @brief data of our Node.
    std::string value;

    /// @brief pointer to next link.
    Node* next;
};

/// @brief print out linked list
/// @param head first Node in LinkedList. 
auto traverse(Node* head) -> void
{
    std::string output = "";

    while (head != nullptr) {
        output += head->value + " -> ";
            
        head = head->next;
        }

    std::cout << output << "null" << std::endl;
}

/// @brief print out linked list recursively
/// @param head first Node in LinkedList. 
/// @param output output of entire linkedlist.
/// @returns int 1 for success
auto traverseRecur(Node* head, std::string output) -> int
{
    if (head == nullptr)
    {
        std::cout << output << "null" << std::endl;
        return 1;
    }

    return traverseRecur(head->next, output + head->value + " -> ");
}

/// @brief Main Code
auto main() -> int
{
    Node* a = new Node("A");
    Node* b = new Node("B");
    Node* c = new Node("C");
    Node* d = new Node("D");
    
    a->next = b;
    b->next = c;
    c->next = d;

    // Non recursive function calls.
    traverse(a);

    std::cout << "------ RECURSION ------" << std::endl;

    // Recursive function calls.
    traverseRecur(a, "");
}