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

/// @brief Find a value in a LinkedList
/// @param head   first Node in LinkedList. 
/// @param target value to find in LinkedList.
auto findValue(Node* head, char target) -> void
{
    int count = 1;

    while (head != nullptr)
    {
        if (head->value == target)
        {
            std::cout << "Found value " << target << " at the NODE: " << count << std::endl;
            return; 
        }

        head = head->next;
        count++;
    }

    std::cout << "No Value of " << target << " found in linked list" << std::endl;
}

/// @brief Find a value in a LinkedList recursively.
/// @param head   first Node in LinkedList. 
/// @param target value to find in LinkedList.
/// @param count  node iteration we are on.
/// @returns int -1 for fail 0 for success 
auto findValueRecur(Node* head, char target, int count) -> int
{
    if (head == nullptr)
    {
        std::cout << "No Value of " << target << " found in linked list" << std::endl;
        return -1;
    }
    if (head->value == target)
    {
        std::cout << "Found value " << target << " at the NODE: " << count << std::endl;
        return 0;
    }

    return findValueRecur(head->next, target, ++count);
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
    findValue(a, 'A');
    findValue(a, 'B');
    findValue(a, 'C');
    findValue(a, 'D');
    findValue(a, 'E');

    std::cout << "------ RECURSION ------" << std::endl;

    // Recursive function calls.
    findValueRecur(a, 'A', 1);
    findValueRecur(a, 'B', 1);
    findValueRecur(a, 'C', 1);
    findValueRecur(a, 'D', 1);
    findValueRecur(a, 'E', 1);
}