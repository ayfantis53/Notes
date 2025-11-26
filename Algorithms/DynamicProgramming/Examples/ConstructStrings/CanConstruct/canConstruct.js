/** ---------------------------------------------
 * 
 * Finds out if we can construct a string out of given substrings
 --------------------------------------------- */

/**
 * Finds out if we can construct a string out of given substrings
 * 
 * @param {String} target word we are trying to make using substrings.
 * @param {Array} substrs substrings we are testing to create target word
 * @returns [bool]
 */
const canConstruct = (target, wordBank) => {
    if (target === '') { return true; }

    for (let word of wordBank) {
        if (target.indexOf(word) === 0) {
            const suffix = target.slice(word.length);
            if (canConstruct(suffix, wordBank)) {
                return true;
            }
        }
    }

    return false;
} 

/**
 * Memoized Finds out if we can construct a string out of given substrings
 * 
 * @param {String} target word we are trying to make using substrings.
 * @param {Array} substrs substrings we are testing to create target word
 * @returns [bool]
 */
const canConstructMemoized = (target, wordBank, memo = []) => {
    if (target in memo) { return memo[target]; }
    if (target === '') { return true; }

    for (let word of wordBank) {
        if (target.indexOf(word) === 0) {
            const suffix = target.slice(word.length);
            if (canConstructMemoized(suffix, wordBank, memo)) {
                memo[target] = true
                return memo[target];
            }
        }
    }

    memo[target] = false;
    return memo[target];
}

/**
 * Tabulated Finds out if we can construct a string out of given substrings
 * O(m^2 * n) time complexity           O(m) Space complexity
 * @param {String} target word we are trying to make using substrings.
 * @param {Array} wordBank substrings we are testing to create target word
 * @returns [bool]
 */
const canConstructTabulated = (target, wordBank) => {
    const table = Array(target.length + 1).fill(false);

    table[0] = true;

    for (let i = 0; i <= target.length; i++) {
        if (table[i] === true) {
            for (let word of wordBank) {
                if (target.slice(i, i + word.length) === word) {
                    table[i + word.length] = true;
                }
            }
        }
    }

    return table[target.length];
} 

// Main Code

console.log(canConstruct('abcdef', ['ab', 'abc', 'cd', 'def', 'abcd']));
console.log(canConstruct('skateboard', ['bo', 'rd', 'ate', 't', 'ska', 'sk', 'boar']));
console.log(canConstruct('enterapotentpot', ['a', 'p', 'ent', 'enter', 'ot', 'o', 't']));
console.log(canConstructMemoized('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef', ['e', 'ee', 'eee', 'eeee', 'eeeee', 'eeeeee']));
console.log(canConstructTabulated('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef', ['e', 'ee', 'eee', 'eeee', 'eeeee', 'eeeeee']));