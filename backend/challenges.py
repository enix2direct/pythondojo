CHALLENGES = [

    # ─── BEGINNER ────────────────────────────────────────────────────────────

    {
        "id": "b01",
        "title": "Sum a list",
        "difficulty": "beginner",
        "description": (
            "Write the body of a function that takes a list of numbers and returns "
            "their total. You may not use the built-in sum() function."
        ),
        "locked_top": ["def add_numbers(numbers):"],
        "locked_bottom": [],
        "placeholder": "    # your code here",
        "hints": [
            "You need to visit every item in the list one by one.",
            "Keep a running total that starts at zero and grows as you loop.",
            "A for loop that adds each item to a variable called 'total' is the classic approach.",
        ],
        "test_cases": [
            {
                "label": "add_numbers([1, 2, 3]) == 6",
                "runner": "print(add_numbers([1, 2, 3]))",
                "stdin": "",
                "expected": "6",
            },
            {
                "label": "add_numbers([10, -2, 5]) == 13",
                "runner": "print(add_numbers([10, -2, 5]))",
                "stdin": "",
                "expected": "13",
            },
            {
                "label": "add_numbers([]) == 0",
                "runner": "print(add_numbers([]))",
                "stdin": "",
                "expected": "0",
            },
        ],
    },

    {
        "id": "b02",
        "title": "FizzBuzz",
        "difficulty": "beginner",
        "description": (
            "Complete the function. For each number from 1 to n (inclusive), "
            "append 'Fizz' if divisible by 3, 'Buzz' if divisible by 5, "
            "'FizzBuzz' if both, otherwise the number as a string. Return the list."
        ),
        "locked_top": ["def fizzbuzz(n):", "    result = []"],
        "locked_bottom": ["    return result"],
        "placeholder": "    # your code here",
        "hints": [
            "Loop through every number from 1 up to and including n.",
            "Check divisibility with the % (modulo) operator. x % 3 == 0 means x is divisible by 3.",
            "Check for FizzBuzz (both) before checking Fizz or Buzz separately.",
        ],
        "test_cases": [
            {
                "label": "fizzbuzz(5) == ['1','2','Fizz','4','Buzz']",
                "runner": "print(fizzbuzz(5))",
                "stdin": "",
                "expected": "['1', '2', 'Fizz', '4', 'Buzz']",
            },
            {
                "label": "fizzbuzz(15) ends with 'FizzBuzz'",
                "runner": "print(fizzbuzz(15)[-1])",
                "stdin": "",
                "expected": "FizzBuzz",
            },
            {
                "label": "fizzbuzz(1) == ['1']",
                "runner": "print(fizzbuzz(1))",
                "stdin": "",
                "expected": "['1']",
            },
        ],
    },

    {
        "id": "b03",
        "title": "Count vowels",
        "difficulty": "beginner",
        "description": (
            "Write the body of a function that counts how many vowels "
            "(a, e, i, o, u — upper or lower case) are in a given string."
        ),
        "locked_top": ["def count_vowels(text):"],
        "locked_bottom": [],
        "placeholder": "    # your code here",
        "hints": [
            "Define the set of vowels: a, e, i, o, u. Consider both cases.",
            "Loop through each character in the string and check if it's a vowel.",
            "Keep a counter that increments each time you find a vowel, then return it.",
        ],
        "test_cases": [
            {
                "label": "count_vowels('hello') == 2",
                "runner": "print(count_vowels('hello'))",
                "stdin": "",
                "expected": "2",
            },
            {
                "label": "count_vowels('AEIOU') == 5",
                "runner": "print(count_vowels('AEIOU'))",
                "stdin": "",
                "expected": "5",
            },
            {
                "label": "count_vowels('rhythm') == 0",
                "runner": "print(count_vowels('rhythm'))",
                "stdin": "",
                "expected": "0",
            },
        ],
    },

    # ─── INTERMEDIATE ─────────────────────────────────────────────────────────

    {
        "id": "i01",
        "title": "Flatten a nested list",
        "difficulty": "intermediate",
        "description": (
            "Write a function that takes a list which may contain other lists "
            "(one level deep) and returns a single flat list of all the values."
        ),
        "locked_top": ["def flatten(nested):"],
        "locked_bottom": [],
        "placeholder": "    # your code here",
        "hints": [
            "Loop through each item in the outer list.",
            "Check whether each item is itself a list using isinstance(item, list).",
            "If it is a list, extend your result with its contents. If not, append the item directly.",
        ],
        "test_cases": [
            {
                "label": "flatten([[1,2],[3,4]]) == [1,2,3,4]",
                "runner": "print(flatten([[1,2],[3,4]]))",
                "stdin": "",
                "expected": "[1, 2, 3, 4]",
            },
            {
                "label": "flatten([1,[2,3],4]) == [1,2,3,4]",
                "runner": "print(flatten([1,[2,3],4]))",
                "stdin": "",
                "expected": "[1, 2, 3, 4]",
            },
            {
                "label": "flatten([]) == []",
                "runner": "print(flatten([]))",
                "stdin": "",
                "expected": "[]",
            },
        ],
    },

    {
        "id": "i02",
        "title": "Word frequency",
        "difficulty": "intermediate",
        "description": (
            "Write a function that takes a string of words (all lowercase, space-separated) "
            "and returns a dictionary mapping each unique word to the number of times it appears."
        ),
        "locked_top": ["def word_frequency(text):"],
        "locked_bottom": [],
        "placeholder": "    # your code here",
        "hints": [
            "Split the string into a list of words using .split().",
            "Use a dictionary to keep count. For each word, increment its count by 1.",
            "You can use dict.get(key, 0) to safely get a count even when the key doesn't exist yet.",
        ],
        "test_cases": [
            {
                "label": "word_frequency('the cat sat') counts correctly",
                "runner": "print(word_frequency('the cat sat'))",
                "stdin": "",
                "expected": "{'the': 1, 'cat': 1, 'sat': 1}",
            },
            {
                "label": "word_frequency('go go go') == {'go': 3}",
                "runner": "print(word_frequency('go go go'))",
                "stdin": "",
                "expected": "{'go': 3}",
            },
            {
                "label": "word_frequency('a b a c a') has a:3",
                "runner": "d = word_frequency('a b a c a'); print(d['a'])",
                "stdin": "",
                "expected": "3",
            },
        ],
    },

    {
        "id": "i03",
        "title": "Caesar cipher",
        "difficulty": "intermediate",
        "description": (
            "Implement a Caesar cipher. Shift each letter in the text forward by "
            "'shift' positions in the alphabet, wrapping around. Preserve case. "
            "Non-letter characters are left unchanged."
        ),
        "locked_top": ["def caesar(text, shift):"],
        "locked_bottom": [],
        "placeholder": "    # your code here",
        "hints": [
            "Loop through each character. Use char.isalpha() to check if it's a letter.",
            "Use ord() to get a character's ASCII value and chr() to convert back.",
            "For uppercase: base = ord('A'), for lowercase: base = ord('a'). Then (ord(c) - base + shift) % 26 + base gives the shifted character.",
        ],
        "test_cases": [
            {
                "label": "caesar('abc', 1) == 'bcd'",
                "runner": "print(caesar('abc', 1))",
                "stdin": "",
                "expected": "bcd",
            },
            {
                "label": "caesar('xyz', 3) == 'abc' (wraps)",
                "runner": "print(caesar('xyz', 3))",
                "stdin": "",
                "expected": "abc",
            },
            {
                "label": "caesar('Hello, World!', 13) == 'Uryyb, Jbeyq!'",
                "runner": "print(caesar('Hello, World!', 13))",
                "stdin": "",
                "expected": "Uryyb, Jbeyq!",
            },
        ],
    },

    # ─── ADVANCED ─────────────────────────────────────────────────────────────

    {
        "id": "a01",
        "title": "Binary search",
        "difficulty": "advanced",
        "description": (
            "Implement binary search. Given a sorted list of integers and a target, "
            "return the index of the target if found, or -1 if not. "
            "Do not use the 'in' operator or list methods to find the item."
        ),
        "locked_top": ["def binary_search(arr, target):"],
        "locked_bottom": [],
        "placeholder": "    # your code here",
        "hints": [
            "Keep track of a low and high index that bound your search area.",
            "On each step, check the middle element: (low + high) // 2.",
            "If the middle is too small, move low up. If too big, move high down. Loop until low > high.",
        ],
        "test_cases": [
            {
                "label": "binary_search([1,3,5,7,9], 5) == 2",
                "runner": "print(binary_search([1,3,5,7,9], 5))",
                "stdin": "",
                "expected": "2",
            },
            {
                "label": "binary_search([1,3,5,7,9], 6) == -1",
                "runner": "print(binary_search([1,3,5,7,9], 6))",
                "stdin": "",
                "expected": "-1",
            },
            {
                "label": "binary_search([2], 2) == 0",
                "runner": "print(binary_search([2], 2))",
                "stdin": "",
                "expected": "0",
            },
        ],
    },

    {
        "id": "a02",
        "title": "Balanced brackets",
        "difficulty": "advanced",
        "description": (
            "Write a function that returns True if every opening bracket in the string "
            "has a matching closing bracket in the correct order, False otherwise. "
            "Handle (, ), [, ], {, }."
        ),
        "locked_top": ["def is_balanced(s):"],
        "locked_bottom": [],
        "placeholder": "    # your code here",
        "hints": [
            "A stack is the right data structure here — use a list and .append() / .pop().",
            "When you see an opening bracket push it. When you see a closing bracket, check it matches the top of the stack.",
            "At the end, the stack should be empty for the string to be balanced.",
        ],
        "test_cases": [
            {
                "label": "is_balanced('({[]})') == True",
                "runner": "print(is_balanced('({[]})'))",
                "stdin": "",
                "expected": "True",
            },
            {
                "label": "is_balanced('([)]') == False",
                "runner": "print(is_balanced('([)]'))",
                "stdin": "",
                "expected": "False",
            },
            {
                "label": "is_balanced('') == True",
                "runner": "print(is_balanced(''))",
                "stdin": "",
                "expected": "True",
            },
        ],
    },

    {
        "id": "a03",
        "title": "Run-length encoding",
        "difficulty": "advanced",
        "description": (
            "Implement run-length encoding. Compress a string by replacing consecutive "
            "repeated characters with the character followed by its count. "
            "If a character appears only once, just include it without a number."
        ),
        "locked_top": ["def rle_encode(text):"],
        "locked_bottom": [],
        "placeholder": "    # your code here",
        "hints": [
            "Walk through the string tracking the current character and how many times it has repeated.",
            "When the character changes (or you hit the end), write what you've accumulated to the result.",
            "Only append the count number if count > 1.",
        ],
        "test_cases": [
            {
                "label": "rle_encode('aaabbc') == 'a3b2c'",
                "runner": "print(rle_encode('aaabbc'))",
                "stdin": "",
                "expected": "a3b2c",
            },
            {
                "label": "rle_encode('abc') == 'abc' (no repeats)",
                "runner": "print(rle_encode('abc'))",
                "stdin": "",
                "expected": "abc",
            },
            {
                "label": "rle_encode('aaaaaa') == 'a6'",
                "runner": "print(rle_encode('aaaaaa'))",
                "stdin": "",
                "expected": "a6",
            },
        ],
    },
]
