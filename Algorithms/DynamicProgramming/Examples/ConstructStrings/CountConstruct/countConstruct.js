/** ---------------------------------------------
 * 
 * Finds out how many ways we can construct a string out of given substrings
 --------------------------------------------- */

/**
 * Finds out how many ways we can construct a string out of given substrings
 * O(n^m * m) time complexity           O(m^2) Space complexity
 * @param {String} target word we are trying to make using substrings.
 * @param {Array} substrs substrings we are testing to create target word
 * @returns [Number] amount of ways we can form word
 */
const countConstruct = (target, wordBank) => {
    if (target === '') { return 1; }
    let total = 0;

    for (let word of wordBank) {
        if (target.indexOf(word) === 0) {
            const numWays = countConstruct(target.slice(word.length), wordBank);
            total += numWays;
        }
    }

    return total;
} 

/**
 * Memoized Finds out how many ways we can construct a string out of given substrings
 * O(n * m^2) time complexity           O(m^2) Space complexity
 * @param {String} target word we are trying to make using substrings.
 * @param {Array} substrs substrings we are testing to create target word
 * @returns [Number] amount of ways we can form word
 */
const countConstructMemoized = (target, wordBank, memo = []) => {
    if (target in memo) { return memo[target]; }
    if (target === '') { return 1; }
    let total = 0;

    for (let word of wordBank) {
        if (target.indexOf(word) === 0) {
            const numWays = countConstructMemoized(target.slice(word.length), wordBank, memo);
            total += numWays;
        }
    }

    memo[target] = total
    return total;
}

/**
 * Tabulated Finds out how many ways we can construct a string out of given substrings
 * O(m^2 * n) time complexity           O(m) Space complexity
 * @param {String} target word we are trying to make using substrings.
 * @param {Array} wordBank substrings we are testing to create target word
 * @returns [Number] amount of ways we can form word
 */
const countConstructTabulated = (target, wordBank) => {
    const table = Array(target.length + 1).fill(0);

    table[0] = 1;

    for (let i = 0; i <= target.length; i++) {
        if (table[i] === true) {
            for (let word of wordBank) {
                if (target.slice(i, i + word.length) === word) {
                    table[i + word.length] = table[i];
                }
            }
        }
    }

    return table[target.length];
} 

// Main Code

console.log(countConstruct('abcdef', ['ab', 'abc', 'cd', 'def', 'abcd']));
console.log(countConstruct('skateboard', ['bo', 'rd', 'ate', 't', 'ska', 'sk', 'boar']));
console.log(countConstruct('enterapotentpot', ['a', 'p', 'ent', 'enter', 'ot', 'o', 't']));
console.log(countConstructMemoized('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef', ['e', 'ee', 'eee', 'eeee', 'eeeee', 'eeeeee']));
console.log(countConstructTabulated('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef', ['e', 'ee', 'eee', 'eeee', 'eeeee', 'eeeeee']));