"""Reverse a linked list."""


class Node:
    """Class that defines our Node.
    
    Attributes:
        value (str): Value being stored in node of linkedlist.
        next (Node): node that this node points to.
    """

    def __init__(self, value: str) -> None:
        """Initializes the Node object.
        
        Args:
            value (str): Value being stored in node of linkedlist.
        """
        self.value = value
        self.next  = None


def reverse(head: Node) -> Node:
    """Reverse a linkedlist.

    Args:
        head (Node): first Node in Linked List.

    Returns:
        [Node] new head.
    """
    current = head
    previous = None

    while current is not None:
        next         = current.next
        current.next = previous
        previous     = current
        current      = next

    return previous
 

def reverseRecur(head: Node, previous: Node) -> Node:
    """Reverse a linkedlist Recursively.

    Args:
        head (Node):     first Node in Linked List.
        previous (Node): previous Node in LinkedList.

    Returns:
        [Node] new head.
    """
    if head is None:
        return previous
    
    next = head.next
    head.next = previous

    return reverseRecur(next, head)


def traverse(head: Node) -> None:
    """Print out linked list. 

    Args:
        head (Node): first Node in Linked List.
    """
    output = ""

    while head is not None:
        output += head.value + " -> " 
        head = head.next

    print(f'{output}null')


def main():
    """Reverse a linked list."""
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


if __name__ == '__main__':
    """ Ensure this code only runs if the script is executed. Not when it's imported as a module by another file."""
    main()
