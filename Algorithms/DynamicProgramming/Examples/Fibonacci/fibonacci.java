
import java.util.HashMap;


/**
 * Class that defines our Node
 */
public class fibonacci {
    /**
     * Function that calculates the nth Fibonacci number
     * 
     * @param input input The index of the Fibonacci number to calculate (non-negative integer).
     * @return [Long] The nth Fibonacci number.
     */
    public static long fibonacci(int input) {
        if (input <= 2) { return 1; }

        return fibonacci(input - 1) + fibonacci(input -2);
    }

    /**
     * Memoized function that calculates the nth Fibonacci number
     * 
     * @param input input The index of the Fibonacci number to calculate (non-negative integer).
     * @param memo  used as a cache to store previously computed values.
     * @return [Long] The nth Fibonacci number.
     */
    public static long fibonacciMemoized(int input, HashMap<Integer, Long> memo) {
        if (memo.containsKey(input)) { return memo.get(input); }
        if (input <= 2)              { return 1; }

        long result = fibonacciMemoized(input - 1, memo) + fibonacciMemoized(input -2, memo);
        memo.put(input, result);

        return result;
    }

    /**
     * This is the main method, the entry point for any standalone Java application.
     * The Java Virtual Machine (JVM) looks for this specific method to start program execution.
     *
     * @param args An array of String objects that can receive command-line arguments
     *             passed to the program when it is executed.
     */
    public static void main(String[] Args) {
        int input1 = 2;
        int input2 = 5;
        int input3 = 9;
        int input4 = 11;

        int input5 = 50;
        int input6 = 60;
        int input7 = 70;

        System.out.println("------------------ NON MEMOIZED CODE ------------------ ");
        System.out.println("Fibonacci number of " + input1 + " is: [" + fibonacci(input1) + "]");
        System.out.println("Fibonacci number of " + input2 + " is: [" + fibonacci(input2) + "]");
        System.out.println("Fibonacci number of " + input3 + " is: [" + fibonacci(input3) + "]");
        System.out.println("Fibonacci number of " + input4 + " is: [" + fibonacci(input4) + "]");

        HashMap<Integer, Long> memo = new HashMap<>();

        System.out.println("-------------------- MEMOIZED CODE -------------------- ");
        System.out.println("Fibonacci number MEMOIZED of " + input5 + " is:  [" + fibonacciMemoized(input5, memo) + "]");
        System.out.println("Fibonacci number MEMOIZED of " + input6 + " is:  [" + fibonacciMemoized(input6, memo) + "]");
        System.out.println("Fibonacci number MEMOIZED of " + input7 + " is:  [" + fibonacciMemoized(input7, memo) + "]");
    }
 }