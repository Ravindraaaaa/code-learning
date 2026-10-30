/**
 * Canonical 15 Debug Arena Challenges
 * Distributed across C++, Java, and JavaScript (5 each)
 * Covering Easy (6), Medium (6), and Hard (3) difficulty levels
 * Covering Syntax, Logical, and Runtime bug types
 */

export const DEFAULT_DEBUG_CHALLENGES = [
  // =========================================================================
  // JAVASCRIPT CHALLENGES (5)
  // =========================================================================
  {
    _id: '65f1d0000000000000000001',
    title: 'Off-By-One Palindrome Checker',
    language: 'javascript',
    difficulty: 'Easy',
    bugType: 'Logical',
    description: `### Problem Description
You are given a string. You need to determine whether the string is a palindrome. A palindrome is a word, phrase, number, or other sequence of characters that reads the same forward and backward (case-insensitive and alphanumeric characters only).

### Expected Behavior
- Convert the string to lowercase and strip all non-alphanumeric characters.
- Print \`true\` if the cleaned string is a palindrome, otherwise print \`false\`.

### Buggy Behavior
The current implementation fails for almost every input because of an off-by-one boundary comparison in the two-pointer loop.`,
    buggyCode: `const fs = require('fs');

function isPalindrome(str) {
  const clean = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  let n = clean.length;
  
  // BUG: Off-by-one index error. clean.length - i accesses out of bounds when i === 0!
  for (let i = 0; i < Math.floor(n / 2); i++) {
    if (clean[i] !== clean[n - i]) {
      return false;
    }
  }
  return true;
}

const input = fs.readFileSync(0, 'utf8').trim();
console.log(isPalindrome(input) ? 'true' : 'false');
`,
    solutionCode: `const fs = require('fs');

function isPalindrome(str) {
  const clean = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  let n = clean.length;
  
  for (let i = 0; i < Math.floor(n / 2); i++) {
    if (clean[i] !== clean[n - 1 - i]) {
      return false;
    }
  }
  return true;
}

const input = fs.readFileSync(0, 'utf8').trim();
console.log(isPalindrome(input) ? 'true' : 'false');
`,
    hints: [
      "Category: String Indexing & Boundary Condition. This is an off-by-one logical flaw that manifests during character comparisons at the sequence boundaries.",
      "Code Section: Focus on the two-pointer loop inside the isPalindrome function, specifically the formula used to compute the opposing character index on the right.",
      "Concept: JavaScript strings are 0-indexed, meaning valid indices range from 0 to length - 1. When mirroring an index i from the start, the corresponding index from the end must account for the 0-based offset relative to the total length."
    ],
    testCases: [
      { input: 'racecar', expectedOutput: 'true', isHidden: false, explanation: 'racecar reads identically forward and backward' },
      { input: 'hello', expectedOutput: 'false', isHidden: false, explanation: 'hello reversed is olleh, not equal' },
      { input: 'A man a plan a canal Panama', expectedOutput: 'true', isHidden: true, explanation: 'Ignoring spaces and case, it is amanaplanacanalpanama' },
      { input: 'No lemon no melon', expectedOutput: 'true', isHidden: true, explanation: 'Palindrome with spaces' }
    ],
    status: 'published',
    isActive: true
  },

  {
    _id: '65f1d0000000000000000002',
    title: 'Factorial Recursion Stack Overflow',
    language: 'javascript',
    difficulty: 'Easy',
    bugType: 'Runtime',
    description: `### Problem Description
Calculate the factorial of a non-negative integer $N$ ($N! = N \\times (N-1) \\times \\dots \\times 1$).
By definition, $0! = 1$.

### Expected Behavior
- For $N = 5$, output \`120\`.
- For $N = 0$, output \`1\`.

### Buggy Behavior
The recursive function crashes with \`RangeError: Maximum call stack size exceeded\` when $N = 0$ because the base case condition only checks \`n === 1\`.`,
    buggyCode: `const fs = require('fs');

function factorial(n) {
  // BUG: Base case missing 0! When n is 0, it calls factorial(-1) into infinite recursion.
  if (n === 1) {
    return 1;
  }
  return n * factorial(n - 1);
}

const input = fs.readFileSync(0, 'utf8').trim();
const num = parseInt(input, 10);
console.log(factorial(num));
`,
    solutionCode: `const fs = require('fs');

function factorial(n) {
  if (n <= 1) {
    return 1;
  }
  return n * factorial(n - 1);
}

const input = fs.readFileSync(0, 'utf8').trim();
const num = parseInt(input, 10);
console.log(factorial(num));
`,
    hints: [
      "Category: Recursion Termination & Call Stack Exhaustion. The runtime engine exhausts all available stack frames when evaluated on small non-negative edge cases.",
      "Code Section: Inspect the guard condition in the base case of factorial(n). What happens when n is passed as 0?",
      "Concept: A mathematically sound factorial function must terminate for all non-negative integers. In discrete mathematics and combinatorics, 0! is defined as 1, so the recursion must halt before descending into negative values."
    ],
    testCases: [
      { input: '5', expectedOutput: '120', isHidden: false, explanation: '5 * 4 * 3 * 2 * 1 = 120' },
      { input: '0', expectedOutput: '1', isHidden: false, explanation: '0! is 1 by mathematical definition' },
      { input: '1', expectedOutput: '1', isHidden: true, explanation: '1! is 1' },
      { input: '7', expectedOutput: '5040', isHidden: true, explanation: '7! = 5040' }
    ],
    status: 'published',
    isActive: true
  },

  {
    _id: '65f1d0000000000000000003',
    title: 'Two Sum Premature Hash Map Insertion',
    language: 'javascript',
    difficulty: 'Medium',
    bugType: 'Logical',
    description: `### Problem Description
Given an array of integers \`nums\` and an integer \`target\`, find the 0-based indices of the two numbers such that they add up to \`target\`.
You may assume that each input has exactly one solution, and you may not use the same element twice.

### Input Format
First line: $N$ (number of elements).
Second line: space-separated integers.
Third line: target sum.

### Expected Behavior
Output the two 0-based indices in ascending order separated by a space (e.g. \`1 2\`).

### Buggy Behavior
The author stores the element into the hash map *before* checking if the complement exists. As a result, when \`target = 6\` and the number is \`3\`, the algorithm pairs the number with itself!`,
    buggyCode: `const fs = require('fs');

function twoSum(nums, target) {
  const map = new Map();
  
  for (let i = 0; i < nums.length; i++) {
    // BUG: Inserting before checking allows nums[i] to match with itself!
    map.set(nums[i], i);
    
    const complement = target - nums[i];
    if (map.has(complement)) {
      const j = map.get(complement);
      return [j, i].sort((a, b) => a - b);
    }
  }
  return [];
}

const lines = fs.readFileSync(0, 'utf8').trim().split('\\n');
if (lines.length >= 3) {
  const nums = lines[1].trim().split(/\\s+/).map(Number);
  const target = parseInt(lines[2].trim(), 10);
  const res = twoSum(nums, target);
  console.log(res.join(' '));
}
`,
    solutionCode: `const fs = require('fs');

function twoSum(nums, target) {
  const map = new Map();
  
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      const j = map.get(complement);
      return [j, i].sort((a, b) => a - b);
    }
    map.set(nums[i], i);
  }
  return [];
}

const lines = fs.readFileSync(0, 'utf8').trim().split('\\n');
if (lines.length >= 3) {
  const nums = lines[1].trim().split(/\\s+/).map(Number);
  const target = parseInt(lines[2].trim(), 10);
  const res = twoSum(nums, target);
  console.log(res.join(' '));
}
`,
    hints: [
      "Category: Hash Table Lookups & Self-Matching Collision. The bug stems from state mutation timing where an element becomes eligible to pair with itself.",
      "Code Section: Examine the sequence of statements inside the for loop in twoSum. Pay attention to whether the current element is written into the Map before or after checking for its complement.",
      "Concept: When finding two distinct elements that sum to a target, an element should only be matched against previously visited elements. Inserting an element into the lookup table before probing for its complement allows a single number to satisfy its own complement."
    ],
    testCases: [
      { input: '3\n3 2 4\n6', expectedOutput: '1 2', isHidden: false, explanation: 'nums[1] (2) + nums[2] (4) = 6' },
      { input: '3\n3 3 6\n6', expectedOutput: '0 1', isHidden: false, explanation: 'nums[0] (3) + nums[1] (3) = 6' },
      { input: '4\n2 7 11 15\n9', expectedOutput: '0 1', isHidden: true, explanation: 'nums[0] (2) + nums[1] (7) = 9' }
    ],
    status: 'published',
    isActive: true
  },

  {
    _id: '65f1d0000000000000000004',
    title: 'Intervals Overwrite in Merging',
    language: 'javascript',
    difficulty: 'Medium',
    bugType: 'Logical',
    description: `### Problem Description
Given an array of intervals where \`intervals[i] = [start, end]\`, merge all overlapping intervals, and output an array of the non-overlapping intervals that cover all the intervals in the input.

### Expected Behavior
- Sort intervals by start time.
- If current interval overlaps with previous (\`curr[0] <= prev[1]\`), update \`prev[1] = Math.max(prev[1], curr[1])\`.
- Output merged JSON array.

### Buggy Behavior
The program forgets to sort the intervals first and overwrites \`prev[1] = curr[1]\` instead of taking the maximum, truncating nested intervals like \`[1, 5]\` and \`[2, 3]\`.`,
    buggyCode: `const fs = require('fs');

function mergeIntervals(intervals) {
  if (intervals.length <= 1) return intervals;
  
  // BUG 1: Not sorting intervals by start time!
  // BUG 2: Direct assignment prev[1] = curr[1] instead of Math.max
  const merged = [intervals[0]];
  for (let i = 1; i < intervals.length; i++) {
    const prev = merged[merged.length - 1];
    const curr = intervals[i];
    if (curr[0] <= prev[1]) {
      prev[1] = curr[1];
    } else {
      merged.push(curr);
    }
  }
  return merged;
}

const input = fs.readFileSync(0, 'utf8').trim();
try {
  const intervals = JSON.parse(input);
  console.log(JSON.stringify(mergeIntervals(intervals)));
} catch (e) {
  console.log('[]');
}
`,
    solutionCode: `const fs = require('fs');

function mergeIntervals(intervals) {
  if (intervals.length <= 1) return intervals;
  
  intervals.sort((a, b) => a[0] - b[0]);
  const merged = [intervals[0]];
  
  for (let i = 1; i < intervals.length; i++) {
    const prev = merged[merged.length - 1];
    const curr = intervals[i];
    if (curr[0] <= prev[1]) {
      prev[1] = Math.max(prev[1], curr[1]);
    } else {
      merged.push(curr);
    }
  }
  return merged;
}

const input = fs.readFileSync(0, 'utf8').trim();
try {
  const intervals = JSON.parse(input);
  console.log(JSON.stringify(mergeIntervals(intervals)));
} catch (e) {
  console.log('[]');
}
`,
    hints: [
      "Category: Array Sorting Preconditions & Interval Boundary Aggregation. The bug stems from an unverified ordering assumption and naive endpoint overwriting.",
      "Code Section: Inspect the mergeIntervals loop where overlapping intervals update their end boundary, as well as whether the input array is sorted before iteration begins.",
      "Concept: Merging intervals sequentially requires that intervals be pre-sorted chronologically by their start coordinates. Furthermore, when two intervals overlap, the combined interval must span to the furthest endpoint reached by either interval."
    ],
    testCases: [
      { input: '[[1,3],[2,6],[8,10],[15,18]]', expectedOutput: '[[1,6],[8,10],[15,18]]', isHidden: false, explanation: '[1,3] and [2,6] merge into [1,6]' },
      { input: '[[1,4],[2,3]]', expectedOutput: '[[1,4]]', isHidden: false, explanation: '[2,3] is completely inside [1,4]' },
      { input: '[[2,6],[1,3]]', expectedOutput: '[[1,6]]', isHidden: true, explanation: 'Unsorted input must be sorted first' }
    ],
    status: 'published',
    isActive: true
  },

  {
    _id: '65f1d0000000000000000005',
    title: 'Sliding Window Left Pointer Regression',
    language: 'javascript',
    difficulty: 'Hard',
    bugType: 'Logical',
    description: `### Problem Description
Given a string \`s\`, find the length of the longest substring without repeating characters.

### Expected Behavior
For \`"abba"\`, the answer is \`2\` (\`"ab"\` or \`"ba"\`).

### Buggy Behavior
When the character \`'a'\` appears again at index 3, the code blindly sets \`left = map.get(char) + 1\`. Because the map still has old index \`0\` for \`'a'\`, \`left\` jumps backwards from index 2 back to 1!`,
    buggyCode: `const fs = require('fs');

function lengthOfLongestSubstring(s) {
  let maxLen = 0;
  let left = 0;
  const lastSeen = new Map();

  for (let right = 0; right < s.length; right++) {
    const char = s[right];
    if (lastSeen.has(char)) {
      // BUG: Setting left unconditionally regresses the window backward!
      left = lastSeen.get(char) + 1;
    }
    lastSeen.set(char, right);
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
}

const input = fs.readFileSync(0, 'utf8').trim();
console.log(lengthOfLongestSubstring(input));
`,
    solutionCode: `const fs = require('fs');

function lengthOfLongestSubstring(s) {
  let maxLen = 0;
  let left = 0;
  const lastSeen = new Map();

  for (let right = 0; right < s.length; right++) {
    const char = s[right];
    if (lastSeen.has(char)) {
      left = Math.max(left, lastSeen.get(char) + 1);
    }
    lastSeen.set(char, right);
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
}

const input = fs.readFileSync(0, 'utf8').trim();
console.log(lengthOfLongestSubstring(input));
`,
    hints: [
      "Category: Two-Pointer Sliding Window Monotonicity. The window left boundary violates the invariant that window edges must only move forward.",
      "Code Section: Look at how left is reassigned inside the lastSeen.has(char) branch when a previously seen character appears outside the current window.",
      "Concept: In a sliding window tracking unique characters, the left pointer must strictly advance forward. Stored historical indices from the lookup map could lie behind the current window boundary; the left pointer should only advance, never regress."
    ],
    testCases: [
      { input: 'abcabcbb', expectedOutput: '3', isHidden: false, explanation: 'The answer is "abc", with the length of 3' },
      { input: 'bbbbb', expectedOutput: '1', isHidden: false, explanation: 'The answer is "b", with the length of 1' },
      { input: 'abba', expectedOutput: '2', isHidden: true, explanation: 'Left pointer must not regress backward' },
      { input: 'pwwkew', expectedOutput: '3', isHidden: true, explanation: 'The answer is "wke", with length 3' }
    ],
    status: 'published',
    isActive: true
  },

  // =========================================================================
  // C++ CHALLENGES (5)
  // =========================================================================
  {
    _id: '65f1d0000000000000000006',
    title: 'Vector Out of Bounds Segmentation Fault',
    language: 'cpp',
    difficulty: 'Easy',
    bugType: 'Runtime',
    description: `### Problem Description
Given an array of $N$ integers, compute its prefix sum array where \`prefix[i] = prefix[i-1] + arr[i]\`.

### Expected Behavior
Print the prefix sums separated by a single space.

### Buggy Behavior
The loop condition uses \`i <= n\` instead of \`i < n\`. When \`i == n\`, accessing \`arr[i]\` triggers undefined behavior / out-of-bounds segmentation fault.`,
    buggyCode: `#include <iostream>
#include <vector>

using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    
    vector<int> arr(n);
    for (int i = 0; i < n; i++) {
        cin >> arr[i];
    }
    
    vector<long long> prefix(n);
    long long current = 0;
    // BUG: Loop condition i <= n accesses arr[n] out of range!
    for (int i = 0; i <= n; i++) {
        current += arr[i];
        prefix[i] = current;
    }
    
    for (int i = 0; i < n; i++) {
        cout << prefix[i] << (i == n - 1 ? "" : " ");
    }
    cout << endl;
    return 0;
}
`,
    solutionCode: `#include <iostream>
#include <vector>

using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    
    vector<int> arr(n);
    for (int i = 0; i < n; i++) {
        cin >> arr[i];
    }
    
    vector<long long> prefix(n);
    long long current = 0;
    for (int i = 0; i < n; i++) {
        current += arr[i];
        prefix[i] = current;
    }
    
    for (int i = 0; i < n; i++) {
        cout << prefix[i] << (i == n - 1 ? "" : " ");
    }
    cout << endl;
    return 0;
}
`,
    hints: [
      "Category: Array Bounds & Memory Access Fault. The bug is caused by reading beyond the allocated contiguous memory buffer of a std::vector.",
      "Code Section: Inspect the termination condition of the prefix sum accumulation for loop in main.",
      "Concept: In C++, standard vectors and arrays with N elements have valid indices from 0 up to N - 1. Iterating with an inclusive upper bound on N accesses memory outside the vector allocated buffer."
    ],
    testCases: [
      { input: '4\n1 2 3 4', expectedOutput: '1 3 6 10', isHidden: false, explanation: '1, 1+2=3, 3+3=6, 6+4=10' },
      { input: '3\n5 5 5', expectedOutput: '5 10 15', isHidden: false, explanation: '5, 10, 15' },
      { input: '1\n42', expectedOutput: '42', isHidden: true, explanation: 'Single element' }
    ],
    status: 'published',
    isActive: true
  },

  {
    _id: '65f1d0000000000000000007',
    title: 'Binary Search Midpoint Overflow & Loop Stalling',
    language: 'cpp',
    difficulty: 'Easy',
    bugType: 'Logical',
    description: `### Problem Description
Implement standard binary search to find the 0-based index of \`target\` in a sorted integer array of size $N$. If \`target\` does not exist, return \`-1\`.

### Buggy Behavior
1. \`mid = (low + high) / 2\` can overflow signed 32-bit integers.
2. In the branch where \`arr[mid] < target\`, it sets \`low = mid\` instead of \`low = mid + 1\`, leading to an infinite loop when \`high - low == 1\`.`,
    buggyCode: `#include <iostream>
#include <vector>

using namespace std;

int binarySearch(const vector<int>& arr, int target) {
    int low = 0;
    int high = (int)arr.size() - 1;
    
    while (low <= high) {
        // BUG 1: Potential integer overflow
        // BUG 2: low = mid causes infinite loop
        int mid = (low + high) / 2;
        if (arr[mid] == target) {
            return mid;
        } else if (arr[mid] < target) {
            low = mid; 
        } else {
            high = mid - 1;
        }
    }
    return -1;
}

int main() {
    int n, target;
    if (!(cin >> n >> target)) return 0;
    
    vector<int> arr(n);
    for (int i = 0; i < n; i++) {
        cin >> arr[i];
    }
    
    cout << binarySearch(arr, target) << endl;
    return 0;
}
`,
    solutionCode: `#include <iostream>
#include <vector>

using namespace std;

int binarySearch(const vector<int>& arr, int target) {
    int low = 0;
    int high = (int)arr.size() - 1;
    
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == target) {
            return mid;
        } else if (arr[mid] < target) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    return -1;
}

int main() {
    int n, target;
    if (!(cin >> n >> target)) return 0;
    
    vector<int> arr(n);
    for (int i = 0; i < n; i++) {
        cin >> arr[i];
    }
    
    cout << binarySearch(arr, target) << endl;
    return 0;
}
`,
    hints: [
      "Category: Arithmetic Overflow & Search Space Contraction. The algorithm suffers from an integer overflow risk and a search boundary that fails to shrink.",
      "Code Section: Check how mid is calculated and how low is updated in the arr[mid] < target branch inside binarySearch.",
      "Concept: To guarantee loop termination, the search boundaries must strictly reduce by at least one element each iteration. If arr[mid] is strictly less than target, mid itself can never be the target, so the lower bound must advance past mid."
    ],
    testCases: [
      { input: '5 9\n1 3 5 7 9', expectedOutput: '4', isHidden: false, explanation: 'Target 9 is at index 4' },
      { input: '4 2\n1 3 5 7', expectedOutput: '-1', isHidden: false, explanation: 'Target 2 is not present' },
      { input: '2 3\n1 3', expectedOutput: '1', isHidden: true, explanation: 'Target 3 at index 1' }
    ],
    status: 'published',
    isActive: true
  },

  {
    _id: '65f1d0000000000000000008',
    title: 'Stack Empty Pop Crash in Bracket Matching',
    language: 'cpp',
    difficulty: 'Medium',
    bugType: 'Runtime',
    description: `### Problem Description
Given a string containing just the characters \`'('\`, \`')'\`, \`'{'\`, \`'}'\`, \`'['\` and \`']'\`, determine if the input string is valid.
Open brackets must be closed by the same type of brackets, and in the correct order.

### Buggy Behavior
When encountering a closing bracket without any prior opening bracket (e.g. \`"]"\`), calling \`st.top()\` or \`st.pop()\` on an empty stack results in a core dump / segmentation fault.`,
    buggyCode: `#include <iostream>
#include <string>
#include <stack>

using namespace std;

bool isValid(const string& s) {
    stack<char> st;
    for (char c : s) {
        if (c == '(' || c == '{' || c == '[') {
            st.push(c);
        } else {
            // BUG: Accessing st.top() without checking if st is empty!
            char top = st.top();
            st.pop();
            if (c == ')' && top != '(') return false;
            if (c == '}' && top != '{') return false;
            if (c == ']' && top != '[') return false;
        }
    }
    return st.empty();
}

int main() {
    string s;
    if (cin >> s) {
        cout << (isValid(s) ? "true" : "false") << endl;
    }
    return 0;
}
`,
    solutionCode: `#include <iostream>
#include <string>
#include <stack>

using namespace std;

bool isValid(const string& s) {
    stack<char> st;
    for (char c : s) {
        if (c == '(' || c == '{' || c == '[') {
            st.push(c);
        } else {
            if (st.empty()) return false;
            char top = st.top();
            st.pop();
            if (c == ')' && top != '(') return false;
            if (c == '}' && top != '{') return false;
            if (c == ']' && top != '[') return false;
        }
    }
    return st.empty();
}

int main() {
    string s;
    if (cin >> s) {
        cout << (isValid(s) ? "true" : "false") << endl;
    }
    return 0;
}
`,
    hints: [
      "Category: Container Precondition Violation. The code attempts to inspect or pop an element from an empty std::stack, invoking undefined behavior or segmentation fault.",
      "Code Section: Look at the else branch of isValid where closing brackets immediately call st.top() and st.pop().",
      "Concept: Calling .top() or .pop() on a std::stack requires the invariant that the stack contains at least one element. If a string starts with or contains unmatched closing brackets, checking container emptiness prior to popping is necessary to avoid runtime crashes."
    ],
    testCases: [
      { input: '()[]{}', expectedOutput: 'true', isHidden: false, explanation: 'All matching' },
      { input: '(]', expectedOutput: 'false', isHidden: false, explanation: 'Mismatched bracket types' },
      { input: ']', expectedOutput: 'false', isHidden: true, explanation: 'Single closing bracket on empty stack' },
      { input: '([)]', expectedOutput: 'false', isHidden: true, explanation: 'Interleaved invalid sequence' }
    ],
    status: 'published',
    isActive: true
  },

  {
    _id: '65f1d0000000000000000009',
    title: 'Cross-Edge Cycle Confusion in Directed Graph',
    language: 'cpp',
    difficulty: 'Medium',
    bugType: 'Logical',
    description: `### Problem Description
Given a directed graph with $V$ vertices (labeled 0 to $V-1$) and $E$ edges, determine whether the graph contains a directed cycle.

### Buggy Behavior
The program uses a single boolean \`visited\` array. If a vertex has been visited in a previously finished DFS branch (a cross-edge), the program flags it as a cycle even though it is a valid Directed Acyclic Graph (DAG)!`,
    buggyCode: `#include <iostream>
#include <vector>

using namespace std;

bool dfs(int u, const vector<vector<int>>& adj, vector<bool>& visited) {
    // BUG: Only using visited treats cross-edges in DAG as cycles!
    if (visited[u]) return true;
    
    visited[u] = true;
    for (int v : adj[u]) {
        if (dfs(v, adj, visited)) return true;
    }
    return false;
}

bool hasCycle(int n, const vector<vector<int>>& adj) {
    vector<bool> visited(n, false);
    for (int i = 0; i < n; i++) {
        if (!visited[i]) {
            if (dfs(i, adj, visited)) return true;
        }
    }
    return false;
}

int main() {
    int v, e;
    if (!(cin >> v >> e)) return 0;
    vector<vector<int>> adj(v);
    for (int i = 0; i < e; i++) {
        int from, to;
        cin >> from >> to;
        adj[from].push_back(to);
    }
    cout << (hasCycle(v, adj) ? "true" : "false") << endl;
    return 0;
}
`,
    solutionCode: `#include <iostream>
#include <vector>

using namespace std;

bool dfs(int u, const vector<vector<int>>& adj, vector<bool>& visited, vector<bool>& inStack) {
    visited[u] = true;
    inStack[u] = true;

    for (int v : adj[u]) {
        if (!visited[v]) {
            if (dfs(v, adj, visited, inStack)) return true;
        } else if (inStack[v]) {
            return true;
        }
    }

    inStack[u] = false;
    return false;
}

bool hasCycle(int n, const vector<vector<int>>& adj) {
    vector<bool> visited(n, false);
    vector<bool> inStack(n, false);
    for (int i = 0; i < n; i++) {
        if (!visited[i]) {
            if (dfs(i, adj, visited, inStack)) return true;
        }
    }
    return false;
}

int main() {
    int v, e;
    if (!(cin >> v >> e)) return 0;
    vector<vector<int>> adj(v);
    for (int i = 0; i < e; i++) {
        int from, to;
        cin >> from >> to;
        adj[from].push_back(to);
    }
    cout << (hasCycle(v, adj) ? "true" : "false") << endl;
    return 0;
}
`,
    hints: [
      "Category: Graph Traversal & DFS State Discrimination. The algorithm fails to distinguish between back-edges (cycles) and cross-edges (independent paths in a DAG).",
      "Code Section: Look at the single visited boolean vector in dfs and how visited vertices are tracked without distinguishing active recursion paths.",
      "Concept: In a directed graph, encountering an already visited node only indicates a cycle if that node is currently present on the active recursion stack (ancestor path). Standard three-color DFS or a separate recursion-stack boolean array is required."
    ],
    testCases: [
      { input: '4 4\n0 1\n1 2\n2 3\n3 1', expectedOutput: 'true', isHidden: false, explanation: 'Cycle 1 -> 2 -> 3 -> 1' },
      { input: '3 2\n0 1\n0 2', expectedOutput: 'false', isHidden: false, explanation: 'Tree/DAG without cycles' },
      { input: '3 3\n0 1\n1 2\n0 2', expectedOutput: 'false', isHidden: true, explanation: 'DAG with cross edge 0->2' }
    ],
    status: 'published',
    isActive: true
  },

  {
    _id: '65f1d0000000000000000010',
    title: 'Dangling Pointer in Linked List Reversal',
    language: 'cpp',
    difficulty: 'Hard',
    bugType: 'Runtime',
    description: `### Problem Description
Given the head of a singly linked list, reverse the list, and print the reversed elements.

### Buggy Behavior
The reversal step modifies \`curr->next = prev\` *before* caching the original \`curr->next\`. This severs the link to the remainder of the list, losing all nodes after the first!`,
    buggyCode: `#include <iostream>

using namespace std;

struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};

ListNode* reverseList(ListNode* head) {
    ListNode* prev = nullptr;
    ListNode* curr = head;
    
    while (curr != nullptr) {
        // BUG: Severing curr->next before saving next node!
        curr->next = prev;
        prev = curr;
        curr = curr->next; // Now curr points to prev (infinite loop / crash)!
    }
    return prev;
}

int main() {
    int n;
    if (!(cin >> n) || n <= 0) return 0;
    
    int val;
    cin >> val;
    ListNode* head = new ListNode(val);
    ListNode* tail = head;
    
    for (int i = 1; i < n; i++) {
        cin >> val;
        tail->next = new ListNode(val);
        tail = tail->next;
    }
    
    ListNode* rev = reverseList(head);
    while (rev != nullptr) {
        cout << rev->val << (rev->next ? " " : "");
        rev = rev->next;
    }
    cout << endl;
    return 0;
}
`,
    solutionCode: `#include <iostream>

using namespace std;

struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};

ListNode* reverseList(ListNode* head) {
    ListNode* prev = nullptr;
    ListNode* curr = head;
    
    while (curr != nullptr) {
        ListNode* nextNode = curr->next;
        curr->next = prev;
        prev = curr;
        curr = nextNode;
    }
    return prev;
}

int main() {
    int n;
    if (!(cin >> n) || n <= 0) return 0;
    
    int val;
    cin >> val;
    ListNode* head = new ListNode(val);
    ListNode* tail = head;
    
    for (int i = 1; i < n; i++) {
        cin >> val;
        tail->next = new ListNode(val);
        tail = tail->next;
    }
    
    ListNode* rev = reverseList(head);
    while (rev != nullptr) {
        cout << rev->val << (rev->next ? " " : "");
        rev = rev->next;
    }
    cout << endl;
    return 0;
}
`,
    hints: [
      "Category: Pointer Rewiring & Structural Reference Severance. The algorithm overwrites a pointer link before caching the memory address of the next node.",
      "Code Section: Examine the assignment statements inside the while (curr != nullptr) loop in reverseList.",
      "Concept: When reversing pointer direction in a singly linked list, modifying curr->next immediately severs access to the remainder of the list. The address of the subsequent node must be preserved in a temporary pointer before reassigning the link."
    ],
    testCases: [
      { input: '5\n1 2 3 4 5', expectedOutput: '5 4 3 2 1', isHidden: false, explanation: 'Reversed sequence' },
      { input: '1\n42', expectedOutput: '42', isHidden: false, explanation: 'Single element list' },
      { input: '3\n10 20 30', expectedOutput: '30 20 10', isHidden: true, explanation: 'Three element list' }
    ],
    status: 'published',
    isActive: true
  },

  // =========================================================================
  // JAVA CHALLENGES (5)
  // =========================================================================
  {
    _id: '65f1d0000000000000000011',
    title: 'Reference Equality String Bug',
    language: 'java',
    difficulty: 'Easy',
    bugType: 'Logical',
    description: `### Problem Description
Read two strings from input and determine whether they are equal in content. Output \`true\` if they are equal, or \`false\` if they are not.

### Buggy Behavior
The author used \`==\` to compare two String objects. In Java, \`==\` tests reference equality (whether both references point to the exact same memory address), which fails when strings are instantiated dynamically from a Scanner.`,
    buggyCode: `import java.util.Scanner;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        String s1 = sc.next();
        if (!sc.hasNext()) return;
        String s2 = sc.next();
        
        // BUG: In Java, == compares object memory references, not character content!
        if (s1 == s2) {
            System.out.println("true");
        } else {
            System.out.println("false");
        }
    }
}
`,
    solutionCode: `import java.util.Scanner;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        String s1 = sc.next();
        if (!sc.hasNext()) return;
        String s2 = sc.next();
        
        if (s1.equals(s2)) {
            System.out.println("true");
        } else {
            System.out.println("false");
        }
    }
}
`,
    hints: [
      "Category: Object Reference Identity vs Value Equality. The program compares memory locations instead of string character sequences.",
      "Code Section: Inspect the if condition comparing s1 and s2 inside the main method.",
      "Concept: In Java, the binary equality operator (==) on non-primitive reference types checks whether two variables point to the exact same object in heap memory. To test whether two distinct String instances contain identical character sequences, use their value equality method."
    ],
    testCases: [
      { input: 'codeforge codeforge', expectedOutput: 'true', isHidden: false, explanation: 'Both strings have identical characters' },
      { input: 'apple banana', expectedOutput: 'false', isHidden: false, explanation: 'Different strings' },
      { input: 'test test', expectedOutput: 'true', isHidden: true, explanation: 'Equal strings' }
    ],
    status: 'published',
    isActive: true
  },

  {
    _id: '65f1d0000000000000000012',
    title: 'NullPointerException in Object Array',
    language: 'java',
    difficulty: 'Easy',
    bugType: 'Runtime',
    description: `### Problem Description
Given $N$ integers, find the maximum integer and its count of occurrences. Output the maximum integer and count separated by a space.

### Buggy Behavior
The program declares \`Integer[] arr = new Integer[n];\` but never initializes the elements when reading, or dereferences an uninitialized index, throwing a \`java.lang.NullPointerException\`.`,
    buggyCode: `import java.util.Scanner;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        
        // BUG: Integer object array contains nulls by default. 
        // Using primitive int[] avoids unboxing NullPointerException!
        Integer[] arr = new Integer[n];
        int maxVal = Integer.MIN_VALUE;
        
        for (int i = 0; i < n; i++) {
            if (sc.hasNextInt()) {
                // BUG: What if arr[i] is accessed before assignment or comparison?
                int val = sc.nextInt();
                arr[i] = val;
                if (arr[i] > maxVal) {
                    maxVal = arr[i];
                }
            }
        }
        
        int count = 0;
        // BUG: Loop goes up to <= n causing NullPointerException / ArrayIndexOutOfBounds!
        for (int i = 0; i <= n; i++) {
            if (arr[i] == maxVal) {
                count++;
            }
        }
        
        System.out.println(maxVal + " " + count);
    }
}
`,
    solutionCode: `import java.util.Scanner;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        
        int[] arr = new int[n];
        int maxVal = Integer.MIN_VALUE;
        
        for (int i = 0; i < n; i++) {
            arr[i] = sc.nextInt();
            if (arr[i] > maxVal) {
                maxVal = arr[i];
            }
        }
        
        int count = 0;
        for (int i = 0; i < n; i++) {
            if (arr[i] == maxVal) {
                count++;
            }
        }
        
        System.out.println(maxVal + " " + count);
    }
}
`,
    hints: [
      "Category: Object Array Initialization & Boundary Overrun. The code risks unboxing null references or reading past array capacity.",
      "Code Section: Look at the type used for the array declaration (Integer[]) and the loop termination condition in the second for loop (i <= n).",
      "Concept: In Java, wrapper arrays like Integer[] initialize slots to null rather than 0, which can trigger NullPointerExceptions. Furthermore, arrays of size N are indexed from 0 to N - 1; iterating up to <= N will cause an ArrayIndexOutOfBoundsException."
    ],
    testCases: [
      { input: '5\n2 3 3 1 3', expectedOutput: '3 3', isHidden: false, explanation: 'Max value is 3, occurs 3 times' },
      { input: '4\n10 10 10 10', expectedOutput: '10 4', isHidden: false, explanation: 'All 10s' },
      { input: '1\n7', expectedOutput: '7 1', isHidden: true, explanation: 'Single element' }
    ],
    status: 'published',
    isActive: true
  },

  {
    _id: '65f1d0000000000000000013',
    title: 'Fast/Slow Pointer Odd-Length Null Dereference',
    language: 'java',
    difficulty: 'Medium',
    bugType: 'Runtime',
    description: `### Problem Description
Given a linked list with $N$ nodes, find the middle node's value. If there are two middle nodes, return the second middle node.

### Buggy Behavior
The while condition only checks \`fast != null\`. When \`fast\` is at the tail of an odd-length list, calling \`fast.next.next\` throws a \`NullPointerException\` because \`fast.next\` is null!`,
    buggyCode: `import java.util.Scanner;

class Node {
    int val;
    Node next;
    Node(int val) { this.val = val; }
}

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        if (n <= 0) return;
        
        Node head = new Node(sc.nextInt());
        Node tail = head;
        for (int i = 1; i < n; i++) {
            tail.next = new Node(sc.nextInt());
            tail = tail.next;
        }
        
        Node slow = head;
        Node fast = head;
        
        // BUG: When fast is at the last node, fast.next is null!
        // Accessing fast.next.next throws NullPointerException!
        while (fast != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        
        System.out.println(slow.val);
    }
}
`,
    solutionCode: `import java.util.Scanner;

class Node {
    int val;
    Node next;
    Node(int val) { this.val = val; }
}

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        if (n <= 0) return;
        
        Node head = new Node(sc.nextInt());
        Node tail = head;
        for (int i = 1; i < n; i++) {
            tail.next = new Node(sc.nextInt());
            tail = tail.next;
        }
        
        Node slow = head;
        Node fast = head;
        
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        
        System.out.println(slow.val);
    }
}
`,
    hints: [
      "Category: Linked List Pointer Guard & Null Dereference. The code attempts to navigate two hops ahead without checking if the intermediate node exists.",
      "Code Section: Look at the while loop condition while (fast != null) and the two-step advancement fast = fast.next.next.",
      "Concept: When advancing a fast pointer by two steps (fast.next.next), validating only fast != null is insufficient on odd-length lists. If fast is at the last node, fast is non-null, but fast.next is null, making fast.next.next throw a NullPointerException."
    ],
    testCases: [
      { input: '5\n1 2 3 4 5', expectedOutput: '3', isHidden: false, explanation: 'Node 3 is in the exact middle' },
      { input: '4\n1 2 3 4', expectedOutput: '3', isHidden: false, explanation: 'Second middle node is 3' },
      { input: '1\n99', expectedOutput: '99', isHidden: true, explanation: 'Single node list' }
    ],
    status: 'published',
    isActive: true
  },

  {
    _id: '65f1d0000000000000000014',
    title: 'Missing Base Prefix in Subarray Sum Equals K',
    language: 'java',
    difficulty: 'Medium',
    bugType: 'Logical',
    description: `### Problem Description
Given an array of integers \`nums\` and an integer \`k\`, return the total number of subarrays whose sum equals to \`k\`.

### Buggy Behavior
The prefix sum hash map is not initialized with \`map.put(0, 1)\`. As a consequence, any subarray that starts from index 0 and has sum equal to \`k\` is completely omitted from the count!`,
    buggyCode: `import java.util.Scanner;
import java.util.HashMap;
import java.util.Map;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int k = sc.nextInt();
        
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) {
            nums[i] = sc.nextInt();
        }
        
        Map<Integer, Integer> map = new HashMap<>();
        // BUG: Forgot map.put(0, 1). Subarrays starting at index 0 won't be counted!
        
        int currentSum = 0;
        int count = 0;
        
        for (int num : nums) {
            currentSum += num;
            if (map.containsKey(currentSum - k)) {
                count += map.get(currentSum - k);
            }
            map.put(currentSum, map.getOrDefault(currentSum, 0) + 1);
        }
        
        System.out.println(count);
    }
}
`,
    solutionCode: `import java.util.Scanner;
import java.util.HashMap;
import java.util.Map;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int k = sc.nextInt();
        
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) {
            nums[i] = sc.nextInt();
        }
        
        Map<Integer, Integer> map = new HashMap<>();
        map.put(0, 1);
        
        int currentSum = 0;
        int count = 0;
        
        for (int num : nums) {
            currentSum += num;
            if (map.containsKey(currentSum - k)) {
                count += map.get(currentSum - k);
            }
            map.put(currentSum, map.getOrDefault(currentSum, 0) + 1);
        }
        
        System.out.println(count);
    }
}
`,
    hints: [
      "Category: Prefix Sum & Hash Map Base Invariant. The prefix sum lookup map lacks the base frequency representing an empty prefix.",
      "Code Section: Inspect the initialization of map before the for loop begins iterating over the array numbers.",
      "Concept: If a prefix sum equals exactly K, the required complement is (currentSum - K = 0). For subarrays starting at index 0 to be counted, the frequency map must account for a base prefix sum of 0 having occurred once before any elements are processed."
    ],
    testCases: [
      { input: '3 2\n1 1 1', expectedOutput: '2', isHidden: false, explanation: '[1,1] at indices 0-1 and 1-2' },
      { input: '3 3\n1 2 3', expectedOutput: '2', isHidden: false, explanation: '[1,2] and [3]' },
      { input: '1 5\n5', expectedOutput: '1', isHidden: true, explanation: 'Single element equal to k' }
    ],
    status: 'published',
    isActive: true
  },

  {
    _id: '65f1d0000000000000000015',
    title: 'Inverted PriorityQueue Comparator in Top K Frequent',
    language: 'java',
    difficulty: 'Hard',
    bugType: 'Logical',
    description: `### Problem Description
Given an integer array \`nums\` and an integer \`k\`, return the \`k\` most frequent elements. The answer should be printed in ascending order.

### Buggy Behavior
The author attempts to maintain a min-heap of size $K$. However, the comparator is inverted to \`map.get(b) - map.get(a)\` (max-heap comparator). When the heap exceeds size $K$, \`pq.poll()\` ejects the *most frequent* element instead of the least frequent!`,
    buggyCode: `import java.util.*;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int k = sc.nextInt();
        
        Map<Integer, Integer> freq = new HashMap<>();
        for (int i = 0; i < n; i++) {
            int val = sc.nextInt();
            freq.put(val, freq.getOrDefault(val, 0) + 1);
        }
        
        // BUG: Inverted comparator! To keep top K elements, we need a MIN-heap
        // that evicts the least frequent elements: (a, b) -> freq.get(a) - freq.get(b)
        PriorityQueue<Integer> pq = new PriorityQueue<>((a, b) -> freq.get(b) - freq.get(a));
        
        for (int key : freq.keySet()) {
            pq.add(key);
            if (pq.size() > k) {
                pq.poll(); // Evicts the wrong element!
            }
        }
        
        List<Integer> result = new ArrayList<>();
        while (!pq.isEmpty()) {
            result.add(pq.poll());
        }
        Collections.sort(result);
        
        for (int i = 0; i < result.size(); i++) {
            System.out.print(result.get(i) + (i == result.size() - 1 ? "" : " "));
        }
        System.out.println();
    }
}
`,
    solutionCode: `import java.util.*;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int k = sc.nextInt();
        
        Map<Integer, Integer> freq = new HashMap<>();
        for (int i = 0; i < n; i++) {
            int val = sc.nextInt();
            freq.put(val, freq.getOrDefault(val, 0) + 1);
        }
        
        PriorityQueue<Integer> pq = new PriorityQueue<>((a, b) -> freq.get(a) - freq.get(b));
        
        for (int key : freq.keySet()) {
            pq.add(key);
            if (pq.size() > k) {
                pq.poll();
            }
        }
        
        List<Integer> result = new ArrayList<>();
        while (!pq.isEmpty()) {
            result.add(pq.poll());
        }
        Collections.sort(result);
        
        for (int i = 0; i < result.size(); i++) {
            System.out.print(result.get(i) + (i == result.size() - 1 ? "" : " "));
        }
        System.out.println();
    }
}
`,
    hints: [
      "Category: Heap Order Inversion & Eviction Mechanics. The PriorityQueue is configured with the wrong heap order, causing it to discard the wrong elements.",
      "Code Section: Look at the lambda comparator (a, b) -> freq.get(b) - freq.get(a) passed when instantiating the PriorityQueue.",
      "Concept: To maintain the top K most frequent elements using a bounded heap of size K, the element at the top (which gets evicted when size exceeds K) must be the one with the smallest frequency. Therefore, a min-heap comparator is needed, not a max-heap comparator."
    ],
    testCases: [
      { input: '6 2\n1 1 1 2 2 3', expectedOutput: '1 2', isHidden: false, explanation: '1 occurs 3 times, 2 occurs 2 times' },
      { input: '1 1\n1', expectedOutput: '1', isHidden: false, explanation: 'Single element' },
      { input: '7 2\n4 4 4 4 5 5 6', expectedOutput: '4 5', isHidden: true, explanation: '4 occurs 4 times, 5 occurs 2 times' }
    ],
    status: 'published',
    isActive: true
  }
];

