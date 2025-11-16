# ---------------------------------------------
# 
#  Sum all values of a Binary Tree
# ---------------------------------------------

class Node:
    """ Class that defines our Node """

    def __init__(self, value):
        self.value = value
        self.left  = None
        self.right = None


def sumDFS(root):
    """
    Depth First Search Sum all values of a Binary Tree

    Args:
        root (Node): first Node in Binary Tree.

    Returns:
        [void]
    """
    sum = 0
    nodes = [root]

    while len(nodes) > 0:
        current = nodes.pop()
        sum += current.value

        if current.right != None:
            nodes.append(current.right)
        if current.left != None:
            nodes.append(current.left)

    print(f'[{sum}] is the SUM of all tree nodes')
    return

def sumBFS(root):
    """
    Breadth First Search Sum all values of a Binary Tree

    Args:
        root (Node): first Node in Binary Tree.

    Returns:
        [void]
    """
    sum = 0
    nodes = [root]

    while len(nodes) > 0:
        current = nodes.pop(0)
        sum += current.value

        if current.right != None:
            nodes.append(current.right)
        if current.left != None:
            nodes.append(current.left)

    print(f'[{sum}] is the SUM of all tree nodes')
    return

def sumDFSRecurs(root):
    """
    Depth First Search Sum all values of a Binary Tree recursively

    Args:
        root (Node): first Node in Binary Tree.

    Returns:
        [void]
    """

    if root == None:
        return 0
    
    return root.value + sumDFSRecurs(root.left) + sumDFSRecurs(root.right)

# Main Code
if __name__ == '__main__':
    a = Node(1)
    b = Node(2)
    c = Node(3)
    d = Node(4)
    e = Node(5)
    f = Node(6)

    a.left  = b
    a.right = c
    b.left  = d
    b.right = e
    c.right = f

    # Non recursive function calls.
    print(f'--------- DFS ---------')
    sumDFS(a)

    print(f'--------- BFS ---------')
    sumBFS(a)

    # Recursive function calls.
    print(f'------ RECURSION ------')
    print(f'[{sumDFSRecurs(a)}] is the SUM of all tree nodes')


    # ---------------------
    #        TREE
    # ---------------------
    #          1
    #         / \
    #        2   3
    #       / \   \
    #      4   5   6
