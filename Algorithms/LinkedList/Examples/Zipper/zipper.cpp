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

/// @brief Zipper combine two linked lists
/// @param head1 first Node in first Linked List. 
/// @param head2 first Node in second Linked List.
/// @returns Node of head1
auto zipper(Node* head1, Node* head2) -> Node*
{
    int count      = 0;
    Node* tail     = head1;
    Node* current1 = head1->next;
    Node* current2 = head2;

    while (current1 && current2)
    {
        if (count % 2 == 0) 
        {
            tail->next = current2;
            current2   = current2->next;
        }
        else
        {
            tail->next = current1;
            current1   = current1->next; 
        }

        tail = tail->next;
        count++;
    }

    if (current1) { tail->next = current1; }
    if (current2) { tail->next = current2; }

    return head1;
}

/// @brief Zipper combine two linked lists
/// @param head1 first Node in first Linked List. 
/// @param head2 first Node in second Linked List.
/// @returns Node of head1
auto zipperRecur(Node* head1, Node* head2) -> Node*
{
    if (!head1 && !head2) { return nullptr; }

    if (!head1) { return head2; }
    if (!head2) { return head1; }

    Node* next1 = head1->next;
    Node* next2 = head2->next;

    head1->next = head2;
    head2->next = zipperRecur(next1, next2);

    return head1;
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
auto main() -> int
{
    Node* a = new Node("A");
    Node* c = new Node("C");
    Node* e = new Node("E");
    Node* g = new Node("G");

    a->next = c;
    c->next = e;
    e->next = g;

    Node* b = new Node("B");
    Node* d = new Node("D");
    Node* f = new Node("F");
    Node* h = new Node("H");

    b->next = d;
    d->next = f;
    f->next = h;

    // Non recursive function calls.
    traverse(zipper(a, b));

    std::cout << "------ RECURSION ------" << std::endl;

    // Recursive function calls.

    a->next = c;
    c->next = e;
    e->next = g;
    g->next = nullptr;

    b->next = d;
    d->next = f;
    f->next = h;
    h->next = nullptr;

    zipperRecur(a, b);
    traverse(a);
}