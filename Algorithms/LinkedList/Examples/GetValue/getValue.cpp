#include <iostream>

/// @brief Class that defines our Node 
class Node {
public:
    /// @brief constructor to initialize a new node with data.
    /// @param value data to set Node.
    Node(char value) 
    {
        this->value = value;
        next        = nullptr;
    }

    /// @brief data of our Node.
    char value;

    /// @brief pointer to next link.
    Node* next;
};

/// @brief Finds value of node that user chooses
/// @param head   first Node in LinkedList. 
/// @param target value to find in LinkedList.
auto getValue(Node* head, int target) -> void
{
    int count = 1;

    while (head != nullptr)
    {
        if (count == target)
        {
            std::cout << "The value of the " << target << " node is " << head->value << std::endl;
            return; 
        }

        head = head->next;
        count++;
    }

    std::cout << "Linked list doesnt have " << target << " Nodes!" << std::endl;
}

/// @brief Finds value of node that user chooses recursively
/// @param head   first Node in LinkedList. 
/// @param target value to find in LinkedList.
/// @param count  node iteration we are on.
/// @returns int -1 for fail 0 for success 
auto getValueRecur(Node* head, int target, int count) -> int
{
    if (head == nullptr)
    {
        std::cout << "Linked list doesnt have " << target << " Nodes!" << std::endl;
        return -1;
    }
    if (count == target)
    {
        std::cout << "The value of the " << target << " node is " << head->value << std::endl;
        return 0;
    }

    return getValueRecur(head->next, target, ++count);
}

/// @brief Main Code
int main()
{
    Node* a = new Node('A');
    Node* b = new Node('B');
    Node* c = new Node('C');
    Node* d = new Node('D');
    
    a->next = b;
    b->next = c;
    c->next = d;

    // Non recursive function calls.
    getValue(a, 1);
    getValue(a, 2);
    getValue(a, 3);
    getValue(a, 4);
    getValue(a, 5);

    std::cout << "------ RECURSION ------" << std::endl;

    // Recursive function calls.
    getValueRecur(a, 1, 1);
    getValueRecur(a, 2, 1);
    getValueRecur(a, 3, 1);
    getValueRecur(a, 4, 1);
    getValueRecur(a, 5, 1);
}