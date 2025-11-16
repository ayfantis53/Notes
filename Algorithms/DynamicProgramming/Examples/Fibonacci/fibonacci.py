# ---------------------------------------------
# 
#  Memoize a Fibonacci sequence function
# ---------------------------------------------

def fibonacci(input):
    """
    Function that calculates fibonacci sequence of a given number

    Args:
        input (Number): given number to find fibonacci sequence of.

    Returns:
        [Number] the resulting fibonacci number
    """
    if input <= 2:
        return 1
    
    return fibonacci(input - 1) + fibonacci(input - 2)

def fibonacciMemoized(input, memo = {}):
    """
    Memoized function that calculates fibonacci sequence of a given number

    Args:
        input (Number):    given number to find fibonacci sequence of.
        memo (Dictionary): used as a cache to store previously computed values.

    Returns:
        [Number] the resulting fibonacci number
    """
    if input in memo:
        return memo[input]
    if input <= 2:
        return 1
    
    memo[input] = fibonacciMemoized(input - 1, memo) + fibonacciMemoized(input - 2, memo)
    
    return memo[input]


# Main Code
if __name__ == '__main__':
    input1 = 2
    input2 = 5
    input3 = 9
    input4 = 11

    input5 = 50
    input6 = 60
    input7 = 70

    print(f"----------------- NON MEMOIZED CODE ----------------- ")
    print(f'Fibonacci number of {input1} is: [{fibonacci(input1)}]')
    print(f'Fibonacci number of {input2} is: [{fibonacci(input2)}]')
    print(f'Fibonacci number of {input3} is: [{fibonacci(input3)}]')
    print(f'Fibonacci number of {input4} is: [{fibonacci(input4)}]')

    print(f"------------------- MEMOIZED CODE ------------------- ")
    print(f'Fibonacci number MEMOIZED of {input5} is: [{fibonacciMemoized(input5)}]')
    print(f'Fibonacci number MEMOIZED of {input6} is: [{fibonacciMemoized(input6)}]')
    print(f'Fibonacci number MEMOIZED of {input7} is: [{fibonacciMemoized(input7)}]')