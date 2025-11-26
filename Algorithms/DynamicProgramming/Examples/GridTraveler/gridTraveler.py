# ---------------------------------------------
# 
#  Memoize a Grid Traveler function
# ---------------------------------------------

def gridTraveler(x, y):
    """
    Function that calculates the shortest path in a gird traveler

    Args:
        x (Number): size of grid we will be traveling in.
        y (Number): size of grid we will be traveling in.

    Returns:
        [Number] the amount of ways we can travel grid
    """
    if x == 1 and y == 1:
        return 1
    if x == 0 or y == 0:
        return 0 

    return gridTraveler(x - 1, y) + gridTraveler(x, y - 1)


def gridTravelerMemoized(x, y, memo = {}):
    """
    Memoized function that calculates gridTraveler sequence of a given number

    Args:
        x (Number): size of grid we will be traveling in.
        y (Number): size of grid we will be traveling in.
        memo (Object):  used as a cache to store previously computed values.

    Returns: 
        [Number] the resulting gridTraveler number
    """
    key = str(x) + "," + str(y)

    if key in memo:  
        return memo[key]
    if x == 1 and y == 1:
        return 1
    if x == 0 or y == 0:
        return 0

    memo[key] = gridTravelerMemoized(x - 1, y, memo) + gridTravelerMemoized(x, y - 1, memo)
    return memo[key]


# Main Code
if __name__ == '__main__':
    print(f'------------------ NON MEMOIZED CODE ------------------')
    print(f'Amount of paths for {1, 1} is: [{gridTraveler(1, 1)}]')
    print(f'Amount of paths for {2, 3} is: [{gridTraveler(2, 3)}]')
    print(f'Amount of paths for {3, 2} is: [{gridTraveler(3, 2)}]')
    print(f'Amount of paths for {3, 3} is: [{gridTraveler(3, 3)}]')

    print(f'-------------------- MEMOIZED CODE -------------------- ')
    print(f'MEMOIZED Amount of paths for {18, 18} is: [{gridTravelerMemoized(18, 18)}]')

