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

/// @brief Finds value of node that user chooses
/// @param head first Node in LinkedList. 
/// @returns Node of new head
auto reverse(Node* head) -> Node*
{
    Node* current  = head;
    Node* previous = nullptr;
    
    while (current != nullptr)
    {
        Node* next    = current->next;
        current->next = previous;
        previous      = current;
        current       = next;
    } 

    return previous;
}

/// @brief Reverse a linkedlist Recursively
/// @param head first Node in LinkedList.
/// @param previous previous Node in LinkedList.
/// @returns Node of new head
auto reverseRecur(Node* head, Node* previous = nullptr) -> Node*
{
    if (head == nullptr)
    {
        return previous;
    }

    Node* next = head->next;
    head->next = previous; 

    return reverseRecur(next, head);
}

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

/// @brief Main Code
int main()
{
    Node* a = new Node("A");
    Node* b = new Node("B");
    Node* c = new Node("C");
    Node* d = new Node("D");
    
    a->next = b;
    b->next = c;
    c->next = d;

    // Non recursive function calls.
    traverse(reverse(a));

    std::cout << "------ RECURSION ------" << std::endl;

    // Recursive function calls.
    a->next = b;
    b->next = c;
    c->next = d;
    d->next = nullptr;

    reverseRecur(a, nullptr);
    traverse(d);
}