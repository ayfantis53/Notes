import java.util.HashMap;

/** ---------------------------------------------
 * 
 * Memoize a Grid Traveler function
 --------------------------------------------- */
class gridTraveler {
    /**
     * Function that calculates the shortest path in a gird traveler
     * 
     * @param x size of grid we will be traveling in.
     * @param y size of grid we will be traveling in.
     * @returns [int] the amount of ways we can travel grid
     */
    public static int gridTraveler(int x, int y) {
        if (x == 1 && y == 1) { return 1; }
        if (x == 0 || y == 0) { return 0; }

        return gridTraveler(x - 1, y) + gridTraveler(x, y - 1);
    }

    /**
     * Memoized function that calculates gridTraveler sequence of a given number
     * 
     * @param x size of grid we will be traveling in.
     * @param y size of grid we will be traveling in.
     * @param memo used as a cache to store previously computed values.
     * @returns [Long] the resulting gridTraveler number
     */
    public static long gridTravelerMemoized (int x, int y, HashMap<String, Long> memo) {
        String key = x + "," + y;

        if (memo.containsKey(key)) { return memo.get(key); }
        if (x == 1 && y == 1) { return 1; }
        if (x == 0 || y == 0) { return 0; }

        long result = gridTravelerMemoized(x - 1, y, memo) + gridTravelerMemoized(x, y - 1, memo);
        memo.put(key, result);
        return result;
    }

    /**
     * This is the main method, the entry point for any standalone Java application.
     * The Java Virtual Machine (JVM) looks for this specific method to start program execution.
     *
     * @param args An array of String objects that can receive command-line arguments
     *             passed to the program when it is executed.
     */
    public static void main(String[] args) {
        System.out.println("------------------ NON MEMOIZED CODE ------------------ ");
        System.out.println("Amount of paths for {1, 1} is: [" + gridTraveler(1, 1) + "]");
        System.out.println("Amount of paths for {2, 3} is: [" + gridTraveler(2, 3) + "]");
        System.out.println("Amount of paths for {3, 2} is: [" + gridTraveler(3, 2) + "]");
        System.out.println("Amount of paths for {3, 3} is: [" + gridTraveler(3, 3) + "]");

        HashMap<String, Long> memo = new HashMap<>();

        System.out.println("-------------------- MEMOIZED CODE -------------------- ");
        System.out.println("MEMOIZED Amount of paths for {18, 18} is: [" + gridTravelerMemoized(18, 18, memo) + "]");
    }
}
