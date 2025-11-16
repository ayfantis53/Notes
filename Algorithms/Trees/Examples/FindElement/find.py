# ---------------------------------------------
# 
#  Depth First Search of a Binary Tree
# ---------------------------------------------

class Node:
    """ Class that defines our Node """

    def __init__(self, value):
        self.value = value
        self.left  = None
        self.right = None

def findDFS(root, target):
    """
    Depth First Search of a Binary Tree

    Args:
        root (Node):     first Node in Binary Tree.
        target (String): value to find in Binary Tree.

    Returns:
        [bool] if value was found in tree
    """

    nodes = [ root ]

    while len(nodes) > 0:
        current = nodes.pop()
        if current.value == target:
            print(f'[{target}] FOUND in tree!')
            return True

        if current.right:
            nodes.append(current.right)
        if current.left:
            nodes.append(current.left)

    print(f'[{target}] NOT FOUND in tree!')
    return False

def findBFS(root, target):
    """
    Breadth First Search of a Binary Tree

    Args:
        root (Node):     first Node in Binary Tree.
        target (String): value to find in Binary Tree.

    Returns:
        [bool] if value was found in tree
    """

    nodes = [ root ]

    while len(nodes) > 0:
        current = nodes.pop(0)
        if current.value == target:
            print(f'[{target}] FOUND in tree!')
            return True

        if current.right:
            nodes.append(current.right)
        if current.left:
            nodes.append(current.left)

    print(f'[{target}] NOT FOUND in tree!')
    return False
    

def findDFSRecurs(root, target):
    """
    Depth First Search of a Binary Tree Recursion

    root (Node):     first Node in Binary Tree.
        target (String): value to find in Binary Tree.
    
    Returns:
        [bool] if value was found in tree
    """

    if root == None:
        return False
    if root.value == target:
        return True
    
    rightValues = findDFSRecurs(root.right, target)
    if rightValues == True:
        return True
    leftValues  = findDFSRecurs(root.left, target)
    if leftValues == True:
        return True

    return False

def printResult(isFound, target):
    if isFound == True:
        print(f'[{target}] FOUND in tree!')
    else:
        print(f'[{target}] NOT FOUND in tree!')

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
    print(f'--------- DFS ---------')
    findDFS(a, 'a')
    findDFS(a, 'b')
    findDFS(a, 'c')
    findDFS(a, 'd')
    findDFS(a, 'e')
    findDFS(a, 'f')
    findDFS(a, 'g')

    print(f'--------- BFS ---------')
    findBFS(a, 'a')
    findBFS(a, 'b')
    findBFS(a, 'c')
    findBFS(a, 'd')
    findBFS(a, 'e')
    findBFS(a, 'f')
    findBFS(a, 'g')

    print(f'---- RECURSION DFS ----')

    # Recursive function calls.
    printResult(findDFSRecurs(a, 'a'), 'a')
    printResult(findDFSRecurs(a, 'b'), 'b')
    printResult(findDFSRecurs(a, 'c'), 'c')
    printResult(findDFSRecurs(a, 'd'), 'd')
    printResult(findDFSRecurs(a, 'e'), 'e')
    printResult(findDFSRecurs(a, 'f'), 'f')
    printResult(findDFSRecurs(a, 'g'), 'g')

# ---------------------
#        TREE
# ---------------------
#          a
#         / \
#        b   c
#       / \   \
#      d   e   f
