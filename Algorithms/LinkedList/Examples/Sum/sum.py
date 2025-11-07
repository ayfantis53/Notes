# ---------------------------------------------
# 
#  Sum a linked list
# ---------------------------------------------

class Node:
    """ Class that defines our Node """

    def __init__(self, value):
        self.value = value
        self.next  = None


def sum(head):
    """ 
    sums all values of linked list.

    Args:
        head (Node): first Node in Linked List.

    Returns:
        void
    """
    sum     = 0

    while head is not None:
        sum += head.value
        head = head.next

    print(f"The Iterative Sum of the linked list is: {sum}")

def sumRecur(head, sum):
    """ 
    sums all values of linked list recursively.
     
    Args:
        head (Node):  first Node in Linked List.
        sum (Number): total value of all nodes added together.

    Returns:
        float: The sum of all values of Nodes in Linked List.
    """
    if head is None:
        print(f"The Iterative Sum of the linked list is: {sum}")
        return 0
    
    return sumRecur(head.next, head.value + sum)

if __name__ == "__main__":
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