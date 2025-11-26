/** ---------------------------------------------
 * 
 * Find out how we can sum the target in the best way
 --------------------------------------------- */

/**
 * Given a target and a list of numbers how can we best make the sum with the list
 * 
 * @param {Number} target number we are trying to make a sum of.
 * @param {List} numbers  List of numbers we are using to see if we can sum to target.
 * @returns [Array] if you can sum based on numbers  
 */
const bestSum = (target, numbers) => {
    if (target === 0) { return []; }
    if (target < 0) { return null; }

    let shortestCombo = null;

    for (let num of numbers) {
        const remainder = target - num;
        const result = bestSum(remainder, numbers);
        if (result) {
            const combo = [...result, num];
            if (!shortestCombo || combo.length < shortestCombo.length) {
                shortestCombo = combo;
            }
        }
    }

    return shortestCombo;
}

/**
 * Memoized Given a target and a list of numbers can we best make the sum with the list
 * 
 * @param {Number} target number we are trying to make a sum of.
 * @param {List} numbers  List of numbers we are using to see if we can sum to target.
 * @returns [Array] if you can sum based on numbers 
 */
const bestSumMemoized = (target, numbers, memo = []) => {    
    if (target in memo) { return memo[target]; }
    if (target === 0) { return []; }
    if (target < 0) { return null; }

    let shortestCombo = null;

    for (let num of numbers) {
        const remainder = target - num;
        const result = bestSumMemoized(remainder, numbers, memo);
        if (result) {
            const combo = [...result, num];
            if (!shortestCombo || combo.length < shortestCombo.length) {
                shortestCombo = combo;
            }
        }
    }

    memo[target] = shortestCombo;
    return shortestCombo;
}

/**
 * Tabulated Given a target and a list of numbers can we best make the sum with the list
 * O(m^2 * n) time complexity           O(m^2) Space complexity
 * @param {Number} target number we are trying to make a sum of.
 * @param {List} numbers  List of numbers we are using to see if we can sum to target.
 * @returns [Array] if you can sum based on numbers 
 */
const bestSumTabulated = (target, numbers) => {
    const table = Array(target + 1).fill(null);

    table[0] = [];

    for (let i = 0; i <= target; i++) {
        if (table[i] !== null) {
            for (let num of numbers) {
                const combination = [ ...table[i], num ];

                if (!table[i + num] || table[i + num].length > combination.length) {
                    table[i + num] = combination;
                }
            }
        }
    }

    return table[target];
}

// Main Code
console.log(bestSum(7, [2, 3]));
console.log(bestSum(7, [5, 3, 4, 7]));
console.log(bestSum(7, [2, 4]));
console.log(bestSum(8, [2, 3, 5]));
console.log(bestSum(8, [1, 4, 5]));
console.log(bestSumMemoized(300, [7, 14]));
console.log(bestSumTabulated(300, [7, 14]));
console.log(bestSumTabulated(100, [1, 2, 25, 25]));