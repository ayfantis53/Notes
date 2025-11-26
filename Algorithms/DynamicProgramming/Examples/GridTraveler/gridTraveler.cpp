#include <iostream>
#include <string>
#include <unordered_map>


std::unordered_map<std::string, long long> memo;

/// @brief Function that calculates the shortest path in a gird traveler
/// @param x size of grid we will be traveling in.
/// @param y size of grid we will be traveling in.
/// @return [int] the amount of ways we can travel grid
auto gridTraveler(int x, int y) -> int 
{
    if (x == 1 && y == 1) { return 1; }
    if (x == 0 || y == 0) { return 0; }

    return gridTraveler(x - 1, y) + gridTraveler(x, y - 1);
}

/// @brief Memoized function that calculates gridTraveler sequence of a given number
/// @param x size of grid we will be traveling in.
/// @param y size of grid we will be traveling in.
/// @return [Long] the resulting gridTraveler number
auto gridTravelerMemoized (int x, int y) -> long long
{
    std::string key = std::to_string(x) + "," + std::to_string(y);

    if (memo.count(key)) { return memo[key]; }
    if (x == 1 && y == 1) { return 1; }
    if (x == 0 || y == 0) { return 0; }

    long long result = gridTravelerMemoized(x - 1, y) + gridTravelerMemoized(x, y - 1);
    memo[key] = result;
    return result;
}

/// @brief Main Code
auto main() -> int
{
    std::cout << "------------------ NON MEMOIZED CODE ------------------ " << std::endl;
    std::cout << "Amount of paths for {1, 1} is: [" << gridTraveler(1, 1) << "]" << std::endl;
    std::cout << "Amount of paths for {2, 3} is: [" << gridTraveler(2, 3) << "]" << std::endl;
    std::cout << "Amount of paths for {3, 2} is: [" << gridTraveler(3, 2) << "]" << std::endl;
    std::cout << "Amount of paths for {3, 3} is: [" << gridTraveler(3, 3) << "]" << std::endl;

    std::cout << "-------------------- MEMOIZED CODE -------------------- " << std::endl;
    std::cout << "MEMOIZED Amount of paths for {18, 18} is: [" << gridTravelerMemoized(18, 18) << "]" << std::endl;
    memo.clear();

    return 1;
}

