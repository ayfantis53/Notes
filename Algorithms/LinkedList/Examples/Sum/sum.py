"""Sum a linked list."""


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


def sum(head: Node) -> None:
    """Sums all values of linked list.

    Args:
        head (Node): first Node in Linked List.
    """
    sum = 0

    while head is not None:
        sum += head.value
        head = head.next

    print(f"The Iterative Sum of the linked list is: {sum}")


def sumRecur(head: Node, sum: int) -> int:
    """Sums all values of linked list recursively.
     
    Args:
        head (Node): first Node in Linked List.
        sum (int):   total value of all nodes added together.

    Returns:
        [int] The sum of all values of Nodes in Linked List.
    """
    if head is None:
        print(f"The Iterative Sum of the linked list is: {sum}")
        return 0
    
    return sumRecur(head.next, head.value + sum)


def main():
    """Sum a linked list."""
    a = Node(2)
    b = Node(4)
    c = Node(6)
    d = Node(8)

    a.next = b
    b.next = c
    c.next = d

    # Non recursive function calls.
    sum(a)

    print(f'------ RECURSION ------')

    # Recursive function calls.
    sumRecur(a, 0)


if __name__ == '__main__':
    """ Ensure this code only runs if the script is executed. Not when it's imported as a module by another file."""
    main()
