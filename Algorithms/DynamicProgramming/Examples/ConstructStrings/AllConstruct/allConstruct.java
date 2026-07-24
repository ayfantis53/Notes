import java.util.ArrayList;
import java.util.List;


/**
 * Handles all ways we can construct a string out of given substrings.
 */
public class AllConstruct {

    /**
     * Finds out all ways we can construct a string out of given substrings.
     * O(n^m * k) time complexity           O(n^m) Space complexity
     * @param {String}   target   word we are trying to make using substrings.
     * @param {String[]} wordBank substrings we are testing to create target word.
     * @returns [Array] of all string combinations.
     */
    public static List<List<String>> allConstruct(String target, String[] wordBank) {
        // Checks if a target is empty, stops the function, & returns a list containing an empty list.
        if (target.isEmpty()) {
            List<List<String>> result = new ArrayList<>();
            result.add(new ArrayList<>());
            return result;
        }

        List<List<String>> result = new ArrayList<>();
        
        // loop through every item in wordBank.
        for (String word : wordBank) {
            if (target.startsWith(word)) {
                // Extracts a portion of a string or array by removing a prefix.
                String suffix = target.substring(word.length());
                List<List<String>> suffixWays = allConstruct(suffix, wordBank);
                // takes suffixWays & creates new array adding word to each item in suffixWays.
                // Append the current word to the beginning of all valid suffix combinations
                for (List<String> way : suffixWays) {
                    way.add(0, word);
                    result.add(way);
                }
            }
        }

        return result;
    } 

    /**
     * Memoized Finds out all ways we can construct a string out of given substrings.
     * O(n * m^2) time complexity           O(m^2) Space complexity
     * @param {String}   target   word we are trying to make using substrings.
     * @param {String[]} wordBank substrings we are testing to create target word.
     * @param {HashMap} memo      cache or storage container that saves the output of a function.
     * @returns [Array] of all string combinations.
     */
    public static List<List<String>> allConstructMemoized(String target, String[] wordBank, HashMap<Integer, Long> memo) {
        // checks if key target already exists inside a dictionary memo.
        if (memo.containsKey(target)) { return memo.get(target); }
        // Checks if a target is empty, stops the function, & returns a list containing an empty list.
        if (target.equals("")) {
            List<List<String>> result = new ArrayList<>();
            result.add(new ArrayList<>());
            return result;
        }

        List<List<String>> result = new ArrayList<>();
        
        // loop through every item in wordBank.
        for (String word : wordBank) {
            // Checks if the string target starts with the string word.
            if (target.startsWith(word)) {
                // Extracts a portion of a string or array by removing a prefix.
                String suffix = target.substring(word.length());
                List<List<String>> suffixWays = allConstructMemo(suffix, wordBank, memo);
                // Append the current word to the beginning of all valid suffix combinations
                for (List<String> way : suffixWays) {
                    List<String> targetWay = new ArrayList<>();
                    targetWay.add(word);
                    targetWay.addAll(way);
                    result.add(targetWay);
                }
            }
        }

        memo.put(target, result);
        return result;
    }

    /**
     * Tabulated Finds out all ways we can construct a string out of given substrings.
     * O(n^m) time complexity           O(n^m) Space complexity
     * @param {String}   target word we are trying to make using substrings.
     * @param {String[]} substrs substrings we are testing to create target word.
     * @returns [Array] of all string combinations.
     */
    public static List<List<String>> allConstructTabulated(String target, String[] wordBank) {
        // creates a two-dimensional array (a matrix) filled with empty arrays.
        List<List<List<String>>> table = new ArrayList<>();
        for (int i = 0; i <= target.length(); i++) {
            table.add(new ArrayList<>());
        }

        // loops as many times as length of target word.
        for (int i = 0; i <= target.length(); i++) {
            // table[i] is not considered empty.
            if (!table.get(i).isEmpty()) {
                // loop through every item in wordBank.
                for (String word : wordBank) {
                    // slices a portion of a string (i: start, word.length: end) see if it equals word.
                     if (i + word.length() <= target.length() && target.substring(i, i + word.length()).equals(word)) {
                        // For each combination found so far at index i, create a new extended list
                        for (List<String> way : table.get(i)) {
                            List<String> newWay = new ArrayList<>(way);
                            newWay.add(word);
                            table.get(i + word.length()).add(newWay);
                        }
                    }
                }
            }
        }

        return table.get(target.length());
    }

    /**
     * This is the main method, the entry point for any standalone Java application.
     * The Java Virtual Machine (JVM) looks for this specific method to start program execution.
     *
     * @param args An array of String objects that can receive command-line arguments
     *             passed to the program when it is executed.
     */
    public static void main(String[] Args) {
        System.out.println(allConstruct("purple", {"purp", "p", "ur", "le", "purpl"}));
        System.out.println(allConstructTabulated("purple", {"purp", "p", "ur", "le", "purpl"}));
        System.out.println(allConstruct("abcdef", {"ab", "abc", "cd", "def", "abcd"}));
        System.out.println(allConstruct("skateboard", {"bo", "rd", "ate", "t", "ska", "sk", "boar"}));
        System.out.println(allConstruct("enterapotentpot", {"a", "p", "ent", "enter", "ot", "o", "t"}));
        System.out.println(allConstructTabulated("enterapotentpot", {"a", "p", "ent", "enter", "ot", "o", "t"}));
        System.out.println(allConstructMemoized("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef", {"e", "ee", "eee", "eeee", "eeeee", "eeeeee"}));
    }
}