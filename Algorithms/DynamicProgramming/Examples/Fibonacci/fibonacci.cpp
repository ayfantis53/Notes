#include <iostream>
#include <unordered_map>


std::unordered_map<int, long long> memo;

/// @brief Function that calculates the nth Fibonacci number
/// @param input The index of the Fibonacci number to calculate (non-negative integer).
/// @return [Long] The nth Fibonacci number.
auto fibonacci(int input) -> long long
{
    if (input <= 2) { return 1; }

    return fibonacci(input - 1) + fibonacci(input - 2); 
}

/// @brief Function that calculates the nth Fibonacci number
/// @param input The index of the Fibonacci number to calculate (non-negative integer).
/// @param memo  used as a cache to store previously computed values.
/// @return [Long] The nth Fibonacci number.
auto fibonacciMemoized(int input) -> long long 
{
    if (memo.count(input)) { return memo[input]; }
    if (input <= 2)        { return 1; }

    long long result = fibonacciMemoized(input - 1) + fibonacciMemoized(input - 2);
    memo[input] = result;
    return result;
}

/// @brief Main Code
auto main() -> int
{
    int input1 = 2;
    int input2 = 5;
    int input3 = 9;
    int input4 = 11;

    int input5 = 50;
    int input6 = 60;
    int input7 = 70;

    std::cout << "------------------ NON MEMOIZED CODE ------------------ " << std::endl;
    std::cout << "Fibonacci number of " << input1 << " is: [" << fibonacci(input1) << "]" << std::endl;
    std::cout << "Fibonacci number of " << input2 << " is: [" << fibonacci(input2) << "]" << std::endl;
    std::cout << "Fibonacci number of " << input3 << " is: [" << fibonacci(input3) << "]" << std::endl;
    std::cout << "Fibonacci number of " << input4 << " is: [" << fibonacci(input4) << "]" << std::endl;

    std::cout << "-------------------- MEMOIZED CODE -------------------- "<< std::endl;
    std::cout << "Fibonacci number MEMOIZED of " << input5 << " is:  [" << fibonacciMemoized(input5) << "]" << std::endl;
    memo.clear();
    std::cout << "Fibonacci number MEMOIZED of " << input6 << " is:  [" << fibonacciMemoized(input6) << "]" << std::endl;
    memo.clear();
    std::cout << "Fibonacci number MEMOIZED of " << input7 << " is:  [" << fibonacciMemoized(input7) << "]" << std::endl;
    memo.clear();

    return 1;
}