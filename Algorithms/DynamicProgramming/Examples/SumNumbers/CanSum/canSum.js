/** ---------------------------------------------
 * 
 * Find out if we can sum the target
 --------------------------------------------- */

/**
 * Given a target and a list of numbers can we make the sum with the list
 * 
 * @param {Number} target number we are trying to make a sum of.
 * @param {List} numbers  List of numbers we are using to see if we can sum to target.
 * @returns [bool] if you can sum based on numbers  
 */
const canSum = (target, numbers) => {
    if (target === 0) { return true; }
    if (target < 0)   { return false; }

    for (let num of numbers) {
        const remainder = target - num;
        if (canSum(remainder, numbers)) {
            return true;
        }
    }

    return false;
}

/**
 * Memoized Given a target and a list of numbers can we make the sum with the list
 * 
 * @param {Number} target number we are trying to make a sum of.
 * @param {List} numbers  List of numbers we are using to see if we can sum to target.
 * @returns [bool] if you can sum based on numbers 
 */
const canSumMemoized = (target, numbers, memo = []) => {
    if (target in memo) {return memo[target]; }
    if (target === 0) { return true; }
    if (target < 0)   { return false; }

    for (let num of numbers) {
        const remainder = target - num;
        if (canSumMemoized(remainder, numbers, memo)) {
            memo[target] = true;
            return true;
        }
    }

    memo[target] = false;
    return false;
}

/**
 * Tabulated Given a target and a list of numbers can we make the sum with the list
 * O(m * n) time complexity           O(m) Space complexity
 * @param {Number} target number we are trying to make a sum of.
 * @param {List} numbers  List of numbers we are using to see if we can sum to target.
 * @returns [bool] if you can sum based on numbers  
 */
const canSumTabulated = (target, numbers) => {
    const table = Array(target + 1).fill(false);

    table[0] = true;

    for (let i = 0; i <= target; i++) {
        if (table[i] === true) {
            for (let num of numbers) {
                table[i + num] = true;
            }
        }
    }

    return table[target];
}

// Main Code
console.log(canSum(7, [2, 3]));
console.log(canSum(7, [5, 3, 4, 7]));
console.log(canSum(7, [2, 4]));
console.log(canSum(8, [2, 3, 5]));
console.log(canSumMemoized(300, [7, 14]));
console.log(canSumTabulated(300, [7, 14]));