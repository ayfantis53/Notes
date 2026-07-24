"""Handles all ways we can construct a string out of given substrings."""

# Standard lib imports
from pprint import pprint


def allConstruct(target: str, wordBank: list[str]) -> list[str]:
    """Finds out all ways we can construct a string out of given substrings.

    Args:
        target (str):    word we are trying to make using substrings.
        wordBank (list): substrings we are testing to create target word.

    Returns:
        (list[str]) of all string combinations.
    """
    # Checks if a target is empty, stops the function, & returns a list containing an empty list.
    if target == "":
       return [[]]

    result = []
    
    # loop through every item in wordBank.
    for word in wordBank:
        # checks whether the string target begins with the characters in the string word.
        if target.startswith(word):
            suffix     = target[len(word):]
            suffixWays = allConstruct(suffix, wordBank)
            # creates new list combining [word] with each element in way from an iterable named suffixWays using a list comprehension.
            targetWays = [[word] + way for way in suffixWays]
            # appends targetWays individual elements to the end of the current list.
            result.extend(targetWays)

    return result


def allConstructMemoized(target: str, wordBank: list[str], memo:dict ={}) -> list[str]:
    """Memoized Finds out all ways we can construct a string out of given substrings.
    O(n^m * k) time complexity           O(n^m) Space complexity

    Args:
        target (str):    word we are trying to make using substrings.
        wordBank (list): substrings we are testing to create target word.
        memo (dict):     cache or storage container that saves the output of a function.

    Returns:
        (list[str]) of all string combinations.
    """
    # checks if key target already exists inside a dictionary memo.
    if target in memo: 
        return memo[target]
    # Checks if a target is empty, stops the function, & returns a list containing an empty list.
    if target == "":
        return [[]]

    result = []

    # loop through every item in wordBank.
    for word in wordBank:
        # checks whether the string target begins with the characters in the string word.
        if target.startswith(word):
            suffix     = target[len(word):]
            suffixWays = allConstructMemoized(suffix, wordBank, memo)
            # creates new list combining [word] with each element in way from an iterable named suffixWays using a list comprehension. 
            targetWays = [[word] + way for way in suffixWays]
            # appends targetWays individual elements to the end of the current list.
            result.extend(targetWays)

    memo[target] = result
    return result


def allConstructTabulated(target: str, wordBank: list[str]) -> list[str]:
    """Tabulated Finds out all ways we can construct a string out of given substrings.
    O(n^m) time complexity           O(n^m) Space complexity

    Args:
        target (str):    word we are trying to make using substrings.
        wordBank (list): substrings we are testing to create target word.

    Returns:
        (list[str]) of all string combinations.
    """
    # creates a list of empty lists, sized to the length of a target string or list plus one.
    # replace the very first element of an existing list named table.
    table = [[] for _ in range(len(target) + 1)]
    table[0] = [[]]

    # loops as many times as length of target word.
    for i in range(len(target) + 1):
        # table[i] is not considered empty.
        if table[i]:
            # loop through every item in wordBank.
            for word in wordBank:
                # slices a portion of a string (i: start, i+len(word): end) see if it equals word.
                if target[i : i + len(word)] == word:
                    # Make a new list, iterate through every item in table[i] and joins word to it. 
                    newCombinations = [comb + [word] for comb in table[i]]
                    # adds multiple items from newCombinations directly into an existing list located further ahead in table.
                    table[i + len(word)].extend(newCombinations)

    return table[len(target)]


def main():
    """Handles all ways we can construct a string out of given substrings."""
    print(f"{allConstruct('purple', ['purp', 'p', 'ur', 'le', 'purpl'])}")
    print(f"{allConstructTabulated('purple', ['purp', 'p', 'ur', 'le', 'purpl'])}")
    print(f"{allConstruct('abcdef', ['ab', 'abc', 'cd', 'def', 'abcd'])}")
    print(f"{allConstruct('skateboard', ['bo', 'rd', 'ate', 't', 'ska', 'sk', 'boar'])}")
    pprint(allConstruct('enterapotentpot', ['a', 'p', 'ent', 'enter', 'ot', 'o', 't']), width=70)
    pprint(allConstructTabulated('enterapotentpot', ['a', 'p', 'ent', 'enter', 'ot', 'o', 't']), width=70)
    print(f"{allConstructMemoized('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef', ['e', 'ee', 'eee', 'eeee', 'eeeee', 'eeeeee'])}")


if __name__ == '__main__':
    """ Ensure this code only runs if the script is executed. Not when it's imported as a module by another file."""
    main()