# ---------------------------------------------
# 
#  Traverse a linked list
# ---------------------------------------------

class Node:
    """ Class that defines our Node """

    def __init__(self, value):
        self.value = value
        self.next  = None


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

def traverseRecur(head, output):
    """ 
    print out linked list recursively

    Args:
        head (Node):     first Node in Linked List.
        output (String): output of entire linkedlist.

    Returns:
        void
    """
    if head == None:
        print(f'{output}null')
        return
    
    traverseRecur(head.next, output + head.value + " -> ")

if __name__ == "__main__":

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