"""Find a Node in linked list."""


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


def getValue(head: Node, target: int) -> None:
    """Finds value of node that user chooses.

    Args:
        head (Node):  first Node in Linked List.
        target (int): value of Node we want to find.
    """
    count = 1

    while head != None:
        if count == target:
            print(f'The value of the {target} node is {head.value}')
            return
        
        head = head.next
        count += 1

    print(f'Linked list doesnt have {target} Nodes!')


def getValueRecur(head: Node, target: int, count: int) -> None:
    """Finds value of node that user chooses.

    Args:
        head (Node):  first Node in Linked List.
        target (int): value of Node we want to find.
        count (int):  node iteration we are on.
    """
    if head == None:
        print(f'Linked list doesnt have {target} Nodes!')
        return
    
    if count == target:
        print(f'The value of the {target} node is {head.value}')
        return

    getValueRecur(head.next, target, count + 1)


def main():
    """Find a Node in linked list."""
    a = Node('A')
    b = Node('B')
    c = Node('C')
    d = Node('D')

    a.next = b
    b.next = c
    c.next = d

    # Non recursive function calls.
    getValue(a, 1)
    getValue(a, 2)
    getValue(a, 3)
    getValue(a, 4)
    getValue(a, 5)

    print(f'------ RECURSION ------')

    # Recursive function calls.
    getValueRecur(a, 1, 1)
    getValueRecur(a, 2, 1)
    getValueRecur(a, 3, 1)
    getValueRecur(a, 4, 1)
    getValueRecur(a, 5, 1)


if __name__ == '__main__':
    """ Ensure this code only runs if the script is executed. Not when it's imported as a module by another file."""
    main()
