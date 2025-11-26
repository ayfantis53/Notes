/** ---------------------------------------------
 * 
 * Memoize a Fibonacci sequence function
 --------------------------------------------- */

/**
 * Function that calculates the nth Fibonacci number
 * 
 * @param {Number} input The index of the Fibonacci number to calculate (non-negative integer).
 * @returns [Number] The nth Fibonacci number.
 */
const fibonacci = (input) => {
    if (input <= 2) { return 1; }

    return fibonacci(input - 1) + fibonacci(input - 2);
}

/**
 * Memoized function that calculates the nth Fibonacci number
 * 
 * @param {Number} input The index of the Fibonacci number to calculate (non-negative integer).
 * @param {Object} memo used as a cache to store previously computed values.
 * @returns [Number] The nth Fibonacci number.
 */
const fibonacciMemoized = (input, memo = {}) => {
    if (input in memo) { return memo[input]; }
    if (input <= 2)    { return 1; }

    memo[input] = fibonacciMemoized(input - 1, memo) + fibonacciMemoized(input - 2, memo);

    return memo[input];
}

/**
 * Tabulated function that calculates the nth Fibonacci number
 * O(n) time complexity           O(n) Space complexity
 * @param {Number} input The index of the Fibonacci number to calculate (non-negative integer).
 * @returns [Number] The nth Fibonacci number.
 */
const fibonacciTabulated = (input) => {
    const table = Array(input + 1).fill(0);

    table[1] = 1;
    
    for (let i = 0; i <= input; i++) {
        table[i + 1] += table[i];
        table[i + 2] += table[i];
    }

    return table[input];
}

// Main Code

let input1 = 2;
let input2 = 5;
let input3 = 9;
let input4 = 11;

let input5 = 50;
let input6 = 60;
let input7 = 70;

console.log("------------------ NON MEMOIZED CODE ------------------");
console.log(`Fibonacci number of ${input1} is: [${fibonacci(input1)}]`);
console.log(`Fibonacci number of ${input2} is: [${fibonacci(input2)}]`);
console.log(`Fibonacci number of ${input3} is: [${fibonacci(input3)}]`);
console.log(`Fibonacci number of ${input4} is: [${fibonacci(input4)}]`);

console.log("-------------------- MEMOIZED CODE --------------------");
console.log(`Fibonacci number MEMOIZED of ${input5} is: [${fibonacciMemoized(input5)}]`);
console.log(`Fibonacci number MEMOIZED of ${input6} is: [${fibonacciMemoized(input6)}]`);
console.log(`Fibonacci number MEMOIZED of ${input7} is: [${fibonacciMemoized(input7)}]`);

console.log("------------------- TABULATED CODE --------------------");
console.log(`Fibonacci number TABULATED of ${input5} is: [${fibonacciTabulated(input5)}]`);
console.log(`Fibonacci number TABULATED of ${input6} is: [${fibonacciTabulated(input6)}]`);
console.log(`Fibonacci number TABULATED of ${input7} is: [${fibonacciTabulated(input7)}]`);