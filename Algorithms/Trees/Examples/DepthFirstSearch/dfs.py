"""Depth First Search of a Binary Tree."""


class Node:
    """Class that defines our Node."""

    def __init__(self, value):
        """Initialize Node."""
        self.value = value
        self.left  = None
        self.right = None

def dfs(root):
    """Depth First Search of a Binary Tree.

    Args:
        root (Node): first Node in Binary Tree.

    Returns:
        [array] of all nodes in depth first search order.
    """

    result = []
    nodes = [ root ]

    while len(nodes) > 0:
        current = nodes.pop()
        result.append(current.value)

        if current.right:
            nodes.append(current.right)
        if current.left:
            nodes.append(current.left)

    return result
    

def dfsRecurs(root):
    """Depth First Search of a Binary Tree Recursion.

    Args:
        root (Node): first Node in Binary Tree.
    
    Returns:
        [array] of all nodes in depth first search order.
    """
    if root == None:
        return []
    
    rightValues = dfsRecurs(root.right)
    leftValues  = dfsRecurs(root.left)

    result = [root.value] + leftValues + rightValues
    return result


def main():
    """Depth First Search of a Binary Tree."""
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
    print(dfs(a))

    print(f'------ RECURSION ------')

    # Recursive function calls.
    print(dfsRecurs(a))

# ---------------------
#        TREE
# ---------------------
#          a
#         / \
#        b   c
#       / \   \
#      d   e   f


if __name__ == '__main__':
    """ Ensure this code only runs if the script is executed. Not when it's imported as a module by another file."""
    main()