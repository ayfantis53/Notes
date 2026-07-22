"""Find minimum value of a Binary Tree."""


class Node:
    """Class that defines our Node.
    
    Attributes:
        value (str):  Value being stored in node of tree.
        left (Node):  left node that this node points to.
        right (Node): right node that this node points to.
    """

    def __init__(self, value: str) -> None:
        """Initializes the Node object.
        
        Args:
            value (str): Value being stored in node of tree.
        """
        self.value = value
        self.left  = None
        self.right = None


def minDFS(root: Node) -> None:
    """Depth First Search find min of a Binary Tree.

    Args:
        root (Node): first Node in Binary Tree.
    """
    min   = float('inf')
    nodes = [root]

    while len(nodes) > 0:
        current = nodes.pop()
        if current.value < min:
            min = current.value
        
        if current.right != None:
            nodes.append(current.right)

        if current.left != None:
            nodes.append(current.left) 

    print(f'[{min}] is the MINIMUM of all tree nodes')
    return


def minBFS(root: Node) -> None:
    """Breadth First Search find min of a Binary Tree.

    Args:
        root (Node): first Node in Binary Tree.
    """
    min = float('inf')
    nodes = [root]

    while len(nodes) > 0:
        current = nodes.pop(0)

        if current.value < min:
            min = current.value
        
        if current.right != None:
            nodes.append(current.right)

        if current.left != None:
            nodes.append(current.left) 

    print(f'[{min}] is the MINIMUM of all tree nodes')
    return

def minDFSRecurs(root: Node) -> int:
    """Depth First Search find min of a Binary Tree recursively.

    Args:
        root (Node): first Node in Binary Tree.

    Returns:
        [int] returns smallest number in tree.
    """
    if root == None:
        return float('inf')
    
    rightMin = minDFSRecurs(root.right)
    leftMin  = minDFSRecurs(root.left)

    return min(root.value, rightMin, leftMin)


def main():
    """Find minimum value of a Binary Tree."""
    a = Node(5)
    b = Node(7)
    c = Node(4)
    d = Node(8)
    e = Node(3)
    f = Node(9)

    a.left  = b
    a.right = c
    b.left  = d
    b.right = e
    c.right = f

    # Non recursive function calls.
    print(f'--------- DFS ---------')
    minDFS(a)

    print(f'--------- BFS ---------')
    minBFS(a)

    # Recursive function calls.
    print(f'------ RECURSION ------')
    print(f'[{minDFSRecurs(a)}] is the MINIMUM of all tree nodes')


    # ---------------------
    #        TREE
    # ---------------------
    #          5
    #         / \
    #        7   4
    #       / \   \
    #      8   3   9


if __name__ == '__main__':
    """ Ensure this code only runs if the script is executed. Not when it's imported as a module by another file."""
    main()