# ---------------------------------------------
# 
# Find max path of a Binary Tree
# ---------------------------------------------

class Node:
    """ Class that defines our Node """

    def __init__(self, value):
        self.value = value
        self.left  = None
        self.right = None


def maxPathDFS(root):
    """
    Depth First Search find max path of a Binary Tree

    Args:
        root(Node): first Node in Binary Tree.

    Returns:
        [void] 
    """
    sum = 0
    nodes = [root]

    while len(nodes):
        current = nodes.pop()
        sum+=current.value

        if current.left != None and current.left.value > current.right.value:
            nodes.append(current.left)
        elif current.right != None and current.right.value > current.left.value:
            nodes.append(current.right)
        else:
            continue

    print(f'[{sum}] is the MAX PATH of tree')
    return


def maxPathBFS(root):
    """
    Breadth First Search find max path of a Binary Tree

    Args:
        root(Node): first Node in Binary Tree.

    Returns:
        [void] 
    """
    sum = 0
    nodes = [root]

    while len(nodes):
        current = nodes.pop(0)
        sum+=current.value

        if current.left != None and current.left.value > current.right.value:
            nodes.append(current.left)
        elif current.right != None and current.right.value > current.left.value:
            nodes.append(current.right)
        else:
            continue

    print(f'[{sum}] is the MAX PATH of tree')
    return


def maxPathDFSRecurs(root):
    """
    Depth First Search find max path of a Binary Tree recursively

    Args:
        root(Node): first Node in Binary Tree.

    Returns:
        [void] 
    """
    if root == None:
        return float('-inf')
    if root.right == None and root.left == None:
        return root.value
    
    maxChildPathSum = max(maxPathDFSRecurs(root.left), maxPathDFSRecurs(root.right))
    return root.value + maxChildPathSum


# Main Code
if __name__ == '__main__':
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
    print(f"--------- DFS ---------")
    maxPathDFS(a)

    print(f"--------- BFS ---------")
    maxPathBFS(a)

    # Recursive function calls.
    print(f"------ RECURSION ------")
    print(f'[{maxPathDFSRecurs(a)}] is the MAX PATH of tree')


    # ---------------------
    #        TREE
    # ---------------------
    #          5
    #         / \
    #        7   4
    #       / \   \
    #      8   3   9