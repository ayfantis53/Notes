# ---------------------------------------------
# 
#  Breadth First Search of a Binary Tree
# ---------------------------------------------

class Node:
    """ Class that defines our Node """

    def __init__(self, value):
        self.value = value
        self.left  = None
        self.right = None

def bfs(root):
    """
    Breadth First Search of a Binary Tree

    Args:
        root (Node): first Node in Binary Tree.

    Returns:
        [array] of all nodes in depth first search order
    """

    result = []
    nodes = [ root ]

    while len(nodes) > 0:
        current = nodes.pop(0)
        result.append(current.value)

        if current.left:
            nodes.append(current.left)
        if current.right:
            nodes.append(current.right)

    return result


# Main Code
if __name__ == '__main__':
    a = Node('a')
    b = Node('b')
    c = Node('c')
    d = Node('d')
    e = Node('e')
    f = Node('f')

    a.left  = b
    a.right = c
    b.left  = d
    b.right = e
    c.right = f

    # Non recursive function calls.
    print(bfs(a))

    print(f'No Recursive function calls since recusive code utilizes stack and we need a queue for this.')



# ---------------------
#        TREE
# ---------------------
#          a
#         / \
#        b   c
#       / \   \
#      d   e   f
