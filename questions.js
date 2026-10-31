const question = (topic, level, title, intro, prompt, input, output, code, explanation, tags) => ({
  topic, level, title, intro, prompt, input, output, code, explanation, tags,
});

const QUESTIONS = [
  question("Fundamentals", "Beginner", "Filter numbers by two rules", "Practice ranges, modulo, and combining conditions.", "Find every number from 2,000 through 3,200 that is divisible by 7 but not by 5.", "Range: 2000 to 3200", "2002, 2009, 2016, 2023, 2037, ...", `numbers = [
    number
    for number in range(2000, 3201)
    if number % 7 == 0 and number % 5 != 0
];

print(", ".join(map(str, numbers)))`, ["range(2000, 3201) includes 3200 because range stops before its second argument.", "The modulo operator gives a remainder; a remainder of zero means divisible.", "Both conditions must be true, so and excludes multiples of 5."], ["range", "modulo", "conditions"]),
  question("Fundamentals", "Beginner", "Calculate a factorial", "Build a number by multiplying it by every positive integer below it.", "Write a function that returns n factorial. Treat 0! as 1.", "n = 8", "40320", `def factorial(n):
    if n < 0:
        raise ValueError("factorial is undefined for negative integers")
    result = 1
    for number in range(2, n + 1):
        result *= number
    return result

print(factorial(8))`, ["The result starts at 1, the multiplicative identity.", "Each loop multiplies the result by the next integer.", "The explicit check rejects an input outside the function's domain."], ["functions", "loops", "validation"]),
  question("Fundamentals", "Beginner", "Map numbers to their squares", "Create a dictionary from a sequence of keys and calculated values.", "For each integer from 1 through n, store its square as the value.", "n = 8", "{1: 1, 2: 4, 3: 9, ..., 8: 64}", `n = 8
squares = {number: number**2 for number in range(1, n + 1)}
print(squares)`, ["A dictionary comprehension builds key-value pairs in one expression.", "range(1, n + 1) includes n.", "Each integer is the key and its square is the value."], ["dict", "comprehension", "range"]),
  question("Fundamentals", "Beginner", "Parse comma-separated numbers", "Turn raw text into useful Python collection types.", "Split comma-separated numbers into a list of integers and then a tuple.", "34,67,55,33,12,98", "[34, 67, 55, 33, 12, 98] and (34, 67, 55, 33, 12, 98)", `text = "34,67,55,33,12,98"
numbers = [int(part.strip()) for part in text.split(",")]

print(numbers)
print(tuple(numbers))`, ["split(',') separates the text at commas.", "strip() removes accidental spaces; int() converts each piece.", "list values can change; tuple values cannot be reassigned."], ["strings", "lists", "tuples"]),
  question("Fundamentals", "Beginner", "Create a tiny text class", "Use a class to keep related data and behavior together.", "Create a class that stores a string and returns an uppercase version of it.", "text = 'hello, Python'", "HELLO, PYTHON", `class TextMessage:
    def __init__(self, text):
        self.text = text

    def uppercase(self):
        return self.text.upper()


message = TextMessage("hello, Python")
print(message.uppercase())`, ["__init__ runs when an instance is created and stores the input on self.", "uppercase is an instance method, so it can read self.text.", "Returning the result makes the method easy to test and reuse."], ["classes", "instances", "methods"]),
  question("Fundamentals", "Beginner", "Apply a formula to many values", "Combine numeric conversion, a formula, and rounding.", "For each distance D, calculate round(sqrt((2 * C * D) / H)) where C=50 and H=30.", "D = 100, 150, 180", "18, 22, 24", `import math

distances = [100, 150, 180]
results = [
    round(math.sqrt((2 * 50 * distance) / 30))
    for distance in distances
]

print(", ".join(map(str, results)))`, ["math.sqrt calculates the square root.", "The comprehension applies the same formula to each distance.", "round returns the nearest integer; map(str, ...) prepares the values for joining."], ["math", "comprehension", "rounding"]),
  question("Fundamentals", "Beginner", "Build a multiplication grid", "Use nested comprehensions to create a two-dimensional list.", "Create a rows-by-columns grid whose cell at row i and column j equals i*j.", "rows = 3, columns = 5", "[[0, 0, 0, 0, 0], [0, 1, 2, 3, 4], [0, 2, 4, 6, 8]]", `rows, columns = 3, 5
grid = [
    [row * column for column in range(columns)]
    for row in range(rows)
]

print(grid)`, ["The outer comprehension creates one list for every row.", "The inner comprehension creates the cells for that row.", "Each row is a separate list, so editing one row will not change another."], ["nested loops", "lists", "comprehensions"]),
  question("Fundamentals", "Beginner", "Sort comma-separated words", "Sort text without changing the original sequence.", "Split a comma-separated string and print its words alphabetically.", "without,hello,bag,world", "bag,hello,without,world", `words = "without,hello,bag,world".split(",")
words.sort(key=str.casefold)
print(",".join(words))`, ["split creates a list from the comma-separated text.", "sort changes that list in place; key=str.casefold sorts without case bias.", "join combines the sorted words back into one string."], ["strings", "sorting", "list methods"]),
  question("Fundamentals", "Beginner", "Uppercase each line", "Transform a sequence of text lines while preserving their boundaries.", "Convert every line in a multi-line string to uppercase.", "Hello world\\nPractice makes perfect", "HELLO WORLD\\nPRACTICE MAKES PERFECT", `text = "Hello world\\nPractice makes perfect"
uppercase_lines = [line.upper() for line in text.splitlines()]
print("\\n".join(uppercase_lines))`, ["splitlines separates the input into individual lines.", "upper returns a new uppercase string; strings themselves are immutable.", "Joining with a newline restores the original line structure."], ["strings", "lists", "text processing"]),
  question("Fundamentals", "Beginner", "Remove duplicate words", "Combine sets with sorting to make a clean word list.", "Remove repeated words and print the remaining words in alphabetical order.", "hello world and practice makes perfect and hello", "and hello makes perfect practice world", `text = "hello world and practice makes perfect and hello"
words = sorted(set(text.split()))
print(" ".join(words))`, ["split separates words on any whitespace.", "A set keeps only one copy of each word.", "sorted returns a predictable alphabetical list."], ["sets", "sorting", "strings"]),
  question("Fundamentals", "Beginner", "Check binary divisibility", "Convert base-2 text to integers before applying arithmetic.", "From four-digit binary strings, keep only values divisible by five.", "0100,0011,1010,1001", "1010", `binary_values = "0100,0011,1010,1001".split(",")
divisible = [
    value for value in binary_values
    if int(value, 2) % 5 == 0
]
print(",".join(divisible))`, ["int(value, 2) interprets the string using base 2.", "Modulo checks whether the converted value has a remainder when divided by 5.", "The original binary text is kept for the output."], ["number bases", "modulo", "filtering"]),
  question("Fundamentals", "Beginner", "Find numbers with even digits", "Use string inspection to express a digit-by-digit condition.", "Find numbers from 1,000 through 3,000 whose every digit is even.", "Range: 1000 to 3000", "2000, 2002, 2004, 2006, 2008, 2020, ...", `matches = [
    number for number in range(1000, 3001)
    if all(int(digit) % 2 == 0 for digit in str(number))
]
print(matches[:10])`, ["Converting a number to text makes its individual digits easy to inspect.", "all returns True only if every digit passes the even-number test.", "The slice limits displayed results while the full result remains available in matches."], ["all", "range", "digit processing"]),
  question("Fundamentals", "Beginner", "Count letters and digits", "Classify each character in a string with built-in predicates.", "Count alphabetic characters and decimal digits, ignoring punctuation and spaces.", "hello world! 123", "Letters: 10, digits: 3", `text = "hello world! 123"
letters = sum(character.isalpha() for character in text)
digits = sum(character.isdigit() for character in text)
print(f"Letters: {letters}, digits: {digits}")`, ["isalpha and isdigit test one character at a time.", "A Boolean is treated as 1 or 0 by sum, so each True adds one.", "Spaces and punctuation match neither condition."], ["strings", "built-ins", "counting"]),
  question("Fundamentals", "Beginner", "Count uppercase and lowercase", "Use character methods to inspect letter casing.", "Count uppercase and lowercase letters in a sentence.", "Hello World!", "Uppercase: 2, lowercase: 8", `text = "Hello World!"
uppercase = sum(character.isupper() for character in text)
lowercase = sum(character.islower() for character in text)
print(f"Uppercase: {uppercase}, lowercase: {lowercase}")`, ["isupper and islower return True only for cased letters of the matching case.", "Whitespace, punctuation, and digits are not counted.", "f-strings make it easy to place results in readable text."], ["strings", "counting", "f-strings"]),
  question("Fundamentals", "Beginner", "Build a repeated-digit sum", "Generate a numeric pattern from a single digit.", "For a digit a, calculate a + aa + aaa + aaaa.", "a = 9", "11106", `digit = "9"
terms = [int(digit * length) for length in range(1, 5)]
print(sum(terms))`, ["Multiplying a string repeats its character.", "The comprehension creates terms with one through four copies.", "int converts each repeated-digit string before sum adds the values."], ["strings", "comprehensions", "sum"]),
  question("Fundamentals", "Beginner", "Square only odd values", "Filter and transform data in one readable expression.", "Create a list containing the square of each odd number in the input list.", "1,2,3,4,5,6,7,8,9", "[1, 9, 25, 49, 81]", `values = [1, 2, 3, 4, 5, 6, 7, 8, 9]
odd_squares = [value**2 for value in values if value % 2]
print(odd_squares)`, ["The expression before for is the value placed in the new list.", "The if clause filters out even numbers.", "An odd integer has a nonzero remainder when divided by 2."], ["list comprehension", "filtering", "modulo"]),
  question("Fundamentals", "Intermediate", "Process a bank transaction log", "Translate compact transaction records into a running total.", "Apply D amount deposits and W amount withdrawals, then return the balance.", "D 100\\nW 40\\nD 25", "85", `transactions = "D 100\\nW 40\\nD 25"
balance = 0

for line in transactions.splitlines():
    action, amount_text = line.split()
    amount = int(amount_text)
    if action == "D":
        balance += amount
    elif action == "W":
        balance -= amount
    else:
        raise ValueError(f"Unknown transaction: {action}")

print(balance)`, ["Each line contains an action and an amount, unpacked by split().", "Deposits add to the balance; withdrawals subtract from it.", "Rejecting unknown actions prevents silently incorrect totals."], ["loops", "parsing", "validation"]),
  question("Functions", "Intermediate", "Validate a strong password", "Combine string tests into a clear validation function.", "Require at least 8 characters, a lowercase letter, an uppercase letter, a digit, and a symbol.", "Python!2026", "Valid password: True", `def is_strong_password(password):
    return (
        len(password) >= 8
        and any(char.islower() for char in password)
        and any(char.isupper() for char in password)
        and any(char.isdigit() for char in password)
        and any(not char.isalnum() for char in password)
    )

print("Valid password:", is_strong_password("Python!2026"))`, ["Each any() checks whether at least one character satisfies a rule.", "The conditions are combined with and, so every requirement must pass.", "This is an example policy, not a complete password-security system."], ["functions", "validation", "any"]),
  question("Data structures", "Intermediate", "Sort records by multiple fields", "Use tuple ordering to sort structured records consistently.", "Sort records by name, then age, then height.", "Mia/21/165; Ava/22/170; Ava/20/168", "Ava, 20, 168; Ava, 22, 170; Mia, 21, 165", `people = [
    ("Mia", 21, 165),
    ("Ava", 22, 170),
    ("Ava", 20, 168),
]
people.sort(key=lambda person: (person[0], person[1], person[2]))
print(people)`, ["sort accepts a key function that calculates each record's comparison key.", "The key is a tuple, so Python compares name first and moves to later fields on a tie.", "Use meaningful records or dataclasses when tuple positions become hard to remember."], ["tuples", "sorting", "lambda"]),
  question("Functions", "Intermediate", "Generate multiples lazily", "Use a generator to produce values only when requested.", "Write a generator that yields numbers divisible by 7 up to and including n.", "n = 30", "7, 14, 21, 28", `def multiples_of_seven(limit):
    for number in range(7, limit + 1, 7):
        yield number

print(list(multiples_of_seven(30)))`, ["yield returns one value and pauses the generator at that point.", "The range step of 7 skips directly between multiples.", "Generators are memory-efficient for large or streaming results."], ["generators", "yield", "range"]),
  question("Data structures", "Intermediate", "Track a robot's movement", "Represent a position as coordinates and update it from commands.", "Starting at (0, 0), apply UP, DOWN, LEFT, and RIGHT steps and return the final position.", "UP 5, DOWN 3, LEFT 3", "(-3, 2)", `moves = [("UP", 5), ("DOWN", 3), ("LEFT", 3)]
x = y = 0
directions = {"UP": (0, 1), "DOWN": (0, -1), "LEFT": (-1, 0), "RIGHT": (1, 0)}

for direction, steps in moves:
    dx, dy = directions[direction]
    x += dx * steps
    y += dy * steps

print((x, y))`, ["The dictionary maps each direction to its x/y change for one step.", "Multiplying the change by steps handles any distance.", "The final tuple is the robot's coordinate on the plane."], ["tuples", "dict", "coordinate geometry"]),
  question("Data structures", "Intermediate", "Count word frequencies", "Use a Counter to summarize repeated words in text.", "Count words without punctuation, ignoring case, and print them alphabetically.", "Python is fun. Python is readable!", "fun: 1, is: 2, python: 2, readable: 1", `import re
from collections import Counter

text = "Python is fun. Python is readable!"
words = re.findall(r"[a-z]+", text.casefold())
counts = Counter(words)

for word in sorted(counts):
    print(f"{word}: {counts[word]}")`, ["casefold creates text suitable for case-insensitive matching.", "The regular expression extracts runs of letters and skips punctuation.", "Counter counts each word; sorting its keys makes output order deterministic."], ["Counter", "regular expressions", "text"]),
  question("Functions", "Beginner", "Write a reusable square function", "Turn a repeated calculation into a small, testable function.", "Define a function that returns the square of a number.", "square(12)", "144", `def square(number):
    """Return the number multiplied by itself."""
    return number**2

print(square(12))`, ["def gives the calculation a reusable name.", "The docstring documents its behavior for readers and help tools.", "The exponentiation operator ** performs the square."], ["functions", "docstrings", "operators"]),
  question("Functions", "Beginner", "Inspect built-in documentation", "Discover how Python documents functions at runtime.", "Print the documentation string for abs and for a function you define.", "abs.__doc__", "Return the absolute value of a number.", `def kilometers_to_miles(kilometers):
    """Convert kilometers to miles using the standard conversion factor."""
    return kilometers * 0.621371

print(abs.__doc__)
print(kilometers_to_miles.__doc__)`, ["Most built-ins expose a __doc__ string.", "A function docstring is the first string literal in its body.", "help(object) provides a richer interactive view than printing __doc__."], ["introspection", "docstrings", "built-ins"]),
  question("Object-oriented", "Beginner", "Compare class and instance attributes", "See how shared defaults differ from per-object state.", "Create two students with a shared class value and separate names.", "Students: Ana and Raj", "Shared school; names remain different", `class Student:
    school = "Python Academy"

    def __init__(self, name):
        self.name = name

ana = Student("Ana")
raj = Student("Raj")
print(ana.school, ana.name)
print(raj.school, raj.name)`, ["school is defined on the class and is shared by instances unless shadowed.", "name is assigned to self, so each Student stores its own value.", "Class attributes work well for true shared constants, not mutable per-instance data."], ["classes", "class attributes", "instances"]),
  question("Fundamentals", "Beginner", "Print FizzBuzz", "Combine iteration, divisibility, and ordered conditions.", "For 1 through 15, print Fizz for multiples of 3, Buzz for 5, and FizzBuzz for both.", "1 through 15", "1, 2, Fizz, 4, Buzz, Fizz, ...", `for number in range(1, 16):
    if number % 15 == 0:
        label = "FizzBuzz"
    elif number % 3 == 0:
        label = "Fizz"
    elif number % 5 == 0:
        label = "Buzz"
    else:
        label = str(number)
    print(label)`, ["15 is divisible by both 3 and 5, so that case must be checked first.", "elif ensures only the first matching branch runs.", "The range endpoint is exclusive, so 16 is used to include 15."], ["conditionals", "loops", "modulo"]),
  question("Fundamentals", "Beginner", "Test whether a number is prime", "Use a square-root bound to avoid unnecessary divisibility checks.", "Return whether an integer greater than 1 is prime.", "29", "True", `def is_prime(number):
    if number < 2:
        return False
    for divisor in range(2, int(number**0.5) + 1):
        if number % divisor == 0:
            return False
    return True

print(is_prime(29))`, ["Numbers below 2 are not prime.", "If a number has a factor greater than its square root, it also has a smaller paired factor.", "Finding any divisor proves the number is composite."], ["functions", "algorithms", "complexity"]),
  question("Algorithms", "Intermediate", "Generate primes with a sieve", "Use a boolean table to find many prime numbers efficiently.", "Return all prime numbers less than 30 using the Sieve of Eratosthenes.", "limit = 30", "[2, 3, 5, 7, 11, 13, 17, 19, 23, 29]", `def primes_below(limit):
    prime = [True] * limit
    if limit > 0:
        prime[0] = False
    if limit > 1:
        prime[1] = False
    for candidate in range(2, int(limit**0.5) + 1):
        if prime[candidate]:
            for composite in range(candidate * candidate, limit, candidate):
                prime[composite] = False
    return [number for number, is_prime in enumerate(prime) if is_prime]

print(primes_below(30))`, ["The list starts by marking every candidate as prime.", "For each remaining prime, its multiples are marked composite starting at its square.", "The final comprehension returns only the still-true indices."], ["sieve", "lists", "algorithms"]),
  question("Algorithms", "Beginner", "Build a Fibonacci sequence", "Generate a sequence by carrying forward two previous values.", "Return the first eight Fibonacci numbers starting with 0 and 1.", "count = 8", "[0, 1, 1, 2, 3, 5, 8, 13]", `def fibonacci(count):
    sequence = []
    current, following = 0, 1
    for _ in range(count):
        sequence.append(current)
        current, following = following, current + following
    return sequence

print(fibonacci(8))`, ["Two variables hold the current and next values.", "Tuple assignment updates both values together using their old values.", "The underscore signals that the loop counter itself is unused."], ["loops", "tuple assignment", "sequences"]),
  question("Strings", "Beginner", "Check for a palindrome", "Normalize text before comparing it with its reverse.", "Check whether a phrase reads the same forward and backward when punctuation and case are ignored.", "A man, a plan, a canal: Panama!", "True", `import re

def is_palindrome(text):
    normalized = re.sub(r"[^a-z0-9]", "", text.casefold())
    return normalized == normalized[::-1]

print(is_palindrome("A man, a plan, a canal: Panama!"))`, ["casefold removes case differences.", "The regular expression strips spaces and punctuation.", "A slice with step -1 reverses a sequence."], ["strings", "regular expressions", "slicing"]),
  question("Strings", "Intermediate", "Group anagrams", "Use a normalized signature as a dictionary key.", "Group words that contain the same letters, ignoring case.", "eat, tea, tan, ate, nat, bat", "[['eat', 'tea', 'ate'], ['tan', 'nat'], ['bat']]", `from collections import defaultdict

groups = defaultdict(list)
for word in ["eat", "tea", "tan", "ate", "nat", "bat"]:
    signature = tuple(sorted(word.casefold()))
    groups[signature].append(word)

print(list(groups.values()))`, ["Words with the same letters share the same sorted-letter tuple.", "defaultdict(list) creates an empty group on first access.", "Each original word is kept in its matching group."], ["defaultdict", "sorting", "hashing"]),
  question("Data structures", "Beginner", "Remove duplicates and keep order", "Deduplicate a sequence without losing its original order.", "Return only the first occurrence of every value.", "red, blue, red, green, blue", "['red', 'blue', 'green']", `values = ["red", "blue", "red", "green", "blue"]
unique = list(dict.fromkeys(values))
print(unique)`, ["A dictionary stores each key once and preserves insertion order.", "dict.fromkeys builds keys from the input values.", "Converting the keys back to a list preserves first-seen order."], ["dict", "lists", "deduplication"]),
  question("Data structures", "Beginner", "Find the second-largest distinct value", "Combine set uniqueness and sorting to handle duplicates.", "Return the second-largest distinct number or raise an error if it does not exist.", "4, 9, 9, 2, 7", "7", `def second_largest(values):
    distinct = sorted(set(values), reverse=True)
    if len(distinct) < 2:
        raise ValueError("at least two distinct values are required")
    return distinct[1]

print(second_largest([4, 9, 9, 2, 7]))`, ["set removes duplicate values before ranking.", "reverse=True places the largest value first.", "An explicit guard gives callers a clear error for too few distinct values."], ["sets", "sorting", "exceptions"]),
  question("Data structures", "Beginner", "Flatten one level of nested lists", "Use nested iteration to combine a simple list of lists.", "Flatten a list of rows by exactly one level.", "[[1, 2], [3], [4, 5]]", "[1, 2, 3, 4, 5]", `rows = [[1, 2], [3], [4, 5]]
flattened = [value for row in rows for value in row]
print(flattened)`, ["The first for selects each inner row.", "The second for visits values inside that row.", "This flattens one level; recursive nesting needs a different algorithm."], ["nested iteration", "comprehensions", "lists"]),
  question("Data structures", "Intermediate", "Rotate a list to the right", "Use slicing and modulo to rotate by any number of steps.", "Rotate a list to the right by k positions, including k larger than its length.", "[1, 2, 3, 4, 5], k = 2", "[4, 5, 1, 2, 3]", `def rotate_right(values, steps):
    if not values:
        return []
    steps %= len(values)
    return values[-steps:] + values[:-steps] if steps else values[:]

print(rotate_right([1, 2, 3, 4, 5], 2))`, ["Modulo reduces k to an equivalent number of steps within the list length.", "The two slices split the list at the rotation point.", "The explicit zero case avoids the surprising values[:-0] empty slice."], ["slicing", "modulo", "edge cases"]),
  question("Algorithms", "Intermediate", "Search a sorted list", "Use binary search to locate a value in logarithmic time.", "Return the index of a target in a sorted list, or -1 if it is absent.", "values = [2, 5, 8, 12, 16], target = 12", "3", `def binary_search(values, target):
    low, high = 0, len(values) - 1
    while low <= high:
        middle = (low + high) // 2
        if values[middle] == target:
            return middle
        if values[middle] < target:
            low = middle + 1
        else:
            high = middle - 1
    return -1

print(binary_search([2, 5, 8, 12, 16], 12))`, ["The middle value eliminates half of the remaining search interval.", "The list must already be sorted for this logic to work.", "Each iteration halves the search space, giving O(log n) time."], ["binary search", "algorithms", "complexity"]),
  question("Algorithms", "Intermediate", "Merge two sorted lists", "Combine sorted sequences in linear time with two pointers.", "Merge two already-sorted integer lists into one sorted list.", "[1, 4, 7] and [2, 3, 8]", "[1, 2, 3, 4, 7, 8]", `def merge_sorted(left, right):
    merged = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            merged.append(left[i])
            i += 1
        else:
            merged.append(right[j])
            j += 1
    return merged + left[i:] + right[j:]

print(merge_sorted([1, 4, 7], [2, 3, 8]))`, ["Two indexes point at the smallest unused item in each input.", "Appending the smaller item keeps the result sorted.", "At most one input has remaining values, which can be appended as a slice."], ["two pointers", "sorting", "lists"]),
  question("Object-oriented", "Beginner", "Implement a simple stack", "Encapsulate last-in, first-out behavior behind a small interface.", "Create a stack with push, pop, and an empty check.", "push('a'), push('b'), pop()", "Popped: b", `class Stack:
    def __init__(self):
        self._items = []

    def push(self, item):
        self._items.append(item)

    def pop(self):
        if not self._items:
            raise IndexError("pop from empty stack")
        return self._items.pop()

    def is_empty(self):
        return not self._items

stack = Stack()
stack.push("a")
stack.push("b")
print("Popped:", stack.pop())`, ["A list append adds to the top of the stack.", "list.pop removes and returns the most recently added item.", "The empty check gives callers a predictable error instead of an obscure failure."], ["classes", "lists", "data structures"]),
  question("Object-oriented", "Beginner", "Use a queue for first-in, first-out", "Choose a deque for efficient insertions at either end.", "Add two tasks to a queue and process the oldest task first.", "email, report", "email", `from collections import deque

tasks = deque()
tasks.append("email")
tasks.append("report")
print(tasks.popleft())`, ["append adds a task at the right end.", "popleft removes the oldest task from the left end.", "deque avoids the costly shifting caused by repeatedly removing list index zero."], ["deque", "queues", "standard library"]),
  question("Data structures", "Intermediate", "Group values by their first letter", "Build a dictionary of lists using a default factory.", "Group each word under its first lowercase letter.", "apple, apricot, banana, blueberry", "{'a': ['apple', 'apricot'], 'b': ['banana', 'blueberry']}", `from collections import defaultdict

groups = defaultdict(list)
for word in ["apple", "apricot", "banana", "blueberry"]:
    groups[word[0]].append(word)

print(dict(groups))`, ["defaultdict(list) supplies a new list for an unseen key.", "The first character becomes the group key.", "dict(groups) converts the specialized mapping to a regular dictionary for display."], ["defaultdict", "dict", "grouping"]),
  question("Functions", "Beginner", "Keep an index with enumerate", "Iterate over items and positions without managing a counter yourself.", "Print each task with a one-based position.", "plan, code, test", "1. plan\\n2. code\\n3. test", `tasks = ["plan", "code", "test"]
for position, task in enumerate(tasks, start=1):
    print(f"{position}. {task}")`, ["enumerate yields an index and item for each value.", "start=1 makes the displayed positions natural for people.", "This avoids manual counter updates that can get out of sync."], ["iteration", "enumerate", "f-strings"]),
  question("Functions", "Beginner", "Pair sequences with zip", "Traverse corresponding items from multiple iterables together.", "Create a dictionary that pairs each name with its score.", "names = Ana, Ben; scores = 92, 85", "{'Ana': 92, 'Ben': 85}", `names = ["Ana", "Ben"]
scores = [92, 85]
result = dict(zip(names, scores))
print(result)`, ["zip yields one tuple of corresponding items on each iteration.", "dict turns the name-score pairs into key-value entries.", "By default zip stops at the shortest iterable; strict=True can detect mismatched lengths."], ["zip", "dict", "iteration"]),
  question("Functions", "Intermediate", "Sort with a lambda key", "Pass a small function to customize a built-in sort.", "Sort words by length and then alphabetically.", "pear, fig, banana, plum", "fig, pear, plum, banana", `words = ["pear", "fig", "banana", "plum"]
result = sorted(words, key=lambda word: (len(word), word))
print(result)`, ["sorted returns a new list and leaves the original unchanged.", "The lambda creates a tuple key: length first, word second.", "Tuple ordering handles the tie-break automatically."], ["lambda", "sorting", "higher-order functions"]),
  question("Functions", "Intermediate", "Map and filter a sequence", "Transform selected values while keeping each operation explicit.", "From a list of prices in cents, keep prices at least 500 cents and convert them to dollars.", "250, 500, 1299", "[5.0, 12.99]", `cents = [250, 500, 1299]
dollars = [
    cents_value / 100
    for cents_value in cents
    if cents_value >= 500
]
print(dollars)`, ["The if clause filters out cheaper items.", "Division converts integer cents into dollar values.", "A comprehension is often clearer than nesting map and filter for a simple transformation."], ["comprehensions", "filtering", "numeric types"]),
  question("Algorithms", "Intermediate", "Sum a nested list recursively", "Use a base case and recursive step to handle nested lists.", "Sum integers in a list that may contain other lists.", "[1, [2, [3]], 4]", "10", `def nested_sum(items):
    total = 0
    for item in items:
        if isinstance(item, list):
            total += nested_sum(item)
        else:
            total += item
    return total

print(nested_sum([1, [2, [3]], 4]))`, ["A list is the recursive case, so nested_sum handles it again.", "A number is the base case and can be added directly.", "Each recursive call returns a subtotal to its parent call."], ["recursion", "isinstance", "lists"]),
  question("Functions", "Advanced", "Create a closure counter", "Return a function that remembers state from its enclosing scope.", "Create a counter whose calls return 1, then 2, then 3.", "Three calls to the returned function", "1, 2, 3", `def make_counter():
    count = 0

    def next_value():
        nonlocal count
        count += 1
        return count

    return next_value

counter = make_counter()
print(counter(), counter(), counter())`, ["next_value is defined inside make_counter and retains access to count.", "nonlocal allows the inner function to rebind the enclosing variable.", "Each call updates the same remembered state."], ["closures", "scope", "nonlocal"]),
  question("Functions", "Advanced", "Write a reusable decorator", "Wrap a function while preserving its public metadata.", "Create a decorator that prints a short message before calling a function.", "Call greet('Ada')", "Calling greet\\nHello, Ada!", `from functools import wraps

def announce(function):
    @wraps(function)
    def wrapper(*args, **kwargs):
        print(f"Calling {function.__name__}")
        return function(*args, **kwargs)
    return wrapper

@announce
def greet(name):
    print(f"Hello, {name}!")

greet("Ada")`, ["A decorator receives a function and returns a replacement callable.", "*args and **kwargs forward any positional and keyword arguments.", "wraps copies useful metadata such as the original function name and docstring."], ["decorators", "closures", "functools"]),
  question("Functions", "Beginner", "Add useful type annotations", "Document a function's input and return types for readers and tools.", "Annotate a function that greets a name and returns a string.", "greet('Ada')", "'Hello, Ada!'", `def greet(name: str) -> str:
    return f"Hello, {name}!"

print(greet("Ada"))`, ["name: str describes the expected argument type.", "-> str describes the return type.", "Annotations help editors and type checkers but are not runtime validation by default."], ["type hints", "functions", "annotations"]),
  question("Functions", "Intermediate", "Use keyword-only options", "Make optional configuration explicit at the call site.", "Write a greeting function with a required name and optional keyword-only greeting.", "greet('Ada', greeting='Welcome')", "Welcome, Ada!", `def greet(name, *, greeting="Hello"):
    return f"{greeting}, {name}!"

print(greet("Ada", greeting="Welcome"))`, ["The * makes parameters after it keyword-only.", "A default value is used when the caller omits greeting.", "Keyword-only options make calls easier to read when functions have several settings."], ["arguments", "defaults", "API design"]),
  question("Functions", "Intermediate", "Stream squares with a generator expression", "Represent a large transformation without building a full list.", "Calculate the sum of squares from 1 through 1,000,000 using a generator.", "range(1, 1_000_001)", "333333833333500000", `total = sum(number * number for number in range(1, 1_000_001))
print(total)`, ["Parentheses create a generator expression that produces one square at a time.", "sum consumes values incrementally rather than storing a million-item list.", "This reduces memory use while still performing all required calculations."], ["generators", "sum", "memory"]),
  question("Exceptions", "Intermediate", "Handle invalid numeric input", "Catch the specific error expected when converting text to a number.", "Convert a text value to an integer and provide a clear result if it is invalid.", "42x", "Please enter a whole number.", `def parse_age(text):
    try:
        age = int(text)
    except ValueError:
        return "Please enter a whole number."
    if age < 0:
        return "Age cannot be negative."
    return f"Age: {age}"

print(parse_age("42x"))`, ["int raises ValueError when text is not a valid integer.", "The except handles that expected input failure without hiding unrelated exceptions.", "The separate range check handles a valid integer that violates the domain."], ["exceptions", "input validation", "control flow"]),
  question("Exceptions", "Intermediate", "Define a custom exception", "Give callers a precise way to recognize a domain-specific failure.", "Raise a custom exception when an account withdrawal exceeds the available balance.", "Balance 50; withdraw 75", "Insufficient funds", `class InsufficientFundsError(Exception):
    pass

def withdraw(balance, amount):
    if amount > balance:
        raise InsufficientFundsError("Insufficient funds")
    return balance - amount

try:
    print(withdraw(50, 75))
except InsufficientFundsError as error:
    print(error)`, ["A custom exception subclasses Exception so callers can catch this failure specifically.", "The function raises instead of returning a misleading balance.", "The caller decides how to present or recover from the error."], ["exceptions", "classes", "API design"]),
  question("Files", "Intermediate", "Manage a file with a context manager", "Use with to guarantee a resource is closed after use.", "Write and then read a small text file using a context manager.", "message.txt", "Python makes progress.", `from pathlib import Path

path = Path("message.txt")
with path.open("w", encoding="utf-8") as file:
    file.write("Python makes progress.")

with path.open(encoding="utf-8") as file:
    print(file.read())`, ["Path.open provides a file object for the chosen path.", "The with statement closes the file even if an exception occurs.", "Specifying UTF-8 makes the text encoding explicit and portable."], ["files", "context managers", "pathlib"]),
  question("Files", "Beginner", "Find Python files with pathlib", "Use object-oriented paths for portable filesystem work.", "List Python source files directly inside a chosen directory.", "folder = Path('src')", "['app.py', 'utils.py']", `from pathlib import Path

folder = Path("src")
python_files = sorted(folder.glob("*.py"))
print([path.name for path in python_files])`, ["Path represents a filesystem path without manually assembling separators.", "glob finds entries matching a pattern in the selected directory.", "Sorting makes the displayed order predictable."], ["pathlib", "files", "glob"]),
  question("Files", "Intermediate", "Read rows from CSV", "Use the csv module instead of splitting rows by commas yourself.", "Read names and scores from CSV text and calculate the average score.", "name,score\\nAna,90\\nBen,80", "Average: 85.0", `import csv
from io import StringIO

data = "name,score\\nAna,90\\nBen,80"
rows = csv.DictReader(StringIO(data))
scores = [int(row["score"]) for row in rows]
print(f"Average: {sum(scores) / len(scores)}")`, ["csv.DictReader uses the header row to name each field.", "StringIO gives the CSV reader a file-like object for this in-memory example.", "The average is the sum divided by the number of records."], ["csv", "files", "data processing"]),
  question("Files", "Intermediate", "Serialize data as JSON", "Convert between Python dictionaries and interoperable JSON text.", "Serialize a small user record to formatted JSON and load it back.", "{'name': 'Ada', 'active': True}", "{\\n  \"name\": \"Ada\",\\n  \"active\": true\\n}", `import json

user = {"name": "Ada", "active": True}
encoded = json.dumps(user, indent=2)
decoded = json.loads(encoded)
print(encoded)
print(decoded["name"])`, ["dumps converts a supported Python value to JSON text.", "JSON uses true and false, while Python uses True and False.", "loads parses JSON text into ordinary Python values."], ["json", "serialization", "dict"]),
  question("Object-oriented", "Intermediate", "Model data with a dataclass", "Reduce boilerplate for classes primarily used to hold data.", "Define a Book record and display its title and author.", "The Hobbit / J. R. R. Tolkien", "Book(title='The Hobbit', author='J. R. R. Tolkien')", `from dataclasses import dataclass

@dataclass
class Book:
    title: str
    author: str

book = Book("The Hobbit", "J. R. R. Tolkien")
print(book)`, ["@dataclass generates common methods such as __init__ and __repr__.", "Type annotations declare the record's fields.", "Dataclasses suit simple data containers; add methods when behavior belongs to the record."], ["dataclasses", "classes", "type hints"]),
  question("Object-oriented", "Intermediate", "Override inherited behavior", "Specialize a base class method in a derived class.", "Create a base notification and an email notification with different descriptions.", "EmailNotification('Your report is ready')", "Email: Your report is ready", `class Notification:
    def __init__(self, message):
        self.message = message

    def describe(self):
        return self.message

class EmailNotification(Notification):
    def describe(self):
        return f"Email: {self.message}"

print(EmailNotification("Your report is ready").describe())`, ["EmailNotification inherits the base initializer and message attribute.", "Its describe method overrides the base implementation.", "Code using the shared describe interface can work with either notification type."], ["inheritance", "method overriding", "polymorphism"]),
  question("Object-oriented", "Intermediate", "Validate an attribute with a property", "Keep an attribute interface while enforcing a class invariant.", "Create a temperature class that rejects values below absolute zero in Celsius.", "Temperature(-300)", "ValueError: temperature is below absolute zero", `class Temperature:
    def __init__(self, celsius):
        self.celsius = celsius

    @property
    def celsius(self):
        return self._celsius

    @celsius.setter
    def celsius(self, value):
        if value < -273.15:
            raise ValueError("temperature is below absolute zero")
        self._celsius = value

temperature = Temperature(20)
print(temperature.celsius)`, ["The property lets callers read temperature.celsius naturally.", "The setter validates every assigned value before storing it.", "The leading underscore marks _celsius as the internal storage attribute by convention."], ["properties", "validation", "encapsulation"]),
  question("Object-oriented", "Intermediate", "Give an object a useful representation", "Implement special methods to integrate naturally with Python.", "Make a point print clearly and compare equal when its coordinates match.", "Point(2, 3)", "Point(x=2, y=3)", `class Point:
    def __init__(self, x, y):
        self.x, self.y = x, y

    def __repr__(self):
        return f"Point(x={self.x}, y={self.y})"

    def __eq__(self, other):
        if not isinstance(other, Point):
            return NotImplemented
        return (self.x, self.y) == (other.x, other.y)

print(Point(2, 3))`, ["__repr__ provides a developer-friendly representation used by print when __str__ is absent.", "__eq__ defines value equality rather than identity.", "NotImplemented lets Python try the other operand's comparison behavior."], ["special methods", "equality", "classes"]),
  question("Object-oriented", "Intermediate", "Prefer composition for a has-a relationship", "Build behavior by delegating to a contained object.", "Give a car an engine and delegate its start operation.", "Car(Engine()).start()", "Engine started", `class Engine:
    def start(self):
        return "Engine started"

class Car:
    def __init__(self, engine):
        self.engine = engine

    def start(self):
        return self.engine.start()

print(Car(Engine()).start())`, ["A Car has an Engine, so composition expresses the relationship directly.", "Car delegates the operation to its engine.", "Composition allows another engine implementation to be supplied without changing Car."], ["composition", "classes", "design"]),
  question("Object-oriented", "Intermediate", "Create an alternate constructor", "Use a class method to construct an object from a different representation.", "Create a Point from a comma-separated pair of coordinates.", "'3, 4'", "Point(x=3, y=4)", `class Point:
    def __init__(self, x, y):
        self.x, self.y = x, y

    @classmethod
    def from_text(cls, text):
        x_text, y_text = text.split(",")
        return cls(int(x_text), int(y_text))

point = Point.from_text("3, 4")
print(point.x, point.y)`, ["A class method receives the class as cls.", "The alternate constructor parses text, then creates the right class with cls(...).", "Using cls rather than a hard-coded class name supports subclasses."], ["classmethod", "constructors", "parsing"]),
  question("Object-oriented", "Beginner", "Use a static method for a utility", "Group a helper with a class without passing instance or class state.", "Add a static method that checks whether a value is a valid percentage.", "40, 101", "True, False", `class Score:
    @staticmethod
    def is_valid_percentage(value):
        return 0 <= value <= 100

print(Score.is_valid_percentage(40))
print(Score.is_valid_percentage(101))`, ["A static method receives no implicit self or cls argument.", "The inclusive comparison accepts both endpoints.", "A standalone function may be preferable if the helper is not conceptually tied to Score."], ["staticmethod", "classes", "validation"]),
  question("Object-oriented", "Advanced", "Define an abstract interface", "Require subclasses to provide a specific operation.", "Define an abstract Shape with an area method and implement Circle.", "Circle(radius=2)", "12.566370614359172", `from abc import ABC, abstractmethod
import math

class Shape(ABC):
    @abstractmethod
    def area(self):
        raise NotImplementedError

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius

    def area(self):
        return math.pi * self.radius**2

print(Circle(2).area())`, ["ABC marks Shape as an abstract base class.", "@abstractmethod prevents creating a Shape without implementing area.", "Circle fulfills the interface with the area formula πr²."], ["abc", "inheritance", "interfaces"]),
  question("Object-oriented", "Beginner", "Use an enum for fixed choices", "Represent a finite set of named states without magic strings.", "Define three task states and print the value of the active state.", "Status.ACTIVE", "active", `from enum import Enum

class Status(Enum):
    TODO = "todo"
    ACTIVE = "active"
    DONE = "done"

print(Status.ACTIVE.value)`, ["Enum groups related constant choices into one type.", "Members are compared by identity, such as Status.ACTIVE.", "The value property exposes the configured serialized value."], ["enum", "constants", "types"]),
  question("Functions", "Intermediate", "Annotate optional values", "Describe a value that may be absent with a union type.", "Write a function that returns a person's display name or None.", "display_name('Ada', None)", "'Ada'", `def display_name(first: str, last: str | None) -> str:
    if last is None:
        return first
    return f"{first} {last}"

print(display_name("Ada", None))`, ["str | None describes a string or the absence of one in Python 3.10+.", "The explicit None check narrows the value before it is formatted.", "Type hints document the contract but do not validate external input."], ["type hints", "union types", "None"]),
  question("Object-oriented", "Advanced", "Accept objects through a protocol", "Describe required behavior structurally rather than through inheritance.", "Write a function that can report any object with a name attribute.", "A named object with name='Python'", "Python", `from typing import Protocol

class Named(Protocol):
    name: str

def describe(item: Named) -> str:
    return item.name

class Course:
    name = "Python"

print(describe(Course()))`, ["A Protocol declares the members a compatible object must provide.", "Course does not need to inherit from Named; matching structure is sufficient.", "Static type checkers can verify that the call meets the protocol."], ["Protocol", "typing", "duck typing"]),
  question("Fundamentals", "Intermediate", "Match structured command values", "Use pattern matching to make a set of alternatives easy to scan.", "Return a message for start, stop, and unknown commands.", "('start', 'server')", "Starting server", `def handle(command):
    match command:
        case ("start", service):
            return f"Starting {service}"
        case ("stop", service):
            return f"Stopping {service}"
        case _:
            return "Unknown command"

print(handle(("start", "server")))`, ["match compares the command against each case in order.", "The service name is captured from the second tuple element.", "The wildcard case handles every command not matched earlier."], ["match", "pattern matching", "control flow"]),
  question("Strings", "Intermediate", "Extract values with a regular expression", "Use named groups to capture structured parts of text.", "Extract a date written as YYYY-MM-DD from a sentence.", "Release date: 2026-10-31", "2026-10-31", `import re

text = "Release date: 2026-10-31"
match = re.search(r"(?P<year>\\d{4})-(?P<month>\\d{2})-(?P<day>\\d{2})", text)
if match:
    print(match.group(0))
    print(match.groupdict())`, ["Raw strings keep backslashes in regular expressions readable.", "Named groups capture each date component for later use.", "A successful search returns a match object; otherwise it returns None."], ["regular expressions", "parsing", "strings"]),
  question("Strings", "Intermediate", "Normalize Unicode text", "Compare equivalent text consistently even when code points differ.", "Normalize composed and decomposed forms of the same accented character.", "'é' and 'e' followed by a combining accent", "Normalized values are equal: True", `import unicodedata

composed = "é"
decomposed = "e\\u0301"
left = unicodedata.normalize("NFC", composed)
right = unicodedata.normalize("NFC", decomposed)
print("Normalized values are equal:", left == right)`, ["A visible character can be represented by different Unicode code-point sequences.", "NFC normalization combines compatible sequences into a consistent form.", "Normalize at defined boundaries when text equality requires it."], ["Unicode", "normalization", "internationalization"]),
  question("Strings", "Intermediate", "Encode text as UTF-8 bytes", "Move explicitly between Unicode text and encoded byte sequences.", "Encode a greeting as UTF-8 and decode the bytes again.", "Café", "b'Caf\\xc3\\xa9' then Café", `text = "Café"
encoded = text.encode("utf-8")
decoded = encoded.decode("utf-8")
print(encoded)
print(decoded)`, ["str stores Unicode text; encode turns it into bytes using a chosen encoding.", "UTF-8 represents the accented character with multiple bytes.", "decode must use a compatible encoding to reconstruct the text."], ["Unicode", "bytes", "encoding"]),
  question("Standard library", "Intermediate", "Work with timezone-aware dates", "Represent a moment with an explicit timezone instead of an ambiguous local time.", "Create a UTC timestamp and convert it to a fixed UTC+05:30 offset.", "2026-10-31 12:00 UTC", "2026-10-31 17:30 +0530", `from datetime import datetime, timedelta, timezone

utc_time = datetime(2026, 10, 31, 12, 0, tzinfo=timezone.utc)
india_offset = timezone(timedelta(hours=5, minutes=30))
local_time = utc_time.astimezone(india_offset)
print(local_time.strftime("%Y-%m-%d %H:%M %z"))`, ["An aware datetime includes timezone information.", "A fixed offset is portable, but it does not model daylight-saving rules.", "For region-based timezones, use zoneinfo and install timezone data where the operating system does not provide it."], ["datetime", "time zones", "timezone"]),
  question("Standard library", "Beginner", "Add structured application logging", "Use logging levels instead of scattered print statements.", "Log a successful connection and an invalid configuration.", "Run the two logging calls", "INFO: Connected to the service\\nWARNING: Retry limit is low", `import logging

logging.basicConfig(level=logging.INFO, format="%(levelname)s: %(message)s")
logging.info("Connected to the service")
logging.warning("Retry limit is low")`, ["The logging module provides levels such as DEBUG, INFO, WARNING, and ERROR.", "The configured threshold controls which messages are emitted.", "Applications can route log records to files, consoles, or monitoring systems."], ["logging", "diagnostics", "standard library"]),
  question("Standard library", "Intermediate", "Parse command-line options", "Use argparse to create a self-documenting command-line interface.", "Accept a name argument and optional greeting from the command line.", "program --name Ada --greeting Welcome", "Welcome, Ada!", `import argparse

parser = argparse.ArgumentParser(description="Greet someone")
parser.add_argument("--name", required=True)
parser.add_argument("--greeting", default="Hello")
args = parser.parse_args(["--name", "Ada", "--greeting", "Welcome"])
print(f"{args.greeting}, {args.name}!")`, ["ArgumentParser defines a command-line interface and generates help text.", "required=True makes --name mandatory; greeting has a default.", "parse_args normally reads process arguments; a list keeps this example reproducible."], ["argparse", "CLI", "standard library"]),
  question("Testing", "Beginner", "Write a unit test", "Turn expected behavior into a repeatable automated check.", "Test that a function returns the area of a rectangle.", "area(4, 3)", "Test passes with result 12", `import unittest

def rectangle_area(width, height):
    return width * height

class RectangleTests(unittest.TestCase):
    def test_area(self):
        self.assertEqual(rectangle_area(4, 3), 12)

if __name__ == "__main__":
    unittest.main()`, ["A unit test checks one small piece of behavior.", "assertEqual compares the actual result with the expected value.", "The main guard runs the test suite only when this file is executed directly."], ["unittest", "testing", "assertions"]),
  question("Testing", "Advanced", "Mock an external dependency", "Replace a slow or unpredictable dependency with a controlled test double.", "Test a function that fetches a user's name without making a real network request.", "fetch_name(7)", "Ada", `from unittest.mock import patch

def lookup_user(user_id):
    raise NotImplementedError

def fetch_name(user_id):
    response = lookup_user(user_id)
    return response["name"]

with patch(__name__ + ".lookup_user", return_value={"name": "Ada"}):
    print(fetch_name(7))`, ["patch temporarily replaces lookup_user in the module where fetch_name looks it up.", "return_value supplies a predictable response to the test.", "Mocking keeps a unit test fast and independent of a network service."], ["unittest.mock", "testing", "dependency isolation"]),
  question("Standard library", "Intermediate", "Measure a small function", "Use timeit to measure repeated work instead of guessing about speed.", "Measure the cost of summing a range over repeated runs.", "sum(range(1000))", "A measured duration in seconds", `import timeit

seconds = timeit.timeit("sum(range(1000))", number=10_000)
print(f"{seconds:.4f} seconds")`, ["timeit runs a small statement many times and reports elapsed time.", "Repeating the operation makes very short tasks measurable.", "Benchmark in the environment and workload that matter to your application."], ["timeit", "profiling", "performance"]),
  question("Functions", "Intermediate", "Cache an expensive pure function", "Memoize results when the same inputs are requested repeatedly.", "Cache a recursive Fibonacci calculation and compute the 35th value.", "fibonacci(35)", "9227465", `from functools import cache

@cache
def fibonacci(number):
    if number < 2:
        return number
    return fibonacci(number - 1) + fibonacci(number - 2)

print(fibonacci(35))`, ["@cache stores the result for each argument combination.", "Repeated recursive calls reuse earlier results rather than recalculating them.", "Caching is appropriate when a function's output depends only on its inputs."], ["functools", "recursion", "caching"]),
  question("Standard library", "Intermediate", "Generate combinations with itertools", "Produce combinations lazily instead of writing nested loops.", "List every two-item combination from four colors.", "red, green, blue, gold", "[('red', 'green'), ...]", `from itertools import combinations

colors = ["red", "green", "blue", "gold"]
for pair in combinations(colors, 2):
    print(pair)`, ["combinations selects items without repeating positions or changing their order.", "The second argument sets the number of items in each result.", "The iterator produces results on demand."], ["itertools", "combinations", "iterators"]),
  question("Standard library", "Intermediate", "Select the largest values efficiently", "Use a heap helper when you need only a few extremes.", "Find the three largest values without sorting the entire collection.", "4, 10, 2, 8, 15, 7", "[15, 10, 8]", `import heapq

values = [4, 10, 2, 8, 15, 7]
print(heapq.nlargest(3, values))`, ["nlargest maintains the values needed for the requested top results.", "It returns the results in descending order.", "For a small collection, sorted(values, reverse=True)[:3] may be simpler."], ["heapq", "algorithms", "collections"]),
  question("Standard library", "Intermediate", "Insert into a sorted list", "Use binary search helpers to find an insertion position.", "Insert 6 into a sorted list while keeping it sorted.", "[1, 3, 5, 7]", "[1, 3, 5, 6, 7]", `from bisect import insort

values = [1, 3, 5, 7]
insort(values, 6)
print(values)`, ["insort finds the insertion point using binary search.", "The list stays sorted after the new value is inserted.", "Finding the position is O(log n), but shifting list items still costs O(n)."], ["bisect", "binary search", "lists"]),
  question("Data structures", "Advanced", "Calculate a sliding window average", "Use a deque to maintain a bounded stream of recent values.", "Calculate the average for each consecutive window of size three.", "2, 4, 6, 8, 10", "[4.0, 6.0, 8.0]", `from collections import deque

def moving_averages(values, width):
    window = deque(maxlen=width)
    averages = []
    for value in values:
        window.append(value)
        if len(window) == width:
            averages.append(sum(window) / width)
    return averages

print(moving_averages([2, 4, 6, 8, 10], 3))`, ["The deque retains only the most recent width values.", "An average is emitted once the window is full.", "For very large windows, maintain a running sum to avoid summing the window each time."], ["deque", "algorithms", "sliding window"]),
  question("Algorithms", "Intermediate", "Choose a set for fast membership", "Use the right data structure when repeated membership checks dominate.", "Count how many requested IDs exist in a collection of known IDs.", "known: 1, 4, 7; requested: 4, 5, 7", "2", `known_ids = [1, 4, 7]
requested_ids = [4, 5, 7]
known = set(known_ids)
matches = sum(item in known for item in requested_ids)
print(matches)`, ["A set is optimized for membership tests.", "Each in check returns a Boolean that sum can count.", "Building a set has a cost, so it is most useful for repeated lookups."], ["sets", "membership", "complexity"]),
  question("Security", "Intermediate", "Create a file integrity hash", "Use a standard cryptographic hash to detect changes in file content.", "Calculate a SHA-256 digest for a short byte string.", "b'python'", "64-character SHA-256 hexadecimal digest", `import hashlib

payload = b"python"
digest = hashlib.sha256(payload).hexdigest()
print(digest)`, ["SHA-256 maps bytes to a fixed-size digest.", "A small content change produces a different digest with overwhelming probability.", "A hash does not encrypt data or authenticate it by itself; use established protocols for security."], ["hashlib", "integrity", "security"]),
  question("Files", "Intermediate", "Store records in SQLite", "Persist structured records with a small built-in relational database.", "Create a table, insert a row safely, and query it.", "Ana, score 92", "('Ana', 92)", `import sqlite3

connection = sqlite3.connect(":memory:")
try:
    with connection:
        connection.execute("CREATE TABLE scores (name TEXT, score INTEGER)")
        connection.execute(
            "INSERT INTO scores VALUES (?, ?)", ("Ana", 92)
        )
        row = connection.execute("SELECT name, score FROM scores").fetchone()
        print(row)
finally:
    connection.close()`, ["The connection context manager commits a successful transaction or rolls it back on failure.", "Question marks bind values safely instead of formatting them into SQL text.", "The finally block closes the connection; fetchone returns one row as a tuple."], ["sqlite3", "SQL", "persistence"]),
  question("Web and networking", "Intermediate", "Parse a URL safely", "Use urllib.parse to inspect URL components and query parameters.", "Extract a page's host and query values from a URL.", "https://example.com/search?q=python&page=2", "example.com; q=python; page=2", `from urllib.parse import parse_qs, urlparse

url = "https://example.com/search?q=python&page=2"
parts = urlparse(url)
query = parse_qs(parts.query)
print(parts.netloc)
print(query["q"][0], query["page"][0])`, ["urlparse separates the scheme, host, path, and query string.", "parse_qs turns query parameters into a mapping of names to value lists.", "URL parsing is different from validating whether a destination is safe to contact."], ["urllib.parse", "URLs", "web"]),
  question("Web and networking", "Intermediate", "Prepare a JSON API request", "Build an HTTP request with an explicit response format.", "Create a GET request that asks a JSON API to return JSON.", "GET https://api.example.com/items/1", "GET; Accept: application/json", `from urllib.request import Request

request = Request(
    "https://api.example.com/items/1",
    headers={"Accept": "application/json"},
)
print(request.get_method())
print(request.get_header("Accept"))`, ["Request represents the HTTP method, destination, and headers without sending it.", "Accept communicates the response format the client can handle.", "To send the request, use urlopen with a timeout and handle HTTP errors explicitly."], ["urllib", "HTTP", "headers"]),
  question("Web and networking", "Intermediate", "Exchange bytes with a local socket pair", "Understand socket streams without connecting to an external host.", "Send a short message between two connected local sockets.", "'hello socket'", "b'hello socket'", `import socket

left, right = socket.socketpair()
try:
    left.sendall(b"hello socket")
    print(right.recv(100))
finally:
    left.close()
    right.close()`, ["socketpair creates two connected local sockets for a small demonstration.", "Sockets send bytes, so text must be encoded before sending.", "Closing both sockets in finally releases system resources even if an operation fails."], ["sockets", "bytes", "networking"]),
  question("Concurrency", "Intermediate", "Run asynchronous tasks together", "Use asyncio to overlap independent I/O-style waits.", "Run two asynchronous tasks and collect their results.", "Tasks taking 0.02 and 0.01 seconds", "['first', 'second']", `import asyncio

async def fetch(label, delay):
    await asyncio.sleep(delay)
    return label

async def main():
    results = await asyncio.gather(
        fetch("first", 0.02),
        fetch("second", 0.01),
    )
    print(results)

asyncio.run(main())`, ["async def defines a coroutine function.", "await yields control while a task is waiting, allowing other tasks to progress.", "gather waits for all supplied coroutines and returns results in their input order."], ["asyncio", "coroutines", "concurrency"]),
  question("Concurrency", "Intermediate", "Use a thread pool for I/O work", "Schedule independent blocking tasks on a managed pool of threads.", "Run several simulated I/O waits without waiting for each one sequentially.", "Three tasks with a short wait", "Three task results", `from concurrent.futures import ThreadPoolExecutor
import time

def fetch(item):
    time.sleep(0.05)
    return f"received {item}"

with ThreadPoolExecutor(max_workers=3) as executor:
    results = list(executor.map(fetch, ["A", "B", "C"]))
print(results)`, ["ThreadPoolExecutor manages a fixed number of worker threads.", "map schedules the calls and yields results in input order.", "Threads are useful for I/O waits; CPU-heavy Python code may not speed up due to the GIL."], ["threading", "concurrency", "I/O"]),
  question("Concurrency", "Advanced", "Use processes for CPU-heavy work", "Run independent CPU-bound calculations in separate processes.", "Calculate squares in parallel with a process pool.", "1, 2, 3, 4", "[1, 4, 9, 16]", `from concurrent.futures import ProcessPoolExecutor

def square(number):
    return number * number

if __name__ == "__main__":
    with ProcessPoolExecutor() as executor:
        results = list(executor.map(square, [1, 2, 3, 4]))
    print(results)`, ["A process pool runs work in separate Python processes.", "Worker functions and arguments must be serializable for process communication.", "The main guard is essential on platforms that start child processes by importing the script."], ["multiprocessing", "process pools", "parallelism"]),
  question("Standard library", "Intermediate", "Run a subprocess safely", "Pass a command and arguments as a list rather than building a shell string.", "Run the current Python interpreter to print a short message.", "Current Python executable", "hello from child", `import subprocess
import sys

result = subprocess.run(
    [sys.executable, "-c", "print('hello from child')"],
    check=True,
    capture_output=True,
    text=True,
)
print(result.stdout.strip())`, ["A list of arguments avoids shell parsing and quoting problems.", "check=True raises CalledProcessError when the child exits unsuccessfully.", "capture_output and text make the output available as a string."], ["subprocess", "processes", "safety"]),
  question("Standard library", "Beginner", "Read configuration from an environment variable", "Keep environment-specific settings out of source code.", "Read an optional application mode with a safe default.", "APP_MODE=development", "development", `import os

mode = os.environ.get("APP_MODE", "production")
print(f"Running in {mode} mode")`, ["Environment variables provide configuration outside the source file.", "get returns a default if APP_MODE is not defined.", "Do not store secrets in logs or expose them in client-side code."], ["os", "configuration", "environment"]),
  question("Files", "Intermediate", "Create a temporary file safely", "Use tempfile to manage scratch files with automatic cleanup.", "Write text to a temporary file and read it back.", "temporary notes", "temporary notes", `from pathlib import Path
from tempfile import TemporaryDirectory

with TemporaryDirectory() as directory:
    path = Path(directory) / "notes.txt"
    path.write_text("temporary notes", encoding="utf-8")
    print(path.read_text(encoding="utf-8"))`, ["TemporaryDirectory creates an isolated temporary location.", "Path combines paths portably and provides convenient text methods.", "The temporary directory and its contents are cleaned up when the context exits."], ["tempfile", "pathlib", "context managers"]),
  question("Files", "Intermediate", "Parse XML data", "Use an XML parser rather than string matching for structured documents.", "Read a small XML document and find the text of its title element.", "<book><title>Python Basics</title></book>", "Python Basics", `import xml.etree.ElementTree as ET

xml_text = "<book><title>Python Basics</title></book>"
root = ET.fromstring(xml_text)
print(root.findtext("title"))`, ["ElementTree parses XML into a structured element tree.", "findtext looks for a child element and returns its text.", "Treat untrusted XML carefully and use hardened parsing options for hostile input."], ["XML", "parsing", "standard library"]),
  question("Web and networking", "Intermediate", "Extract text from HTML", "Use an HTML parser to recognize document structure instead of a regular expression.", "Collect text data from paragraph elements in a small HTML fragment.", "<p>Hello</p><p>Python</p>", "['Hello', 'Python']", `from html.parser import HTMLParser

class ParagraphParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.in_paragraph = False
        self.paragraphs = []

    def handle_starttag(self, tag, attrs):
        if tag == "p":
            self.in_paragraph = True

    def handle_endtag(self, tag):
        if tag == "p":
            self.in_paragraph = False

    def handle_data(self, data):
        if self.in_paragraph and data.strip():
            self.paragraphs.append(data.strip())

parser = ParagraphParser()
parser.feed("<p>Hello</p><p>Python</p>")
print(parser.paragraphs)`, ["HTMLParser reports start tags, end tags, and text data as events.", "The parser tracks whether text belongs to a paragraph.", "For production scraping, account for nested markup and use a parser/library suited to the target."], ["HTML", "parsing", "web"]),
  question("Files", "Intermediate", "Create a ZIP archive", "Use zipfile to package files without manually managing archive formats.", "Create an archive containing a short text file.", "notes.txt", "Archive contains notes.txt", `from pathlib import Path
from tempfile import TemporaryDirectory
from zipfile import ZipFile

with TemporaryDirectory() as directory:
    source = Path(directory) / "notes.txt"
    archive = Path(directory) / "notes.zip"
    source.write_text("study Python", encoding="utf-8")
    with ZipFile(archive, "w") as zip_file:
        zip_file.write(source, arcname=source.name)
    with ZipFile(archive) as zip_file:
        print(zip_file.namelist())`, ["ZipFile is a context manager that closes the archive reliably.", "arcname controls the path stored inside the archive.", "Inspect archive paths before extracting untrusted archives."], ["zipfile", "archives", "files"]),
  question("Standard library", "Intermediate", "Compress and decompress bytes", "Use zlib when a compact compressed byte stream is appropriate.", "Compress a byte string and recover the original data.", "b'Python data ' repeated 100 times", "Recovered data matches: True", `import zlib

original = b"Python data " * 100
compressed = zlib.compress(original)
recovered = zlib.decompress(compressed)
print("Recovered data matches:", recovered == original)
print("Sizes:", len(original), len(compressed))`, ["zlib.compress produces compressed bytes.", "zlib.decompress reconstructs the original byte sequence.", "Compression is most useful for data with repeated patterns; validate sizes for real workloads."], ["zlib", "compression", "bytes"]),
  question("GUI and packaging", "Intermediate", "Create a tiny desktop window", "Use Tkinter's event loop to build a simple desktop interface.", "Create a window with a button that updates a greeting label.", "Click the Greet button", "The label changes to Hello, Python learner!", `import tkinter as tk

root = tk.Tk()
root.title("Python Path")
message = tk.Label(root, text="Welcome")
message.pack(padx=20, pady=12)

def greet():
    message.config(text="Hello, Python learner!")

tk.Button(root, text="Greet", command=greet).pack(pady=8)
root.mainloop()`, ["Tk creates the application window and widgets.", "The button's command receives a callback that updates the label.", "mainloop processes UI events; avoid blocking it with long-running work."], ["tkinter", "GUI", "event loop"]),
  question("Modules and packaging", "Advanced", "Create an import-safe program entry point", "Separate reusable functions from code that runs only as a script.", "Make a module that can be imported without printing, but prints a message when run directly.", "python -m greeting", "Hello from the program entry point", `def main():
    print("Hello from the program entry point")

if __name__ == "__main__":
    main()`, ["Defining main keeps the program's entry point organized.", "__name__ is set to __main__ when this module is executed directly.", "When another module imports it, the guarded call is skipped and its functions can be reused."], ["modules", "imports", "program structure"]),
].map((item, index) => ({ id: index + 1, ...item }));
