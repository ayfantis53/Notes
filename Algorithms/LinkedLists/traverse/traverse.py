# ---------------------------------------------
# 
#  Code to traverse a linked list
# ---------------------------------------------

class node:
    """ Class that defines our Node """

    def __init__(self, value):
        self.value = value
        self.next  = None

def printLinkedList(head):
    """ print out linked list """

    current = head
    
    while current is not None:
        print(current.value, end="")
        if current.next is not None:
            print(" -> ", end="")
        current = current.next

if __name__ == "__main__":
    """ create a hardcoded linkedlist """

    a = node('A')
    b = node('B')
    c = node('C')
    d = node('D')

    a.next = b
    b.next = c
    c.next = d

    # call linkedlist.
    printLinkedList(a)
