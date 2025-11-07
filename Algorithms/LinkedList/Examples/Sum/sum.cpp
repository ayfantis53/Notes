#include <iostream>

/// @brief Class that defines our Node 
class Node {
public:
    /// @brief constructor to initialize a new node with data.
    /// @param value data to set Node.
    Node(int value) 
    {
        this->value = value;
        next        = nullptr;
    }

    /// @brief data of our Node.
    int value;

    /// @brief pointer to next link.
    Node* next;
};

/// @brief sums all values of linked list
/// @param head   first Node in LinkedList. 
auto sum(Node* head) -> void
{
    int sum = 0;

    while (head != nullptr)
    {
        sum += head->value;
        head = head->next;
    }

    std::cout << "The Iterative Sum of the linked list is: " << sum << std::endl;
}

/// @brief sums all values of linked list Recursively
/// @param head first Node in LinkedList. 
/// @param sum  total value of all nodes added together.
/// @returns int 0 for success
auto sumRecur(Node* head, int sum) -> int
{
    if (head == nullptr)
    {
        std::cout << "The Iterative Sum of the linked list is: " << sum << std::endl;
        return 0;
    }

    return sumRecur(head->next, head->value + sum);
}

/// @brief Main Code
int main()
{
    Node* a = new Node(2);
    Node* b = new Node(4);
    Node* c = new Node(6);
    Node* d = new Node(8);
    
    a->next = b;
    b->next = c;
    c->next = d;

    // Non recursive function calls.
    sum(a);

    std::cout << "------ RECURSION ------" << std::endl;

    // Recursive function calls.
    sumRecur(a, 0);
}