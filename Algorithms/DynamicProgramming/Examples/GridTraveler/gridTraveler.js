/** ---------------------------------------------
 * 
 * Memoize a Grid Traveler function
 --------------------------------------------- */

/**
 * Function that calculates the shortest path in a gird traveler
 * 
 * @param {Number} x size of grid we will be traveling in.
 * @param {Number} y size of grid we will be traveling in.
 * @returns [Number] the amount of ways we can travel grid
 */
const gridTraveler = (x, y) => {
    if (x === 1 && y === 1) { return 1; }
    if (x === 0 || y === 0) { return 0; }

    return gridTraveler(x - 1, y) + gridTraveler(x, y - 1);
}

/**
 * Memoized function that calculates gridTraveler sequence of a given number
 * 
 * @param {Number} x size of grid we will be traveling in.
 * @param {Number} y size of grid we will be traveling in.
 * @param {Object} memo used as a cache to store previously computed values.
 * @returns [Number] the resulting gridTraveler number
 */
const gridTravelerMemoized = (x, y, memo = {}) => {
    const key = x + ',' + y;

    if (key in memo) { return memo[key]; }
    if (x === 1 && y === 1) { return 1; }
    if (x === 0 || y === 0) { return 0; }

    memo[key] = gridTravelerMemoized(x - 1, y, memo) + gridTravelerMemoized(x, y - 1, memo);
    return memo[key];
}

/**
 * Tabulated Function that calculates the shortest path in a gird traveler
 * O(n) time complexity           O(n) Space complexity
 * @param {Number} x size of grid we will be traveling in.
 * @param {Number} y size of grid we will be traveling in.
 * @returns [Number] the amount of ways we can travel grid
 */
const gridTravelerTabulated = (x, y) => {
    const table = Array(x + 1)
        .fill()
        .map(() => Array(y + 1).fill(0));
    
    table[1][1] = 1;

    for (let i = 0; i <= x; i++) {
        for (let j = 0; j <= y; j++) {
            const current = table[i][j];
            if (j + 1 <= x) { table[i][j + 1] += current; }
            if (i + 1 <= y) { table[i + 1][j] += current; }
        }
    }

    return table[x][y]
}

// Main Code

console.log("------------------ NON MEMOIZED CODE ------------------ ");
console.log(`Amount of paths for {1, 1} is: [${gridTraveler(1, 1)}]`);
console.log(`Amount of paths for {2, 3} is: [${gridTraveler(2, 3)}]`);
console.log(`Amount of paths for {3, 2} is: [${gridTraveler(3, 2)}]`);
console.log(`Amount of paths for {3, 3} is: [${gridTraveler(3, 3)}]`);

console.log("-------------------- MEMOIZED CODE -------------------- ");
console.log(`MEMOIZED Amount of paths for {18, 18} is: [${gridTravelerMemoized(18, 18)}]`);

console.log("------------------- TABULATED CODE --------------------");
console.log(`TABULATED Amount of paths for {18, 18} is: [${gridTravelerTabulated(18, 18)}]`);