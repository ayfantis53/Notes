# ---------------------------------------------
# 
#  Find a Node in linked list
# ---------------------------------------------

class Node:
    """ Class that defines our Node """

    def __init__(self, value):
        self.value = value
        self.next  = None

def getValue(head, target):
    """
    Finds value of node that user chooses

    Args:
        head (Node):     first Node in Linked List.
        target (Number): value of Node we want to find.

    Returns:
        void
    """

    count = 1

    while head != None:
        if count == target:
            print(f'The value of the {target} node is {head.value}')
            return
        
        head = head.next
        count += 1

    print(f'Linked list doesnt have {target} Nodes!')

def getValueRecur(head, target, count):
    """
    Finds value of node that user chooses

    Args:
        head (Node):     first Node in Linked List.
        target (Number): value of Node we want to find.
        count (Number):  node iteration we are on.

    Returns:
        void
    """

    if head == None:
        print(f'Linked list doesnt have {target} Nodes!')
        return
    if count == target:
        print(f'The value of the {target} node is {head.value}')
        return

    getValueRecur(head.next, target, count + 1)

if __name__ == '__main__':
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