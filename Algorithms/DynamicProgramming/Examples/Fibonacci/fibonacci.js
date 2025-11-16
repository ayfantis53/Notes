/** ---------------------------------------------
 * 
 * Memoize a Fibonacci sequence function
 --------------------------------------------- */

/**
 * Function that calculates fibonacci sequence of a given number
 * 
 * @param {Number} input given number to find fibonacci sequence of.
 * @returns [Number] the resulting fibonacci number
 */
const fibonacci = (input) => {
    if (input <= 2) { return 1; }

    return fibonacci(input - 1) + fibonacci(input - 2);
}

/**
 * Memoized function that calculates fibonacci sequence of a given number
 * 
 * @param {Number} input given number to find fibonacci sequence of.
 * @param {Object} memo used as a cache to store previously computed values.
 * @returns [Number] the resulting fibonacci number
 */
const fibonacciMemoized = (input, memo = {}) => {
    if (input in memo) { return memo[input]; }
    if (input <= 2)    { return 1; }

    memo[input] = fibonacciMemoized(input - 1, memo) + fibonacciMemoized(input - 2, memo);

    return memo[input];
}

// Main Code

let input1 = 2;
let input2 = 5;
let input3 = 9;
let input4 = 11;

let input5 = 50;
let input6 = 60;
let input7 = 70;

console.log("------------------ NON MEMOIZED CODE ------------------ ");
console.log(`Fibonacci number of ${input1} is: [${fibonacci(input1)}]`);
console.log(`Fibonacci number of ${input2} is: [${fibonacci(input2)}]`);
console.log(`Fibonacci number of ${input3} is: [${fibonacci(input3)}]`);
console.log(`Fibonacci number of ${input4} is: [${fibonacci(input4)}]`);

console.log("-------------------- MEMOIZED CODE -------------------- ");
console.log(`Fibonacci number MEMOIZED of ${input5} is: [${fibonacciMemoized(input5)}]`);
console.log(`Fibonacci number MEMOIZED of ${input6} is: [${fibonacciMemoized(input6)}]`);
console.log(`Fibonacci number MEMOIZED of ${input7} is: [${fibonacciMemoized(input7)}]`);