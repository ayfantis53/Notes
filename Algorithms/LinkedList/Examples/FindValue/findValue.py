"""Find a Node in linked list."""


class Node:
    """Class that defines our Node.
    
    Attributes:
        value (str): Value being stored in node of linkedlist.
        next (Node): node that this node points to.
    """

    def __init__ (self, value: str) -> None:
        """Initializes the Node object.
        
        Args:
            value (str): Value being stored in node of linkedlist.
        """
        self.value = value
        self.next  = None


def findValue(head: Node, target: str) -> None:
    """Find a value in a LinkedList.

    Args:
        head (Node):     first Node in Linked List.
        target (str): value of Node we want to find.
    """
    count = 1

    while head is not None:
        if head.value == target:
            print(f'Found value {target} at the NODE: {count}')
            return
        head = head.next
        count += 1

    print(f'No Value of {target} found in linked list')


def findValueRecur(head: Node, target: str, count: int) -> None:
    """Find a value in a LinkedList Recursively.

    Args:
        head (Node):  first Node in Linked List.
        target (str): value of Node we want to find.
        count (int):  node iteration we are on.
    """
    if head == None:
        print(f'No Value of {target} found in linked list')
        return
    
    if head.value == target:
        print(f'Found value {target} at the NODE: {count}')
        return 
    
    return findValueRecur(head.next, target, count + 1)


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
    findValue(a, 'A')
    findValue(a, 'B')
    findValue(a, 'C')
    findValue(a, 'D')
    findValue(a, 'E')

    print(f'------ RECURSION ------')

    # Recursive function calls.
    findValueRecur(a, 'A', 1)
    findValueRecur(a, 'B', 1)
    findValueRecur(a, 'C', 1)
    findValueRecur(a, 'D', 1)
    findValueRecur(a, 'E', 1)


if __name__ == '__main__':
    """ Ensure this code only runs if the script is executed. Not when it's imported as a module by another file."""
    main()