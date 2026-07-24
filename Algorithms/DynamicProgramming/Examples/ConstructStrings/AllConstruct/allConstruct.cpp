#include <iostream>
#include <string>
#include <unordered_map>
#include <vector>


std::unordered_map<std::string, std::vector<std::vector<std::string>>> memo;

/// @brief Finds out all ways we can construct a string out of given substrings.
/// O(n^m * k) time complexity           O(n^m) Space complexity
/// @param target   word we are trying to make using substrings.
/// @param wordBank substrings we are testing to create target word.
/// @return [Array] of all string combinations.
auto allConstruct(std::string target, std::vector<std::string> wordBank) -> std::vector<std::vector<std::string>> 
{
    // Checks if a target is empty, stops the function, & returns a list containing an empty list.
    if (target.empty()) { return { {} }; };

    std::vector<std::vector<std::string>> result;
    
    // loop through every item in wordBank.
    for (const std::string& word : wordBank)
    {
        if (target.find(word) == 0) 
        {
            // Extracts a portion of a string or array by removing a prefix.
            std::string suffix = target.substr(word.length());
            auto suffixWays    = allConstruct(suffix, wordBank);
            // takes suffixWays & creates new array adding word to each item in suffixWays.
            // Append the current word to the beginning of all valid suffix combinations
            for (auto& way : suffixWays) 
            {
                way.insert(way.begin(), word);
                result.push_back(way);
            }
        }
    }

    return result;
} 

/// @brief Finds out all ways we can construct a string out of given substrings.
/// O(n^m * k) time complexity           O(n^m) Space complexity
/// @param target   word we are trying to make using substrings.
/// @param wordBank substrings we are testing to create target word.
/// @return [Array] of all string combinations.
auto allConstructMemoized(std::string target, std::vector<std::string> wordBank) -> std::vector<std::vector<std::string>>
{
    // checks if key target already exists inside a dictionary memo.
    if (memo.count(target)) return memo[target];
    // Checks if a target is empty, stops the function, & returns a list containing an empty list.
    if (target.empty()) { return { {} }; };

    std::vector<std::vector<std::string>> result;
    
    // loop through every item in wordBank.
    for (const std::string& word : wordBank) 
    {
        // Checks if the string target starts with the string word.
        if (target.find(word) == 0) 
        {
            // Extracts a portion of a string or array by removing a prefix.
            std::string suffix = target.substr(word.length());
            auto suffixWays    = allConstructMemoized(suffix, wordBank);
            // Append the current word to the beginning of all valid suffix combinations
            for (auto& way : suffixWays) 
            {
                way.insert(way.begin(), word);
                result.push_back(way);
            }
        }
    }

    memo[target] = result;
    return result;
}

/// @brief Tabulated Finds out all ways we can construct a string out of given substrings.
/// O(n^m) time complexity           O(n^m) Space complexity
/// @param target  word we are trying to make using substrings.
/// @param substrs substrings we are testing to create target word.
/// @returns [Array] of all string combinations.
auto allConstructTabulated(std::string target, std::vector<std::string> wordBank) -> std::vector<std::vector<std::string>>
{
    // creates a two-dimensional array (a matrix) filled with empty arrays.
    std::vector<std::vector<std::vector<std::string>>> table(target.length() + 1);

    // sets the first item of an array to a nested array containing an empty array.
    table[0].push_back({});

    // loops as many times as length of target word.
    for (int i = 0; i <= target.length(); i++) {
        // table[i] is not considered empty.
        if (!table[i].empty()) 
        {
            // loop through every item in wordBank.
            for (const std::string& word : wordBank)
            {
                // slices a portion of a string (i: start, word.length: end) see if it equals word.
                if (i + word.length() <= target.length() && target.substr(i, word.length()) == word)
                {
                    // For each existing combination at table[i], append the new word.
                    for (const auto& way : table[i])
                    {
                        std::vector<std::string> newWay = way;
                        newWay.push_back(word);
                        table[i + word.length()].push_back(newWay);
                    }
                }
            }
        }
    }

    return table[target.length()];
}

/// @brief Print the outputs in a clean way.
/// @param results results from algorithm ran.
auto print_results(std::vector<std::vector<std::string>> results) -> void
{
    std::cout << "[";

    for (auto& result : results)
    {
        std::cout << "[";

        for (auto& res : result)
        {
            std::cout << res << ", ";
        }

        std::cout << "], ";
    }

    std::cout << "]" << std::endl;
}


/// @brief Main Code
auto main() -> int
{
    print_results(allConstruct("purple", {"purp", "p", "ur", "le", "purpl"}));
    print_results(allConstructTabulated("purple", {"purp", "p", "ur", "le", "purpl"}));
    print_results(allConstruct("abcdef", {"ab", "abc", "cd", "def", "abcd"}));
    print_results(allConstruct("skateboard", {"bo", "rd", "ate", "t", "ska", "sk", "boar"}));
    print_results(allConstruct("enterapotentpot", {"a", "p", "ent", "enter", "ot", "o", "t"}));
    print_results(allConstructTabulated("enterapotentpot", {"a", "p", "ent", "enter", "ot", "o", "t"}));
    print_results(allConstructMemoized("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef", {"e", "ee", "eee", "eeee", "eeeee", "eeeeee"}));
}