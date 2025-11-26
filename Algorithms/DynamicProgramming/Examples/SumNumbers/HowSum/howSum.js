/** ---------------------------------------------
 * 
 * Find out how we can sum the target
 --------------------------------------------- */

/**
 * Given a target and a list of numbers how can we make the sum with the list
 * 
 * @param {Number} target number we are trying to make a sum of.
 * @param {List} numbers  List of numbers we are using to see if we can sum to target.
 * @returns [Array] if you can sum based on numbers  
 */
const howSum = (target, numbers) => {
    if (target === 0) { return []; }
    if (target < 0) { return null; }

    for (let num of numbers) {
        const remainder = target - num;
        const result = howSum(remainder, numbers);
        if (result) {
            return [...result, num];
        }
    }

    return null;
}

/**
 * Memoized Given a target and a list of numbers can we make the sum with the list
 * 
 * @param {Number} target number we are trying to make a sum of.
 * @param {List} numbers  List of numbers we are using to see if we can sum to target.
 * @returns [Array] if you can sum based on numbers 
 */
const howSumMemoized = (target, numbers, memo = []) => {
    if (target in memo) { return memo[target]; }
    if (target === 0) { return []; }
    if (target < 0) { return null; }

    for (let num of numbers) {
        const remainder = target - num;
        const result = howSumMemoized(remainder, numbers, memo);
        if (result) {
            memo[target] = [ ...result, num];
            return memo[target];
        }
    }

    memo[target] = null;
    return null;
}

/**
 * Tabulated Given a target and a list of numbers can we make the sum with the list
 * O(m^2 * n) time complexity           O(m^2) Space complexity
 * @param {Number} target number we are trying to make a sum of.
 * @param {List} numbers  List of numbers we are using to see if we can sum to target.
 * @returns [Array] if you can sum based on numbers 
 */
const howSumTabulated = (target, numbers) => {
    const table = Array(target + 1).fill(null);

    table[0] = [];

    for (let i = 0; i <= target; i++) {
        if (table[i] !== null) {
            for (let num of numbers) {
                table[i + num] = [ ...table[i], num ];
            }
        }
    }

    return table[target];
}

// Main Code
console.log(howSum(7, [2, 3]));
console.log(howSum(7, [5, 3, 4, 7]));
console.log(howSum(7, [2, 4]));
console.log(howSum(8, [2, 3, 5]));
console.log(howSumMemoized(300, [7, 14]));
console.log(howSumTabulated(300, [7, 14]));