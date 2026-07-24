 /**
 * @file This script handles all ways we can construct a string out of given substrings.
 * @module Algorithms/DynamicProgramming/Examples/ConstructStrings/AllConstruct/allConstruct.js
 * @author Ayfantis <ayfantis53>
 */

 
/**
 * Finds out all ways we can construct a string out of given substrings.
 * O(n^m * k) time complexity           O(n^m) Space complexity
 * @param {String} target  word we are trying to make using substrings.
 * @param {Array} wordBank substrings we are testing to create target word.
 * @returns [Array] of all string combinations.
 */
const allConstruct = (target, wordBank) => {
    // Checks if a target is empty, stops the function, & returns a list containing an empty list.
    if (target === '') { return [[]] };

    const result = [];
    
    // loop through every item in wordBank.
    for (let word of wordBank) {
        if (target.indexOf(word) === 0) {
            // Extracts a portion of a string or array by removing a prefix.
            const suffix     = target.slice(word.length);
            const suffixWays = allConstruct(suffix, wordBank);
            // takes suffixWays & creates new array adding word to each item in suffixWays.
            const targetWays = suffixWays.map(way => [ word, ...way ]);
            // unpacks all items from targetWays array & adds them to end of result array using the spread operator.
            result.push(...targetWays);
        }
    }

    return result;
} 

/**
 * Memoized Finds out all ways we can construct a string out of given substrings.
 * O(n * m^2) time complexity           O(m^2) Space complexity
 * @param {String} target  word we are trying to make using substrings.
 * @param {Array} wordBank substrings we are testing to create target word.
 * @param {Array} memo      cache or storage container that saves the output of a function.
 * @returns [Array] of all string combinations.
 */
const allConstructMemoized = (target, wordBank, memo = []) => {
    // checks if key target already exists inside a dictionary memo.
    if (target in memo) { return memo[target]; }
    // Checks if a target is empty, stops the function, & returns a list containing an empty list.
    if (target === '') { return [[]]; }

    const result = [];
    
    // loop through every item in wordBank.
    for (let word of wordBank) {
        // Checks if the string target starts with the string word.
        if (target.indexOf(word) === 0) {
            // Extracts a portion of a string or array by removing a prefix.
            const suffix     = target.slice(word.length);
            const suffixWays = allConstructMemoized(suffix, wordBank, memo);
            // takes suffixWays & creates new array adding word to each item in suffixWays.
            const targetWays = suffixWays.map(way => [ word, ...way ]);
            // unpacks all items from targetWays array & adds them to end of result array using the spread operator.
            result.push(...targetWays);
        }
    }

    memo[target] = result;
    return result;
}

/**
 * Tabulated Finds out all ways we can construct a string out of given substrings.
 * O(n^m) time complexity           O(n^m) Space complexity
 * @param {String} target word we are trying to make using substrings.
 * @param {Array} substrs substrings we are testing to create target word.
 * @returns [Array] of all string combinations.
 */
const allConstructTabulated = (target, wordBank) => {
    // creates a two-dimensional array (a matrix) filled with empty arrays.
    const table = Array(target.length + 1)
        .fill(null)
        .map(() => []);

    // sets the first item of an array to a nested array containing an empty array.
    table[0] = [[]];

    // loops as many times as length of target word.
    for (let i = 0; i <= target.length; i++) {
        // table[i] is not considered empty.
        if (table[i].length > 0) {
            // loop through every item in wordBank.
            for (let word of wordBank) {
                // slices a portion of a string (i: start, word.length: end) see if it equals word.
                if (target.slice(i, i + word.length) === word) {
                    // creates new array, appending the value word to end of every nested array found inside table[i].
                    const newCombinations = table[i].map(subArray => [...subArray, word]);
                    // adds new items to array located at a specific index inside a larger array or object.
                    table[i + word.length].push(...newCombinations);
                }
            }
        }
    }

    return table[target.length];
}

// Main Code

console.log(allConstruct('purple', ['purp', 'p', 'ur', 'le', 'purpl']));
console.log(allConstructTabulated('purple', ['purp', 'p', 'ur', 'le', 'purpl']));
console.log(allConstruct('abcdef', ['ab', 'abc', 'cd', 'def', 'abcd']));
console.log(allConstruct('skateboard', ['bo', 'rd', 'ate', 't', 'ska', 'sk', 'boar']));
console.log(allConstruct('enterapotentpot', ['a', 'p', 'ent', 'enter', 'ot', 'o', 't']));
console.log(allConstructTabulated('enterapotentpot', ['a', 'p', 'ent', 'enter', 'ot', 'o', 't']));
console.log(allConstructMemoized('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef', ['e', 'ee', 'eee', 'eeee', 'eeeee', 'eeeeee']));