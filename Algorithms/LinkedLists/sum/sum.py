# ---------------------------------------------
# 
#  Code to Sum a linked list
# ---------------------------------------------

class Node:
    """ Class that defines our Node """

    def __init__(self, value):
        self.value = value
        self.next  = None


def sumLinkedListValues(head):
    """ 
    sums all values of linked list.

    Args:
        head (Node): first Node in Linked List.
    """

    current = head
    sum     = 0

    while current is not None:
        sum += current.value
        current = current.next

    print(f"The Iterative Sum of the linked list is: {sum}")

def sumRecursiveLinkedList(head):
    """ 
    sums all values of linked list recursively.
     
    Args:
        head (Node): first Node in Linked List.

    Returns:
        float: The sum of all values of Nodes in Linked List.
    """
    if head is None:
        return 0
    
    return head.value + sumRecursiveLinkedList(head.next)

if __name__ == "__main__":
    a = Node(3)
    b = Node(6)
    c = Node(9)
    d = Node(3)

    a.next = b
    b.next = c
    c.next = d

    sumLinkedListValues(a)
    print(f"The Recursive Sum of the linked list is: {sumRecursiveLinkedList(a)}")