# ---------------------------------------------
# 
#  Reverse a linked list
# ---------------------------------------------

class Node:
    """ Class that defines our Node """

    def __init__(self, value):
        self.value = value
        self.next  = None

def reverse(head):
    """
    Reverse a linkedlist

    Args:
        head (Node):     first Node in Linked List.

    Returns:
        Node of new head
    """

    current = head
    previous = None

    while current is not None:
        next         = current.next
        current.next = previous
        previous     = current
        current      = next

    return previous
 
def reverseRecur(head, previous):
    """
    Reverse a linkedlist Recursively

    Args:
        head (Node):     first Node in Linked List.
        previous (Node): previous Node in LinkedList.

    Returns:
        Node of new head
    """

    if head is None:
        return previous
    
    next       = head.next
    head.next  = previous

    return reverseRecur(next, head)

def traverse(head):
    """ 
    print out linked list 

    Args:
        head (Node): first Node in Linked List.

    Returns:
        void
    """
    output = ""

    while head is not None:
        output += head.value + " -> " 
        head = head.next

    print(f'{output}null')

if __name__ == "__main__":

    a = Node('A')
    b = Node('B')
    c = Node('C')
    d = Node('D')

    a.next = b
    b.next = c
    c.next = d

    # Non recursive function calls.
    traverse(reverse(a))

    print(f'------ RECURSION ------')

    # Recursive function calls.
    a.next = b
    b.next = c
    c.next = d
    d.next = None

    reverseRecur(a, None)
    traverse(d)