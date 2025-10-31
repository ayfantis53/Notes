# ---------------------------------------------
# 
#  Code to Sum a linked list
# ---------------------------------------------

class Node:
    """" Class that defines our Node """

    def __init__(self, value):
        self.value = value
        self.next  = None

def findValue(head, find):
    """
    Find a value in a LinkedList

    Args:
        head (Node): first Node in Linked List.
        find (String): value of Node we want to find
    """
    count = 1 

    while head is not None:
        if head.value == find:
            print(f"Found value at linkedlist Node {count}")
            return
        head = head.next
        count += 1

    
    print(f"Found value not in a linkedlist Node ")

def recursiveFindValue(head, find, count):
    """
    Find a value in a LinkedList recursively

    Args:
        head (Node): first Node in Linked List.
        find (String): value of Node we want to find
        count (Number): amount of iterations before we find our Node
    """

    if head is None:
        return
    if head.value == find:
        print(f"Found value at linkedlist Node {count}")
    recursiveFindValue(head.next, find, count + 1)

if __name__ == "__main__":
    a = Node("A")
    b = Node("B")
    c = Node("C")
    d = Node("D")

    a.next = b
    b.next = c
    c.next = d

    findValue(a, "C")
    recursiveFindValue(a, "C", 1)
