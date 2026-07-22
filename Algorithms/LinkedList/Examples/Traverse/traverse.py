"""Traverse a linked list."""


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


def traverseRecur(head: Node, output: str) -> None:
    """Print out linked list recursively.

    Args:
        head (Node):  first Node in Linked List.
        output (str): output of entire linkedlist.
    """
    if head == None:
        print(f'{output}null')
        return
    
    traverseRecur(head.next, output + head.value + " -> ")


def main():
    """Traverse a linked list."""
    a = Node('A')
    b = Node('B')
    c = Node('C')
    d = Node('D')

    a.next = b
    b.next = c
    c.next = d

    # Non recursive function calls.
    traverse(a)

    print(f'------ RECURSION ------')

    # Recursive function calls.
    traverseRecur(a, "")


if __name__ == '__main__':
    """ Ensure this code only runs if the script is executed. Not when it's imported as a module by another file."""
    main()