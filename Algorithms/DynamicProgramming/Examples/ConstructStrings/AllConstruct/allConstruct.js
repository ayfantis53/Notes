/** ---------------------------------------------
 * 
 * Finds out all ways we can construct a string out of given substrings
 --------------------------------------------- */

/**
 * Finds out all ways we can construct a string out of given substrings
 * O(n^m * k) time complexity           O(n^m) Space complexity
 * @param {String} target word we are trying to make using substrings.
 * @param {Array} substrs substrings we are testing to create target word
 * @returns [bool]
 */
const allConstruct = (target, wordBank) => {
    if (target === '') return [[]];

    const result = [];
    
    for (let word of wordBank) {
        if (target.indexOf(word) === 0) {
            const suffix     = target.slice(word.length);
            const suffixWays = allConstruct(suffix, wordBank);
            const targetWays = suffixWays.map(way => [ word, ...way ]);
            result.push(...targetWays);
        }
    }

    return result;
} 

/**
 * Memoized Finds out all ways we can construct a string out of given substrings
 * O(n * m^2) time complexity           O(m^2) Space complexity
 * @param {String} target word we are trying to make using substrings.
 * @param {Array} wordBank substrings we are testing to create target word
 * @returns [bool]
 */
const allConstructMemoized = (target, wordBank, memo = []) => {
    if (target in memo) { return memo[target]; }
    if (target === '') { return [[]]; }

    const result = [];
    
    for (let word of wordBank) {
        if (target.indexOf(word) === 0) {
            const suffix     = target.slice(word.length);
            const suffixWays = allConstructMemoized(suffix, wordBank, memo);
            const targetWays = suffixWays.map(way => [ word, ...way ]);
            result.push(...targetWays);
        }
    }

    memo[target] = result;
    return result;
}

/**
 * Tabulated Finds out all ways we can construct a string out of given substrings
 * O(n^m) time complexity           O(n^m) Space complexity
 * @param {String} target word we are trying to make using substrings.
 * @param {Array} substrs substrings we are testing to create target word
 * @returns [bool]
 */
const allConstructTabulated = (target, wordBank) => {
    const table = Array(target.length + 1)
        .fill(null)
        .map(() => []);

    table[0] = [[]];

    for (let i = 0; i <= target.length; i++) {
        if (table[i].length > 0) {
            for (let word of wordBank) {
                if (target.slice(i, i + word.length) === word) {
                    const newCombinations = table[i].map(subArray => [...subArray, word]);
                    table[i + word.length].push(...newCombinations);
                }
            }
        }
    }

    return table[target.length];
} 

function allConstructTabulation(target, wordBank) {
  const table = Array(target.length + 1)
    .fill(null)
    .map(() => []); // Initialize with empty arrays

  table[0] = [[]]; // Base case: one way to construct an empty string

  for (let i = 0; i <= target.length; i++) {
    if (table[i].length > 0) { // Only proceed if a prefix can be constructed
      for (let word of wordBank) {
        if (target.slice(i, i + word.length) === word) {
          const newCombinations = table[i].map(combo => [...combo, word]);
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