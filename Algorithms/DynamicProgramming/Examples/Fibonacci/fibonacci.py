"""Memoize a Fibonacci sequence function."""


def fibonacci(input: int) -> int:
    """Function that calculates the nth Fibonacci number.

    Args:
        input (int): The index of the Fibonacci number to calculate (non-negative integer).

    Returns:
        [int] The nth Fibonacci number.
    """
    if input <= 2:
        return 1
    
    return fibonacci(input - 1) + fibonacci(input - 2)

def fibonacciMemoized(input: int, memo: dict = {}) -> int:
    """Memoized function that calculates the nth Fibonacci number.

    Args:
        input (int): The index of the Fibonacci number to calculate (non-negative integer).
        memo (dict): used as a cache to store previously computed values.

    Returns:
        [int] The nth Fibonacci number.
    """
    if input in memo:
        return memo[input]
    if input <= 2:
        return 1
    
    memo[input] = fibonacciMemoized(input - 1, memo) + fibonacciMemoized(input - 2, memo)
    
    return memo[input]

def fibonacciTabulated(input: int) -> int:
    """Tabulated function that calculates the nth Fibonacci number.

    Args:
        input (int): The index of the Fibonacci number to calculate (non-negative integer).

    Returns:
        [int] The nth Fibonacci number.
    """
    table = [0] * (input + 1)
    
    table[1] = 1

    for i in range(0, input):
        table[i + 1] += table[i]
        table[i + 2] += table[i]

    return table[input]


def main():
    """Memoize a Fibonacci sequence function."""
    input1 = 2
    input2 = 5
    input3 = 9
    input4 = 11

    input5 = 50
    input6 = 60
    input7 = 70

    print(f"----------------- NON MEMOIZED CODE -----------------")
    print(f'Fibonacci number of {input1} is: [{fibonacci(input1)}]')
    print(f'Fibonacci number of {input2} is: [{fibonacci(input2)}]')
    print(f'Fibonacci number of {input3} is: [{fibonacci(input3)}]')
    print(f'Fibonacci number of {input4} is: [{fibonacci(input4)}]')

    print(f"------------------- MEMOIZED CODE -------------------")
    print(f'Fibonacci number MEMOIZED of {input5} is: [{fibonacciMemoized(input5)}]')
    print(f'Fibonacci number MEMOIZED of {input6} is: [{fibonacciMemoized(input6)}]')
    print(f'Fibonacci number MEMOIZED of {input7} is: [{fibonacciMemoized(input7)}]')

    print(f"------------------- TABULATED CODE --------------------")
    print(f'Fibonacci number TABULATED of {input5} is: [{fibonacciMemoized(input5)}]')
    print(f'Fibonacci number TABULATED of {input6} is: [{fibonacciMemoized(input6)}]')
    print(f'Fibonacci number TABULATED of {input7} is: [{fibonacciMemoized(input7)}]')


# Main Code
if __name__ == '__main__':
    """ Ensure this code only runs if the script is executed. Not when it's imported as a module by another file."""
    main()