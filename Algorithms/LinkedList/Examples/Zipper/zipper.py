# ---------------------------------------------
# 
#  Zipper combine two linked lists
# ---------------------------------------------

class Node:
    """ Class that defines our Node """

    def __init__(self, value):
        self.value = value
        self.next  = None


def zipper(head1, head2):
    """ 
    Zipper combine two linked lists

    Args:
        head1 (Node): first Node in first Linked List.
        head2 (Node): first Node in second Linked List.

    Returns:
        Node of head1
    """

    count    = 0 
    tail     = head1
    current1 = head1.next
    current2 = head2

    while current1 and current2:
        if count % 2 == 0:
            tail.next = current2
            current2  = current2.next
        else:
            tail.next = current1
            current1  = current1.next

        tail = tail.next
        count += 1

    if current1:
        tail.next = current1
    if current2:
        tail.next = current2

    return head1


def zipperRecur(head1, head2):
    """ 
    Zipper combine two linked lists recursively

    Args:
        head1 (Node): first Node in first Linked List.
        head2 (Node): first Node in second Linked List.

    Returns:
        Node of head1
    """

    if not head1 and not head2:
        return None
    if not head1:
        return head2
    if not head2:
        return head1
    
    next1 = head1.next
    next2 = head2.next

    head1.next = head2
    head2.next = zipperRecur(next1, next2)

    return head1


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

if __name__ == "__main__":

    a = Node('A')
    c = Node('C')
    e = Node('E')
    g = Node('G')

    a.next = c
    c.next = e
    e.next = g

    b = Node('B')
    d = Node('D')
    f = Node('F')
    h = Node('H')

    b.next = d
    d.next = f
    f.next = h

    # Non recursive function calls.
    traverse(zipper(a, b))

    print(f'------ RECURSION ------')

    a.next = c
    c.next = e
    e.next = g
    g.next = None

    b.next = d
    d.next = f
    f.next = h
    h.next = None

    # Recursive function calls.
    zipperRecur(a, b)
    traverse(a)