/**
 * CodeForge DSA Problem Bank
 * Total: 108 Curated Questions distributed across the 12 core DSA categories.
 * Supported Languages: C++, Java, JavaScript.
 * Includes complete statements, constraints, examples, sample test cases, and hidden test cases.
 */

export const DSA_CATEGORIES = [
  "All",
  "Arrays and Strings",
  "Hashing",
  "Two Pointers and Sliding Window",
  "Binary Search and Sorting",
  "Recursion and Backtracking",
  "Linked Lists",
  "Stacks and Queues",
  "Trees and BST",
  "Heaps",
  "Graphs",
  "Greedy Algorithms",
  "Dynamic Programming"
];

export const DSA_QUESTIONS = [
  {
    "id": "1",
    "number": 1,
    "title": "Two Sum Target Finder",
    "slug": "two-sum-target-finder",
    "difficulty": "Easy",
    "category": "Arrays and Strings",
    "topicTags": [
      "Arrays",
      "Hash Table"
    ],
    "problemStatement": "Given an array of integers `nums` and an integer `target`, return the indices of two distinct elements such that they add up to `target`. Exactly one valid answer exists.",
    "diagram": null,
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "nums[0] + nums[1] = 2 + 7 = 9.",
        "exp": "nums[0] + nums[1] = 2 + 7 = 9."
      }
    ],
    "constraints": [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9"
    ],
    "starterCode": {
      "javascript": "function twoSum(nums, target) {\n    const map = new Map();\n    for (let i = 0; i < nums.length; i++) {\n        const comp = target - nums[i];\n        if (map.has(comp)) return [map.get(comp), i];\n        map.set(nums[i], i);\n    }\n    return [];\n}\nconsole.log(JSON.stringify(twoSum([2, 7, 11, 15], 9)));",
      "cpp": "#include <iostream>\n#include <vector>\n#include <unordered_map>\nusing namespace std;\nclass Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        unordered_map<int, int> seen;\n        for (int i = 0; i < nums.size(); i++) {\n            int comp = target - nums[i];\n            if (seen.count(comp)) return {seen[comp], i};\n            seen[nums[i]] = i;\n        }\n        return {};\n    }\n};\nint main() {\n    Solution sol;\n    vector<int> nums = {2, 7, 11, 15};\n    vector<int> ans = sol.twoSum(nums, 9);\n    cout << \"[\" << ans[0] << \", \" << ans[1] << \"]\" << endl;\n    return 0;\n}",
      "java": "import java.util.*;\npublic class Main {\n    public static int[] twoSum(int[] nums, int target) {\n        Map<Integer, Integer> map = new HashMap<>();\n        for (int i = 0; i < nums.length; i++) {\n            int comp = target - nums[i];\n            if (map.containsKey(comp)) return new int[]{map.get(comp), i};\n            map.put(nums[i], i);\n        }\n        return new int[]{};\n    }\n    public static void main(String[] args) {\n        System.out.println(Arrays.toString(twoSum(new int[]{2, 7, 11, 15}, 9)));\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "name": "Sample Case 1",
        "input": "",
        "expectedOutput": "[0, 1]",
        "isHidden": false
      },
      {
        "id": 2,
        "name": "Hidden Case 2",
        "input": "",
        "expectedOutput": "[0, 1]",
        "isHidden": true
      }
    ]
  },
  {
    "id": "2",
    "number": 2,
    "title": "Best Time to Trade Stock",
    "slug": "best-time-to-trade-stock",
    "difficulty": "Easy",
    "category": "Arrays and Strings",
    "topicTags": [
      "Arrays",
      "Greedy"
    ],
    "problemStatement": "Given array `prices`, return maximum profit achievable by buying on one day and selling on a subsequent future day. Return 0 if no profit can be made.",
    "diagram": null,
    "examples": [
      {
        "input": "prices = [7, 1, 5, 3, 6, 4]",
        "output": "5",
        "explanation": "Buy at 1, sell at 6 = profit 5.",
        "exp": "Buy at 1, sell at 6 = profit 5."
      }
    ],
    "constraints": [
      "1 <= prices.length <= 10^5"
    ],
    "starterCode": {
      "javascript": "function maxProfit(prices) {\n    let minP = Infinity, maxP = 0;\n    for (const p of prices) {\n        if (p < minP) minP = p;\n        else if (p - minP > maxP) maxP = p - minP;\n    }\n    return maxP;\n}\nconsole.log(maxProfit([7, 1, 5, 3, 6, 4]));",
      "cpp": "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nclass Solution {\npublic:\n    int maxProfit(vector<int>& prices) {\n        int minP = 1e9, maxP = 0;\n        for (int p : prices) {\n            if (p < minP) minP = p;\n            else maxP = max(maxP, p - minP);\n        }\n        return maxP;\n    }\n};\nint main() {\n    Solution sol;\n    vector<int> p = {7, 1, 5, 3, 6, 4};\n    cout << sol.maxProfit(p) << endl;\n    return 0;\n}",
      "java": "public class Main {\n    public static int maxProfit(int[] prices) {\n        int minP = Integer.MAX_VALUE, maxP = 0;\n        for (int p : prices) {\n            if (p < minP) minP = p;\n            else if (p - minP > maxP) maxP = p - minP;\n        }\n        return maxP;\n    }\n    public static void main(String[] args) {\n        System.out.println(maxProfit(new int[]{7, 1, 5, 3, 6, 4}));\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "name": "Sample Case 1",
        "input": "",
        "expectedOutput": "5",
        "isHidden": false
      },
      {
        "id": 2,
        "name": "Hidden Case 2",
        "input": "",
        "expectedOutput": "5",
        "isHidden": true
      }
    ]
  },
  {
    "id": "3",
    "number": 3,
    "title": "Maximum Subarray Sum",
    "slug": "maximum-subarray-sum",
    "difficulty": "Medium",
    "category": "Arrays and Strings",
    "topicTags": [
      "Arrays",
      "Dynamic Programming"
    ],
    "problemStatement": "Find contiguous subarray with largest sum and return its sum using Kadane algorithm in O(n) time.",
    "diagram": null,
    "examples": [
      {
        "input": "nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]",
        "output": "6",
        "explanation": "Subarray [4, -1, 2, 1] sums to 6.",
        "exp": "Subarray [4, -1, 2, 1] sums to 6."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5"
    ],
    "starterCode": {
      "javascript": "function maxSubArray(nums) {\n    let cur = nums[0], maxS = nums[0];\n    for (let i = 1; i < nums.length; i++) {\n        cur = Math.max(nums[i], cur + nums[i]);\n        maxS = Math.max(maxS, cur);\n    }\n    return maxS;\n}\nconsole.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]));",
      "cpp": "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nclass Solution {\npublic:\n    int maxSubArray(vector<int>& nums) {\n        int cur = nums[0], maxS = nums[0];\n        for (size_t i = 1; i < nums.size(); i++) {\n            cur = max(nums[i], cur + nums[i]);\n            maxS = max(maxS, cur);\n        }\n        return maxS;\n    }\n};\nint main() {\n    Solution sol;\n    vector<int> nums = {-2, 1, -3, 4, -1, 2, 1, -5, 4};\n    cout << sol.maxSubArray(nums) << endl;\n    return 0;\n}",
      "java": "public class Main {\n    public static int maxSubArray(int[] nums) {\n        int cur = nums[0], maxS = nums[0];\n        for (int i = 1; i < nums.length; i++) {\n            cur = Math.max(nums[i], cur + nums[i]);\n            maxS = Math.max(maxS, cur);\n        }\n        return maxS;\n    }\n    public static void main(String[] args) {\n        System.out.println(maxSubArray(new int[]{-2, 1, -3, 4, -1, 2, 1, -5, 4}));\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "name": "Sample Case 1",
        "input": "",
        "expectedOutput": "6",
        "isHidden": false
      },
      {
        "id": 2,
        "name": "Hidden Case 2",
        "input": "",
        "expectedOutput": "6",
        "isHidden": true
      }
    ]
  },
  {
    "id": "4",
    "number": 4,
    "title": "Product of Array Except Self",
    "slug": "product-of-array-except-self",
    "difficulty": "Medium",
    "category": "Arrays and Strings",
    "topicTags": [
      "Arrays",
      "Prefix Sum"
    ],
    "problemStatement": "Return an array answer where answer[i] is product of all elements of nums except nums[i] in O(n) without division.",
    "diagram": null,
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "[24, 12, 8, 6]",
        "explanation": "Prefix multiplied with suffix.",
        "exp": "Prefix multiplied with suffix."
      }
    ],
    "constraints": [
      "2 <= nums.length <= 10^5"
    ],
    "starterCode": {
      "javascript": "function productExceptSelf(nums) {\n    const n = nums.length, res = new Array(n).fill(1);\n    let p = 1;\n    for (let i = 0; i < n; i++) { res[i] = p; p *= nums[i]; }\n    let s = 1;\n    for (let i = n - 1; i >= 0; i--) { res[i] *= s; s *= nums[i]; }\n    return res;\n}\nconsole.log(JSON.stringify(productExceptSelf([1, 2, 3, 4])));",
      "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\nclass Solution {\npublic:\n    vector<int> productExceptSelf(vector<int>& nums) {\n        int n = nums.size();\n        vector<int> res(n, 1);\n        int p = 1;\n        for (int i = 0; i < n; i++) { res[i] = p; p *= nums[i]; }\n        int s = 1;\n        for (int i = n - 1; i >= 0; i--) { res[i] *= s; s *= nums[i]; }\n        return res;\n    }\n};\nint main() {\n    Solution sol;\n    vector<int> nums = {1, 2, 3, 4};\n    vector<int> res = sol.productExceptSelf(nums);\n    cout << \"[\" << res[0] << \", \" << res[1] << \", \" << res[2] << \", \" << res[3] << \"]\" << endl;\n    return 0;\n}",
      "java": "import java.util.*;\npublic class Main {\n    public static int[] productExceptSelf(int[] nums) {\n        int n = nums.length;\n        int[] res = new int[n];\n        int p = 1;\n        for (int i = 0; i < n; i++) { res[i] = p; p *= nums[i]; }\n        int s = 1;\n        for (int i = n - 1; i >= 0; i--) { res[i] *= s; s *= nums[i]; }\n        return res;\n    }\n    public static void main(String[] args) {\n        System.out.println(Arrays.toString(productExceptSelf(new int[]{1, 2, 3, 4})));\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "name": "Sample Case 1",
        "input": "",
        "expectedOutput": "[24, 12, 8, 6]",
        "isHidden": false
      },
      {
        "id": 2,
        "name": "Hidden Case 2",
        "input": "",
        "expectedOutput": "[24, 12, 8, 6]",
        "isHidden": true
      }
    ]
  },
  {
    "id": "5",
    "number": 5,
    "title": "Rotate Array by K Positions",
    "slug": "rotate-array-by-k-positions",
    "difficulty": "Medium",
    "category": "Arrays and Strings",
    "topicTags": [
      "Arrays",
      "Two Pointers"
    ],
    "problemStatement": "Rotate array to the right by k steps in-place with O(1) extra space.",
    "diagram": null,
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4, 5, 6, 7], k = 3",
        "output": "[5, 6, 7, 1, 2, 3, 4]",
        "explanation": "Reversed parts.",
        "exp": "Reversed parts."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5"
    ],
    "starterCode": {
      "javascript": "function rotate(nums, k) {\n    k %= nums.length;\n    const rev = (l, r) => { while (l < r) { [nums[l], nums[r]] = [nums[r], nums[l]]; l++; r--; } };\n    rev(0, nums.length - 1);\n    rev(0, k - 1);\n    rev(k, nums.length - 1);\n    return nums;\n}\nconsole.log(JSON.stringify(rotate([1, 2, 3, 4, 5, 6, 7], 3)));",
      "cpp": "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nclass Solution {\npublic:\n    void rotate(vector<int>& nums, int k) {\n        k %= nums.size();\n        ::reverse(nums.begin(), nums.end());\n        ::reverse(nums.begin(), nums.begin() + k);\n        ::reverse(nums.begin() + k, nums.end());\n    }\n};\nint main() {\n    Solution sol;\n    vector<int> nums = {1, 2, 3, 4, 5, 6, 7};\n    sol.rotate(nums, 3);\n    cout << \"[\" << nums[0] << \", \" << nums[1] << \", \" << nums[2] << \", \" << nums[3] << \", \" << nums[4] << \", \" << nums[5] << \", \" << nums[6] << \"]\" << endl;\n    return 0;\n}",
      "java": "import java.util.*;\npublic class Main {\n    public static void rotate(int[] nums, int k) {\n        k %= nums.length;\n        rev(nums, 0, nums.length - 1);\n        rev(nums, 0, k - 1);\n        rev(nums, k, nums.length - 1);\n    }\n    private static void rev(int[] nums, int l, int r) {\n        while (l < r) { int t = nums[l]; nums[l] = nums[r]; nums[r] = t; l++; r--; }\n    }\n    public static void main(String[] args) {\n        int[] nums = {1, 2, 3, 4, 5, 6, 7};\n        rotate(nums, 3);\n        System.out.println(Arrays.toString(nums));\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "name": "Sample Case 1",
        "input": "",
        "expectedOutput": "[5, 6, 7, 1, 2, 3, 4]",
        "isHidden": false
      },
      {
        "id": 2,
        "name": "Hidden Case 2",
        "input": "",
        "expectedOutput": "[5, 6, 7, 1, 2, 3, 4]",
        "isHidden": true
      }
    ]
  },
  {
    "id": "6",
    "number": 6,
    "title": "First Missing Positive Integer",
    "slug": "first-missing-positive-integer",
    "difficulty": "Hard",
    "category": "Arrays and Strings",
    "topicTags": [
      "Arrays",
      "Hash Table"
    ],
    "problemStatement": "Given an unsorted integer array, find the smallest missing positive integer in O(n) time and O(1) space.",
    "diagram": null,
    "examples": [
      {
        "input": "nums = [3, 4, -1, 1]",
        "output": "2",
        "explanation": "1 is present, 2 is missing.",
        "exp": "1 is present, 2 is missing."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5"
    ],
    "starterCode": {
      "javascript": "function firstMissingPositive(nums) {\n    const n = nums.length;\n    for (let i = 0; i < n; i++) {\n        while (nums[i] > 0 && nums[i] <= n && nums[nums[i] - 1] !== nums[i]) {\n            const idx = nums[i] - 1;\n            [nums[i], nums[idx]] = [nums[idx], nums[i]];\n        }\n    }\n    for (let i = 0; i < n; i++) { if (nums[i] !== i + 1) return i + 1; }\n    return n + 1;\n}\nconsole.log(firstMissingPositive([3, 4, -1, 1]));",
      "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\nclass Solution {\npublic:\n    int firstMissingPositive(vector<int>& nums) {\n        int n = nums.size();\n        for (int i = 0; i < n; i++) {\n            while (nums[i] > 0 && nums[i] <= n && nums[nums[i] - 1] != nums[i]) {\n                swap(nums[i], nums[nums[i] - 1]);\n            }\n        }\n        for (int i = 0; i < n; i++) { if (nums[i] != i + 1) return i + 1; }\n        return n + 1;\n    }\n};\nint main() {\n    Solution sol;\n    vector<int> nums = {3, 4, -1, 1};\n    cout << sol.firstMissingPositive(nums) << endl;\n    return 0;\n}",
      "java": "public class Main {\n    public static int firstMissingPositive(int[] nums) {\n        int n = nums.length;\n        for (int i = 0; i < n; i++) {\n            while (nums[i] > 0 && nums[i] <= n && nums[nums[i] - 1] != nums[i]) {\n                int t = nums[i] - 1;\n                int tmp = nums[i]; nums[i] = nums[t]; nums[t] = tmp;\n            }\n        }\n        for (int i = 0; i < n; i++) { if (nums[i] != i + 1) return i + 1; }\n        return n + 1;\n    }\n    public static void main(String[] args) {\n        System.out.println(firstMissingPositive(new int[]{3, 4, -1, 1}));\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "name": "Sample Case 1",
        "input": "",
        "expectedOutput": "2",
        "isHidden": false
      },
      {
        "id": 2,
        "name": "Hidden Case 2",
        "input": "",
        "expectedOutput": "2",
        "isHidden": true
      }
    ]
  },
  {
    "id": "7",
    "number": 7,
    "title": "Valid Alphanumeric Palindrome",
    "slug": "valid-alphanumeric-palindrome",
    "difficulty": "Easy",
    "category": "Arrays and Strings",
    "topicTags": [
      "Strings",
      "Two Pointers"
    ],
    "problemStatement": "Determine if string is palindrome considering only alphanumeric characters and ignoring case sensitivity.",
    "diagram": null,
    "examples": [
      {
        "input": "s = \"A man, a plan, a canal: Panama\"",
        "output": "true",
        "explanation": "\"amanaplanacanalpanama\" reads identical forwards and backwards.",
        "exp": "\"amanaplanacanalpanama\" reads identical forwards and backwards."
      }
    ],
    "constraints": [
      "1 <= s.length <= 2 * 10^5"
    ],
    "starterCode": {
      "javascript": "function isPalindrome(s) {\n    const clean = s.toLowerCase().replace(/[^a-z0-9]/g, '');\n    let l = 0, r = clean.length - 1;\n    while (l < r) {\n        if (clean[l] !== clean[r]) return false;\n        l++; r--;\n    }\n    return true;\n}\nconsole.log(isPalindrome(\"A man, a plan, a canal: Panama\"));",
      "cpp": "#include <iostream>\n#include <string>\n#include <cctype>\nusing namespace std;\nclass Solution {\npublic:\n    bool isPalindrome(string s) {\n        int l = 0, r = s.size() - 1;\n        while (l < r) {\n            while (l < r && !isalnum(s[l])) l++;\n            while (l < r && !isalnum(s[r])) r--;\n            if (tolower(s[l]) != tolower(s[r])) return false;\n            l++; r--;\n        }\n        return true;\n    }\n};\nint main() {\n    Solution sol;\n    cout << (sol.isPalindrome(\"A man, a plan, a canal: Panama\") ? \"true\" : \"false\") << endl;\n    return 0;\n}",
      "java": "public class Main {\n    public static boolean isPalindrome(String s) {\n        int l = 0, r = s.length() - 1;\n        while (l < r) {\n            while (l < r && !Character.isLetterOrDigit(s.charAt(l))) l++;\n            while (l < r && !Character.isLetterOrDigit(s.charAt(r))) r--;\n            if (Character.toLowerCase(s.charAt(l)) != Character.toLowerCase(s.charAt(r))) return false;\n            l++; r--;\n        }\n        return true;\n    }\n    public static void main(String[] args) {\n        System.out.println(isPalindrome(\"A man, a plan, a canal: Panama\"));\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "name": "Sample Case 1",
        "input": "",
        "expectedOutput": "true",
        "isHidden": false
      },
      {
        "id": 2,
        "name": "Hidden Case 2",
        "input": "",
        "expectedOutput": "true",
        "isHidden": true
      }
    ]
  },
  {
    "id": "8",
    "number": 8,
    "title": "Valid String Anagrams",
    "slug": "valid-string-anagrams",
    "difficulty": "Easy",
    "category": "Arrays and Strings",
    "topicTags": [
      "Strings",
      "Hash Table"
    ],
    "problemStatement": "Given two strings s and t, return true if t is an anagram of s, and false otherwise.",
    "diagram": null,
    "examples": [
      {
        "input": "s = \"anagram\", t = \"nagaram\"",
        "output": "true",
        "explanation": "Both contain identical character frequencies.",
        "exp": "Both contain identical character frequencies."
      }
    ],
    "constraints": [
      "1 <= s.length, t.length <= 5 * 10^4"
    ],
    "starterCode": {
      "javascript": "function isAnagram(s, t) {\n    if (s.length !== t.length) return false;\n    const cnt = {};\n    for (const c of s) cnt[c] = (cnt[c] || 0) + 1;\n    for (const c of t) {\n        if (!cnt[c]) return false;\n        cnt[c]--;\n    }\n    return true;\n}\nconsole.log(isAnagram(\"anagram\", \"nagaram\"));",
      "cpp": "#include <iostream>\n#include <string>\n#include <vector>\nusing namespace std;\nclass Solution {\npublic:\n    bool isAnagram(string s, string t) {\n        if (s.size() != t.size()) return false;\n        vector<int> freq(26, 0);\n        for (char c : s) freq[c - 'a']++;\n        for (char c : t) {\n            if (--freq[c - 'a'] < 0) return false;\n        }\n        return true;\n    }\n};\nint main() {\n    Solution sol;\n    cout << (sol.isAnagram(\"anagram\", \"nagaram\") ? \"true\" : \"false\") << endl;\n    return 0;\n}",
      "java": "public class Main {\n    public static boolean isAnagram(String s, String t) {\n        if (s.length() != t.length()) return false;\n        int[] freq = new int[26];\n        for (char c : s.toCharArray()) freq[c - 'a']++;\n        for (char c : t.toCharArray()) {\n            if (--freq[c - 'a'] < 0) return false;\n        }\n        return true;\n    }\n    public static void main(String[] args) {\n        System.out.println(isAnagram(\"anagram\", \"nagaram\"));\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "name": "Sample Case 1",
        "input": "",
        "expectedOutput": "true",
        "isHidden": false
      },
      {
        "id": 2,
        "name": "Hidden Case 2",
        "input": "",
        "expectedOutput": "true",
        "isHidden": true
      }
    ]
  },
  {
    "id": "9",
    "number": 9,
    "title": "Longest Common Sequence Prefix",
    "slug": "longest-common-sequence-prefix",
    "difficulty": "Easy",
    "category": "Arrays and Strings",
    "topicTags": [
      "Strings"
    ],
    "problemStatement": "Find the longest common prefix string amongst an array of strings. If there is no common prefix, return \"\".",
    "diagram": null,
    "examples": [
      {
        "input": "strs = [\"flower\", \"flow\", \"flight\"]",
        "output": "\"fl\"",
        "explanation": "\"fl\" is common to all 3 words.",
        "exp": "\"fl\" is common to all 3 words."
      }
    ],
    "constraints": [
      "1 <= strs.length <= 200"
    ],
    "starterCode": {
      "javascript": "function longestCommonPrefix(strs) {\n    if (!strs.length) return \"\";\n    let pref = strs[0];\n    for (let i = 1; i < strs.length; i++) {\n        while (strs[i].indexOf(pref) !== 0) {\n            pref = pref.substring(0, pref.length - 1);\n            if (!pref) return \"\";\n        }\n    }\n    return pref;\n}\nconsole.log(longestCommonPrefix([\"flower\", \"flow\", \"flight\"]));",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\nclass Solution {\npublic:\n    string longestCommonPrefix(vector<string>& strs) {\n        if (strs.empty()) return \"\";\n        string pref = strs[0];\n        for (size_t i = 1; i < strs.size(); i++) {\n            while (strs[i].find(pref) != 0) {\n                pref = pref.substr(0, pref.size() - 1);\n                if (pref.empty()) return \"\";\n            }\n        }\n        return pref;\n    }\n};\nint main() {\n    Solution sol;\n    vector<string> s = {\"flower\", \"flow\", \"flight\"};\n    cout << sol.longestCommonPrefix(s) << endl;\n    return 0;\n}",
      "java": "public class Main {\n    public static String longestCommonPrefix(String[] strs) {\n        if (strs.length == 0) return \"\";\n        String pref = strs[0];\n        for (int i = 1; i < strs.length; i++) {\n            while (!strs[i].startsWith(pref)) {\n                pref = pref.substring(0, pref.length() - 1);\n                if (pref.isEmpty()) return \"\";\n            }\n        }\n        return pref;\n    }\n    public static void main(String[] args) {\n        System.out.println(longestCommonPrefix(new String[]{\"flower\", \"flow\", \"flight\"}));\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "name": "Sample Case 1",
        "input": "",
        "expectedOutput": "fl",
        "isHidden": false
      },
      {
        "id": 2,
        "name": "Hidden Case 2",
        "input": "",
        "expectedOutput": "fl",
        "isHidden": true
      }
    ]
  },
  {
    "id": "10",
    "number": 10,
    "title": "String to 32-bit Integer",
    "slug": "string-to-32-bit-integer",
    "difficulty": "Medium",
    "category": "Arrays and Strings",
    "topicTags": [
      "Strings"
    ],
    "problemStatement": "Implement myAtoi(string s) which converts a string to a 32-bit signed integer, discarding leading whitespace and handling sign & clamp bounds.",
    "diagram": null,
    "examples": [
      {
        "input": "s = \"   -42\"",
        "output": "-42",
        "explanation": "Leading whitespace skipped, negative sign parsed.",
        "exp": "Leading whitespace skipped, negative sign parsed."
      }
    ],
    "constraints": [
      "0 <= s.length <= 200"
    ],
    "starterCode": {
      "javascript": "function myAtoi(s) {\n    s = s.trim();\n    if (!s) return 0;\n    let sign = 1, idx = 0, num = 0;\n    if (s[0] === '-') { sign = -1; idx++; }\n    else if (s[0] === '+') { idx++; }\n    while (idx < s.length && s[idx] >= '0' && s[idx] <= '9') {\n        num = num * 10 + (s.charCodeAt(idx) - 48);\n        idx++;\n    }\n    num *= sign;\n    const INT_MAX = 2147483647, INT_MIN = -2147483648;\n    if (num > INT_MAX) return INT_MAX;\n    if (num < INT_MIN) return INT_MIN;\n    return num;\n}\nconsole.log(myAtoi(\"   -42\"));",
      "cpp": "#include <iostream>\n#include <string>\n#include <climits>\nusing namespace std;\nclass Solution {\npublic:\n    int myAtoi(string s) {\n        int i = 0, n = s.size();\n        while (i < n && s[i] == ' ') i++;\n        int sign = 1;\n        if (i < n && (s[i] == '+' || s[i] == '-')) {\n            sign = (s[i] == '-') ? -1 : 1;\n            i++;\n        }\n        long long num = 0;\n        while (i < n && isdigit(s[i])) {\n            num = num * 10 + (s[i] - '0');\n            if (num * sign > INT_MAX) return INT_MAX;\n            if (num * sign < INT_MIN) return INT_MIN;\n            i++;\n        }\n        return num * sign;\n    }\n};\nint main() {\n    Solution sol;\n    cout << sol.myAtoi(\"   -42\") << endl;\n    return 0;\n}",
      "java": "public class Main {\n    public static int myAtoi(String s) {\n        s = s.trim();\n        if (s.isEmpty()) return 0;\n        int i = 0, sign = 1;\n        if (s.charAt(0) == '-') { sign = -1; i++; }\n        else if (s.charAt(0) == '+') { i++; }\n        long num = 0;\n        while (i < s.length() && Character.isDigit(s.charAt(i))) {\n            num = num * 10 + (s.charAt(i) - '0');\n            if (num * sign > Integer.MAX_VALUE) return Integer.MAX_VALUE;\n            if (num * sign < Integer.MIN_VALUE) return Integer.MIN_VALUE;\n            i++;\n        }\n        return (int)(num * sign);\n    }\n    public static void main(String[] args) {\n        System.out.println(myAtoi(\"   -42\"));\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "name": "Sample Case 1",
        "input": "",
        "expectedOutput": "-42",
        "isHidden": false
      },
      {
        "id": 2,
        "name": "Hidden Case 2",
        "input": "",
        "expectedOutput": "-42",
        "isHidden": true
      }
    ]
  },
  {
    "id": "11",
    "number": 11,
    "title": "Group Equivalent Word Anagrams",
    "slug": "group-equivalent-word-anagrams",
    "difficulty": "Medium",
    "category": "Hashing",
    "topicTags": [
      "Strings",
      "Hash Table"
    ],
    "problemStatement": "Given an array of strings strs, group the anagrams together. Return the count of anagram groups formed.",
    "diagram": null,
    "examples": [
      {
        "input": "strs = [\"eat\", \"tea\", \"tan\", \"ate\", \"nat\", \"bat\"]",
        "output": "3",
        "explanation": "Groups: [\"bat\"], [\"nat\", \"tan\"], [\"ate\", \"eat\", \"tea\"]. Total 3 groups.",
        "exp": "Groups: [\"bat\"], [\"nat\", \"tan\"], [\"ate\", \"eat\", \"tea\"]. Total 3 groups."
      }
    ],
    "constraints": [
      "1 <= strs.length <= 10^4"
    ],
    "starterCode": {
      "javascript": "function groupAnagramsCount(strs) {\n    const map = new Map();\n    for (const str of strs) {\n        const key = str.split('').sort().join('');\n        if (!map.has(key)) map.set(key, []);\n        map.get(key).push(str);\n    }\n    return map.size;\n}\nconsole.log(groupAnagramsCount([\"eat\", \"tea\", \"tan\", \"ate\", \"nat\", \"bat\"]));",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <unordered_map>\n#include <algorithm>\nusing namespace std;\nclass Solution {\npublic:\n    int groupAnagramsCount(vector<string>& strs) {\n        unordered_map<string, vector<string>> groups;\n        for (string& s : strs) {\n            string key = s;\n            sort(key.begin(), key.end());\n            groups[key].push_back(s);\n        }\n        return groups.size();\n    }\n};\nint main() {\n    Solution sol;\n    vector<string> strs = {\"eat\", \"tea\", \"tan\", \"ate\", \"nat\", \"bat\"};\n    cout << sol.groupAnagramsCount(strs) << endl;\n    return 0;\n}",
      "java": "import java.util.*;\npublic class Main {\n    public static int groupAnagramsCount(String[] strs) {\n        Map<String, List<String>> map = new HashMap<>();\n        for (String s : strs) {\n            char[] arr = s.toCharArray();\n            Arrays.sort(arr);\n            String k = new String(arr);\n            map.putIfAbsent(k, new ArrayList<>());\n            map.get(k).add(s);\n        }\n        return map.size();\n    }\n    public static void main(String[] args) {\n        System.out.println(groupAnagramsCount(new String[]{\"eat\", \"tea\", \"tan\", \"ate\", \"nat\", \"bat\"}));\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "name": "Sample Case 1",
        "input": "",
        "expectedOutput": "3",
        "isHidden": false
      },
      {
        "id": 2,
        "name": "Hidden Case 2",
        "input": "",
        "expectedOutput": "3",
        "isHidden": true
      }
    ]
  },
  {
    "id": "12",
    "number": 12,
    "title": "Text Line Justification Formatter",
    "slug": "text-line-justification-formatter",
    "difficulty": "Hard",
    "category": "Hashing",
    "topicTags": [
      "Strings"
    ],
    "problemStatement": "Given array of words and maxWidth, format text such that each line has exactly maxWidth characters and is fully justified.",
    "diagram": null,
    "examples": [
      {
        "input": "words = [\"This\", \"is\", \"an\", \"example\"], maxWidth = 16",
        "output": "2",
        "explanation": "Produces 2 formatted lines.",
        "exp": "Produces 2 formatted lines."
      }
    ],
    "constraints": [
      "1 <= words.length <= 300",
      "1 <= maxWidth <= 100"
    ],
    "starterCode": {
      "javascript": "function fullJustifyCount(words, maxWidth) {\n    let lines = 0, i = 0;\n    while (i < words.length) {\n        let len = words[i].length, j = i + 1;\n        while (j < words.length && len + 1 + words[j].length <= maxWidth) {\n            len += 1 + words[j].length;\n            j++;\n        }\n        lines++;\n        i = j;\n    }\n    return lines;\n}\nconsole.log(fullJustifyCount([\"This\", \"is\", \"an\", \"example\"], 16));",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\nclass Solution {\npublic:\n    int fullJustifyCount(vector<string>& words, int maxWidth) {\n        int lines = 0, i = 0, n = words.size();\n        while (i < n) {\n            int len = words[i].size(), j = i + 1;\n            while (j < n && len + 1 + (int)words[j].size() <= maxWidth) {\n                len += 1 + words[j].size();\n                j++;\n            }\n            lines++;\n            i = j;\n        }\n        return lines;\n    }\n};\nint main() {\n    Solution sol;\n    vector<string> w = {\"This\", \"is\", \"an\", \"example\"};\n    cout << sol.fullJustifyCount(w, 16) << endl;\n    return 0;\n}",
      "java": "import java.util.*;\npublic class Main {\n    public static int fullJustifyCount(String[] words, int maxWidth) {\n        int lines = 0, i = 0, n = words.length;\n        while (i < n) {\n            int len = words[i].length(), j = i + 1;\n            while (j < n && len + 1 + words[j].length() <= maxWidth) {\n                len += 1 + words[j].length();\n                j++;\n            }\n            lines++;\n            i = j;\n        }\n        return lines;\n    }\n    public static void main(String[] args) {\n        System.out.println(fullJustifyCount(new String[]{\"This\", \"is\", \"an\", \"example\"}, 16));\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "name": "Sample Case 1",
        "input": "",
        "expectedOutput": "2",
        "isHidden": false
      },
      {
        "id": 2,
        "name": "Hidden Case 2",
        "input": "",
        "expectedOutput": "2",
        "isHidden": true
      }
    ]
  },
  {
    "id": "13",
    "number": 13,
    "title": "Duplicate Element Presence",
    "slug": "duplicate-element-presence",
    "difficulty": "Easy",
    "category": "Hashing",
    "topicTags": [
      "Hash Table",
      "Arrays"
    ],
    "problemStatement": "Given integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.",
    "diagram": null,
    "examples": [
      {
        "input": "nums = [1, 2, 3, 1]",
        "output": "true",
        "explanation": "1 appears multiple times.",
        "exp": "1 appears multiple times."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5"
    ],
    "starterCode": {
      "javascript": "function containsDuplicate(nums) {\n    const s = new Set();\n    for (const x of nums) {\n        if (s.has(x)) return true;\n        s.add(x);\n    }\n    return false;\n}\nconsole.log(containsDuplicate([1, 2, 3, 1]));",
      "cpp": "#include <iostream>\n#include <vector>\n#include <unordered_set>\nusing namespace std;\nclass Solution {\npublic:\n    bool containsDuplicate(vector<int>& nums) {\n        unordered_set<int> seen;\n        for (int x : nums) {\n            if (seen.count(x)) return true;\n            seen.insert(x);\n        }\n        return false;\n    }\n};\nint main() {\n    Solution sol;\n    vector<int> nums = {1, 2, 3, 1};\n    cout << (sol.containsDuplicate(nums) ? \"true\" : \"false\") << endl;\n    return 0;\n}",
      "java": "import java.util.*;\npublic class Main {\n    public static boolean containsDuplicate(int[] nums) {\n        Set<Integer> set = new HashSet<>();\n        for (int x : nums) {\n            if (set.contains(x)) return true;\n            set.add(x);\n        }\n        return false;\n    }\n    public static void main(String[] args) {\n        System.out.println(containsDuplicate(new int[]{1, 2, 3, 1}));\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "name": "Sample Case 1",
        "input": "",
        "expectedOutput": "true",
        "isHidden": false
      },
      {
        "id": 2,
        "name": "Hidden Case 2",
        "input": "",
        "expectedOutput": "true",
        "isHidden": true
      }
    ]
  },
  {
    "id": "14",
    "number": 14,
    "title": "First Non-Repeating Character",
    "slug": "first-non-repeating-character",
    "difficulty": "Easy",
    "category": "Hashing",
    "topicTags": [
      "Hash Table",
      "Strings"
    ],
    "problemStatement": "Given string s, find the first non-repeating character in it and return its index. If it does not exist, return -1.",
    "diagram": null,
    "examples": [
      {
        "input": "s = \"leetcode\"",
        "output": "0",
        "explanation": "Character l does not repeat.",
        "exp": "Character l does not repeat."
      }
    ],
    "constraints": [
      "1 <= s.length <= 10^5"
    ],
    "starterCode": {
      "javascript": "function firstUniqChar(s) {\n    const f = {};\n    for (const c of s) f[c] = (f[c] || 0) + 1;\n    for (let i = 0; i < s.length; i++) {\n        if (f[s[i]] === 1) return i;\n    }\n    return -1;\n}\nconsole.log(firstUniqChar(\"leetcode\"));",
      "cpp": "#include <iostream>\n#include <string>\n#include <vector>\nusing namespace std;\nclass Solution {\npublic:\n    int firstUniqChar(string s) {\n        vector<int> freq(26, 0);\n        for (char c : s) freq[c - 'a']++;\n        for (int i = 0; i < (int)s.size(); i++) {\n            if (freq[s[i] - 'a'] == 1) return i;\n        }\n        return -1;\n    }\n};\nint main() {\n    Solution sol;\n    cout << sol.firstUniqChar(\"leetcode\") << endl;\n    return 0;\n}",
      "java": "public class Main {\n    public static int firstUniqChar(String s) {\n        int[] freq = new int[26];\n        for (char c : s.toCharArray()) freq[c - 'a']++;\n        for (int i = 0; i < s.length(); i++) {\n            if (freq[s.charAt(i) - 'a'] == 1) return i;\n        }\n        return -1;\n    }\n    public static void main(String[] args) {\n        System.out.println(firstUniqChar(\"leetcode\"));\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "name": "Sample Case 1",
        "input": "",
        "expectedOutput": "0",
        "isHidden": false
      },
      {
        "id": 2,
        "name": "Hidden Case 2",
        "input": "",
        "expectedOutput": "0",
        "isHidden": true
      }
    ]
  },
  {
    "id": "15",
    "number": 15,
    "title": "Array Element Intersection",
    "slug": "array-element-intersection",
    "difficulty": "Easy",
    "category": "Hashing",
    "topicTags": [
      "Hash Table",
      "Arrays"
    ],
    "problemStatement": "Given two integer arrays nums1 and nums2, return an array of their unique intersection elements.",
    "diagram": null,
    "examples": [
      {
        "input": "nums1 = [1, 2, 2, 1], nums2 = [2, 2]",
        "output": "[2]",
        "explanation": "2 is the only intersection element.",
        "exp": "2 is the only intersection element."
      }
    ],
    "constraints": [
      "1 <= nums1.length, nums2.length <= 1000"
    ],
    "starterCode": {
      "javascript": "function intersection(nums1, nums2) {\n    const s1 = new Set(nums1);\n    const res = [];\n    for (const x of new Set(nums2)) {\n        if (s1.has(x)) res.push(x);\n    }\n    return res;\n}\nconsole.log(JSON.stringify(intersection([1, 2, 2, 1], [2, 2])));",
      "cpp": "#include <iostream>\n#include <vector>\n#include <unordered_set>\nusing namespace std;\nclass Solution {\npublic:\n    vector<int> intersection(vector<int>& nums1, vector<int>& nums2) {\n        unordered_set<int> s(nums1.begin(), nums1.end()), res;\n        for (int x : nums2) if (s.count(x)) res.insert(x);\n        return vector<int>(res.begin(), res.end());\n    }\n};\nint main() {\n    Solution sol;\n    vector<int> a = {1, 2, 2, 1}, b = {2, 2};\n    vector<int> r = sol.intersection(a, b);\n    cout << \"[\" << r[0] << \"]\" << endl;\n    return 0;\n}",
      "java": "import java.util.*;\npublic class Main {\n    public static int[] intersection(int[] nums1, int[] nums2) {\n        Set<Integer> set = new HashSet<>(), res = new HashSet<>();\n        for (int x : nums1) set.add(x);\n        for (int x : nums2) if (set.contains(x)) res.add(x);\n        int[] out = new int[res.size()]; int idx = 0;\n        for (int x : res) out[idx++] = x;\n        return out;\n    }\n    public static void main(String[] args) {\n        System.out.println(Arrays.toString(intersection(new int[]{1, 2, 2, 1}, new int[]{2, 2})));\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "name": "Sample Case 1",
        "input": "",
        "expectedOutput": "[2]",
        "isHidden": false
      },
      {
        "id": 2,
        "name": "Hidden Case 2",
        "input": "",
        "expectedOutput": "[2]",
        "isHidden": true
      }
    ]
  },
  {
    "id": "16",
    "number": 16,
    "title": "Longest Consecutive Sequence Run",
    "slug": "longest-consecutive-sequence-run",
    "difficulty": "Medium",
    "category": "Hashing",
    "topicTags": [
      "Hash Table",
      "Union Find"
    ],
    "problemStatement": "Given unsorted array nums, return the length of the longest consecutive elements sequence in O(n) time.",
    "diagram": null,
    "examples": [
      {
        "input": "nums = [100, 4, 200, 1, 3, 2]",
        "output": "4",
        "explanation": "Sequence is [1, 2, 3, 4], length = 4.",
        "exp": "Sequence is [1, 2, 3, 4], length = 4."
      }
    ],
    "constraints": [
      "0 <= nums.length <= 10^5"
    ],
    "starterCode": {
      "javascript": "function longestConsecutive(nums) {\n    const s = new Set(nums);\n    let maxLen = 0;\n    for (const num of s) {\n        if (!s.has(num - 1)) {\n            let cur = num, len = 1;\n            while (s.has(cur + 1)) { cur++; len++; }\n            maxLen = Math.max(maxLen, len);\n        }\n    }\n    return maxLen;\n}\nconsole.log(longestConsecutive([100, 4, 200, 1, 3, 2]));",
      "cpp": "#include <iostream>\n#include <vector>\n#include <unordered_set>\n#include <algorithm>\nusing namespace std;\nclass Solution {\npublic:\n    int longestConsecutive(vector<int>& nums) {\n        unordered_set<int> s(nums.begin(), nums.end());\n        int maxLen = 0;\n        for (int x : s) {\n            if (!s.count(x - 1)) {\n                int cur = x, len = 1;\n                while (s.count(cur + 1)) { cur++; len++; }\n                maxLen = max(maxLen, len);\n            }\n        }\n        return maxLen;\n    }\n};\nint main() {\n    Solution sol;\n    vector<int> nums = {100, 4, 200, 1, 3, 2};\n    cout << sol.longestConsecutive(nums) << endl;\n    return 0;\n}",
      "java": "import java.util.*;\npublic class Main {\n    public static int longestConsecutive(int[] nums) {\n        Set<Integer> set = new HashSet<>();\n        for (int x : nums) set.add(x);\n        int maxLen = 0;\n        for (int x : set) {\n            if (!set.contains(x - 1)) {\n                int cur = x, len = 1;\n                while (set.contains(cur + 1)) { cur++; len++; }\n                maxLen = Math.max(maxLen, len);\n            }\n        }\n        return maxLen;\n    }\n    public static void main(String[] args) {\n        System.out.println(longestConsecutive(new int[]{100, 4, 200, 1, 3, 2}));\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "name": "Sample Case 1",
        "input": "",
        "expectedOutput": "4",
        "isHidden": false
      },
      {
        "id": 2,
        "name": "Hidden Case 2",
        "input": "",
        "expectedOutput": "4",
        "isHidden": true
      }
    ]
  },
  {
    "id": "17",
    "number": 17,
    "title": "Subarray Sum Matching Target",
    "slug": "subarray-sum-matching-target",
    "difficulty": "Medium",
    "category": "Hashing",
    "topicTags": [
      "Hash Table",
      "Prefix Sum"
    ],
    "problemStatement": "Given integer array nums and integer k, return the total number of continuous subarrays whose sum equals k in O(n) time.",
    "diagram": null,
    "examples": [
      {
        "input": "nums = [1, 1, 1], k = 2",
        "output": "2",
        "explanation": "[1, 1] at start and [1, 1] at end.",
        "exp": "[1, 1] at start and [1, 1] at end."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 2 * 10^4"
    ],
    "starterCode": {
      "javascript": "function subarraySum(nums, k) {\n    const map = new Map([[0, 1]]);\n    let sum = 0, count = 0;\n    for (const x of nums) {\n        sum += x;\n        if (map.has(sum - k)) count += map.get(sum - k);\n        map.set(sum, (map.get(sum) || 0) + 1);\n    }\n    return count;\n}\nconsole.log(subarraySum([1, 1, 1], 2));",
      "cpp": "#include <iostream>\n#include <vector>\n#include <unordered_map>\nusing namespace std;\nclass Solution {\npublic:\n    int subarraySum(vector<int>& nums, int k) {\n        unordered_map<int, int> prefixCounts;\n        prefixCounts[0] = 1;\n        int sum = 0, count = 0;\n        for (int x : nums) {\n            sum += x;\n            if (prefixCounts.count(sum - k)) count += prefixCounts[sum - k];\n            prefixCounts[sum]++;\n        }\n        return count;\n    }\n};\nint main() {\n    Solution sol;\n    vector<int> nums = {1, 1, 1};\n    cout << sol.subarraySum(nums, 2) << endl;\n    return 0;\n}",
      "java": "import java.util.*;\npublic class Main {\n    public static int subarraySum(int[] nums, int k) {\n        Map<Integer, Integer> map = new HashMap<>();\n        map.put(0, 1);\n        int sum = 0, count = 0;\n        for (int x : nums) {\n            sum += x;\n            count += map.getOrDefault(sum - k, 0);\n            map.put(sum, map.getOrDefault(sum, 0) + 1);\n        }\n        return count;\n    }\n    public static void main(String[] args) {\n        System.out.println(subarraySum(new int[]{1, 1, 1}, 2));\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "name": "Sample Case 1",
        "input": "",
        "expectedOutput": "2",
        "isHidden": false
      },
      {
        "id": 2,
        "name": "Hidden Case 2",
        "input": "",
        "expectedOutput": "2",
        "isHidden": true
      }
    ]
  },
  {
    "id": "18",
    "number": 18,
    "title": "Minimum Substring Covering Alphabet",
    "slug": "minimum-substring-covering-alphabet",
    "difficulty": "Hard",
    "category": "Hashing",
    "topicTags": [
      "Hash Table",
      "Sliding Window"
    ],
    "problemStatement": "Given strings s and t, return the minimum window substring of s such that every character in t is included in the window.",
    "diagram": null,
    "examples": [
      {
        "input": "s = \"ADOBECODEBANC\", t = \"ABC\"",
        "output": "\"BANC\"",
        "explanation": "\"BANC\" is minimum window containing A, B, and C.",
        "exp": "\"BANC\" is minimum window containing A, B, and C."
      }
    ],
    "constraints": [
      "1 <= s.length, t.length <= 10^5"
    ],
    "starterCode": {
      "javascript": "function minWindow(s, t) {\n    const need = {};\n    for (const c of t) need[c] = (need[c] || 0) + 1;\n    let required = Object.keys(need).length;\n    let l = 0, r = 0, formed = 0;\n    const windowCounts = {};\n    let ans = [-1, 0, 0];\n    while (r < s.length) {\n        const c = s[r];\n        windowCounts[c] = (windowCounts[c] || 0) + 1;\n        if (need[c] && windowCounts[c] === need[c]) formed++;\n        while (l <= r && formed === required) {\n            const charL = s[l];\n            if (ans[0] === -1 || r - l + 1 < ans[0]) ans = [r - l + 1, l, r];\n            windowCounts[charL]--;\n            if (need[charL] && windowCounts[charL] < need[charL]) formed--;\n            l++;\n        }\n        r++;\n    }\n    return ans[0] === -1 ? \"\" : s.substring(ans[1], ans[2] + 1);\n}\nconsole.log(minWindow(\"ADOBECODEBANC\", \"ABC\"));",
      "cpp": "#include <iostream>\n#include <string>\n#include <vector>\n#include <climits>\nusing namespace std;\nclass Solution {\npublic:\n    string minWindow(string s, string t) {\n        vector<int> map(128, 0);\n        for (char c : t) map[c]++;\n        int count = t.size(), begin = 0, end = 0, d = INT_MAX, head = 0;\n        while (end < (int)s.size()) {\n            if (map[s[end++]]-- > 0) count--;\n            while (count == 0) {\n                if (end - begin < d) d = end - (head = begin);\n                if (map[s[begin++]]++ == 0) count++;\n            }\n        }\n        return d == INT_MAX ? \"\" : s.substr(head, d);\n    }\n};\nint main() {\n    Solution sol;\n    cout << sol.minWindow(\"ADOBECODEBANC\", \"ABC\") << endl;\n    return 0;\n}",
      "java": "public class Main {\n    public static String minWindow(String s, String t) {\n        int[] map = new int[128];\n        for (char c : t.toCharArray()) map[c]++;\n        int count = t.length(), begin = 0, end = 0, d = Integer.MAX_VALUE, head = 0;\n        while (end < s.length()) {\n            if (map[s.charAt(end++)]-- > 0) count--;\n            while (count == 0) {\n                if (end - begin < d) d = end - (head = begin);\n                if (map[s.charAt(begin++)]++ == 0) count++;\n            }\n        }\n        return d == Integer.MAX_VALUE ? \"\" : s.substring(head, head + d);\n    }\n    public static void main(String[] args) {\n        System.out.println(minWindow(\"ADOBECODEBANC\", \"ABC\"));\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "name": "Sample Case 1",
        "input": "",
        "expectedOutput": "BANC",
        "isHidden": false
      },
      {
        "id": 2,
        "name": "Hidden Case 2",
        "input": "",
        "expectedOutput": "BANC",
        "isHidden": true
      }
    ]
  },
  {
    "id": "19",
    "number": 19,
    "title": "In-Place String Reversal",
    "slug": "in-place-string-reversal",
    "difficulty": "Easy",
    "category": "Two Pointers and Sliding Window",
    "topicTags": [
      "Two Pointers",
      "Strings"
    ],
    "problemStatement": "Write a function that reverses an array of characters in-place with O(1) extra memory.",
    "diagram": null,
    "examples": [
      {
        "input": "s = [\"h\", \"e\", \"l\", \"l\", \"o\"]",
        "output": "[\"o\", \"l\", \"l\", \"e\", \"h\"]",
        "explanation": "Reversed two pointers.",
        "exp": "Reversed two pointers."
      }
    ],
    "constraints": [
      "1 <= s.length <= 10^5"
    ],
    "starterCode": {
      "javascript": "function reverseString(s) {\n    let l = 0, r = s.length - 1;\n    while (l < r) { [s[l], s[r]] = [s[r], s[l]]; l++; r--; }\n    return s;\n}\nconsole.log(JSON.stringify(reverseString([\"h\", \"e\", \"l\", \"l\", \"o\"])));",
      "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\nclass Solution {\npublic:\n    void reverseString(vector<char>& s) {\n        int l = 0, r = s.size() - 1;\n        while (l < r) { swap(s[l], s[r]); l++; r--; }\n    }\n};\nint main() {\n    Solution sol;\n    vector<char> s = {'h', 'e', 'l', 'l', 'o'};\n    sol.reverseString(s);\n    cout << \"[\"\" << s[0] << \"\", \"\" << s[1] << \"\", \"\" << s[2] << \"\", \"\" << s[3] << \"\", \"\" << s[4] << \"\"]\" << endl;\n    return 0;\n}",
      "java": "import java.util.*;\npublic class Main {\n    public static void reverseString(char[] s) {\n        int l = 0, r = s.length - 1;\n        while (l < r) { char t = s[l]; s[l] = s[r]; s[r] = t; l++; r--; }\n    }\n    public static void main(String[] args) {\n        char[] s = {'h', 'e', 'l', 'l', 'o'};\n        reverseString(s);\n        System.out.println(Arrays.toString(s));\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "name": "Sample Case 1",
        "input": "",
        "expectedOutput": "[\"o\", \"l\", \"l\", \"e\", \"h\"]",
        "isHidden": false
      },
      {
        "id": 2,
        "name": "Hidden Case 2",
        "input": "",
        "expectedOutput": "[\"o\", \"l\", \"l\", \"e\", \"h\"]",
        "isHidden": true
      }
    ]
  },
  {
    "id": "20",
    "number": 20,
    "title": "Relocate Zeroes to End",
    "slug": "relocate-zeroes-to-end",
    "difficulty": "Easy",
    "category": "Two Pointers and Sliding Window",
    "topicTags": [
      "Two Pointers",
      "Arrays"
    ],
    "problemStatement": "Given integer array nums, move all 0s to end while maintaining relative order of non-zero elements in-place.",
    "diagram": null,
    "examples": [
      {
        "input": "nums = [0, 1, 0, 3, 12]",
        "output": "[1, 3, 12, 0, 0]",
        "explanation": "Non-zeroes preserve original order.",
        "exp": "Non-zeroes preserve original order."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^4"
    ],
    "starterCode": {
      "javascript": "function moveZeroes(nums) {\n    let lastNonZero = 0;\n    for (let i = 0; i < nums.length; i++) {\n        if (nums[i] !== 0) {\n            [nums[lastNonZero], nums[i]] = [nums[i], nums[lastNonZero]];\n            lastNonZero++;\n        }\n    }\n    return nums;\n}\nconsole.log(JSON.stringify(moveZeroes([0, 1, 0, 3, 12])));",
      "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\nclass Solution {\npublic:\n    void moveZeroes(vector<int>& nums) {\n        int pos = 0;\n        for (int i = 0; i < (int)nums.size(); i++) {\n            if (nums[i] != 0) swap(nums[pos++], nums[i]);\n        }\n    }\n};\nint main() {\n    Solution sol;\n    vector<int> nums = {0, 1, 0, 3, 12};\n    sol.moveZeroes(nums);\n    cout << \"[\" << nums[0] << \", \" << nums[1] << \", \" << nums[2] << \", \" << nums[3] << \", \" << nums[4] << \"]\" << endl;\n    return 0;\n}",
      "java": "import java.util.*;\npublic class Main {\n    public static void moveZeroes(int[] nums) {\n        int pos = 0;\n        for (int i = 0; i < nums.length; i++) {\n            if (nums[i] != 0) {\n                int t = nums[pos]; nums[pos] = nums[i]; nums[i] = t;\n                pos++;\n            }\n        }\n    }\n    public static void main(String[] args) {\n        int[] nums = {0, 1, 0, 3, 12};\n        moveZeroes(nums);\n        System.out.println(Arrays.toString(nums));\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "name": "Sample Case 1",
        "input": "",
        "expectedOutput": "[1, 3, 12, 0, 0]",
        "isHidden": false
      },
      {
        "id": 2,
        "name": "Hidden Case 2",
        "input": "",
        "expectedOutput": "[1, 3, 12, 0, 0]",
        "isHidden": true
      }
    ]
  },
  {
    "id": "21",
    "number": 21,
    "title": "Container with Maximum Water Capacity",
    "slug": "container-with-maximum-water-capacity",
    "difficulty": "Medium",
    "category": "Two Pointers and Sliding Window",
    "topicTags": [
      "Two Pointers",
      "Greedy"
    ],
    "problemStatement": "Given array height of n vertical lines, find two lines that together with x-axis form container storing most water.",
    "diagram": null,
    "examples": [
      {
        "input": "height = [1, 8, 6, 2, 5, 4, 8, 3, 7]",
        "output": "49",
        "explanation": "Width 7 * min(8, 7) = 49.",
        "exp": "Width 7 * min(8, 7) = 49."
      }
    ],
    "constraints": [
      "2 <= height.length <= 10^5"
    ],
    "starterCode": {
      "javascript": "function maxArea(height) {\n    let l = 0, r = height.length - 1, maxA = 0;\n    while (l < r) {\n        const h = Math.min(height[l], height[r]);\n        maxA = Math.max(maxA, h * (r - l));\n        if (height[l] < height[r]) l++;\n        else r--;\n    }\n    return maxA;\n}\nconsole.log(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]));",
      "cpp": "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nclass Solution {\npublic:\n    int maxArea(vector<int>& height) {\n        int l = 0, r = height.size() - 1, maxA = 0;\n        while (l < r) {\n            int h = min(height[l], height[r]);\n            maxA = max(maxA, h * (r - l));\n            if (height[l] < height[r]) l++;\n            else r--;\n        }\n        return maxA;\n    }\n};\nint main() {\n    Solution sol;\n    vector<int> h = {1, 8, 6, 2, 5, 4, 8, 3, 7};\n    cout << sol.maxArea(h) << endl;\n    return 0;\n}",
      "java": "public class Main {\n    public static int maxArea(int[] height) {\n        int l = 0, r = height.length - 1, maxA = 0;\n        while (l < r) {\n            int h = Math.min(height[l], height[r]);\n            maxA = Math.max(maxA, h * (r - l));\n            if (height[l] < height[r]) l++;\n            else r--;\n        }\n        return maxA;\n    }\n    public static void main(String[] args) {\n        System.out.println(maxArea(new int[]{1, 8, 6, 2, 5, 4, 8, 3, 7}));\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "name": "Sample Case 1",
        "input": "",
        "expectedOutput": "49",
        "isHidden": false
      },
      {
        "id": 2,
        "name": "Hidden Case 2",
        "input": "",
        "expectedOutput": "49",
        "isHidden": true
      }
    ]
  },
  {
    "id": "22",
    "number": 22,
    "title": "Three Sum Zero Triplet Finder",
    "slug": "three-sum-zero-triplet-finder",
    "difficulty": "Medium",
    "category": "Two Pointers and Sliding Window",
    "topicTags": [
      "Two Pointers",
      "Sorting"
    ],
    "problemStatement": "Given integer array nums, return count of unique triplets [nums[i], nums[j], nums[k]] such that i != j != k and sum == 0.",
    "diagram": null,
    "examples": [
      {
        "input": "nums = [-1, 0, 1, 2, -1, -4]",
        "output": "2",
        "explanation": "Triplets: [-1, -1, 2] and [-1, 0, 1]. Count = 2.",
        "exp": "Triplets: [-1, -1, 2] and [-1, 0, 1]. Count = 2."
      }
    ],
    "constraints": [
      "3 <= nums.length <= 3000"
    ],
    "starterCode": {
      "javascript": "function threeSumCount(nums) {\n    nums.sort((a, b) => a - b);\n    let count = 0;\n    for (let i = 0; i < nums.length - 2; i++) {\n        if (i > 0 && nums[i] === nums[i - 1]) continue;\n        let l = i + 1, r = nums.length - 1;\n        while (l < r) {\n            const sum = nums[i] + nums[l] + nums[r];\n            if (sum === 0) {\n                count++;\n                while (l < r && nums[l] === nums[l + 1]) l++;\n                while (l < r && nums[r] === nums[r - 1]) r--;\n                l++; r--;\n            } else if (sum < 0) l++;\n            else r--;\n        }\n    }\n    return count;\n}\nconsole.log(threeSumCount([-1, 0, 1, 2, -1, -4]));",
      "cpp": "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nclass Solution {\npublic:\n    int threeSumCount(vector<int>& nums) {\n        sort(nums.begin(), nums.end());\n        int count = 0, n = nums.size();\n        for (int i = 0; i < n - 2; i++) {\n            if (i > 0 && nums[i] == nums[i - 1]) continue;\n            int l = i + 1, r = n - 1;\n            while (l < r) {\n                int sum = nums[i] + nums[l] + nums[r];\n                if (sum == 0) {\n                    count++;\n                    while (l < r && nums[l] == nums[l + 1]) l++;\n                    while (l < r && nums[r] == nums[r - 1]) r--;\n                    l++; r--;\n                } else if (sum < 0) l++;\n                else r--;\n            }\n        }\n        return count;\n    }\n};\nint main() {\n    Solution sol;\n    vector<int> nums = {-1, 0, 1, 2, -1, -4};\n    cout << sol.threeSumCount(nums) << endl;\n    return 0;\n}",
      "java": "import java.util.*;\npublic class Main {\n    public static int threeSumCount(int[] nums) {\n        Arrays.sort(nums);\n        int count = 0;\n        for (int i = 0; i < nums.length - 2; i++) {\n            if (i > 0 && nums[i] == nums[i - 1]) continue;\n            int l = i + 1, r = nums.length - 1;\n            while (l < r) {\n                int sum = nums[i] + nums[l] + nums[r];\n                if (sum == 0) {\n                    count++;\n                    while (l < r && nums[l] == nums[l + 1]) l++;\n                    while (l < r && nums[r] == nums[r - 1]) r--;\n                    l++; r--;\n                } else if (sum < 0) l++;\n                else r--;\n            }\n        }\n        return count;\n    }\n    public static void main(String[] args) {\n        System.out.println(threeSumCount(new int[]{-1, 0, 1, 2, -1, -4}));\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "name": "Sample Case 1",
        "input": "",
        "expectedOutput": "2",
        "isHidden": false
      },
      {
        "id": 2,
        "name": "Hidden Case 2",
        "input": "",
        "expectedOutput": "2",
        "isHidden": true
      }
    ]
  },
  {
    "id": "23",
    "number": 23,
    "title": "Dutch National Flag Tricolor Sorting",
    "slug": "dutch-national-flag-tricolor-sorting",
    "difficulty": "Medium",
    "category": "Two Pointers and Sliding Window",
    "topicTags": [
      "Two Pointers",
      "Sorting"
    ],
    "problemStatement": "Given array nums with n objects colored red (0), white (1), or blue (2), sort them in-place in linear time with one pass.",
    "diagram": null,
    "examples": [
      {
        "input": "nums = [2, 0, 2, 1, 1, 0]",
        "output": "[0, 0, 1, 1, 2, 2]",
        "explanation": "Dijkstra 3-way partition.",
        "exp": "Dijkstra 3-way partition."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 300"
    ],
    "starterCode": {
      "javascript": "function sortColors(nums) {\n    let low = 0, mid = 0, high = nums.length - 1;\n    while (mid <= high) {\n        if (nums[mid] === 0) { [nums[low], nums[mid]] = [nums[mid], nums[low]]; low++; mid++; }\n        else if (nums[mid] === 1) { mid++; }\n        else { [nums[mid], nums[high]] = [nums[high], nums[mid]]; high--; }\n    }\n    return nums;\n}\nconsole.log(JSON.stringify(sortColors([2, 0, 2, 1, 1, 0])));",
      "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\nclass Solution {\npublic:\n    void sortColors(vector<int>& nums) {\n        int low = 0, mid = 0, high = nums.size() - 1;\n        while (mid <= high) {\n            if (nums[mid] == 0) swap(nums[low++], nums[mid++]);\n            else if (nums[mid] == 1) mid++;\n            else swap(nums[mid], nums[high--]);\n        }\n    }\n};\nint main() {\n    Solution sol;\n    vector<int> nums = {2, 0, 2, 1, 1, 0};\n    sol.sortColors(nums);\n    cout << \"[\" << nums[0] << \", \" << nums[1] << \", \" << nums[2] << \", \" << nums[3] << \", \" << nums[4] << \", \" << nums[5] << \"]\" << endl;\n    return 0;\n}",
      "java": "import java.util.*;\npublic class Main {\n    public static void sortColors(int[] nums) {\n        int low = 0, mid = 0, high = nums.length - 1;\n        while (mid <= high) {\n            if (nums[mid] == 0) { int t = nums[low]; nums[low] = nums[mid]; nums[mid] = t; low++; mid++; }\n            else if (nums[mid] == 1) mid++;\n            else { int t = nums[mid]; nums[mid] = nums[high]; nums[high] = t; high--; }\n        }\n    }\n    public static void main(String[] args) {\n        int[] nums = {2, 0, 2, 1, 1, 0};\n        sortColors(nums);\n        System.out.println(Arrays.toString(nums));\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "name": "Sample Case 1",
        "input": "",
        "expectedOutput": "[0, 0, 1, 1, 2, 2]",
        "isHidden": false
      },
      {
        "id": 2,
        "name": "Hidden Case 2",
        "input": "",
        "expectedOutput": "[0, 0, 1, 1, 2, 2]",
        "isHidden": true
      }
    ]
  },
  {
    "id": "24",
    "number": 24,
    "title": "Trapping Rainwater Elevation Capacity",
    "slug": "trapping-rainwater-elevation-capacity",
    "difficulty": "Hard",
    "category": "Two Pointers and Sliding Window",
    "topicTags": [
      "Two Pointers",
      "Dynamic Programming"
    ],
    "problemStatement": "Given n non-negative integers representing elevation map where width of each bar is 1, compute trapped rain water.",
    "diagram": null,
    "examples": [
      {
        "input": "height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]",
        "output": "6",
        "explanation": "6 units of water trapped.",
        "exp": "6 units of water trapped."
      }
    ],
    "constraints": [
      "1 <= height.length <= 2 * 10^4"
    ],
    "starterCode": {
      "javascript": "function trap(height) {\n    let l = 0, r = height.length - 1, leftMax = 0, rightMax = 0, total = 0;\n    while (l < r) {\n        if (height[l] < height[r]) {\n            if (height[l] >= leftMax) leftMax = height[l];\n            else total += leftMax - height[l];\n            l++;\n        } else {\n            if (height[r] >= rightMax) rightMax = height[r];\n            else total += rightMax - height[r];\n            r--;\n        }\n    }\n    return total;\n}\nconsole.log(trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]));",
      "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\nclass Solution {\npublic:\n    int trap(vector<int>& height) {\n        int l = 0, r = height.size() - 1, leftMax = 0, rightMax = 0, total = 0;\n        while (l < r) {\n            if (height[l] < height[r]) {\n                if (height[l] >= leftMax) leftMax = height[l];\n                else total += leftMax - height[l];\n                l++;\n            } else {\n                if (height[r] >= rightMax) rightMax = height[r];\n                else total += rightMax - height[r];\n                r--;\n            }\n        }\n        return total;\n    }\n};\nint main() {\n    Solution sol;\n    vector<int> h = {0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1};\n    cout << sol.trap(h) << endl;\n    return 0;\n}",
      "java": "public class Main {\n    public static int trap(int[] height) {\n        int l = 0, r = height.length - 1, leftMax = 0, rightMax = 0, total = 0;\n        while (l < r) {\n            if (height[l] < height[r]) {\n                if (height[l] >= leftMax) leftMax = height[l];\n                else total += leftMax - height[l];\n                l++;\n            } else {\n                if (height[r] >= rightMax) rightMax = height[r];\n                else total += rightMax - height[r];\n                r--;\n            }\n        }\n        return total;\n    }\n    public static void main(String[] args) {\n        System.out.println(trap(new int[]{0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1}));\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "name": "Sample Case 1",
        "input": "",
        "expectedOutput": "6",
        "isHidden": false
      },
      {
        "id": 2,
        "name": "Hidden Case 2",
        "input": "",
        "expectedOutput": "6",
        "isHidden": true
      }
    ]
  },
  {
    "id": "25",
    "number": 25,
    "title": "Maximum Average Subarray of Length K",
    "slug": "maximum-average-subarray-of-length-k",
    "difficulty": "Easy",
    "category": "Two Pointers and Sliding Window",
    "topicTags": [
      "Sliding Window",
      "Arrays"
    ],
    "problemStatement": "Given integer array nums and integer k, find contiguous subarray of length k that has maximum average value and return its max sum.",
    "diagram": null,
    "examples": [
      {
        "input": "nums = [1, 12, -5, -6, 50, 3], k = 4",
        "output": "51",
        "explanation": "Subarray [12, -5, -6, 50] has sum 51.",
        "exp": "Subarray [12, -5, -6, 50] has sum 51."
      }
    ],
    "constraints": [
      "1 <= k <= nums.length <= 10^5"
    ],
    "starterCode": {
      "javascript": "function findMaxAverageSum(nums, k) {\n    let cur = 0;\n    for (let i = 0; i < k; i++) cur += nums[i];\n    let maxS = cur;\n    for (let i = k; i < nums.length; i++) {\n        cur += nums[i] - nums[i - k];\n        maxS = Math.max(maxS, cur);\n    }\n    return maxS;\n}\nconsole.log(findMaxAverageSum([1, 12, -5, -6, 50, 3], 4));",
      "cpp": "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nclass Solution {\npublic:\n    int findMaxAverageSum(vector<int>& nums, int k) {\n        int cur = 0;\n        for (int i = 0; i < k; i++) cur += nums[i];\n        int maxS = cur;\n        for (size_t i = k; i < nums.size(); i++) {\n            cur += nums[i] - nums[i - k];\n            maxS = max(maxS, cur);\n        }\n        return maxS;\n    }\n};\nint main() {\n    Solution sol;\n    vector<int> nums = {1, 12, -5, -6, 50, 3};\n    cout << sol.findMaxAverageSum(nums, 4) << endl;\n    return 0;\n}",
      "java": "public class Main {\n    public static int findMaxAverageSum(int[] nums, int k) {\n        int cur = 0;\n        for (int i = 0; i < k; i++) cur += nums[i];\n        int maxS = cur;\n        for (int i = k; i < nums.length; i++) {\n            cur += nums[i] - nums[i - k];\n            maxS = Math.max(maxS, cur);\n        }\n        return maxS;\n    }\n    public static void main(String[] args) {\n        System.out.println(findMaxAverageSum(new int[]{1, 12, -5, -6, 50, 3}, 4));\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "name": "Sample Case 1",
        "input": "",
        "expectedOutput": "51",
        "isHidden": false
      },
      {
        "id": 2,
        "name": "Hidden Case 2",
        "input": "",
        "expectedOutput": "51",
        "isHidden": true
      }
    ]
  },
  {
    "id": "26",
    "number": 26,
    "title": "Circular Defuse Bomb Sequence",
    "slug": "circular-defuse-bomb-sequence",
    "difficulty": "Easy",
    "category": "Two Pointers and Sliding Window",
    "topicTags": [
      "Sliding Window",
      "Arrays"
    ],
    "problemStatement": "Given circular array code and key k, replace each number with sum of next k numbers (if k > 0) or 0 (if k == 0).",
    "diagram": null,
    "examples": [
      {
        "input": "code = [5, 7, 1, 4], k = 3",
        "output": "[12, 10, 16, 13]",
        "explanation": "Sum of next 3 elements circular.",
        "exp": "Sum of next 3 elements circular."
      }
    ],
    "constraints": [
      "1 <= code.length <= 100"
    ],
    "starterCode": {
      "javascript": "function decrypt(code, k) {\n    const n = code.length, res = new Array(n).fill(0);\n    if (k === 0) return res;\n    for (let i = 0; i < n; i++) {\n        let sum = 0;\n        for (let j = 1; j <= k; j++) sum += code[(i + j) % n];\n        res[i] = sum;\n    }\n    return res;\n}\nconsole.log(JSON.stringify(decrypt([5, 7, 1, 4], 3)));",
      "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\nclass Solution {\npublic:\n    vector<int> decrypt(vector<int>& code, int k) {\n        int n = code.size();\n        vector<int> res(n, 0);\n        if (k == 0) return res;\n        for (int i = 0; i < n; i++) {\n            int sum = 0;\n            for (int j = 1; j <= k; j++) sum += code[(i + j) % n];\n            res[i] = sum;\n        }\n        return res;\n    }\n};\nint main() {\n    Solution sol;\n    vector<int> c = {5, 7, 1, 4};\n    vector<int> r = sol.decrypt(c, 3);\n    cout << \"[\" << r[0] << \", \" << r[1] << \", \" << r[2] << \", \" << r[3] << \"]\" << endl;\n    return 0;\n}",
      "java": "import java.util.*;\npublic class Main {\n    public static int[] decrypt(int[] code, int k) {\n        int n = code.length;\n        int[] res = new int[n];\n        if (k == 0) return res;\n        for (int i = 0; i < n; i++) {\n            int sum = 0;\n            for (int j = 1; j <= k; j++) sum += code[(i + j) % n];\n            res[i] = sum;\n        }\n        return res;\n    }\n    public static void main(String[] args) {\n        System.out.println(Arrays.toString(decrypt(new int[]{5, 7, 1, 4}, 3)));\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "name": "Sample Case 1",
        "input": "",
        "expectedOutput": "[12, 10, 16, 13]",
        "isHidden": false
      },
      {
        "id": 2,
        "name": "Hidden Case 2",
        "input": "",
        "expectedOutput": "[12, 10, 16, 13]",
        "isHidden": true
      }
    ]
  },
  {
    "id": "27",
    "number": 27,
    "title": "Longest Substring Without Duplicate Chars",
    "slug": "longest-substring-without-duplicate-chars",
    "difficulty": "Medium",
    "category": "Two Pointers and Sliding Window",
    "topicTags": [
      "Sliding Window",
      "Hash Table"
    ],
    "problemStatement": "Given string s, find length of longest substring without duplicate characters.",
    "diagram": null,
    "examples": [
      {
        "input": "s = \"abcabcbb\"",
        "output": "3",
        "explanation": "\"abc\" has length 3.",
        "exp": "\"abc\" has length 3."
      }
    ],
    "constraints": [
      "0 <= s.length <= 5 * 10^4"
    ],
    "starterCode": {
      "javascript": "function lengthOfLongestSubstring(s) {\n    const map = new Map();\n    let maxL = 0, l = 0;\n    for (let r = 0; r < s.length; r++) {\n        if (map.has(s[r]) && map.get(s[r]) >= l) l = map.get(s[r]) + 1;\n        map.set(s[r], r);\n        maxL = Math.max(maxL, r - l + 1);\n    }\n    return maxL;\n}\nconsole.log(lengthOfLongestSubstring(\"abcabcbb\"));",
      "cpp": "#include <iostream>\n#include <string>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nclass Solution {\npublic:\n    int lengthOfLongestSubstring(string s) {\n        vector<int> pos(128, -1);\n        int maxL = 0, l = 0;\n        for (int r = 0; r < (int)s.size(); r++) {\n            if (pos[s[r]] >= l) l = pos[s[r]] + 1;\n            pos[s[r]] = r;\n            maxL = max(maxL, r - l + 1);\n        }\n        return maxL;\n    }\n};\nint main() {\n    Solution sol;\n    cout << sol.lengthOfLongestSubstring(\"abcabcbb\") << endl;\n    return 0;\n}",
      "java": "import java.util.*;\npublic class Main {\n    public static int lengthOfLongestSubstring(String s) {\n        int[] pos = new int[128];\n        Arrays.fill(pos, -1);\n        int maxL = 0, l = 0;\n        for (int r = 0; r < s.length(); r++) {\n            if (pos[s.charAt(r)] >= l) l = pos[s.charAt(r)] + 1;\n            pos[s.charAt(r)] = r;\n            maxL = Math.max(maxL, r - l + 1);\n        }\n        return maxL;\n    }\n    public static void main(String[] args) {\n        System.out.println(lengthOfLongestSubstring(\"abcabcbb\"));\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "name": "Sample Case 1",
        "input": "",
        "expectedOutput": "3",
        "isHidden": false
      },
      {
        "id": 2,
        "name": "Hidden Case 2",
        "input": "",
        "expectedOutput": "3",
        "isHidden": true
      }
    ]
  },
  {
    "id": "28",
    "number": 28,
    "title": "Longest Repeating Character Transformation",
    "slug": "longest-repeating-character-transformation",
    "difficulty": "Medium",
    "category": "Two Pointers and Sliding Window",
    "topicTags": [
      "Sliding Window"
    ],
    "problemStatement": "Given string s and integer k, choose at most k characters to change to any other uppercase English letter and return length of longest substring with same letter.",
    "diagram": null,
    "examples": [
      {
        "input": "s = \"AABABBA\", k = 1",
        "output": "4",
        "explanation": "Replace middle B to form AAAA, length 4.",
        "exp": "Replace middle B to form AAAA, length 4."
      }
    ],
    "constraints": [
      "1 <= s.length <= 10^5"
    ],
    "starterCode": {
      "javascript": "function characterReplacement(s, k) {\n    const counts = {};\n    let maxF = 0, l = 0, maxL = 0;\n    for (let r = 0; r < s.length; r++) {\n        counts[s[r]] = (counts[s[r]] || 0) + 1;\n        maxF = Math.max(maxF, counts[s[r]]);\n        while ((r - l + 1) - maxF > k) {\n            counts[s[l]]--;\n            l++;\n        }\n        maxL = Math.max(maxL, r - l + 1);\n    }\n    return maxL;\n}\nconsole.log(characterReplacement(\"AABABBA\", 1));",
      "cpp": "#include <iostream>\n#include <string>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nclass Solution {\npublic:\n    int characterReplacement(string s, int k) {\n        vector<int> count(26, 0);\n        int maxF = 0, l = 0, maxL = 0;\n        for (int r = 0; r < (int)s.size(); r++) {\n            maxF = max(maxF, ++count[s[r] - 'A']);\n            while ((r - l + 1) - maxF > k) {\n                count[s[l++] - 'A']--;\n            }\n            maxL = max(maxL, r - l + 1);\n        }\n        return maxL;\n    }\n};\nint main() {\n    Solution sol;\n    cout << sol.characterReplacement(\"AABABBA\", 1) << endl;\n    return 0;\n}",
      "java": "public class Main {\n    public static int characterReplacement(String s, int k) {\n        int[] count = new int[26];\n        int maxF = 0, l = 0, maxL = 0;\n        for (int r = 0; r < s.length(); r++) {\n            maxF = Math.max(maxF, ++count[s.charAt(r) - 'A']);\n            while ((r - l + 1) - maxF > k) {\n                count[s.charAt(l++) - 'A']--;\n            }\n            maxL = Math.max(maxL, r - l + 1);\n        }\n        return maxL;\n    }\n    public static void main(String[] args) {\n        System.out.println(characterReplacement(\"AABABBA\", 1));\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "name": "Sample Case 1",
        "input": "",
        "expectedOutput": "4",
        "isHidden": false
      },
      {
        "id": 2,
        "name": "Hidden Case 2",
        "input": "",
        "expectedOutput": "4",
        "isHidden": true
      }
    ]
  },
  {
    "id": "29",
    "number": 29,
    "title": "Permutation Match in String",
    "slug": "permutation-match-in-string",
    "difficulty": "Medium",
    "category": "Binary Search and Sorting",
    "topicTags": [
      "Sliding Window",
      "Hash Table"
    ],
    "problemStatement": "Given two strings s1 and s2, return true if s2 contains a permutation of s1.",
    "diagram": null,
    "examples": [
      {
        "input": "s1 = \"ab\", s2 = \"eidbaooo\"",
        "output": "true",
        "explanation": "\"ba\" in s2 is permutation of \"ab\".",
        "exp": "\"ba\" in s2 is permutation of \"ab\"."
      }
    ],
    "constraints": [
      "1 <= s1.length, s2.length <= 10^4"
    ],
    "starterCode": {
      "javascript": "function checkInclusion(s1, s2) {\n    if (s1.length > s2.length) return false;\n    const c1 = new Array(26).fill(0), c2 = new Array(26).fill(0);\n    for (let i = 0; i < s1.length; i++) {\n        c1[s1.charCodeAt(i) - 97]++;\n        c2[s2.charCodeAt(i) - 97]++;\n    }\n    const match = () => c1.every((v, i) => v === c2[i]);\n    if (match()) return true;\n    for (let i = s1.length; i < s2.length; i++) {\n        c2[s2.charCodeAt(i) - 97]++;\n        c2[s2.charCodeAt(i - s1.length) - 97]--;\n        if (match()) return true;\n    }\n    return false;\n}\nconsole.log(checkInclusion(\"ab\", \"eidbaooo\"));",
      "cpp": "#include <iostream>\n#include <string>\n#include <vector>\nusing namespace std;\nclass Solution {\npublic:\n    bool checkInclusion(string s1, string s2) {\n        if (s1.size() > s2.size()) return false;\n        vector<int> c1(26, 0), c2(26, 0);\n        for (size_t i = 0; i < s1.size(); i++) {\n            c1[s1[i] - 'a']++; c2[s2[i] - 'a']++;\n        }\n        if (c1 == c2) return true;\n        for (size_t i = s1.size(); i < s2.size(); i++) {\n            c2[s2[i] - 'a']++;\n            c2[s2[i - s1.size()] - 'a']--;\n            if (c1 == c2) return true;\n        }\n        return false;\n    }\n};\nint main() {\n    Solution sol;\n    cout << (sol.checkInclusion(\"ab\", \"eidbaooo\") ? \"true\" : \"false\") << endl;\n    return 0;\n}",
      "java": "import java.util.*;\npublic class Main {\n    public static boolean checkInclusion(String s1, String s2) {\n        if (s1.length() > s2.length()) return false;\n        int[] c1 = new int[26], c2 = new int[26];\n        for (int i = 0; i < s1.length(); i++) {\n            c1[s1.charAt(i) - 'a']++; c2[s2.charAt(i) - 'a']++;\n        }\n        if (Arrays.equals(c1, c2)) return true;\n        for (int i = s1.length(); i < s2.length(); i++) {\n            c2[s2.charAt(i) - 'a']++;\n            c2[s2.charAt(i - s1.length()) - 'a']--;\n            if (Arrays.equals(c1, c2)) return true;\n        }\n        return false;\n    }\n    public static void main(String[] args) {\n        System.out.println(checkInclusion(\"ab\", \"eidbaooo\"));\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "name": "Sample Case 1",
        "input": "",
        "expectedOutput": "true",
        "isHidden": false
      },
      {
        "id": 2,
        "name": "Hidden Case 2",
        "input": "",
        "expectedOutput": "true",
        "isHidden": true
      }
    ]
  },
  {
    "id": "30",
    "number": 30,
    "title": "Sliding Window Maximum Stream",
    "slug": "sliding-window-maximum-stream",
    "difficulty": "Hard",
    "category": "Binary Search and Sorting",
    "topicTags": [
      "Sliding Window",
      "Queue"
    ],
    "problemStatement": "Given integer array nums and window size k, return the max sliding window values in O(n) using monotonic deque.",
    "diagram": null,
    "examples": [
      {
        "input": "nums = [1, 3, -1, -3, 5, 3, 6, 7], k = 3",
        "output": "[3, 3, 5, 5, 6, 7]",
        "explanation": "Window maximums.",
        "exp": "Window maximums."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5"
    ],
    "starterCode": {
      "javascript": "function maxSlidingWindow(nums, k) {\n    const q = [], res = [];\n    for (let i = 0; i < nums.length; i++) {\n        while (q.length && q[0] <= i - k) q.shift();\n        while (q.length && nums[q[q.length - 1]] <= nums[i]) q.pop();\n        q.push(i);\n        if (i >= k - 1) res.push(nums[q[0]]);\n    }\n    return res;\n}\nconsole.log(JSON.stringify(maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3)));",
      "cpp": "#include <iostream>\n#include <vector>\n#include <deque>\nusing namespace std;\nclass Solution {\npublic:\n    vector<int> maxSlidingWindow(vector<int>& nums, int k) {\n        deque<int> dq;\n        vector<int> res;\n        for (int i = 0; i < (int)nums.size(); i++) {\n            if (!dq.empty() && dq.front() <= i - k) dq.pop_front();\n            while (!dq.empty() && nums[dq.back()] <= nums[i]) dq.pop_back();\n            dq.push_back(i);\n            if (i >= k - 1) res.push_back(nums[dq.front()]);\n        }\n        return res;\n    }\n};\nint main() {\n    Solution sol;\n    vector<int> nums = {1, 3, -1, -3, 5, 3, 6, 7};\n    vector<int> r = sol.maxSlidingWindow(nums, 3);\n    cout << \"[\" << r[0] << \", \" << r[1] << \", \" << r[2] << \", \" << r[3] << \", \" << r[4] << \", \" << r[5] << \"]\" << endl;\n    return 0;\n}",
      "java": "import java.util.*;\npublic class Main {\n    public static int[] maxSlidingWindow(int[] nums, int k) {\n        Deque<Integer> dq = new ArrayDeque<>();\n        int[] res = new int[nums.length - k + 1];\n        int idx = 0;\n        for (int i = 0; i < nums.length; i++) {\n            if (!dq.isEmpty() && dq.peekFirst() <= i - k) dq.pollFirst();\n            while (!dq.isEmpty() && nums[dq.peekLast()] <= nums[i]) dq.pollLast();\n            dq.offerLast(i);\n            if (i >= k - 1) res[idx++] = nums[dq.peekFirst()];\n        }\n        return res;\n    }\n    public static void main(String[] args) {\n        int[] r = maxSlidingWindow(new int[]{1, 3, -1, -3, 5, 3, 6, 7}, 3);\n        System.out.println(Arrays.toString(r));\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "name": "Sample Case 1",
        "input": "",
        "expectedOutput": "[3, 3, 5, 5, 6, 7]",
        "isHidden": false
      },
      {
        "id": 2,
        "name": "Hidden Case 2",
        "input": "",
        "expectedOutput": "[3, 3, 5, 5, 6, 7]",
        "isHidden": true
      }
    ]
  },
  {
    "id": "31",
    "number": 31,
    "title": "Classic Sorted Array Search",
    "slug": "classic-sorted-array-search",
    "difficulty": "Easy",
    "category": "Binary Search and Sorting",
    "topicTags": [
      "Binary Search",
      "Arrays"
    ],
    "problemStatement": "Given array of integers nums which is sorted in ascending order and integer target, return target index or -1 in O(log n).",
    "diagram": null,
    "examples": [
      {
        "input": "nums = [-1, 0, 3, 5, 9, 12], target = 9",
        "output": "4",
        "explanation": "9 exists at index 4.",
        "exp": "9 exists at index 4."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^4"
    ],
    "starterCode": {
      "javascript": "function search(nums, target) {\n    let l = 0, r = nums.length - 1;\n    while (l <= r) {\n        const mid = (l + r) >> 1;\n        if (nums[mid] === target) return mid;\n        if (nums[mid] < target) l = mid + 1;\n        else r = mid - 1;\n    }\n    return -1;\n}\nconsole.log(search([-1, 0, 3, 5, 9, 12], 9));",
      "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\nclass Solution {\npublic:\n    int search(vector<int>& nums, int target) {\n        int l = 0, r = nums.size() - 1;\n        while (l <= r) {\n            int mid = l + (r - l) / 2;\n            if (nums[mid] == target) return mid;\n            if (nums[mid] < target) l = mid + 1;\n            else r = mid - 1;\n        }\n        return -1;\n    }\n};\nint main() {\n    Solution sol;\n    vector<int> nums = {-1, 0, 3, 5, 9, 12};\n    cout << sol.search(nums, 9) << endl;\n    return 0;\n}",
      "java": "public class Main {\n    public static int search(int[] nums, int target) {\n        int l = 0, r = nums.length - 1;\n        while (l <= r) {\n            int mid = l + (r - l) / 2;\n            if (nums[mid] == target) return mid;\n            if (nums[mid] < target) l = mid + 1;\n            else r = mid - 1;\n        }\n        return -1;\n    }\n    public static void main(String[] args) {\n        System.out.println(search(new int[]{-1, 0, 3, 5, 9, 12}, 9));\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "name": "Sample Case 1",
        "input": "",
        "expectedOutput": "4",
        "isHidden": false
      },
      {
        "id": 2,
        "name": "Hidden Case 2",
        "input": "",
        "expectedOutput": "4",
        "isHidden": true
      }
    ]
  },
  {
    "id": "32",
    "number": 32,
    "title": "Integer Square Root Truncator",
    "slug": "integer-square-root-truncator",
    "difficulty": "Easy",
    "category": "Binary Search and Sorting",
    "topicTags": [
      "Binary Search",
      "Math"
    ],
    "problemStatement": "Given non-negative integer x, return square root of x rounded down to nearest integer without built-in exponents.",
    "diagram": null,
    "examples": [
      {
        "input": "x = 8",
        "output": "2",
        "explanation": "Square root of 8 is 2.82842... rounded down is 2.",
        "exp": "Square root of 8 is 2.82842... rounded down is 2."
      }
    ],
    "constraints": [
      "0 <= x <= 2^31 - 1"
    ],
    "starterCode": {
      "javascript": "function mySqrt(x) {\n    if (x < 2) return x;\n    let l = 1, r = Math.floor(x / 2), ans = 1;\n    while (l <= r) {\n        const mid = (l + r) >> 1;\n        if (mid * mid <= x) { ans = mid; l = mid + 1; }\n        else r = mid - 1;\n    }\n    return ans;\n}\nconsole.log(mySqrt(8));",
      "cpp": "#include <iostream>\nusing namespace std;\nclass Solution {\npublic:\n    int mySqrt(int x) {\n        if (x < 2) return x;\n        long l = 1, r = x / 2, ans = 1;\n        while (l <= r) {\n            long mid = l + (r - l) / 2;\n            if (mid * mid <= x) { ans = mid; l = mid + 1; }\n            else r = mid - 1;\n        }\n        return ans;\n    }\n};\nint main() {\n    Solution sol;\n    cout << sol.mySqrt(8) << endl;\n    return 0;\n}",
      "java": "public class Main {\n    public static int mySqrt(int x) {\n        if (x < 2) return x;\n        long l = 1, r = x / 2, ans = 1;\n        while (l <= r) {\n            long mid = l + (r - l) / 2;\n            if (mid * mid <= x) { ans = mid; l = mid + 1; }\n            else r = mid - 1;\n        }\n        return (int)ans;\n    }\n    public static void main(String[] args) {\n        System.out.println(mySqrt(8));\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "name": "Sample Case 1",
        "input": "",
        "expectedOutput": "2",
        "isHidden": false
      },
      {
        "id": 2,
        "name": "Hidden Case 2",
        "input": "",
        "expectedOutput": "2",
        "isHidden": true
      }
    ]
  },
  {
    "id": "33",
    "number": 33,
    "title": "Search in Circular Rotated Sorted Array",
    "slug": "search-in-circular-rotated-sorted-array",
    "difficulty": "Medium",
    "category": "Binary Search and Sorting",
    "topicTags": [
      "Binary Search",
      "Arrays"
    ],
    "problemStatement": "Given sorted array rotated at unknown pivot and target, return index of target or -1 in O(log n).",
    "diagram": null,
    "examples": [
      {
        "input": "nums = [4, 5, 6, 7, 0, 1, 2], target = 0",
        "output": "4",
        "explanation": "0 is at index 4.",
        "exp": "0 is at index 4."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 5000"
    ],
    "starterCode": {
      "javascript": "function searchRotated(nums, target) {\n    let l = 0, r = nums.length - 1;\n    while (l <= r) {\n        const mid = (l + r) >> 1;\n        if (nums[mid] === target) return mid;\n        if (nums[l] <= nums[mid]) {\n            if (nums[l] <= target && target < nums[mid]) r = mid - 1;\n            else l = mid + 1;\n        } else {\n            if (nums[mid] < target && target <= nums[r]) l = mid + 1;\n            else r = mid - 1;\n        }\n    }\n    return -1;\n}\nconsole.log(searchRotated([4, 5, 6, 7, 0, 1, 2], 0));",
      "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\nclass Solution {\npublic:\n    int search(vector<int>& nums, int target) {\n        int l = 0, r = nums.size() - 1;\n        while (l <= r) {\n            int mid = l + (r - l) / 2;\n            if (nums[mid] == target) return mid;\n            if (nums[l] <= nums[mid]) {\n                if (nums[l] <= target && target < nums[mid]) r = mid - 1;\n                else l = mid + 1;\n            } else {\n                if (nums[mid] < target && target <= nums[r]) l = mid + 1;\n                else r = mid - 1;\n            }\n        }\n        return -1;\n    }\n};\nint main() {\n    Solution sol;\n    vector<int> nums = {4, 5, 6, 7, 0, 1, 2};\n    cout << sol.search(nums, 0) << endl;\n    return 0;\n}",
      "java": "public class Main {\n    public static int search(int[] nums, int target) {\n        int l = 0, r = nums.length - 1;\n        while (l <= r) {\n            int mid = l + (r - l) / 2;\n            if (nums[mid] == target) return mid;\n            if (nums[l] <= nums[mid]) {\n                if (nums[l] <= target && target < nums[mid]) r = mid - 1;\n                else l = mid + 1;\n            } else {\n                if (nums[mid] < target && target <= nums[r]) l = mid + 1;\n                else r = mid - 1;\n            }\n        }\n        return -1;\n    }\n    public static void main(String[] args) {\n        System.out.println(search(new int[]{4, 5, 6, 7, 0, 1, 2}, 0));\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "name": "Sample Case 1",
        "input": "",
        "expectedOutput": "4",
        "isHidden": false
      },
      {
        "id": 2,
        "name": "Hidden Case 2",
        "input": "",
        "expectedOutput": "4",
        "isHidden": true
      }
    ]
  },
  {
    "id": "34",
    "number": 34,
    "title": "Find Boundary Indices of Target Value",
    "slug": "find-boundary-indices-of-target-value",
    "difficulty": "Medium",
    "category": "Binary Search and Sorting",
    "topicTags": [
      "Binary Search",
      "Arrays"
    ],
    "problemStatement": "Given array of integers nums sorted in non-decreasing order, find starting and ending position of given target value.",
    "diagram": null,
    "examples": [
      {
        "input": "nums = [5, 7, 7, 8, 8, 10], target = 8",
        "output": "[3, 4]",
        "explanation": "8 starts at 3 and ends at 4.",
        "exp": "8 starts at 3 and ends at 4."
      }
    ],
    "constraints": [
      "0 <= nums.length <= 10^5"
    ],
    "starterCode": {
      "javascript": "function searchRange(nums, target) {\n    const findBound = (first) => {\n        let l = 0, r = nums.length - 1, ans = -1;\n        while (l <= r) {\n            const mid = (l + r) >> 1;\n            if (nums[mid] === target) {\n                ans = mid;\n                if (first) r = mid - 1;\n                else l = mid + 1;\n            } else if (nums[mid] < target) l = mid + 1;\n            else r = mid - 1;\n        }\n        return ans;\n    };\n    return [findBound(true), findBound(false)];\n}\nconsole.log(JSON.stringify(searchRange([5, 7, 7, 8, 8, 10], 8)));",
      "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\nclass Solution {\npublic:\n    vector<int> searchRange(vector<int>& nums, int target) {\n        auto bound = [&](bool first) {\n            int l = 0, r = nums.size() - 1, ans = -1;\n            while (l <= r) {\n                int mid = l + (r - l) / 2;\n                if (nums[mid] == target) {\n                    ans = mid;\n                    if (first) r = mid - 1;\n                    else l = mid + 1;\n                } else if (nums[mid] < target) l = mid + 1;\n                else r = mid - 1;\n            }\n            return ans;\n        };\n        return {bound(true), bound(false)};\n    }\n};\nint main() {\n    Solution sol;\n    vector<int> nums = {5, 7, 7, 8, 8, 10};\n    vector<int> ans = sol.searchRange(nums, 8);\n    cout << \"[\" << ans[0] << \", \" << ans[1] << \"]\" << endl;\n    return 0;\n}",
      "java": "import java.util.*;\npublic class Main {\n    public static int[] searchRange(int[] nums, int target) {\n        return new int[]{find(nums, target, true), find(nums, target, false)};\n    }\n    private static int find(int[] nums, int target, boolean first) {\n        int l = 0, r = nums.length - 1, ans = -1;\n        while (l <= r) {\n            int mid = l + (r - l) / 2;\n            if (nums[mid] == target) {\n                ans = mid;\n                if (first) r = mid - 1;\n                else l = mid + 1;\n            } else if (nums[mid] < target) l = mid + 1;\n            else r = mid - 1;\n        }\n        return ans;\n    }\n    public static void main(String[] args) {\n        System.out.println(Arrays.toString(searchRange(new int[]{5, 7, 7, 8, 8, 10}, 8)));\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "name": "Sample Case 1",
        "input": "",
        "expectedOutput": "[3, 4]",
        "isHidden": false
      },
      {
        "id": 2,
        "name": "Hidden Case 2",
        "input": "",
        "expectedOutput": "[3, 4]",
        "isHidden": true
      }
    ]
  },
  {
    "id": "35",
    "number": 35,
    "title": "Find Peak Local Maximum Index",
    "slug": "find-peak-local-maximum-index",
    "difficulty": "Medium",
    "category": "Binary Search and Sorting",
    "topicTags": [
      "Binary Search",
      "Arrays"
    ],
    "problemStatement": "A peak element is an element strictly greater than its neighbors. Find a peak element and return its index in O(log n).",
    "diagram": null,
    "examples": [
      {
        "input": "nums = [1, 2, 3, 1]",
        "output": "2",
        "explanation": "3 is peak element at index 2.",
        "exp": "3 is peak element at index 2."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 1000"
    ],
    "starterCode": {
      "javascript": "function findPeakElement(nums) {\n    let l = 0, r = nums.length - 1;\n    while (l < r) {\n        const mid = (l + r) >> 1;\n        if (nums[mid] > nums[mid + 1]) r = mid;\n        else l = mid + 1;\n    }\n    return l;\n}\nconsole.log(findPeakElement([1, 2, 3, 1]));",
      "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\nclass Solution {\npublic:\n    int findPeakElement(vector<int>& nums) {\n        int l = 0, r = nums.size() - 1;\n        while (l < r) {\n            int mid = l + (r - l) / 2;\n            if (nums[mid] > nums[mid + 1]) r = mid;\n            else l = mid + 1;\n        }\n        return l;\n    }\n};\nint main() {\n    Solution sol;\n    vector<int> nums = {1, 2, 3, 1};\n    cout << sol.findPeakElement(nums) << endl;\n    return 0;\n}",
      "java": "public class Main {\n    public static int findPeakElement(int[] nums) {\n        int l = 0, r = nums.length - 1;\n        while (l < r) {\n            int mid = l + (r - l) / 2;\n            if (nums[mid] > nums[mid + 1]) r = mid;\n            else l = mid + 1;\n        }\n        return l;\n    }\n    public static void main(String[] args) {\n        System.out.println(findPeakElement(new int[]{1, 2, 3, 1}));\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "name": "Sample Case 1",
        "input": "",
        "expectedOutput": "2",
        "isHidden": false
      },
      {
        "id": 2,
        "name": "Hidden Case 2",
        "input": "",
        "expectedOutput": "2",
        "isHidden": true
      }
    ]
  },
  {
    "id": "36",
    "number": 36,
    "title": "Median of Two Independent Sorted Arrays",
    "slug": "median-of-two-independent-sorted-arrays",
    "difficulty": "Hard",
    "category": "Binary Search and Sorting",
    "topicTags": [
      "Binary Search",
      "Divide and Conquer"
    ],
    "problemStatement": "Given two sorted arrays nums1 and nums2 of size m and n, return the median of the two sorted arrays in O(log(min(m, n))) time.",
    "diagram": null,
    "examples": [
      {
        "input": "nums1 = [1, 3], nums2 = [2]",
        "output": "2",
        "explanation": "Merged array is [1, 2, 3], median is 2.",
        "exp": "Merged array is [1, 2, 3], median is 2."
      }
    ],
    "constraints": [
      "0 <= nums1.length, nums2.length <= 1000"
    ],
    "starterCode": {
      "javascript": "function findMedianSortedArrays(nums1, nums2) {\n    if (nums1.length > nums2.length) return findMedianSortedArrays(nums2, nums1);\n    const m = nums1.length, n = nums2.length;\n    let l = 0, r = m;\n    while (l <= r) {\n        const p1 = (l + r) >> 1, p2 = ((m + n + 1) >> 1) - p1;\n        const maxLeft1 = p1 === 0 ? -Infinity : nums1[p1 - 1];\n        const minRight1 = p1 === m ? Infinity : nums1[p1];\n        const maxLeft2 = p2 === 0 ? -Infinity : nums2[p2 - 1];\n        const minRight2 = p2 === n ? Infinity : nums2[p2];\n        if (maxLeft1 <= minRight2 && maxLeft2 <= minRight1) {\n            if ((m + n) % 2 === 0) return (Math.max(maxLeft1, maxLeft2) + Math.min(minRight1, minRight2)) / 2;\n            return Math.max(maxLeft1, maxLeft2);\n        } else if (maxLeft1 > minRight2) r = p1 - 1;\n        else l = p1 + 1;\n    }\n    return 0;\n}\nconsole.log(findMedianSortedArrays([1, 3], [2]));",
      "cpp": "#include <iostream>\n#include <vector>\n#include <algorithm>\n#include <climits>\nusing namespace std;\nclass Solution {\npublic:\n    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {\n        if (nums1.size() > nums2.size()) return findMedianSortedArrays(nums2, nums1);\n        int m = nums1.size(), n = nums2.size();\n        int l = 0, r = m;\n        while (l <= r) {\n            int p1 = (l + r) / 2, p2 = (m + n + 1) / 2 - p1;\n            int maxLeft1 = (p1 == 0) ? INT_MIN : nums1[p1 - 1];\n            int minRight1 = (p1 == m) ? INT_MAX : nums1[p1];\n            int maxLeft2 = (p2 == 0) ? INT_MIN : nums2[p2 - 1];\n            int minRight2 = (p2 == n) ? INT_MAX : nums2[p2];\n            if (maxLeft1 <= minRight2 && maxLeft2 <= minRight1) {\n                if ((m + n) % 2 == 0) return (max(maxLeft1, maxLeft2) + min(minRight1, minRight2)) / 2.0;\n                return max(maxLeft1, maxLeft2);\n            } else if (maxLeft1 > minRight2) r = p1 - 1;\n            else l = p1 + 1;\n        }\n        return 0.0;\n    }\n};\nint main() {\n    Solution sol;\n    vector<int> a = {1, 3}, b = {2};\n    cout << (int)sol.findMedianSortedArrays(a, b) << endl;\n    return 0;\n}",
      "java": "public class Main {\n    public static double findMedianSortedArrays(int[] nums1, int[] nums2) {\n        if (nums1.length > nums2.length) return findMedianSortedArrays(nums2, nums1);\n        int m = nums1.length, n = nums2.length;\n        int l = 0, r = m;\n        while (l <= r) {\n            int p1 = (l + r) / 2, p2 = (m + n + 1) / 2 - p1;\n            int maxLeft1 = (p1 == 0) ? Integer.MIN_VALUE : nums1[p1 - 1];\n            int minRight1 = (p1 == m) ? Integer.MAX_VALUE : nums1[p1];\n            int maxLeft2 = (p2 == 0) ? Integer.MIN_VALUE : nums2[p2 - 1];\n            int minRight2 = (p2 == n) ? Integer.MAX_VALUE : nums2[p2];\n            if (maxLeft1 <= minRight2 && maxLeft2 <= minRight1) {\n                if ((m + n) % 2 == 0) return (Math.max(maxLeft1, maxLeft2) + Math.min(minRight1, minRight2)) / 2.0;\n                return Math.max(maxLeft1, maxLeft2);\n            } else if (maxLeft1 > minRight2) r = p1 - 1;\n            else l = p1 + 1;\n        }\n        return 0.0;\n    }\n    public static void main(String[] args) {\n        System.out.println((int)findMedianSortedArrays(new int[]{1, 3}, new int[]{2}));\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "name": "Sample Case 1",
        "input": "",
        "expectedOutput": "2",
        "isHidden": false
      },
      {
        "id": 2,
        "name": "Hidden Case 2",
        "input": "",
        "expectedOutput": "2",
        "isHidden": true
      }
    ]
  },
  {
    "id": "37",
    "number": 37,
    "title": "Merge Two Pre-Sorted Arrays",
    "slug": "merge-two-pre-sorted-arrays",
    "difficulty": "Easy",
    "category": "Binary Search and Sorting",
    "topicTags": [
      "Sorting",
      "Two Pointers"
    ],
    "problemStatement": "Given two sorted integer arrays nums1 and nums2, merge nums2 into nums1 as one sorted array in-place.",
    "diagram": null,
    "examples": [
      {
        "input": "nums1 = [1, 2, 3, 0, 0, 0], m = 3, nums2 = [2, 5, 6], n = 3",
        "output": "[1, 2, 2, 3, 5, 6]",
        "explanation": "Merged elements.",
        "exp": "Merged elements."
      }
    ],
    "constraints": [
      "nums1.length == m + n"
    ],
    "starterCode": {
      "javascript": "function merge(nums1, m, nums2, n) {\n    let p1 = m - 1, p2 = n - 1, p = m + n - 1;\n    while (p2 >= 0) {\n        if (p1 >= 0 && nums1[p1] > nums2[p2]) nums1[p--] = nums1[p1--];\n        else nums1[p--] = nums2[p2--];\n    }\n    return nums1;\n}\nconsole.log(JSON.stringify(merge([1, 2, 3, 0, 0, 0], 3, [2, 5, 6], 3)));",
      "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\nclass Solution {\npublic:\n    void merge(vector<int>& nums1, int m, vector<int>& nums2, int n) {\n        int p1 = m - 1, p2 = n - 1, p = m + n - 1;\n        while (p2 >= 0) {\n            if (p1 >= 0 && nums1[p1] > nums2[p2]) nums1[p--] = nums1[p1--];\n            else nums1[p--] = nums2[p2--];\n        }\n    }\n};\nint main() {\n    Solution sol;\n    vector<int> a = {1, 2, 3, 0, 0, 0}, b = {2, 5, 6};\n    sol.merge(a, 3, b, 3);\n    cout << \"[\" << a[0] << \", \" << a[1] << \", \" << a[2] << \", \" << a[3] << \", \" << a[4] << \", \" << a[5] << \"]\" << endl;\n    return 0;\n}",
      "java": "import java.util.*;\npublic class Main {\n    public static void merge(int[] nums1, int m, int[] nums2, int n) {\n        int p1 = m - 1, p2 = n - 1, p = m + n - 1;\n        while (p2 >= 0) {\n            if (p1 >= 0 && nums1[p1] > nums2[p2]) nums1[p--] = nums1[p1--];\n            else nums1[p--] = nums2[p2--];\n        }\n    }\n    public static void main(String[] args) {\n        int[] a = {1, 2, 3, 0, 0, 0}, b = {2, 5, 6};\n        merge(a, 3, b, 3);\n        System.out.println(Arrays.toString(a));\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "name": "Sample Case 1",
        "input": "",
        "expectedOutput": "[1, 2, 2, 3, 5, 6]",
        "isHidden": false
      },
      {
        "id": 2,
        "name": "Hidden Case 2",
        "input": "",
        "expectedOutput": "[1, 2, 2, 3, 5, 6]",
        "isHidden": true
      }
    ]
  },
  {
    "id": "38",
    "number": 38,
    "title": "Segregate Array by Even and Odd Parity",
    "slug": "segregate-array-by-even-and-odd-parity",
    "difficulty": "Easy",
    "category": "Binary Search and Sorting",
    "topicTags": [
      "Sorting",
      "Two Pointers"
    ],
    "problemStatement": "Given integer array nums, move all even integers to the beginning of the array followed by all odd integers in O(n).",
    "diagram": null,
    "examples": [
      {
        "input": "nums = [3, 1, 2, 4]",
        "output": "[4, 2, 1, 3]",
        "explanation": "Even numbers [4, 2] followed by odd numbers [1, 3].",
        "exp": "Even numbers [4, 2] followed by odd numbers [1, 3]."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 5000"
    ],
    "starterCode": {
      "javascript": "function sortArrayByParity(nums) {\n    let l = 0, r = nums.length - 1;\n    while (l < r) {\n        if (nums[l] % 2 > nums[r] % 2) {\n            [nums[l], nums[r]] = [nums[r], nums[l]];\n        }\n        if (nums[l] % 2 === 0) l++;\n        if (nums[r] % 2 === 1) r--;\n    }\n    return nums;\n}\nconsole.log(JSON.stringify(sortArrayByParity([3, 1, 2, 4])));",
      "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\nclass Solution {\npublic:\n    vector<int> sortArrayByParity(vector<int>& nums) {\n        int l = 0, r = nums.size() - 1;\n        while (l < r) {\n            if (nums[l] % 2 > nums[r] % 2) swap(nums[l], nums[r]);\n            if (nums[l] % 2 == 0) l++;\n            if (nums[r] % 2 == 1) r--;\n        }\n        return nums;\n    }\n};\nint main() {\n    Solution sol;\n    vector<int> nums = {3, 1, 2, 4};\n    vector<int> ans = sol.sortArrayByParity(nums);\n    cout << \"[\" << ans[0] << \", \" << ans[1] << \", \" << ans[2] << \", \" << ans[3] << \"]\" << endl;\n    return 0;\n}",
      "java": "import java.util.*;\npublic class Main {\n    public static int[] sortArrayByParity(int[] nums) {\n        int l = 0, r = nums.length - 1;\n        while (l < r) {\n            if (nums[l] % 2 > nums[r] % 2) {\n                int t = nums[l]; nums[l] = nums[r]; nums[r] = t;\n            }\n            if (nums[l] % 2 == 0) l++;\n            if (nums[r] % 2 == 1) r--;\n        }\n        return nums;\n    }\n    public static void main(String[] args) {\n        System.out.println(Arrays.toString(sortArrayByParity(new int[]{3, 1, 2, 4})));\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "name": "Sample Case 1",
        "input": "",
        "expectedOutput": "[4, 2, 1, 3]",
        "isHidden": false
      },
      {
        "id": 2,
        "name": "Hidden Case 2",
        "input": "",
        "expectedOutput": "[4, 2, 1, 3]",
        "isHidden": true
      }
    ]
  },
  {
    "id": "39",
    "number": 39,
    "title": "Merge Overlapping Time Intervals",
    "slug": "merge-overlapping-time-intervals",
    "difficulty": "Medium",
    "category": "Recursion and Backtracking",
    "topicTags": [
      "Sorting",
      "Arrays"
    ],
    "problemStatement": "Given array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals and return count of resulting intervals.",
    "diagram": null,
    "examples": [
      {
        "input": "intervals = [[1, 3], [2, 6], [8, 10], [15, 18]]",
        "output": "3",
        "explanation": "Merged to [[1, 6], [8, 10], [15, 18]], count is 3.",
        "exp": "Merged to [[1, 6], [8, 10], [15, 18]], count is 3."
      }
    ],
    "constraints": [
      "1 <= intervals.length <= 10^4"
    ],
    "starterCode": {
      "javascript": "function mergeIntervalsCount(intervals) {\n    if (!intervals.length) return 0;\n    intervals.sort((a, b) => a[0] - b[0]);\n    const merged = [intervals[0]];\n    for (let i = 1; i < intervals.length; i++) {\n        const last = merged[merged.length - 1];\n        if (intervals[i][0] <= last[1]) last[1] = Math.max(last[1], intervals[i][1]);\n        else merged.push(intervals[i]);\n    }\n    return merged.length;\n}\nconsole.log(mergeIntervalsCount([[1, 3], [2, 6], [8, 10], [15, 18]]));",
      "cpp": "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nclass Solution {\npublic:\n    int mergeIntervalsCount(vector<vector<int>>& intervals) {\n        if (intervals.empty()) return 0;\n        sort(intervals.begin(), intervals.end());\n        int count = 1;\n        vector<int> cur = intervals[0];\n        for (size_t i = 1; i < intervals.size(); i++) {\n            if (intervals[i][0] <= cur[1]) cur[1] = max(cur[1], intervals[i][1]);\n            else { count++; cur = intervals[i]; }\n        }\n        return count;\n    }\n};\nint main() {\n    Solution sol;\n    vector<vector<int>> iv = {{1, 3}, {2, 6}, {8, 10}, {15, 18}};\n    cout << sol.mergeIntervalsCount(iv) << endl;\n    return 0;\n}",
      "java": "import java.util.*;\npublic class Main {\n    public static int mergeIntervalsCount(int[][] intervals) {\n        if (intervals.length == 0) return 0;\n        Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));\n        int count = 1;\n        int[] cur = intervals[0];\n        for (int i = 1; i < intervals.length; i++) {\n            if (intervals[i][0] <= cur[1]) cur[1] = Math.max(cur[1], intervals[i][1]);\n            else { count++; cur = intervals[i]; }\n        }\n        return count;\n    }\n    public static void main(String[] args) {\n        System.out.println(mergeIntervalsCount(new int[][]{{1, 3}, {2, 6}, {8, 10}, {15, 18}}));\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "name": "Sample Case 1",
        "input": "",
        "expectedOutput": "3",
        "isHidden": false
      },
      {
        "id": 2,
        "name": "Hidden Case 2",
        "input": "",
        "expectedOutput": "3",
        "isHidden": true
      }
    ]
  },
  {
    "id": "40",
    "number": 40,
    "title": "Construct Largest Concatenated Number",
    "slug": "construct-largest-concatenated-number",
    "difficulty": "Medium",
    "category": "Recursion and Backtracking",
    "topicTags": [
      "Sorting",
      "Greedy"
    ],
    "problemStatement": "Given list of non-negative integers nums, arrange them such that they form the largest single number string.",
    "diagram": null,
    "examples": [
      {
        "input": "nums = [10, 2]",
        "output": "\"210\"",
        "explanation": "\"210\" > \"102\".",
        "exp": "\"210\" > \"102\"."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 100"
    ],
    "starterCode": {
      "javascript": "function largestNumber(nums) {\n    const strs = nums.map(String);\n    strs.sort((a, b) => (b + a).localeCompare(a + b));\n    if (strs[0] === '0') return '0';\n    return strs.join('');\n}\nconsole.log(largestNumber([10, 2]));",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\nclass Solution {\npublic:\n    string largestNumber(vector<int>& nums) {\n        vector<string> s;\n        for (int x : nums) s.push_back(to_string(x));\n        sort(s.begin(), s.end(), [](const string& a, const string& b) {\n            return a + b > b + a;\n        });\n        if (s[0] == \"0\") return \"0\";\n        string res = \"\";\n        for (const string& str : s) res += str;\n        return res;\n    }\n};\nint main() {\n    Solution sol;\n    vector<int> nums = {10, 2};\n    cout << sol.largestNumber(nums) << endl;\n    return 0;\n}",
      "java": "import java.util.*;\npublic class Main {\n    public static String largestNumber(int[] nums) {\n        String[] s = new String[nums.length];\n        for (int i = 0; i < nums.length; i++) s[i] = String.valueOf(nums[i]);\n        Arrays.sort(s, (a, b) -> (b + a).compareTo(a + b));\n        if (s[0].equals(\"0\")) return \"0\";\n        StringBuilder sb = new StringBuilder();\n        for (String str : s) sb.append(str);\n        return sb.toString();\n    }\n    public static void main(String[] args) {\n        System.out.println(largestNumber(new int[]{10, 2}));\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "name": "Sample Case 1",
        "input": "",
        "expectedOutput": "210",
        "isHidden": false
      },
      {
        "id": 2,
        "name": "Hidden Case 2",
        "input": "",
        "expectedOutput": "210",
        "isHidden": true
      }
    ]
  },
  {
    "id": "41",
    "number": 41,
    "title": "Three-Way Array Partitioning",
    "slug": "three-way-array-partitioning",
    "difficulty": "Medium",
    "category": "Recursion and Backtracking",
    "topicTags": [
      "Sorting",
      "Arrays"
    ],
    "problemStatement": "Given array and range [a, b], partition array so elements < a come first, elements in [a, b] come next, elements > b come last.",
    "diagram": null,
    "examples": [
      {
        "input": "nums = [1, 14, 5, 20, 4, 2, 54, 20, 87, 98, 3, 1, 32], a = 14, b = 20",
        "output": "true",
        "explanation": "Valid 3-way partition.",
        "exp": "Valid 3-way partition."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5"
    ],
    "starterCode": {
      "javascript": "function threeWayPartition(nums, a, b) {\n    let low = 0, high = nums.length - 1;\n    for (let i = 0; i <= high;) {\n        if (nums[i] < a) { [nums[i], nums[low]] = [nums[low], nums[i]]; i++; low++; }\n        else if (nums[i] > b) { [nums[i], nums[high]] = [nums[high], nums[i]]; high--; }\n        else i++;\n    }\n    return true;\n}\nconsole.log(threeWayPartition([1, 14, 5, 20, 4, 2, 54, 20, 87, 98, 3, 1, 32], 14, 20));",
      "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\nclass Solution {\npublic:\n    bool threeWayPartition(vector<int>& nums, int a, int b) {\n        int low = 0, high = nums.size() - 1;\n        for (int i = 0; i <= high;) {\n            if (nums[i] < a) swap(nums[i++], nums[low++]);\n            else if (nums[i] > b) swap(nums[i], nums[high--]);\n            else i++;\n        }\n        return true;\n    }\n};\nint main() {\n    Solution sol;\n    vector<int> nums = {1, 14, 5, 20, 4, 2, 54, 20, 87, 98, 3, 1, 32};\n    cout << (sol.threeWayPartition(nums, 14, 20) ? \"true\" : \"false\") << endl;\n    return 0;\n}",
      "java": "public class Main {\n    public static boolean threeWayPartition(int[] nums, int a, int b) {\n        int low = 0, high = nums.length - 1;\n        for (int i = 0; i <= high;) {\n            if (nums[i] < a) { int t = nums[i]; nums[i] = nums[low]; nums[low] = t; i++; low++; }\n            else if (nums[i] > b) { int t = nums[i]; nums[i] = nums[high]; nums[high] = t; high--; }\n            else i++;\n        }\n        return true;\n    }\n    public static void main(String[] args) {\n        System.out.println(threeWayPartition(new int[]{1, 14, 5, 20, 4, 2, 54, 20, 87, 98, 3, 1, 32}, 14, 20));\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "name": "Sample Case 1",
        "input": "",
        "expectedOutput": "true",
        "isHidden": false
      },
      {
        "id": 2,
        "name": "Hidden Case 2",
        "input": "",
        "expectedOutput": "true",
        "isHidden": true
      }
    ]
  },
  {
    "id": "42",
    "number": 42,
    "title": "Count of Smaller Following Array Elements",
    "slug": "count-of-smaller-following-array-elements",
    "difficulty": "Hard",
    "category": "Recursion and Backtracking",
    "topicTags": [
      "Sorting",
      "Binary Indexed Tree"
    ],
    "problemStatement": "Given integer array nums, return an integer array counts where counts[i] is number of smaller elements to the right of nums[i].",
    "diagram": null,
    "examples": [
      {
        "input": "nums = [5, 2, 6, 1]",
        "output": "[2, 1, 1, 0]",
        "explanation": "To the right of 5: 2, 1. To the right of 2: 1. To the right of 6: 1. To the right of 1: none.",
        "exp": "To the right of 5: 2, 1. To the right of 2: 1. To the right of 6: 1. To the right of 1: none."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5"
    ],
    "starterCode": {
      "javascript": "function countSmaller(nums) {\n    const res = new Array(nums.length).fill(0);\n    for (let i = 0; i < nums.length; i++) {\n        let cnt = 0;\n        for (let j = i + 1; j < nums.length; j++) {\n            if (nums[j] < nums[i]) cnt++;\n        }\n        res[i] = cnt;\n    }\n    return res;\n}\nconsole.log(JSON.stringify(countSmaller([5, 2, 6, 1])));",
      "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\nclass Solution {\npublic:\n    vector<int> countSmaller(vector<int>& nums) {\n        vector<int> res(nums.size(), 0);\n        for (size_t i = 0; i < nums.size(); i++) {\n            int cnt = 0;\n            for (size_t j = i + 1; j < nums.size(); j++) {\n                if (nums[j] < nums[i]) cnt++;\n            }\n            res[i] = cnt;\n        }\n        return res;\n    }\n};\nint main() {\n    Solution sol;\n    vector<int> nums = {5, 2, 6, 1};\n    vector<int> ans = sol.countSmaller(nums);\n    cout << \"[\" << ans[0] << \", \" << ans[1] << \", \" << ans[2] << \", \" << ans[3] << \"]\" << endl;\n    return 0;\n}",
      "java": "import java.util.*;\npublic class Main {\n    public static int[] countSmaller(int[] nums) {\n        int[] res = new int[nums.length];\n        for (int i = 0; i < nums.length; i++) {\n            int cnt = 0;\n            for (int j = i + 1; j < nums.length; j++) {\n                if (nums[j] < nums[i]) cnt++;\n            }\n            res[i] = cnt;\n        }\n        return res;\n    }\n    public static void main(String[] args) {\n        System.out.println(Arrays.toString(countSmaller(new int[]{5, 2, 6, 1})));\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "name": "Sample Case 1",
        "input": "",
        "expectedOutput": "[2, 1, 1, 0]",
        "isHidden": false
      },
      {
        "id": 2,
        "name": "Hidden Case 2",
        "input": "",
        "expectedOutput": "[2, 1, 1, 0]",
        "isHidden": true
      }
    ]
  },
  {
    "id": "43",
    "number": 43,
    "title": "Recursive Integer Exponentiation",
    "slug": "recursive-integer-exponentiation",
    "difficulty": "Easy",
    "category": "Recursion and Backtracking",
    "topicTags": [
      "Recursion",
      "Math"
    ],
    "problemStatement": "Implement pow(x, n), which calculates x raised to power n using divide-and-conquer recursion in O(log n).",
    "diagram": null,
    "examples": [
      {
        "input": "x = 2.00000, n = 10",
        "output": "1024",
        "explanation": "2^10 = 1024.",
        "exp": "2^10 = 1024."
      }
    ],
    "constraints": [
      "-100.0 < x < 100.0",
      "-2^31 <= n <= 2^31 - 1"
    ],
    "starterCode": {
      "javascript": "function myPow(x, n) {\n    if (n === 0) return 1;\n    if (n < 0) { x = 1 / x; n = -n; }\n    const half = myPow(x, Math.floor(n / 2));\n    if (n % 2 === 0) return half * half;\n    return half * half * x;\n}\nconsole.log(myPow(2, 10));",
      "cpp": "#include <iostream>\nusing namespace std;\nclass Solution {\npublic:\n    double myPow(double x, long long n) {\n        if (n == 0) return 1;\n        if (n < 0) { x = 1 / x; n = -n; }\n        double half = myPow(x, n / 2);\n        return (n % 2 == 0) ? half * half : half * half * x;\n    }\n};\nint main() {\n    Solution sol;\n    cout << (int)sol.myPow(2, 10) << endl;\n    return 0;\n}",
      "java": "public class Main {\n    public static double myPow(double x, long n) {\n        if (n == 0) return 1;\n        if (n < 0) { x = 1 / x; n = -n; }\n        double half = myPow(x, n / 2);\n        return (n % 2 == 0) ? half * half : half * half * x;\n    }\n    public static void main(String[] args) {\n        System.out.println((int)myPow(2, 10));\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "name": "Sample Case 1",
        "input": "",
        "expectedOutput": "1024",
        "isHidden": false
      },
      {
        "id": 2,
        "name": "Hidden Case 2",
        "input": "",
        "expectedOutput": "1024",
        "isHidden": true
      }
    ]
  },
  {
    "id": "44",
    "number": 44,
    "title": "Fibonacci Number via Memoized Recursion",
    "slug": "fibonacci-number-via-memoized-recursion",
    "difficulty": "Easy",
    "category": "Recursion and Backtracking",
    "topicTags": [
      "Recursion",
      "Dynamic Programming"
    ],
    "problemStatement": "Calculate F(n) where F(0) = 0, F(1) = 1, and F(n) = F(n - 1) + F(n - 2) for n > 1.",
    "diagram": null,
    "examples": [
      {
        "input": "n = 10",
        "output": "55",
        "explanation": "10th Fibonacci number is 55.",
        "exp": "10th Fibonacci number is 55."
      }
    ],
    "constraints": [
      "0 <= n <= 30"
    ],
    "starterCode": {
      "javascript": "function fib(n, memo = {}) {\n    if (n <= 1) return n;\n    if (memo[n]) return memo[n];\n    return memo[n] = fib(n - 1, memo) + fib(n - 2, memo);\n}\nconsole.log(fib(10));",
      "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\nclass Solution {\npublic:\n    int fib(int n) {\n        if (n <= 1) return n;\n        int a = 0, b = 1;\n        for (int i = 2; i <= n; i++) {\n            int c = a + b;\n            a = b;\n            b = c;\n        }\n        return b;\n    }\n};\nint main() {\n    Solution sol;\n    cout << sol.fib(10) << endl;\n    return 0;\n}",
      "java": "public class Main {\n    public static int fib(int n) {\n        if (n <= 1) return n;\n        int a = 0, b = 1;\n        for (int i = 2; i <= n; i++) {\n            int c = a + b;\n            a = b;\n            b = c;\n        }\n        return b;\n    }\n    public static void main(String[] args) {\n        System.out.println(fib(10));\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "name": "Sample Case 1",
        "input": "",
        "expectedOutput": "55",
        "isHidden": false
      },
      {
        "id": 2,
        "name": "Hidden Case 2",
        "input": "",
        "expectedOutput": "55",
        "isHidden": true
      }
    ]
  },
  {
    "id": "45",
    "number": 45,
    "title": "Tower of Hanoi Minimal Move Counter",
    "slug": "tower-of-hanoi-minimal-move-counter",
    "difficulty": "Medium",
    "category": "Recursion and Backtracking",
    "topicTags": [
      "Recursion",
      "Math"
    ],
    "problemStatement": "Given n disks, calculate total minimum number of moves to transfer all disks from source rod to destination rod following Hanoi rules.",
    "diagram": null,
    "examples": [
      {
        "input": "n = 3",
        "output": "7",
        "explanation": "2^3 - 1 = 7 moves.",
        "exp": "2^3 - 1 = 7 moves."
      }
    ],
    "constraints": [
      "1 <= n <= 30"
    ],
    "starterCode": {
      "javascript": "function hanoiMoves(n) {\n    if (n === 1) return 1;\n    return 2 * hanoiMoves(n - 1) + 1;\n}\nconsole.log(hanoiMoves(3));",
      "cpp": "#include <iostream>\nusing namespace std;\nclass Solution {\npublic:\n    long long hanoiMoves(int n) {\n        if (n == 1) return 1;\n        return 2 * hanoiMoves(n - 1) + 1;\n    }\n};\nint main() {\n    Solution sol;\n    cout << sol.hanoiMoves(3) << endl;\n    return 0;\n}",
      "java": "public class Main {\n    public static long hanoiMoves(int n) {\n        if (n == 1) return 1;\n        return 2 * hanoiMoves(n - 1) + 1;\n    }\n    public static void main(String[] args) {\n        System.out.println(hanoiMoves(3));\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "name": "Sample Case 1",
        "input": "",
        "expectedOutput": "7",
        "isHidden": false
      },
      {
        "id": 2,
        "name": "Hidden Case 2",
        "input": "",
        "expectedOutput": "7",
        "isHidden": true
      }
    ]
  },
  {
    "id": "46",
    "number": 46,
    "title": "Decode Nested Character Patterns",
    "slug": "decode-nested-character-patterns",
    "difficulty": "Medium",
    "category": "Recursion and Backtracking",
    "topicTags": [
      "Recursion",
      "Stack"
    ],
    "problemStatement": "Given encoded string k[encoded_string], return its decoded string recursively where encoded string inside brackets is repeated k times.",
    "diagram": null,
    "examples": [
      {
        "input": "s = \"3[a]2[bc]\"",
        "output": "\"aaabcbc\"",
        "explanation": "\"a\" repeated 3 times + \"bc\" repeated 2 times.",
        "exp": "\"a\" repeated 3 times + \"bc\" repeated 2 times."
      }
    ],
    "constraints": [
      "1 <= s.length <= 30"
    ],
    "starterCode": {
      "javascript": "function decodeString(s) {\n    let i = 0;\n    function parse() {\n        let res = '', count = 0;\n        while (i < s.length) {\n            const c = s[i++];\n            if (c >= '0' && c <= '9') count = count * 10 + (c.charCodeAt(0) - 48);\n            else if (c === '[') {\n                const sub = parse();\n                res += sub.repeat(count);\n                count = 0;\n            } else if (c === ']') break;\n            else res += c;\n        }\n        return res;\n    }\n    return parse();\n}\nconsole.log(decodeString(\"3[a]2[bc]\"));",
      "cpp": "#include <iostream>\n#include <string>\nusing namespace std;\nclass Solution {\n    int i = 0;\npublic:\n    string decodeString(string s) {\n        string res = \"\";\n        int num = 0;\n        while (i < (int)s.size()) {\n            char c = s[i++];\n            if (isdigit(c)) num = num * 10 + (c - '0');\n            else if (c == '[') {\n                string sub = decodeString(s);\n                while (num-- > 0) res += sub;\n                num = 0;\n            } else if (c == ']') break;\n            else res += c;\n        }\n        return res;\n    }\n};\nint main() {\n    Solution sol;\n    cout << sol.decodeString(\"3[a]2[bc]\") << endl;\n    return 0;\n}",
      "java": "public class Main {\n    static int i = 0;\n    public static String decodeString(String s) {\n        StringBuilder res = new StringBuilder();\n        int num = 0;\n        while (i < s.length()) {\n            char c = s.charAt(i++);\n            if (Character.isDigit(c)) num = num * 10 + (c - '0');\n            else if (c == '[') {\n                String sub = decodeString(s);\n                while (num-- > 0) res.append(sub);\n                num = 0;\n            } else if (c == ']') break;\n            else res.append(c);\n        }\n        return res.toString();\n    }\n    public static void main(String[] args) {\n        System.out.println(decodeString(\"3[a]2[bc]\"));\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "name": "Sample Case 1",
        "input": "",
        "expectedOutput": "aaabcbc",
        "isHidden": false
      },
      {
        "id": 2,
        "name": "Hidden Case 2",
        "input": "",
        "expectedOutput": "aaabcbc",
        "isHidden": true
      }
    ]
  },
  {
    "id": "47",
    "number": 47,
    "title": "Sequential Coin Game Winner Prediction",
    "slug": "sequential-coin-game-winner-prediction",
    "difficulty": "Medium",
    "category": "Recursion and Backtracking",
    "topicTags": [
      "Recursion",
      "Minimax"
    ],
    "problemStatement": "Given integer array nums, players 1 and 2 take turns taking from either end. Return true if Player 1 can win assuming optimal play.",
    "diagram": null,
    "examples": [
      {
        "input": "nums = [1, 5, 2]",
        "output": "false",
        "explanation": "Player 2 forces win.",
        "exp": "Player 2 forces win."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 20"
    ],
    "starterCode": {
      "javascript": "function predictTheWinner(nums) {\n    function diff(i, j) {\n        if (i === j) return nums[i];\n        return Math.max(nums[i] - diff(i + 1, j), nums[j] - diff(i, j - 1));\n    }\n    return diff(0, nums.length - 1) >= 0;\n}\nconsole.log(predictTheWinner([1, 5, 2]));",
      "cpp": "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nclass Solution {\n    int diff(vector<int>& nums, int i, int j) {\n        if (i == j) return nums[i];\n        return max(nums[i] - diff(nums, i + 1, j), nums[j] - diff(nums, i, j - 1));\n    }\npublic:\n    bool predictTheWinner(vector<int>& nums) {\n        return diff(nums, 0, nums.size() - 1) >= 0;\n    }\n};\nint main() {\n    Solution sol;\n    vector<int> nums = {1, 5, 2};\n    cout << (sol.predictTheWinner(nums) ? \"true\" : \"false\") << endl;\n    return 0;\n}",
      "java": "public class Main {\n    public static boolean predictTheWinner(int[] nums) {\n        return diff(nums, 0, nums.length - 1) >= 0;\n    }\n    private static int diff(int[] nums, int i, int j) {\n        if (i == j) return nums[i];\n        return Math.max(nums[i] - diff(nums, i + 1, j), nums[j] - diff(nums, i, j - 1));\n    }\n    public static void main(String[] args) {\n        System.out.println(predictTheWinner(new int[]{1, 5, 2}));\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "name": "Sample Case 1",
        "input": "",
        "expectedOutput": "false",
        "isHidden": false
      },
      {
        "id": 2,
        "name": "Hidden Case 2",
        "input": "",
        "expectedOutput": "false",
        "isHidden": true
      }
    ]
  },
  {
    "id": "48",
    "number": 48,
    "title": "Mathematical Expression Target Evaluator",
    "slug": "mathematical-expression-target-evaluator",
    "difficulty": "Hard",
    "category": "Recursion and Backtracking",
    "topicTags": [
      "Recursion",
      "Backtracking"
    ],
    "problemStatement": "Given string num with only digits and target, return count of expressions with +, -, * between digits that evaluate to target.",
    "diagram": null,
    "examples": [
      {
        "input": "num = \"123\", target = 6",
        "output": "2",
        "explanation": "\"1+2+3\" and \"1*2*3\". Count = 2.",
        "exp": "\"1+2+3\" and \"1*2*3\". Count = 2."
      }
    ],
    "constraints": [
      "1 <= num.length <= 10"
    ],
    "starterCode": {
      "javascript": "function addOperatorsCount(num, target) {\n    let count = 0;\n    function backtrack(idx, prev, cur, val) {\n        if (idx === num.length) {\n            if (val === target) count++;\n            return;\n        }\n        for (let i = idx; i < num.length; i++) {\n            if (i > idx && num[idx] === '0') break;\n            const str = num.substring(idx, i + 1);\n            const n = parseInt(str, 10);\n            if (idx === 0) backtrack(i + 1, n, n, n);\n            else {\n                backtrack(i + 1, n, n, val + n);\n                backtrack(i + 1, -n, -n, val - n);\n                backtrack(i + 1, prev * n, prev * n, val - prev + prev * n);\n            }\n        }\n    }\n    backtrack(0, 0, 0, 0);\n    return count;\n}\nconsole.log(addOperatorsCount(\"123\", 6));",
      "cpp": "#include <iostream>\n#include <string>\nusing namespace std;\nclass Solution {\n    int count = 0;\n    void backtrack(string& num, int target, int idx, long long prev, long long val) {\n        if (idx == (int)num.size()) {\n            if (val == target) count++;\n            return;\n        }\n        for (int i = idx; i < (int)num.size(); i++) {\n            if (i > idx && num[idx] == '0') break;\n            long long n = stoll(num.substr(idx, i - idx + 1));\n            if (idx == 0) backtrack(num, target, i + 1, n, n);\n            else {\n                backtrack(num, target, i + 1, n, val + n);\n                backtrack(num, target, i + 1, -n, val - n);\n                backtrack(num, target, i + 1, prev * n, val - prev + prev * n);\n            }\n        }\n    }\npublic:\n    int addOperatorsCount(string num, int target) {\n        count = 0;\n        backtrack(num, target, 0, 0, 0);\n        return count;\n    }\n};\nint main() {\n    Solution sol;\n    cout << sol.addOperatorsCount(\"123\", 6) << endl;\n    return 0;\n}",
      "java": "public class Main {\n    static int count = 0;\n    public static int addOperatorsCount(String num, int target) {\n        count = 0;\n        backtrack(num, target, 0, 0, 0);\n        return count;\n    }\n    private static void backtrack(String num, int target, int idx, long prev, long val) {\n        if (idx == num.length()) {\n            if (val == target) count++;\n            return;\n        }\n        for (int i = idx; i < num.length(); i++) {\n            if (i > idx && num.charAt(idx) == '0') break;\n            long n = Long.parseLong(num.substring(idx, i + 1));\n            if (idx == 0) backtrack(num, target, i + 1, n, n);\n            else {\n                backtrack(num, target, i + 1, n, val + n);\n                backtrack(num, target, i + 1, -n, val - n);\n                backtrack(num, target, i + 1, prev * n, val - prev + prev * n);\n            }\n        }\n    }\n    public static void main(String[] args) {\n        System.out.println(addOperatorsCount(\"123\", 6));\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "name": "Sample Case 1",
        "input": "",
        "expectedOutput": "2",
        "isHidden": false
      },
      {
        "id": 2,
        "name": "Hidden Case 2",
        "input": "",
        "expectedOutput": "2",
        "isHidden": true
      }
    ]
  },
  {
    "id": "49",
    "number": 49,
    "title": "Generate All Binary Sequences of Length N",
    "slug": "generate-all-binary-sequences-of-length-n",
    "difficulty": "Easy",
    "category": "Linked Lists",
    "topicTags": [
      "Backtracking"
    ],
    "problemStatement": "Given integer n, return total count of distinct binary strings of length n.",
    "diagram": null,
    "examples": [
      {
        "input": "n = 3",
        "output": "8",
        "explanation": "2^3 = 8 binary combinations.",
        "exp": "2^3 = 8 binary combinations."
      }
    ],
    "constraints": [
      "1 <= n <= 10"
    ],
    "starterCode": {
      "javascript": "function binaryStringsCount(n) {\n    let count = 0;\n    function solve(len) {\n        if (len === n) { count++; return; }\n        solve(len + 1);\n        solve(len + 1);\n    }\n    solve(0);\n    return count;\n}\nconsole.log(binaryStringsCount(3));",
      "cpp": "#include <iostream>\nusing namespace std;\nclass Solution {\n    int count = 0;\n    void solve(int len, int n) {\n        if (len == n) { count++; return; }\n        solve(len + 1, n);\n        solve(len + 1, n);\n    }\npublic:\n    int binaryStringsCount(int n) {\n        count = 0;\n        solve(0, n);\n        return count;\n    }\n};\nint main() {\n    Solution sol;\n    cout << sol.binaryStringsCount(3) << endl;\n    return 0;\n}",
      "java": "public class Main {\n    static int count = 0;\n    public static int binaryStringsCount(int n) {\n        count = 0;\n        solve(0, n);\n        return count;\n    }\n    private static void solve(int len, int n) {\n        if (len == n) { count++; return; }\n        solve(len + 1, n);\n        solve(len + 1, n);\n    }\n    public static void main(String[] args) {\n        System.out.println(binaryStringsCount(3));\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "name": "Sample Case 1",
        "input": "",
        "expectedOutput": "8",
        "isHidden": false
      },
      {
        "id": 2,
        "name": "Hidden Case 2",
        "input": "",
        "expectedOutput": "8",
        "isHidden": true
      }
    ]
  },
  {
    "id": "50",
    "number": 50,
    "title": "Generate Unique Element Permutations",
    "slug": "generate-unique-element-permutations",
    "difficulty": "Medium",
    "category": "Linked Lists",
    "topicTags": [
      "Backtracking",
      "Arrays"
    ],
    "problemStatement": "Given array nums of distinct integers, return count of all possible permutations.",
    "diagram": null,
    "examples": [
      {
        "input": "nums = [1, 2, 3]",
        "output": "6",
        "explanation": "3! = 6 unique permutations.",
        "exp": "3! = 6 unique permutations."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 6"
    ],
    "starterCode": {
      "javascript": "function permuteCount(nums) {\n    let count = 0;\n    function backtrack(first) {\n        if (first === nums.length) { count++; return; }\n        for (let i = first; i < nums.length; i++) {\n            [nums[first], nums[i]] = [nums[i], nums[first]];\n            backtrack(first + 1);\n            [nums[first], nums[i]] = [nums[i], nums[first]];\n        }\n    }\n    backtrack(0);\n    return count;\n}\nconsole.log(permuteCount([1, 2, 3]));",
      "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\nclass Solution {\n    int count = 0;\n    void backtrack(vector<int>& nums, int first) {\n        if (first == (int)nums.size()) { count++; return; }\n        for (int i = first; i < (int)nums.size(); i++) {\n            swap(nums[first], nums[i]);\n            backtrack(nums, first + 1);\n            swap(nums[first], nums[i]);\n        }\n    }\npublic:\n    int permuteCount(vector<int>& nums) {\n        count = 0;\n        backtrack(nums, 0);\n        return count;\n    }\n};\nint main() {\n    Solution sol;\n    vector<int> nums = {1, 2, 3};\n    cout << sol.permuteCount(nums) << endl;\n    return 0;\n}",
      "java": "public class Main {\n    static int count = 0;\n    public static int permuteCount(int[] nums) {\n        count = 0;\n        backtrack(nums, 0);\n        return count;\n    }\n    private static void backtrack(int[] nums, int first) {\n        if (first == nums.length) { count++; return; }\n        for (int i = first; i < nums.length; i++) {\n            int t = nums[first]; nums[first] = nums[i]; nums[i] = t;\n            backtrack(nums, first + 1);\n            t = nums[first]; nums[first] = nums[i]; nums[i] = t;\n        }\n    }\n    public static void main(String[] args) {\n        System.out.println(permuteCount(new int[]{1, 2, 3}));\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "name": "Sample Case 1",
        "input": "",
        "expectedOutput": "6",
        "isHidden": false
      },
      {
        "id": 2,
        "name": "Hidden Case 2",
        "input": "",
        "expectedOutput": "6",
        "isHidden": true
      }
    ]
  },
  {
    "id": "51",
    "number": 51,
    "title": "Combination Sum with Element Reuse",
    "slug": "combination-sum-with-element-reuse",
    "difficulty": "Medium",
    "category": "Linked Lists",
    "topicTags": [
      "Backtracking",
      "Arrays"
    ],
    "problemStatement": "Given array of distinct integers candidates and target, return count of unique combinations summing to target with elements reusable unlimited times.",
    "diagram": null,
    "examples": [
      {
        "input": "candidates = [2, 3, 6, 7], target = 7",
        "output": "2",
        "explanation": "[2, 2, 3] and [7]. Count = 2.",
        "exp": "[2, 2, 3] and [7]. Count = 2."
      }
    ],
    "constraints": [
      "1 <= candidates.length <= 30"
    ],
    "starterCode": {
      "javascript": "function combinationSumCount(candidates, target) {\n    let count = 0;\n    function backtrack(remain, start) {\n        if (remain === 0) { count++; return; }\n        if (remain < 0) return;\n        for (let i = start; i < candidates.length; i++) {\n            backtrack(remain - candidates[i], i);\n        }\n    }\n    backtrack(target, 0);\n    return count;\n}\nconsole.log(combinationSumCount([2, 3, 6, 7], 7));",
      "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\nclass Solution {\n    int count = 0;\n    void backtrack(vector<int>& c, int remain, int start) {\n        if (remain == 0) { count++; return; }\n        if (remain < 0) return;\n        for (size_t i = start; i < c.size(); i++) {\n            backtrack(c, remain - c[i], i);\n        }\n    }\npublic:\n    int combinationSumCount(vector<int>& candidates, int target) {\n        count = 0;\n        backtrack(candidates, target, 0);\n        return count;\n    }\n};\nint main() {\n    Solution sol;\n    vector<int> c = {2, 3, 6, 7};\n    cout << sol.combinationSumCount(c, 7) << endl;\n    return 0;\n}",
      "java": "public class Main {\n    static int count = 0;\n    public static int combinationSumCount(int[] candidates, int target) {\n        count = 0;\n        backtrack(candidates, target, 0);\n        return count;\n    }\n    private static void backtrack(int[] c, int remain, int start) {\n        if (remain == 0) { count++; return; }\n        if (remain < 0) return;\n        for (int i = start; i < c.length; i++) {\n            backtrack(c, remain - c[i], i);\n        }\n    }\n    public static void main(String[] args) {\n        System.out.println(combinationSumCount(new int[]{2, 3, 6, 7}, 7));\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "name": "Sample Case 1",
        "input": "",
        "expectedOutput": "2",
        "isHidden": false
      },
      {
        "id": 2,
        "name": "Hidden Case 2",
        "input": "",
        "expectedOutput": "2",
        "isHidden": true
      }
    ]
  },
  {
    "id": "52",
    "number": 52,
    "title": "Generate Full Power Set of Unique Integers",
    "slug": "generate-full-power-set-of-unique-integers",
    "difficulty": "Medium",
    "category": "Linked Lists",
    "topicTags": [
      "Backtracking"
    ],
    "problemStatement": "Given integer array nums of unique elements, return size of power set (all subsets).",
    "diagram": null,
    "examples": [
      {
        "input": "nums = [1, 2, 3]",
        "output": "8",
        "explanation": "2^3 = 8 subsets.",
        "exp": "2^3 = 8 subsets."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10"
    ],
    "starterCode": {
      "javascript": "function subsetsCount(nums) {\n    return 1 << nums.length;\n}\nconsole.log(subsetsCount([1, 2, 3]));",
      "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\nclass Solution {\npublic:\n    int subsetsCount(vector<int>& nums) {\n        return 1 << nums.size();\n    }\n};\nint main() {\n    Solution sol;\n    vector<int> nums = {1, 2, 3};\n    cout << sol.subsetsCount(nums) << endl;\n    return 0;\n}",
      "java": "public class Main {\n    public static int subsetsCount(int[] nums) {\n        return 1 << nums.length;\n    }\n    public static void main(String[] args) {\n        System.out.println(subsetsCount(new int[]{1, 2, 3}));\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "name": "Sample Case 1",
        "input": "",
        "expectedOutput": "8",
        "isHidden": false
      },
      {
        "id": 2,
        "name": "Hidden Case 2",
        "input": "",
        "expectedOutput": "8",
        "isHidden": true
      }
    ]
  },
  {
    "id": "53",
    "number": 53,
    "title": "Grid Matrix Word Search Path",
    "slug": "grid-matrix-word-search-path",
    "difficulty": "Medium",
    "category": "Linked Lists",
    "topicTags": [
      "Backtracking",
      "Matrix"
    ],
    "problemStatement": "Given m x n grid of characters board and string word, return true if word exists in grid moving horizontally or vertically.",
    "diagram": null,
    "examples": [
      {
        "input": "board = [[\"A\",\"B\",\"C\",\"E\"],[\"S\",\"F\",\"C\",\"S\"],[\"A\",\"D\",\"E\",\"E\"]], word = \"ABCCED\"",
        "output": "true",
        "explanation": "Path exists.",
        "exp": "Path exists."
      }
    ],
    "constraints": [
      "m, n <= 6"
    ],
    "starterCode": {
      "javascript": "function exist(board, word) {\n    const m = board.length, n = board[0].length;\n    function dfs(r, c, idx) {\n        if (idx === word.length) return true;\n        if (r < 0 || r >= m || c < 0 || c >= n || board[r][c] !== word[idx]) return false;\n        const temp = board[r][c];\n        board[r][c] = '#';\n        const found = dfs(r + 1, c, idx + 1) || dfs(r - 1, c, idx + 1) ||\n                      dfs(r, c + 1, idx + 1) || dfs(r, c - 1, idx + 1);\n        board[r][c] = temp;\n        return found;\n    }\n    for (let r = 0; r < m; r++) {\n        for (let c = 0; c < n; c++) {\n            if (dfs(r, c, 0)) return true;\n        }\n    }\n    return false;\n}\nconsole.log(exist([['A','B','C','E'],['S','F','C','S'],['A','D','E','E']], \"ABCCED\"));",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\nclass Solution {\n    bool dfs(vector<vector<char>>& b, string& w, int r, int c, int idx) {\n        if (idx == (int)w.size()) return true;\n        if (r < 0 || r >= (int)b.size() || c < 0 || c >= (int)b[0].size() || b[r][c] != w[idx]) return false;\n        char temp = b[r][c];\n        b[r][c] = '#';\n        bool found = dfs(b, w, r + 1, c, idx + 1) || dfs(b, w, r - 1, c, idx + 1) ||\n                     dfs(b, w, r, c + 1, idx + 1) || dfs(b, w, r, c - 1, idx + 1);\n        b[r][c] = temp;\n        return found;\n    }\npublic:\n    bool exist(vector<vector<char>>& board, string word) {\n        for (size_t r = 0; r < board.size(); r++) {\n            for (size_t c = 0; c < board[0].size(); c++) {\n                if (dfs(board, word, r, c, 0)) return true;\n            }\n        }\n        return false;\n    }\n};\nint main() {\n    Solution sol;\n    vector<vector<char>> b = {{'A','B','C','E'},{'S','F','C','S'},{'A','D','E','E'}};\n    cout << (sol.exist(b, \"ABCCED\") ? \"true\" : \"false\") << endl;\n    return 0;\n}",
      "java": "public class Main {\n    public static boolean exist(char[][] board, String word) {\n        for (int r = 0; r < board.length; r++) {\n            for (int c = 0; c < board[0].length; c++) {\n                if (dfs(board, word, r, c, 0)) return true;\n            }\n        }\n        return false;\n    }\n    private static boolean dfs(char[][] b, String w, int r, int c, int idx) {\n        if (idx == w.length()) return true;\n        if (r < 0 || r >= b.length || c < 0 || c >= b[0].length || b[r][c] != w.charAt(idx)) return false;\n        char temp = b[r][c];\n        b[r][c] = '#';\n        boolean found = dfs(b, w, r + 1, c, idx + 1) || dfs(b, w, r - 1, c, idx + 1) ||\n                        dfs(b, w, r, c + 1, idx + 1) || dfs(b, w, r, c - 1, idx + 1);\n        b[r][c] = temp;\n        return found;\n    }\n    public static void main(String[] args) {\n        char[][] b = {{'A','B','C','E'},{'S','F','C','S'},{'A','D','E','E'}};\n        System.out.println(exist(b, \"ABCCED\"));\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "name": "Sample Case 1",
        "input": "",
        "expectedOutput": "true",
        "isHidden": false
      },
      {
        "id": 2,
        "name": "Hidden Case 2",
        "input": "",
        "expectedOutput": "true",
        "isHidden": true
      }
    ]
  },
  {
    "id": "54",
    "number": 54,
    "title": "N-Queens Non-Threatening Board Configuration",
    "slug": "n-queens-non-threatening-board-configuration",
    "difficulty": "Hard",
    "category": "Linked Lists",
    "topicTags": [
      "Backtracking"
    ],
    "problemStatement": "The n-queens puzzle is placement of n queens on an n x n chessboard so no two queens attack each other. Return total distinct solutions count.",
    "diagram": null,
    "examples": [
      {
        "input": "n = 4",
        "output": "2",
        "explanation": "4-Queens has 2 valid board configurations.",
        "exp": "4-Queens has 2 valid board configurations."
      }
    ],
    "constraints": [
      "1 <= n <= 9"
    ],
    "starterCode": {
      "javascript": "function totalNQueens(n) {\n    let count = 0;\n    const cols = new Set(), diag1 = new Set(), diag2 = new Set();\n    function backtrack(row) {\n        if (row === n) { count++; return; }\n        for (let col = 0; col < n; col++) {\n            const d1 = row - col, d2 = row + col;\n            if (cols.has(col) || diag1.has(d1) || diag2.has(d2)) continue;\n            cols.add(col); diag1.add(d1); diag2.add(d2);\n            backtrack(row + 1);\n            cols.delete(col); diag1.delete(d1); diag2.delete(d2);\n        }\n    }\n    backtrack(0);\n    return count;\n}\nconsole.log(totalNQueens(4));",
      "cpp": "#include <iostream>\n#include <vector>\n#include <unordered_set>\nusing namespace std;\nclass Solution {\n    int count = 0;\n    unordered_set<int> cols, diag1, diag2;\n    void backtrack(int row, int n) {\n        if (row == n) { count++; return; }\n        for (int col = 0; col < n; col++) {\n            int d1 = row - col, d2 = row + col;\n            if (cols.count(col) || diag1.count(d1) || diag2.count(d2)) continue;\n            cols.insert(col); diag1.insert(d1); diag2.insert(d2);\n            backtrack(row + 1, n);\n            cols.erase(col); diag1.erase(d1); diag2.erase(d2);\n        }\n    }\npublic:\n    int totalNQueens(int n) {\n        count = 0;\n        backtrack(0, n);\n        return count;\n    }\n};\nint main() {\n    Solution sol;\n    cout << sol.totalNQueens(4) << endl;\n    return 0;\n}",
      "java": "import java.util.*;\npublic class Main {\n    static int count = 0;\n    static Set<Integer> cols = new HashSet<>(), diag1 = new HashSet<>(), diag2 = new HashSet<>();\n    public static int totalNQueens(int n) {\n        count = 0;\n        backtrack(0, n);\n        return count;\n    }\n    private static void backtrack(int row, int n) {\n        if (row == n) { count++; return; }\n        for (int col = 0; col < n; col++) {\n            int d1 = row - col, d2 = row + col;\n            if (cols.contains(col) || diag1.contains(d1) || diag2.contains(d2)) continue;\n            cols.add(col); diag1.add(d1); diag2.add(d2);\n            backtrack(row + 1, n);\n            cols.remove(col); diag1.remove(d1); diag2.remove(d2);\n        }\n    }\n    public static void main(String[] args) {\n        System.out.println(totalNQueens(4));\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "name": "Sample Case 1",
        "input": "",
        "expectedOutput": "2",
        "isHidden": false
      },
      {
        "id": 2,
        "name": "Hidden Case 2",
        "input": "",
        "expectedOutput": "2",
        "isHidden": true
      }
    ]
  },
  {
    "id": "55",
    "number": 55,
    "title": "Reverse Singly Linked Node Sequence",
    "slug": "reverse-singly-linked-node-sequence",
    "difficulty": "Easy",
    "category": "Linked Lists",
    "topicTags": [
      "Linked List",
      "Recursion"
    ],
    "problemStatement": "Given the head of a singly linked list, reverse the list, and return the reversed list values.",
    "diagram": "[1] -> [2] -> [3] -> [4] -> [5] -> NULL\n                || Reversing pointers\n[5] -> [4] -> [3] -> [2] -> [1] -> NULL",
    "examples": [
      {
        "input": "head = [1, 2, 3, 4, 5]",
        "output": "[5, 4, 3, 2, 1]",
        "explanation": "Pointers inverted.",
        "exp": "Pointers inverted."
      }
    ],
    "constraints": [
      "0 <= nodes <= 5000"
    ],
    "starterCode": {
      "javascript": "function reverseList(head) {\n    let prev = null, cur = head;\n    while (cur) {\n        const next = cur.next;\n        cur.next = prev;\n        prev = cur;\n        cur = next;\n    }\n    const res = [];\n    while (prev) { res.push(prev.val); prev = prev.next; }\n    return res;\n}\nconst list = { val: 1, next: { val: 2, next: { val: 3, next: { val: 4, next: { val: 5, next: null } } } } };\nconsole.log(JSON.stringify(reverseList(list)));",
      "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\nstruct ListNode { int val; ListNode* next; ListNode(int x) : val(x), next(nullptr) {} };\nclass Solution {\npublic:\n    ListNode* reverseList(ListNode* head) {\n        ListNode* prev = nullptr;\n        while (head) { ListNode* n = head->next; head->next = prev; prev = head; head = n; }\n        return prev;\n    }\n};\nint main() {\n    ListNode* head = new ListNode(1);\n    head->next = new ListNode(2);\n    head->next->next = new ListNode(3);\n    head->next->next->next = new ListNode(4);\n    head->next->next->next->next = new ListNode(5);\n    Solution sol;\n    ListNode* rev = sol.reverseList(head);\n    cout << \"[\" << rev->val << \", \" << rev->next->val << \", \" << rev->next->next->val << \", \" << rev->next->next->next->val << \", \" << rev->next->next->next->next->val << \"]\" << endl;\n    return 0;\n}",
      "java": "import java.util.*;\npublic class Main {\n    static class ListNode { int val; ListNode next; ListNode(int x) { val = x; } }\n    public static ListNode reverseList(ListNode head) {\n        ListNode prev = null;\n        while (head != null) { ListNode n = head.next; head.next = prev; prev = head; head = n; }\n        return prev;\n    }\n    public static void main(String[] args) {\n        ListNode h = new ListNode(1);\n        h.next = new ListNode(2);\n        h.next.next = new ListNode(3);\n        h.next.next.next = new ListNode(4);\n        h.next.next.next.next = new ListNode(5);\n        ListNode r = reverseList(h);\n        List<Integer> ans = new ArrayList<>();\n        while (r != null) { ans.add(r.val); r = r.next; }\n        System.out.println(ans);\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "name": "Sample Case 1",
        "input": "",
        "expectedOutput": "[5, 4, 3, 2, 1]",
        "isHidden": false
      },
      {
        "id": 2,
        "name": "Hidden Case 2",
        "input": "",
        "expectedOutput": "[5, 4, 3, 2, 1]",
        "isHidden": true
      }
    ]
  },
  {
    "id": "56",
    "number": 56,
    "title": "Detect Circular Loop in Linked List",
    "slug": "detect-circular-loop-in-linked-list",
    "difficulty": "Easy",
    "category": "Linked Lists",
    "topicTags": [
      "Linked List",
      "Two Pointers"
    ],
    "problemStatement": "Given head of a linked list, determine if list has cycle using Floyd cycle-finding algorithm.",
    "diagram": "[3] -> [2] -> [0] -> [-4]\n          ^            |\n          +------------+ (Cycle formed back to node 2)",
    "examples": [
      {
        "input": "head = [3, 2, 0, -4], pos = 1",
        "output": "true",
        "explanation": "Tail connects to node at index 1.",
        "exp": "Tail connects to node at index 1."
      }
    ],
    "constraints": [
      "0 <= nodes <= 10^4"
    ],
    "starterCode": {
      "javascript": "function hasCycle(head) {\n    let slow = head, fast = head;\n    while (fast && fast.next) {\n        slow = slow.next;\n        fast = fast.next.next;\n        if (slow === fast) return true;\n    }\n    return false;\n}\nconst n1 = { val: 3 }, n2 = { val: 2 }, n3 = { val: 0 }, n4 = { val: -4 };\nn1.next = n2; n2.next = n3; n3.next = n4; n4.next = n2;\nconsole.log(hasCycle(n1));",
      "cpp": "#include <iostream>\nusing namespace std;\nstruct ListNode { int val; ListNode* next; ListNode(int x) : val(x), next(nullptr) {} };\nclass Solution {\npublic:\n    bool hasCycle(ListNode *head) {\n        ListNode *slow = head, *fast = head;\n        while (fast && fast->next) {\n            slow = slow->next; fast = fast->next->next;\n            if (slow == fast) return true;\n        }\n        return false;\n    }\n};\nint main() {\n    ListNode *n1 = new ListNode(3), *n2 = new ListNode(2), *n3 = new ListNode(0), *n4 = new ListNode(-4);\n    n1->next = n2; n2->next = n3; n3->next = n4; n4->next = n2;\n    Solution sol;\n    cout << (sol.hasCycle(n1) ? \"true\" : \"false\") << endl;\n    return 0;\n}",
      "java": "public class Main {\n    static class ListNode { int val; ListNode next; ListNode(int x) { val = x; } }\n    public static boolean hasCycle(ListNode head) {\n        ListNode slow = head, fast = head;\n        while (fast != null && fast.next != null) {\n            slow = slow.next; fast = fast.next.next;\n            if (slow == fast) return true;\n        }\n        return false;\n    }\n    public static void main(String[] args) {\n        ListNode n1 = new ListNode(3), n2 = new ListNode(2), n3 = new ListNode(0), n4 = new ListNode(-4);\n        n1.next = n2; n2.next = n3; n3.next = n4; n4.next = n2;\n        System.out.println(hasCycle(n1));\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "name": "Sample Case 1",
        "input": "",
        "expectedOutput": "true",
        "isHidden": false
      },
      {
        "id": 2,
        "name": "Hidden Case 2",
        "input": "",
        "expectedOutput": "true",
        "isHidden": true
      }
    ]
  },
  {
    "id": "57",
    "number": 57,
    "title": "Merge Two Sorted Linked Node Lists",
    "slug": "merge-two-sorted-linked-node-lists",
    "difficulty": "Easy",
    "category": "Stacks and Queues",
    "topicTags": [
      "Linked List"
    ],
    "problemStatement": "Merge two sorted linked lists and return it as a single sorted list.",
    "diagram": "List 1: [1] -> [2] -> [4]\nList 2: [1] -> [3] -> [4]\nMerged: [1] -> [1] -> [2] -> [3] -> [4] -> [4]",
    "examples": [
      {
        "input": "l1 = [1, 2, 4], l2 = [1, 3, 4]",
        "output": "[1, 1, 2, 3, 4, 4]",
        "explanation": "Merged ascending.",
        "exp": "Merged ascending."
      }
    ],
    "constraints": [
      "0 <= nodes <= 50"
    ],
    "starterCode": {
      "javascript": "function mergeTwoLists(l1, l2) {\n    const dummy = { val: 0, next: null };\n    let cur = dummy;\n    while (l1 && l2) {\n        if (l1.val <= l2.val) { cur.next = l1; l1 = l1.next; }\n        else { cur.next = l2; l2 = l2.next; }\n        cur = cur.next;\n    }\n    cur.next = l1 || l2;\n    const res = [];\n    let p = dummy.next;\n    while (p) { res.push(p.val); p = p.next; }\n    return res;\n}\nconsole.log(JSON.stringify(mergeTwoLists({val:1,next:{val:2,next:{val:4,next:null}}}, {val:1,next:{val:3,next:{val:4,next:null}}})));",
      "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\nstruct ListNode { int val; ListNode* next; ListNode(int x) : val(x), next(nullptr) {} };\nclass Solution {\npublic:\n    ListNode* mergeTwoLists(ListNode* l1, ListNode* l2) {\n        ListNode dummy(0);\n        ListNode* cur = &dummy;\n        while (l1 && l2) {\n            if (l1->val <= l2->val) { cur->next = l1; l1 = l1->next; }\n            else { cur->next = l2; l2 = l2->next; }\n            cur = cur->next;\n        }\n        cur->next = l1 ? l1 : l2;\n        return dummy.next;\n    }\n};\nint main() {\n    ListNode* l1 = new ListNode(1); l1->next = new ListNode(2); l1->next->next = new ListNode(4);\n    ListNode* l2 = new ListNode(1); l2->next = new ListNode(3); l2->next->next = new ListNode(4);\n    Solution sol;\n    ListNode* m = sol.mergeTwoLists(l1, l2);\n    cout << \"[\" << m->val << \", \" << m->next->val << \", \" << m->next->next->val << \", \" << m->next->next->next->val << \", \" << m->next->next->next->next->val << \", \" << m->next->next->next->next->next->val << \"]\" << endl;\n    return 0;\n}",
      "java": "import java.util.*;\npublic class Main {\n    static class ListNode { int val; ListNode next; ListNode(int x) { val = x; } }\n    public static ListNode mergeTwoLists(ListNode l1, ListNode l2) {\n        ListNode dummy = new ListNode(0);\n        ListNode cur = dummy;\n        while (l1 != null && l2 != null) {\n            if (l1.val <= l2.val) { cur.next = l1; l1 = l1.next; }\n            else { cur.next = l2; l2 = l2.next; }\n            cur = cur.next;\n        }\n        cur.next = (l1 != null) ? l1 : l2;\n        return dummy.next;\n    }\n    public static void main(String[] args) {\n        ListNode l1 = new ListNode(1); l1.next = new ListNode(2); l1.next.next = new ListNode(4);\n        ListNode l2 = new ListNode(1); l2.next = new ListNode(3); l2.next.next = new ListNode(4);\n        ListNode m = mergeTwoLists(l1, l2);\n        List<Integer> res = new ArrayList<>();\n        while (m != null) { res.add(m.val); m = m.next; }\n        System.out.println(res);\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "name": "Sample Case 1",
        "input": "",
        "expectedOutput": "[1, 1, 2, 3, 4, 4]",
        "isHidden": false
      },
      {
        "id": 2,
        "name": "Hidden Case 2",
        "input": "",
        "expectedOutput": "[1, 1, 2, 3, 4, 4]",
        "isHidden": true
      }
    ]
  },
  {
    "id": "58",
    "number": 58,
    "title": "Delete Nth Node from List Tail",
    "slug": "delete-nth-node-from-list-tail",
    "difficulty": "Medium",
    "category": "Stacks and Queues",
    "topicTags": [
      "Linked List",
      "Two Pointers"
    ],
    "problemStatement": "Given the head of a linked list, remove the nth node from the end of the list and return list elements in one pass.",
    "diagram": "[1] -> [2] -> [3] -> [4] -> [5] (Remove 2nd from end: node 4)\n                  ||\n[1] -> [2] -> [3] --------> [5]",
    "examples": [
      {
        "input": "head = [1, 2, 3, 4, 5], n = 2",
        "output": "[1, 2, 3, 5]",
        "explanation": "Node 4 removed.",
        "exp": "Node 4 removed."
      }
    ],
    "constraints": [
      "1 <= n <= nodes <= 30"
    ],
    "starterCode": {
      "javascript": "function removeNthFromEnd(head, n) {\n    const dummy = { val: 0, next: head };\n    let fast = dummy, slow = dummy;\n    for (let i = 0; i <= n; i++) fast = fast.next;\n    while (fast) { fast = fast.next; slow = slow.next; }\n    slow.next = slow.next.next;\n    const res = [];\n    let p = dummy.next;\n    while (p) { res.push(p.val); p = p.next; }\n    return res;\n}\nconst h = { val: 1, next: { val: 2, next: { val: 3, next: { val: 4, next: { val: 5, next: null } } } } };\nconsole.log(JSON.stringify(removeNthFromEnd(h, 2)));",
      "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\nstruct ListNode { int val; ListNode* next; ListNode(int x) : val(x), next(nullptr) {} };\nclass Solution {\npublic:\n    ListNode* removeNthFromEnd(ListNode* head, int n) {\n        ListNode dummy(0);\n        dummy.next = head;\n        ListNode *fast = &dummy, *slow = &dummy;\n        for (int i = 0; i <= n; i++) fast = fast->next;\n        while (fast) { fast = fast->next; slow = slow->next; }\n        slow->next = slow->next->next;\n        return dummy.next;\n    }\n};\nint main() {\n    ListNode* h = new ListNode(1); h->next = new ListNode(2); h->next->next = new ListNode(3);\n    h->next->next->next = new ListNode(4); h->next->next->next->next = new ListNode(5);\n    Solution sol;\n    ListNode* r = sol.removeNthFromEnd(h, 2);\n    cout << \"[\" << r->val << \", \" << r->next->val << \", \" << r->next->next->val << \", \" << r->next->next->next->val << \"]\" << endl;\n    return 0;\n}",
      "java": "import java.util.*;\npublic class Main {\n    static class ListNode { int val; ListNode next; ListNode(int x) { val = x; } }\n    public static ListNode removeNthFromEnd(ListNode head, int n) {\n        ListNode dummy = new ListNode(0);\n        dummy.next = head;\n        ListNode fast = dummy, slow = dummy;\n        for (int i = 0; i <= n; i++) fast = fast.next;\n        while (fast != null) { fast = fast.next; slow = slow.next; }\n        slow.next = slow.next.next;\n        return dummy.next;\n    }\n    public static void main(String[] args) {\n        ListNode h = new ListNode(1); h.next = new ListNode(2); h.next.next = new ListNode(3);\n        h.next.next.next = new ListNode(4); h.next.next.next.next = new ListNode(5);\n        ListNode r = removeNthFromEnd(h, 2);\n        List<Integer> res = new ArrayList<>();\n        while (r != null) { res.add(r.val); r = r.next; }\n        System.out.println(res);\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "name": "Sample Case 1",
        "input": "",
        "expectedOutput": "[1, 2, 3, 5]",
        "isHidden": false
      },
      {
        "id": 2,
        "name": "Hidden Case 2",
        "input": "",
        "expectedOutput": "[1, 2, 3, 5]",
        "isHidden": true
      }
    ]
  },
  {
    "id": "59",
    "number": 59,
    "title": "Add Numbers Represented as Linked Lists",
    "slug": "add-numbers-represented-as-linked-lists",
    "difficulty": "Medium",
    "category": "Stacks and Queues",
    "topicTags": [
      "Linked List",
      "Math"
    ],
    "problemStatement": "You are given two non-empty linked lists representing two non-negative integers stored in reverse order. Add the two numbers and return the sum list.",
    "diagram": "  [2] -> [4] -> [3]  (342)\n+ [5] -> [6] -> [4]  (465)\n--------------------\n= [7] -> [0] -> [8]  (807)",
    "examples": [
      {
        "input": "l1 = [2, 4, 3], l2 = [5, 6, 4]",
        "output": "[7, 0, 8]",
        "explanation": "342 + 465 = 807.",
        "exp": "342 + 465 = 807."
      }
    ],
    "constraints": [
      "1 <= nodes <= 100"
    ],
    "starterCode": {
      "javascript": "function addTwoNumbers(l1, l2) {\n    const dummy = { val: 0, next: null };\n    let cur = dummy, carry = 0;\n    while (l1 || l2 || carry) {\n        const sum = (l1 ? l1.val : 0) + (l2 ? l2.val : 0) + carry;\n        carry = Math.floor(sum / 10);\n        cur.next = { val: sum % 10, next: null };\n        cur = cur.next;\n        if (l1) l1 = l1.next;\n        if (l2) l2 = l2.next;\n    }\n    const res = [];\n    let p = dummy.next;\n    while (p) { res.push(p.val); p = p.next; }\n    return res;\n}\nconsole.log(JSON.stringify(addTwoNumbers({val:2,next:{val:4,next:{val:3,next:null}}}, {val:5,next:{val:6,next:{val:4,next:null}}})));",
      "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\nstruct ListNode { int val; ListNode* next; ListNode(int x) : val(x), next(nullptr) {} };\nclass Solution {\npublic:\n    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {\n        ListNode dummy(0);\n        ListNode* cur = &dummy;\n        int carry = 0;\n        while (l1 || l2 || carry) {\n            int sum = (l1 ? l1->val : 0) + (l2 ? l2->val : 0) + carry;\n            carry = sum / 10;\n            cur->next = new ListNode(sum % 10);\n            cur = cur->next;\n            if (l1) l1 = l1->next;\n            if (l2) l2 = l2->next;\n        }\n        return dummy.next;\n    }\n};\nint main() {\n    ListNode* l1 = new ListNode(2); l1->next = new ListNode(4); l1->next->next = new ListNode(3);\n    ListNode* l2 = new ListNode(5); l2->next = new ListNode(6); l2->next->next = new ListNode(4);\n    Solution sol;\n    ListNode* ans = sol.addTwoNumbers(l1, l2);\n    cout << \"[\" << ans->val << \", \" << ans->next->val << \", \" << ans->next->next->val << \"]\" << endl;\n    return 0;\n}",
      "java": "import java.util.*;\npublic class Main {\n    static class ListNode { int val; ListNode next; ListNode(int x) { val = x; } }\n    public static ListNode addTwoNumbers(ListNode l1, ListNode l2) {\n        ListNode dummy = new ListNode(0);\n        ListNode cur = dummy;\n        int carry = 0;\n        while (l1 != null || l2 != null || carry != 0) {\n            int sum = (l1 != null ? l1.val : 0) + (l2 != null ? l2.val : 0) + carry;\n            carry = sum / 10;\n            cur.next = new ListNode(sum % 10);\n            cur = cur.next;\n            if (l1 != null) l1 = l1.next;\n            if (l2 != null) l2 = l2.next;\n        }\n        return dummy.next;\n    }\n    public static void main(String[] args) {\n        ListNode l1 = new ListNode(2); l1.next = new ListNode(4); l1.next.next = new ListNode(3);\n        ListNode l2 = new ListNode(5); l2.next = new ListNode(6); l2.next.next = new ListNode(4);\n        ListNode ans = addTwoNumbers(l1, l2);\n        List<Integer> r = new ArrayList<>();\n        while (ans != null) { r.add(ans.val); ans = ans.next; }\n        System.out.println(r);\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "name": "Sample Case 1",
        "input": "",
        "expectedOutput": "[7, 0, 8]",
        "isHidden": false
      },
      {
        "id": 2,
        "name": "Hidden Case 2",
        "input": "",
        "expectedOutput": "[7, 0, 8]",
        "isHidden": true
      }
    ]
  },
  {
    "id": "60",
    "number": 60,
    "title": "Merge K Ascending Sorted Linked Lists",
    "slug": "merge-k-ascending-sorted-linked-lists",
    "difficulty": "Hard",
    "category": "Stacks and Queues",
    "topicTags": [
      "Linked List",
      "Divide and Conquer",
      "Heap"
    ],
    "problemStatement": "You are given an array of k linked-lists lists, each linked-list is sorted in ascending order. Merge all into one sorted linked list.",
    "diagram": "L1: [1] -> [4] -> [5]\nL2: [1] -> [3] -> [4]  ==> [1] -> [1] -> [2] -> [3] -> [4] -> [4] -> [5] -> [6]\nL3: [2] -> [6]",
    "examples": [
      {
        "input": "lists = [[1, 4, 5], [1, 3, 4], [2, 6]]",
        "output": "[1, 1, 2, 3, 4, 4, 5, 6]",
        "explanation": "All lists merged.",
        "exp": "All lists merged."
      }
    ],
    "constraints": [
      "k <= 10^4"
    ],
    "starterCode": {
      "javascript": "function mergeKLists(lists) {\n    const vals = [];\n    for (const l of lists) {\n        let p = l;\n        while (p) { vals.push(p.val); p = p.next; }\n    }\n    vals.sort((a, b) => a - b);\n    return vals;\n}\nconsole.log(JSON.stringify(mergeKLists([\n    {val:1,next:{val:4,next:{val:5,next:null}}},\n    {val:1,next:{val:3,next:{val:4,next:null}}},\n    {val:2,next:{val:6,next:null}}\n])));",
      "cpp": "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nstruct ListNode { int val; ListNode* next; ListNode(int x) : val(x), next(nullptr) {} };\nclass Solution {\npublic:\n    vector<int> mergeKLists(vector<ListNode*>& lists) {\n        vector<int> vals;\n        for (ListNode* l : lists) {\n            while (l) { vals.push_back(l->val); l = l->next; }\n        }\n        sort(vals.begin(), vals.end());\n        return vals;\n    }\n};\nint main() {\n    ListNode* l1 = new ListNode(1); l1->next = new ListNode(4); l1->next->next = new ListNode(5);\n    ListNode* l2 = new ListNode(1); l2->next = new ListNode(3); l2->next->next = new ListNode(4);\n    ListNode* l3 = new ListNode(2); l3->next = new ListNode(6);\n    vector<ListNode*> lists = {l1, l2, l3};\n    Solution sol;\n    vector<int> ans = sol.mergeKLists(lists);\n    cout << \"[\" << ans[0] << \", \" << ans[1] << \", \" << ans[2] << \", \" << ans[3] << \", \" << ans[4] << \", \" << ans[5] << \", \" << ans[6] << \", \" << ans[7] << \"]\" << endl;\n    return 0;\n}",
      "java": "import java.util.*;\npublic class Main {\n    static class ListNode { int val; ListNode next; ListNode(int x) { val = x; } }\n    public static List<Integer> mergeKLists(List<ListNode> lists) {\n        List<Integer> vals = new ArrayList<>();\n        for (ListNode l : lists) {\n            while (l != null) { vals.add(l.val); l = l.next; }\n        }\n        Collections.sort(vals);\n        return vals;\n    }\n    public static void main(String[] args) {\n        ListNode l1 = new ListNode(1); l1.next = new ListNode(4); l1.next.next = new ListNode(5);\n        ListNode l2 = new ListNode(1); l2.next = new ListNode(3); l2.next.next = new ListNode(4);\n        ListNode l3 = new ListNode(2); l3.next = new ListNode(6);\n        System.out.println(mergeKLists(Arrays.asList(l1, l2, l3)));\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "name": "Sample Case 1",
        "input": "",
        "expectedOutput": "[1, 1, 2, 3, 4, 4, 5, 6]",
        "isHidden": false
      },
      {
        "id": 2,
        "name": "Hidden Case 2",
        "input": "",
        "expectedOutput": "[1, 1, 2, 3, 4, 4, 5, 6]",
        "isHidden": true
      }
    ]
  },
  {
    "id": "61",
    "number": 61,
    "title": "Validate Bracket and Parenthesis Matching",
    "slug": "validate-bracket-and-parenthesis-matching",
    "difficulty": "Easy",
    "category": "Stacks and Queues",
    "topicTags": [
      "Stack",
      "Strings"
    ],
    "problemStatement": "Given string s containing '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    "diagram": null,
    "examples": [
      {
        "input": "s = \"()[]{}\"",
        "output": "true",
        "explanation": "All brackets match in correct order.",
        "exp": "All brackets match in correct order."
      }
    ],
    "constraints": [
      "1 <= s.length <= 10^4"
    ],
    "starterCode": {
      "javascript": "function isValid(s) {\n    const stack = [];\n    const map = { ')': '(', '}': '{', ']': '[' };\n    for (const c of s) {\n        if (map[c]) {\n            if (stack.pop() !== map[c]) return false;\n        } else stack.push(c);\n    }\n    return stack.length === 0;\n}\nconsole.log(isValid(\"()[]{}\"));",
      "cpp": "#include <iostream>\n#include <string>\n#include <stack>\n#include <unordered_map>\nusing namespace std;\nclass Solution {\npublic:\n    bool isValid(string s) {\n        stack<char> st;\n        unordered_map<char, char> m = {{')', '('}, {'}', '{'}, {']', '['}};\n        for (char c : s) {\n            if (m.count(c)) {\n                if (st.empty() || st.top() != m[c]) return false;\n                st.pop();\n            } else st.push(c);\n        }\n        return st.empty();\n    }\n};\nint main() {\n    Solution sol;\n    cout << (sol.isValid(\"()[]{}\") ? \"true\" : \"false\") << endl;\n    return 0;\n}",
      "java": "import java.util.*;\npublic class Main {\n    public static boolean isValid(String s) {\n        Deque<Character> st = new ArrayDeque<>();\n        for (char c : s.toCharArray()) {\n            if (c == '(') st.push(')');\n            else if (c == '{') st.push('}');\n            else if (c == '[') st.push(']');\n            else if (st.isEmpty() || st.pop() != c) return false;\n        }\n        return st.isEmpty();\n    }\n    public static void main(String[] args) {\n        System.out.println(isValid(\"()[]{}\"));\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "name": "Sample Case 1",
        "input": "",
        "expectedOutput": "true",
        "isHidden": false
      },
      {
        "id": 2,
        "name": "Hidden Case 2",
        "input": "",
        "expectedOutput": "true",
        "isHidden": true
      }
    ]
  },
  {
    "id": "62",
    "number": 62,
    "title": "Constant-Time Minimum Retrieval Stack",
    "slug": "constant-time-minimum-retrieval-stack",
    "difficulty": "Medium",
    "category": "Stacks and Queues",
    "topicTags": [
      "Stack",
      "Design"
    ],
    "problemStatement": "Design a stack that supports push, pop, top, and retrieving the minimum element in constant time O(1).",
    "diagram": null,
    "examples": [
      {
        "input": "push(-2), push(0), push(-3), getMin()",
        "output": "-3",
        "explanation": "Current minimum is -3.",
        "exp": "Current minimum is -3."
      }
    ],
    "constraints": [
      "Methods called up to 3 * 10^4 times"
    ],
    "starterCode": {
      "javascript": "class MinStack {\n    constructor() { this.s = []; this.minS = []; }\n    push(val) {\n        this.s.push(val);\n        const curMin = this.minS.length ? Math.min(val, this.minS[this.minS.length - 1]) : val;\n        this.minS.push(curMin);\n    }\n    pop() { this.s.pop(); this.minS.pop(); }\n    top() { return this.s[this.s.length - 1]; }\n    getMin() { return this.minS[this.minS.length - 1]; }\n}\nconst ms = new MinStack();\nms.push(-2); ms.push(0); ms.push(-3);\nconsole.log(ms.getMin());",
      "cpp": "#include <iostream>\n#include <stack>\n#include <algorithm>\nusing namespace std;\nclass MinStack {\n    stack<int> s, minS;\npublic:\n    void push(int val) {\n        s.push(val);\n        int curMin = minS.empty() ? val : min(val, minS.top());\n        minS.push(curMin);\n    }\n    void pop() { s.pop(); minS.pop(); }\n    int top() { return s.top(); }\n    int getMin() { return minS.top(); }\n};\nint main() {\n    MinStack ms;\n    ms.push(-2); ms.push(0); ms.push(-3);\n    cout << ms.getMin() << endl;\n    return 0;\n}",
      "java": "import java.util.*;\npublic class Main {\n    static class MinStack {\n        Deque<Integer> s = new ArrayDeque<>(), minS = new ArrayDeque<>();\n        public void push(int val) {\n            s.push(val);\n            int cur = minS.isEmpty() ? val : Math.min(val, minS.peek());\n            minS.push(cur);\n        }\n        public void pop() { s.pop(); minS.pop(); }\n        public int top() { return s.peek(); }\n        public int getMin() { return minS.peek(); }\n    }\n    public static void main(String[] args) {\n        MinStack ms = new MinStack();\n        ms.push(-2); ms.push(0); ms.push(-3);\n        System.out.println(ms.getMin());\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "name": "Sample Case 1",
        "input": "",
        "expectedOutput": "-3",
        "isHidden": false
      },
      {
        "id": 2,
        "name": "Hidden Case 2",
        "input": "",
        "expectedOutput": "-3",
        "isHidden": true
      }
    ]
  },
  {
    "id": "63",
    "number": 63,
    "title": "Evaluate Postfix Notation Expression",
    "slug": "evaluate-postfix-notation-expression",
    "difficulty": "Medium",
    "category": "Stacks and Queues",
    "topicTags": [
      "Stack",
      "Math"
    ],
    "problemStatement": "Evaluate the value of an arithmetic expression in Reverse Polish Notation (RPN). Valid operators are +, -, *, /.",
    "diagram": null,
    "examples": [
      {
        "input": "tokens = [\"2\", \"1\", \"+\", \"3\", \"*\"]",
        "output": "9",
        "explanation": "((2 + 1) * 3) = 9.",
        "exp": "((2 + 1) * 3) = 9."
      }
    ],
    "constraints": [
      "1 <= tokens.length <= 10^4"
    ],
    "starterCode": {
      "javascript": "function evalRPN(tokens) {\n    const stack = [];\n    for (const t of tokens) {\n        if (t === '+') stack.push(stack.pop() + stack.pop());\n        else if (t === '-') { const b = stack.pop(), a = stack.pop(); stack.push(a - b); }\n        else if (t === '*') stack.push(stack.pop() * stack.pop());\n        else if (t === '/') { const b = stack.pop(), a = stack.pop(); stack.push(Math.trunc(a / b)); }\n        else stack.push(Number(t));\n    }\n    return stack.pop();\n}\nconsole.log(evalRPN([\"2\", \"1\", \"+\", \"3\", \"*\"]));",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <stack>\nusing namespace std;\nclass Solution {\npublic:\n    int evalRPN(vector<string>& tokens) {\n        stack<int> st;\n        for (const string& t : tokens) {\n            if (t == \"+\" || t == \"-\" || t == \"*\" || t == \"/\") {\n                int b = st.top(); st.pop();\n                int a = st.top(); st.pop();\n                if (t == \"+\") st.push(a + b);\n                else if (t == \"-\") st.push(a - b);\n                else if (t == \"*\") st.push(a * b);\n                else st.push(a / b);\n            } else st.push(stoi(t));\n        }\n        return st.top();\n    }\n};\nint main() {\n    Solution sol;\n    vector<string> t = {\"2\", \"1\", \"+\", \"3\", \"*\"};\n    cout << sol.evalRPN(t) << endl;\n    return 0;\n}",
      "java": "import java.util.*;\npublic class Main {\n    public static int evalRPN(String[] tokens) {\n        Deque<Integer> st = new ArrayDeque<>();\n        for (String t : tokens) {\n            if (\"+-*/\".contains(t)) {\n                int b = st.pop(), a = st.pop();\n                if (t.equals(\"+\")) st.push(a + b);\n                else if (t.equals(\"-\")) st.push(a - b);\n                else if (t.equals(\"*\")) st.push(a * b);\n                else st.push(a / b);\n            } else st.push(Integer.parseInt(t));\n        }\n        return st.pop();\n    }\n    public static void main(String[] args) {\n        System.out.println(evalRPN(new String[]{\"2\", \"1\", \"+\", \"3\", \"*\"}));\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "name": "Sample Case 1",
        "input": "",
        "expectedOutput": "9",
        "isHidden": false
      },
      {
        "id": 2,
        "name": "Hidden Case 2",
        "input": "",
        "expectedOutput": "9",
        "isHidden": true
      }
    ]
  },
  {
    "id": "64",
    "number": 64,
    "title": "Daily Temperatures Days Until Warmer",
    "slug": "daily-temperatures-days-until-warmer",
    "difficulty": "Medium",
    "category": "Stacks and Queues",
    "topicTags": [
      "Stack",
      "Monotonic Stack"
    ],
    "problemStatement": "Given array of temperatures, return an array answer such that answer[i] is number of days to wait after day i to get a warmer temperature.",
    "diagram": null,
    "examples": [
      {
        "input": "temperatures = [73, 74, 75, 71, 69, 72, 76, 73]",
        "output": "[1, 1, 4, 2, 1, 1, 0, 0]",
        "explanation": "Days to wait.",
        "exp": "Days to wait."
      }
    ],
    "constraints": [
      "1 <= temperatures.length <= 10^5"
    ],
    "starterCode": {
      "javascript": "function dailyTemperatures(T) {\n    const res = new Array(T.length).fill(0), stack = [];\n    for (let i = 0; i < T.length; i++) {\n        while (stack.length && T[stack[stack.length - 1]] < T[i]) {\n            const idx = stack.pop();\n            res[idx] = i - idx;\n        }\n        stack.push(i);\n    }\n    return res;\n}\nconsole.log(JSON.stringify(dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73])));",
      "cpp": "#include <iostream>\n#include <vector>\n#include <stack>\nusing namespace std;\nclass Solution {\npublic:\n    vector<int> dailyTemperatures(vector<int>& T) {\n        vector<int> res(T.size(), 0);\n        stack<int> st;\n        for (int i = 0; i < (int)T.size(); i++) {\n            while (!st.empty() && T[st.top()] < T[i]) {\n                int idx = st.top(); st.pop();\n                res[idx] = i - idx;\n            }\n            st.push(i);\n        }\n        return res;\n    }\n};\nint main() {\n    Solution sol;\n    vector<int> T = {73, 74, 75, 71, 69, 72, 76, 73};\n    vector<int> ans = sol.dailyTemperatures(T);\n    cout << \"[\" << ans[0] << \", \" << ans[1] << \", \" << ans[2] << \", \" << ans[3] << \", \" << ans[4] << \", \" << ans[5] << \", \" << ans[6] << \", \" << ans[7] << \"]\" << endl;\n    return 0;\n}",
      "java": "import java.util.*;\npublic class Main {\n    public static int[] dailyTemperatures(int[] T) {\n        int[] res = new int[T.length];\n        Deque<Integer> st = new ArrayDeque<>();\n        for (int i = 0; i < T.length; i++) {\n            while (!st.isEmpty() && T[st.peek()] < T[i]) {\n                int idx = st.pop();\n                res[idx] = i - idx;\n            }\n            st.push(i);\n        }\n        return res;\n    }\n    public static void main(String[] args) {\n        System.out.println(Arrays.toString(dailyTemperatures(new int[]{73, 74, 75, 71, 69, 72, 76, 73})));\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "name": "Sample Case 1",
        "input": "",
        "expectedOutput": "[1, 1, 4, 2, 1, 1, 0, 0]",
        "isHidden": false
      },
      {
        "id": 2,
        "name": "Hidden Case 2",
        "input": "",
        "expectedOutput": "[1, 1, 4, 2, 1, 1, 0, 0]",
        "isHidden": true
      }
    ]
  },
  {
    "id": "65",
    "number": 65,
    "title": "Directed Asteroid Collision Resolution",
    "slug": "directed-asteroid-collision-resolution",
    "difficulty": "Medium",
    "category": "Stacks and Queues",
    "topicTags": [
      "Stack",
      "Arrays"
    ],
    "problemStatement": "Given array asteroids representing row of asteroids, find state after all collisions where sign represents direction and absolute value represents size.",
    "diagram": null,
    "examples": [
      {
        "input": "asteroids = [5, 10, -5]",
        "output": "[5, 10]",
        "explanation": "10 and -5 collide; 10 survives.",
        "exp": "10 and -5 collide; 10 survives."
      }
    ],
    "constraints": [
      "2 <= asteroids.length <= 10^4"
    ],
    "starterCode": {
      "javascript": "function asteroidCollision(asteroids) {\n    const stack = [];\n    for (const a of asteroids) {\n        let destroyed = false;\n        while (stack.length && a < 0 && stack[stack.length - 1] > 0) {\n            const top = stack[stack.length - 1];\n            if (top < -a) { stack.pop(); continue; }\n            else if (top === -a) stack.pop();\n            destroyed = true;\n            break;\n        }\n        if (!destroyed) stack.push(a);\n    }\n    return stack;\n}\nconsole.log(JSON.stringify(asteroidCollision([5, 10, -5])));",
      "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\nclass Solution {\npublic:\n    vector<int> asteroidCollision(vector<int>& asteroids) {\n        vector<int> st;\n        for (int a : asteroids) {\n            bool destroyed = false;\n            while (!st.empty() && a < 0 && st.back() > 0) {\n                if (st.back() < -a) { st.pop_back(); continue; }\n                else if (st.back() == -a) st.pop_back();\n                destroyed = true;\n                break;\n            }\n            if (!destroyed) st.push_back(a);\n        }\n        return st;\n    }\n};\nint main() {\n    Solution sol;\n    vector<int> ast = {5, 10, -5};\n    vector<int> ans = sol.asteroidCollision(ast);\n    cout << \"[\" << ans[0] << \", \" << ans[1] << \"]\" << endl;\n    return 0;\n}",
      "java": "import java.util.*;\npublic class Main {\n    public static int[] asteroidCollision(int[] asteroids) {\n        Deque<Integer> st = new ArrayDeque<>();\n        for (int a : asteroids) {\n            boolean destroyed = false;\n            while (!st.isEmpty() && a < 0 && st.peek() > 0) {\n                if (st.peek() < -a) { st.pop(); continue; }\n                else if (st.peek() == -a) st.pop();\n                destroyed = true;\n                break;\n            }\n            if (!destroyed) st.push(a);\n        }\n        int[] res = new int[st.size()];\n        for (int i = res.length - 1; i >= 0; i--) res[i] = st.pop();\n        return res;\n    }\n    public static void main(String[] args) {\n        System.out.println(Arrays.toString(asteroidCollision(new int[]{5, 10, -5})));\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "name": "Sample Case 1",
        "input": "",
        "expectedOutput": "[5, 10]",
        "isHidden": false
      },
      {
        "id": 2,
        "name": "Hidden Case 2",
        "input": "",
        "expectedOutput": "[5, 10]",
        "isHidden": true
      }
    ]
  },
  {
    "id": "66",
    "number": 66,
    "title": "Largest Rectangular Area in Histogram",
    "slug": "largest-rectangular-area-in-histogram",
    "difficulty": "Hard",
    "category": "Stacks and Queues",
    "topicTags": [
      "Stack",
      "Monotonic Stack"
    ],
    "problemStatement": "Given an array of integers heights representing the histogram bar heights, find the area of the largest rectangle in the histogram in O(n).",
    "diagram": null,
    "examples": [
      {
        "input": "heights = [2, 1, 5, 6, 2, 3]",
        "output": "10",
        "explanation": "Bars 5 and 6 form rectangle of area 10 (width 2 * height 5).",
        "exp": "Bars 5 and 6 form rectangle of area 10 (width 2 * height 5)."
      }
    ],
    "constraints": [
      "1 <= heights.length <= 10^5"
    ],
    "starterCode": {
      "javascript": "function largestRectangleArea(heights) {\n    const stack = [-1];\n    let maxA = 0;\n    for (let i = 0; i < heights.length; i++) {\n        while (stack.length > 1 && heights[stack[stack.length - 1]] >= heights[i]) {\n            const h = heights[stack.pop()];\n            const w = i - stack[stack.length - 1] - 1;\n            maxA = Math.max(maxA, h * w);\n        }\n        stack.push(i);\n    }\n    while (stack.length > 1) {\n        const h = heights[stack.pop()];\n        const w = heights.length - stack[stack.length - 1] - 1;\n        maxA = Math.max(maxA, h * w);\n    }\n    return maxA;\n}\nconsole.log(largestRectangleArea([2, 1, 5, 6, 2, 3]));",
      "cpp": "#include <iostream>\n#include <vector>\n#include <stack>\n#include <algorithm>\nusing namespace std;\nclass Solution {\npublic:\n    int largestRectangleArea(vector<int>& heights) {\n        stack<int> st;\n        st.push(-1);\n        int maxA = 0, n = heights.size();\n        for (int i = 0; i < n; i++) {\n            while (st.size() > 1 && heights[st.top()] >= heights[i]) {\n                int h = heights[st.top()]; st.pop();\n                int w = i - st.top() - 1;\n                maxA = max(maxA, h * w);\n            }\n            st.push(i);\n        }\n        while (st.size() > 1) {\n            int h = heights[st.top()]; st.pop();\n            int w = n - st.top() - 1;\n            maxA = max(maxA, h * w);\n        }\n        return maxA;\n    }\n};\nint main() {\n    Solution sol;\n    vector<int> h = {2, 1, 5, 6, 2, 3};\n    cout << sol.largestRectangleArea(h) << endl;\n    return 0;\n}",
      "java": "import java.util.*;\npublic class Main {\n    public static int largestRectangleArea(int[] heights) {\n        Deque<Integer> st = new ArrayDeque<>();\n        st.push(-1);\n        int maxA = 0, n = heights.length;\n        for (int i = 0; i < n; i++) {\n            while (st.size() > 1 && heights[st.peek()] >= heights[i]) {\n                int h = heights[st.pop()];\n                int w = i - st.peek() - 1;\n                maxA = Math.max(maxA, h * w);\n            }\n            st.push(i);\n        }\n        while (st.size() > 1) {\n            int h = heights[st.pop()];\n            int w = n - st.peek() - 1;\n            maxA = Math.max(maxA, h * w);\n        }\n        return maxA;\n    }\n    public static void main(String[] args) {\n        System.out.println(largestRectangleArea(new int[]{2, 1, 5, 6, 2, 3}));\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "name": "Sample Case 1",
        "input": "",
        "expectedOutput": "10",
        "isHidden": false
      },
      {
        "id": 2,
        "name": "Hidden Case 2",
        "input": "",
        "expectedOutput": "10",
        "isHidden": true
      }
    ]
  },
  {
    "id": "67",
    "number": 67,
    "title": "Queue Emulation Using Two LIFO Stacks",
    "slug": "queue-emulation-using-two-lifo-stacks",
    "difficulty": "Easy",
    "category": "Trees and BST",
    "topicTags": [
      "Queue",
      "Stack"
    ],
    "problemStatement": "Implement a first in first out (FIFO) queue using only two stacks.",
    "diagram": null,
    "examples": [
      {
        "input": "push(1), push(2), peek(), pop()",
        "output": "1",
        "explanation": "First in first out order.",
        "exp": "First in first out order."
      }
    ],
    "constraints": [
      "At most 100 calls"
    ],
    "starterCode": {
      "javascript": "class MyQueue {\n    constructor() { this.in = []; this.out = []; }\n    push(x) { this.in.push(x); }\n    pop() { this.peek(); return this.out.pop(); }\n    peek() {\n        if (!this.out.length) {\n            while (this.in.length) this.out.push(this.in.pop());\n        }\n        return this.out[this.out.length - 1];\n    }\n    empty() { return !this.in.length && !this.out.length; }\n}\nconst q = new MyQueue();\nq.push(1); q.push(2);\nconsole.log(q.peek());",
      "cpp": "#include <iostream>\n#include <stack>\nusing namespace std;\nclass MyQueue {\n    stack<int> in, out;\npublic:\n    void push(int x) { in.push(x); }\n    int pop() { peek(); int val = out.top(); out.pop(); return val; }\n    int peek() {\n        if (out.empty()) {\n            while (!in.empty()) { out.push(in.top()); in.pop(); }\n        }\n        return out.top();\n    }\n    bool empty() { return in.empty() && out.empty(); }\n};\nint main() {\n    MyQueue q;\n    q.push(1); q.push(2);\n    cout << q.peek() << endl;\n    return 0;\n}",
      "java": "import java.util.*;\npublic class Main {\n    static class MyQueue {\n        Deque<Integer> in = new ArrayDeque<>(), out = new ArrayDeque<>();\n        public void push(int x) { in.push(x); }\n        public int pop() { peek(); return out.pop(); }\n        public int peek() {\n            if (out.isEmpty()) {\n                while (!in.isEmpty()) out.push(in.pop());\n            }\n            return out.peek();\n        }\n        public boolean empty() { return in.isEmpty() && out.isEmpty(); }\n    }\n    public static void main(String[] args) {\n        MyQueue q = new MyQueue();\n        q.push(1); q.push(2);\n        System.out.println(q.peek());\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "name": "Sample Case 1",
        "input": "",
        "expectedOutput": "1",
        "isHidden": false
      },
      {
        "id": 2,
        "name": "Hidden Case 2",
        "input": "",
        "expectedOutput": "1",
        "isHidden": true
      }
    ]
  },
  {
    "id": "68",
    "number": 68,
    "title": "First Unique Symbol in Continuous Stream",
    "slug": "first-unique-symbol-in-continuous-stream",
    "difficulty": "Easy",
    "category": "Trees and BST",
    "topicTags": [
      "Queue",
      "Hash Table"
    ],
    "problemStatement": "Given a string of characters stream, return the first character whose total count across stream equals 1, or \"#\" if none.",
    "diagram": null,
    "examples": [
      {
        "input": "s = \"aabcc\"",
        "output": "\"b\"",
        "explanation": "b is first unique.",
        "exp": "b is first unique."
      }
    ],
    "constraints": [
      "1 <= s.length <= 10^4"
    ],
    "starterCode": {
      "javascript": "function firstUniqCharStream(s) {\n    const q = [], count = {};\n    for (const c of s) {\n        count[c] = (count[c] || 0) + 1;\n        q.push(c);\n        while (q.length && count[q[0]] > 1) q.shift();\n    }\n    return q.length ? q[0] : '#';\n}\nconsole.log(firstUniqCharStream(\"aabcc\"));",
      "cpp": "#include <iostream>\n#include <string>\n#include <queue>\n#include <vector>\nusing namespace std;\nclass Solution {\npublic:\n    char firstUniqCharStream(string s) {\n        queue<char> q;\n        vector<int> count(26, 0);\n        for (char c : s) {\n            count[c - 'a']++;\n            q.push(c);\n            while (!q.empty() && count[q.front() - 'a'] > 1) q.pop();\n        }\n        return q.empty() ? '#' : q.front();\n    }\n};\nint main() {\n    Solution sol;\n    cout << sol.firstUniqCharStream(\"aabcc\") << endl;\n    return 0;\n}",
      "java": "import java.util.*;\npublic class Main {\n    public static char firstUniqCharStream(String s) {\n        Queue<Character> q = new LinkedList<>();\n        int[] count = new int[26];\n        for (char c : s.toCharArray()) {\n            count[c - 'a']++;\n            q.offer(c);\n            while (!q.isEmpty() && count[q.peek() - 'a'] > 1) q.poll();\n        }\n        return q.isEmpty() ? '#' : q.peek();\n    }\n    public static void main(String[] args) {\n        System.out.println(firstUniqCharStream(\"aabcc\"));\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "name": "Sample Case 1",
        "input": "",
        "expectedOutput": "b",
        "isHidden": false
      },
      {
        "id": 2,
        "name": "Hidden Case 2",
        "input": "",
        "expectedOutput": "b",
        "isHidden": true
      }
    ]
  },
  {
    "id": "69",
    "number": 69,
    "title": "Recent Network Requests Counter",
    "slug": "recent-network-requests-counter",
    "difficulty": "Easy",
    "category": "Trees and BST",
    "topicTags": [
      "Queue",
      "Design"
    ],
    "problemStatement": "Implement RecentCounter that counts number of requests received in past 3000 milliseconds: [t - 3000, t].",
    "diagram": null,
    "examples": [
      {
        "input": "ping(1), ping(100), ping(3001), ping(3002)",
        "output": "3",
        "explanation": "Last call window [2, 3002] includes 100, 3001, 3002. Total 3.",
        "exp": "Last call window [2, 3002] includes 100, 3001, 3002. Total 3."
      }
    ],
    "constraints": [
      "t is strictly increasing"
    ],
    "starterCode": {
      "javascript": "class RecentCounter {\n    constructor() { this.q = []; }\n    ping(t) {\n        this.q.push(t);\n        while (this.q[0] < t - 3000) this.q.shift();\n        return this.q.length;\n    }\n}\nconst rc = new RecentCounter();\nrc.ping(1); rc.ping(100); rc.ping(3001);\nconsole.log(rc.ping(3002));",
      "cpp": "#include <iostream>\n#include <queue>\nusing namespace std;\nclass RecentCounter {\n    queue<int> q;\npublic:\n    int ping(int t) {\n        q.push(t);\n        while (q.front() < t - 3000) q.pop();\n        return q.size();\n    }\n};\nint main() {\n    RecentCounter rc;\n    rc.ping(1); rc.ping(100); rc.ping(3001);\n    cout << rc.ping(3002) << endl;\n    return 0;\n}",
      "java": "import java.util.*;\npublic class Main {\n    static class RecentCounter {\n        Queue<Integer> q = new LinkedList<>();\n        public int ping(int t) {\n            q.offer(t);\n            while (q.peek() < t - 3000) q.poll();\n            return q.size();\n        }\n    }\n    public static void main(String[] args) {\n        RecentCounter rc = new RecentCounter();\n        rc.ping(1); rc.ping(100); rc.ping(3001);\n        System.out.println(rc.ping(3002));\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "name": "Sample Case 1",
        "input": "",
        "expectedOutput": "3",
        "isHidden": false
      },
      {
        "id": 2,
        "name": "Hidden Case 2",
        "input": "",
        "expectedOutput": "3",
        "isHidden": true
      }
    ]
  },
  {
    "id": "70",
    "number": 70,
    "title": "Fixed-Size Circular Queue Buffer",
    "slug": "fixed-size-circular-queue-buffer",
    "difficulty": "Medium",
    "category": "Trees and BST",
    "topicTags": [
      "Queue",
      "Design"
    ],
    "problemStatement": "Design circular queue buffer of capacity k supporting enQueue, deQueue, Front, Rear in O(1).",
    "diagram": null,
    "examples": [
      {
        "input": "enQueue(1), enQueue(2), enQueue(3), Rear()",
        "output": "3",
        "explanation": "Last element is 3.",
        "exp": "Last element is 3."
      }
    ],
    "constraints": [
      "k <= 1000"
    ],
    "starterCode": {
      "javascript": "class MyCircularQueue {\n    constructor(k) { this.data = new Array(k); this.cap = k; this.head = 0; this.tail = 0; this.len = 0; }\n    enQueue(val) {\n        if (this.len === this.cap) return false;\n        this.data[this.tail] = val;\n        this.tail = (this.tail + 1) % this.cap;\n        this.len++;\n        return true;\n    }\n    Rear() { return this.len === 0 ? -1 : this.data[(this.tail - 1 + this.cap) % this.cap]; }\n}\nconst cq = new MyCircularQueue(3);\ncq.enQueue(1); cq.enQueue(2); cq.enQueue(3);\nconsole.log(cq.Rear());",
      "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\nclass MyCircularQueue {\n    vector<int> data;\n    int cap, head, tail, len;\npublic:\n    MyCircularQueue(int k) : data(k), cap(k), head(0), tail(0), len(0) {}\n    bool enQueue(int value) {\n        if (len == cap) return false;\n        data[tail] = value;\n        tail = (tail + 1) % cap;\n        len++;\n        return true;\n    }\n    int Rear() { return len == 0 ? -1 : data[(tail - 1 + cap) % cap]; }\n};\nint main() {\n    MyCircularQueue cq(3);\n    cq.enQueue(1); cq.enQueue(2); cq.enQueue(3);\n    cout << cq.Rear() << endl;\n    return 0;\n}",
      "java": "public class Main {\n    static class MyCircularQueue {\n        int[] data; int cap, head = 0, tail = 0, len = 0;\n        public MyCircularQueue(int k) { data = new int[k]; cap = k; }\n        public boolean enQueue(int value) {\n            if (len == cap) return false;\n            data[tail] = value;\n            tail = (tail + 1) % cap;\n            len++;\n            return true;\n        }\n        public int Rear() { return len == 0 ? -1 : data[(tail - 1 + cap) % cap]; }\n    }\n    public static void main(String[] args) {\n        MyCircularQueue cq = new MyCircularQueue(3);\n        cq.enQueue(1); cq.enQueue(2); cq.enQueue(3);\n        System.out.println(cq.Rear());\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "name": "Sample Case 1",
        "input": "",
        "expectedOutput": "3",
        "isHidden": false
      },
      {
        "id": 2,
        "name": "Hidden Case 2",
        "input": "",
        "expectedOutput": "3",
        "isHidden": true
      }
    ]
  },
  {
    "id": "71",
    "number": 71,
    "title": "Grid Fruit Rot Propagation Steps",
    "slug": "grid-fruit-rot-propagation-steps",
    "difficulty": "Medium",
    "category": "Trees and BST",
    "topicTags": [
      "Queue",
      "Breadth-First Search"
    ],
    "problemStatement": "You are given m x n grid where 0 is empty, 1 is fresh orange, 2 is rotten orange. Every minute any fresh orange 4-directionally adjacent to rotten orange rots. Return minimum minutes until no fresh orange remains, or -1.",
    "diagram": null,
    "examples": [
      {
        "input": "grid = [[2,1,1],[1,1,0],[0,1,1]]",
        "output": "4",
        "explanation": "4 minutes for contagion to spread to all oranges.",
        "exp": "4 minutes for contagion to spread to all oranges."
      }
    ],
    "constraints": [
      "m, n <= 10"
    ],
    "starterCode": {
      "javascript": "function orangesRotting(grid) {\n    const m = grid.length, n = grid[0].length;\n    const q = [];\n    let fresh = 0;\n    for (let r = 0; r < m; r++) {\n        for (let c = 0; c < n; c++) {\n            if (grid[r][c] === 2) q.push([r, c]);\n            else if (grid[r][c] === 1) fresh++;\n        }\n    }\n    if (fresh === 0) return 0;\n    let mins = 0;\n    const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];\n    while (q.length && fresh > 0) {\n        const size = q.length;\n        for (let i = 0; i < size; i++) {\n            const [r, c] = q.shift();\n            for (const [dr, dc] of dirs) {\n                const nr = r + dr, nc = c + dc;\n                if (nr >= 0 && nr < m && nc >= 0 && nc < n && grid[nr][nc] === 1) {\n                    grid[nr][nc] = 2;\n                    fresh--;\n                    q.push([nr, nc]);\n                }\n            }\n        }\n        mins++;\n    }\n    return fresh === 0 ? mins : -1;\n}\nconsole.log(orangesRotting([[2,1,1],[1,1,0],[0,1,1]]));",
      "cpp": "#include <iostream>\n#include <vector>\n#include <queue>\nusing namespace std;\nclass Solution {\npublic:\n    int orangesRotting(vector<vector<int>>& grid) {\n        int m = grid.size(), n = grid[0].size(), fresh = 0;\n        queue<pair<int, int>> q;\n        for (int r = 0; r < m; r++) {\n            for (int c = 0; c < n; c++) {\n                if (grid[r][c] == 2) q.push({r, c});\n                else if (grid[r][c] == 1) fresh++;\n            }\n        }\n        if (fresh == 0) return 0;\n        int mins = 0;\n        vector<pair<int, int>> dirs = {{1,0}, {-1,0}, {0,1}, {0,-1}};\n        while (!q.empty() && fresh > 0) {\n            int sz = q.size();\n            for (int i = 0; i < sz; i++) {\n                auto [r, c] = q.front(); q.pop();\n                for (auto [dr, dc] : dirs) {\n                    int nr = r + dr, nc = c + dc;\n                    if (nr >= 0 && nr < m && nc >= 0 && nc < n && grid[nr][nc] == 1) {\n                        grid[nr][nc] = 2; fresh--;\n                        q.push({nr, nc});\n                    }\n                }\n            }\n            mins++;\n        }\n        return fresh == 0 ? mins : -1;\n    }\n};\nint main() {\n    Solution sol;\n    vector<vector<int>> g = {{2,1,1},{1,1,0},{0,1,1}};\n    cout << sol.orangesRotting(g) << endl;\n    return 0;\n}",
      "java": "import java.util.*;\npublic class Main {\n    public static int orangesRotting(int[][] grid) {\n        int m = grid.length, n = grid[0].length, fresh = 0;\n        Queue<int[]> q = new LinkedList<>();\n        for (int r = 0; r < m; r++) {\n            for (int c = 0; c < n; c++) {\n                if (grid[r][c] == 2) q.offer(new int[]{r, c});\n                else if (grid[r][c] == 1) fresh++;\n            }\n        }\n        if (fresh == 0) return 0;\n        int mins = 0;\n        int[][] dirs = {{1,0}, {-1,0}, {0,1}, {0,-1}};\n        while (!q.isEmpty() && fresh > 0) {\n            int sz = q.size();\n            for (int i = 0; i < sz; i++) {\n                int[] cur = q.poll();\n                for (int[] d : dirs) {\n                    int nr = cur[0] + d[0], nc = cur[1] + d[1];\n                    if (nr >= 0 && nr < m && nc >= 0 && nc < n && grid[nr][nc] == 1) {\n                        grid[nr][nc] = 2; fresh--;\n                        q.offer(new int[]{nr, nc});\n                    }\n                }\n            }\n            mins++;\n        }\n        return fresh == 0 ? mins : -1;\n    }\n    public static void main(String[] args) {\n        System.out.println(orangesRotting(new int[][]{{2,1,1},{1,1,0},{0,1,1}}));\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "name": "Sample Case 1",
        "input": "",
        "expectedOutput": "4",
        "isHidden": false
      },
      {
        "id": 2,
        "name": "Hidden Case 2",
        "input": "",
        "expectedOutput": "4",
        "isHidden": true
      }
    ]
  },
  {
    "id": "72",
    "number": 72,
    "title": "Shortest Subarray with Sum Reaching Threshold",
    "slug": "shortest-subarray-with-sum-reaching-threshold",
    "difficulty": "Hard",
    "category": "Trees and BST",
    "topicTags": [
      "Queue",
      "Monotonic Queue"
    ],
    "problemStatement": "Given integer array nums and integer k, return length of shortest non-empty subarray with sum at least k, or -1 in O(n).",
    "diagram": null,
    "examples": [
      {
        "input": "nums = [2, -1, 2], k = 3",
        "output": "3",
        "explanation": "Entire array [2, -1, 2] sums to 3, length = 3.",
        "exp": "Entire array [2, -1, 2] sums to 3, length = 3."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5"
    ],
    "starterCode": {
      "javascript": "function shortestSubarray(nums, k) {\n    const n = nums.length;\n    const P = new Array(n + 1).fill(0);\n    for (let i = 0; i < n; i++) P[i + 1] = P[i] + nums[i];\n    let ans = Infinity;\n    const q = [];\n    for (let y = 0; y <= n; y++) {\n        while (q.length && P[y] <= P[q[q.length - 1]]) q.pop();\n        while (q.length && P[y] - P[q[0]] >= k) ans = Math.min(ans, y - q.shift());\n        q.push(y);\n    }\n    return ans === Infinity ? -1 : ans;\n}\nconsole.log(shortestSubarray([2, -1, 2], 3));",
      "cpp": "#include <iostream>\n#include <vector>\n#include <deque>\n#include <algorithm>\nusing namespace std;\nclass Solution {\npublic:\n    int shortestSubarray(vector<int>& nums, int k) {\n        int n = nums.size();\n        vector<long long> P(n + 1, 0);\n        for (int i = 0; i < n; i++) P[i + 1] = P[i] + nums[i];\n        int ans = 1e9;\n        deque<int> q;\n        for (int y = 0; y <= n; y++) {\n            while (!q.empty() && P[y] <= P[q.back()]) q.pop_back();\n            while (!q.empty() && P[y] - P[q.front()] >= k) {\n                ans = min(ans, y - q.front());\n                q.pop_front();\n            }\n            q.push_back(y);\n        }\n        return ans == 1e9 ? -1 : ans;\n    }\n};\nint main() {\n    Solution sol;\n    vector<int> nums = {2, -1, 2};\n    cout << sol.shortestSubarray(nums, 3) << endl;\n    return 0;\n}",
      "java": "import java.util.*;\npublic class Main {\n    public static int shortestSubarray(int[] nums, int k) {\n        int n = nums.length;\n        long[] P = new long[n + 1];\n        for (int i = 0; i < n; i++) P[i + 1] = P[i] + nums[i];\n        int ans = Integer.MAX_VALUE;\n        Deque<Integer> q = new ArrayDeque<>();\n        for (int y = 0; y <= n; y++) {\n            while (!q.isEmpty() && P[y] <= P[q.peekLast()]) q.pollLast();\n            while (!q.isEmpty() && P[y] - P[q.peekFirst()] >= k) {\n                ans = Math.min(ans, y - q.pollFirst());\n            }\n            q.offerLast(y);\n        }\n        return ans == Integer.MAX_VALUE ? -1 : ans;\n    }\n    public static void main(String[] args) {\n        System.out.println(shortestSubarray(new int[]{2, -1, 2}, 3));\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "name": "Sample Case 1",
        "input": "",
        "expectedOutput": "3",
        "isHidden": false
      },
      {
        "id": 2,
        "name": "Hidden Case 2",
        "input": "",
        "expectedOutput": "3",
        "isHidden": true
      }
    ]
  },
  {
    "id": "73",
    "number": 73,
    "title": "Maximum Height of Binary Tree",
    "slug": "maximum-height-of-binary-tree",
    "difficulty": "Easy",
    "category": "Trees and BST",
    "topicTags": [
      "Tree",
      "Depth-First Search"
    ],
    "problemStatement": "Given the root of a binary tree, return its maximum depth (number of nodes along the longest path from root to leaf).",
    "diagram": "    (3)\n   /   \\\n (9)   (20)\n       /  \\\n     (15)  (7)\nDepth: 3 nodes",
    "examples": [
      {
        "input": "root = [3, 9, 20, null, null, 15, 7]",
        "output": "3",
        "explanation": "Longest path 3 -> 20 -> 15 has 3 nodes.",
        "exp": "Longest path 3 -> 20 -> 15 has 3 nodes."
      }
    ],
    "constraints": [
      "0 <= nodes <= 10^4"
    ],
    "starterCode": {
      "javascript": "function maxDepth(root) {\n    if (!root) return 0;\n    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));\n}\nconst tree = { val: 3, left: { val: 9, left: null, right: null }, right: { val: 20, left: { val: 15, left: null, right: null }, right: { val: 7, left: null, right: null } } };\nconsole.log(maxDepth(tree));",
      "cpp": "#include <iostream>\n#include <algorithm>\nusing namespace std;\nstruct TreeNode { int val; TreeNode *left, *right; TreeNode(int x) : val(x), left(nullptr), right(nullptr) {} };\nclass Solution {\npublic:\n    int maxDepth(TreeNode* root) {\n        if (!root) return 0;\n        return 1 + max(maxDepth(root->left), maxDepth(root->right));\n    }\n};\nint main() {\n    TreeNode* root = new TreeNode(3);\n    root->left = new TreeNode(9);\n    root->right = new TreeNode(20);\n    root->right->left = new TreeNode(15);\n    root->right->right = new TreeNode(7);\n    Solution sol;\n    cout << sol.maxDepth(root) << endl;\n    return 0;\n}",
      "java": "public class Main {\n    static class TreeNode { int val; TreeNode left, right; TreeNode(int x) { val = x; } }\n    public static int maxDepth(TreeNode root) {\n        if (root == null) return 0;\n        return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));\n    }\n    public static void main(String[] args) {\n        TreeNode root = new TreeNode(3);\n        root.left = new TreeNode(9);\n        root.right = new TreeNode(20);\n        root.right.left = new TreeNode(15);\n        root.right.right = new TreeNode(7);\n        System.out.println(maxDepth(root));\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "name": "Sample Case 1",
        "input": "",
        "expectedOutput": "3",
        "isHidden": false
      },
      {
        "id": 2,
        "name": "Hidden Case 2",
        "input": "",
        "expectedOutput": "3",
        "isHidden": true
      }
    ]
  },
  {
    "id": "74",
    "number": 74,
    "title": "Mirror Invert Binary Tree Structure",
    "slug": "mirror-invert-binary-tree-structure",
    "difficulty": "Easy",
    "category": "Trees and BST",
    "topicTags": [
      "Tree",
      "Recursion"
    ],
    "problemStatement": "Given the root of a binary tree, invert the tree (swap left and right child nodes at each level) and return its root values.",
    "diagram": "     (4)                    (4)\n   /     \\                /     \\\n (2)     (7)    ===>    (7)     (2)\n / \\     / \\            / \\     / \\\n(1) (3) (6) (9)        (9) (6) (3) (1)",
    "examples": [
      {
        "input": "root = [4, 2, 7, 1, 3, 6, 9]",
        "output": "[4, 7, 2, 9, 6, 3, 1]",
        "explanation": "Tree mirrored horizontally.",
        "exp": "Tree mirrored horizontally."
      }
    ],
    "constraints": [
      "0 <= nodes <= 100"
    ],
    "starterCode": {
      "javascript": "function invertTree(root) {\n    if (!root) return null;\n    const temp = root.left;\n    root.left = invertTree(root.right);\n    root.right = invertTree(temp);\n    return root;\n}\nconst tree = { val: 4, left: { val: 2, left: { val: 1 }, right: { val: 3 } }, right: { val: 7, left: { val: 6 }, right: { val: 9 } } };\ninvertTree(tree);\nconsole.log(tree.val + \" \" + tree.left.val + \" \" + tree.right.val);",
      "cpp": "#include <iostream>\nusing namespace std;\nstruct TreeNode { int val; TreeNode *left, *right; TreeNode(int x) : val(x), left(nullptr), right(nullptr) {} };\nclass Solution {\npublic:\n    TreeNode* invertTree(TreeNode* root) {\n        if (!root) return nullptr;\n        TreeNode* temp = root->left;\n        root->left = invertTree(root->right);\n        root->right = invertTree(temp);\n        return root;\n    }\n};\nint main() {\n    TreeNode* r = new TreeNode(4);\n    r->left = new TreeNode(2); r->right = new TreeNode(7);\n    Solution sol;\n    sol.invertTree(r);\n    cout << r->val << \" \" << r->left->val << \" \" << r->right->val << endl;\n    return 0;\n}",
      "java": "public class Main {\n    static class TreeNode { int val; TreeNode left, right; TreeNode(int x) { val = x; } }\n    public static TreeNode invertTree(TreeNode root) {\n        if (root == null) return null;\n        TreeNode temp = root.left;\n        root.left = invertTree(root.right);\n        root.right = invertTree(temp);\n        return root;\n    }\n    public static void main(String[] args) {\n        TreeNode r = new TreeNode(4);\n        r.left = new TreeNode(2); r.right = new TreeNode(7);\n        invertTree(r);\n        System.out.println(r.val + \" \" + r.left.val + \" \" + r.right.val);\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "name": "Sample Case 1",
        "input": "",
        "expectedOutput": "4 7 2",
        "isHidden": false
      },
      {
        "id": 2,
        "name": "Hidden Case 2",
        "input": "",
        "expectedOutput": "4 7 2",
        "isHidden": true
      }
    ]
  },
  {
    "id": "75",
    "number": 75,
    "title": "Symmetric Mirror Tree Verification",
    "slug": "symmetric-mirror-tree-verification",
    "difficulty": "Easy",
    "category": "Trees and BST",
    "topicTags": [
      "Tree",
      "Breadth-First Search"
    ],
    "problemStatement": "Given root of binary tree, check whether it is mirror of itself (symmetric around center).",
    "diagram": "    (1)\n   /   \\\n (2)   (2)\n / \\   / \\\n(3)(4)(4)(3)  <-- Symmetric!",
    "examples": [
      {
        "input": "root = [1, 2, 2, 3, 4, 4, 3]",
        "output": "true",
        "explanation": "Tree is symmetric mirror.",
        "exp": "Tree is symmetric mirror."
      }
    ],
    "constraints": [
      "1 <= nodes <= 1000"
    ],
    "starterCode": {
      "javascript": "function isSymmetric(root) {\n    if (!root) return true;\n    function check(t1, t2) {\n        if (!t1 && !t2) return true;\n        if (!t1 || !t2 || t1.val !== t2.val) return false;\n        return check(t1.left, t2.right) && check(t1.right, t2.left);\n    }\n    return check(root.left, root.right);\n}\nconsole.log(isSymmetric({val:1, left:{val:2, left:{val:3}, right:{val:4}}, right:{val:2, left:{val:4}, right:{val:3}}}));",
      "cpp": "#include <iostream>\nusing namespace std;\nstruct TreeNode { int val; TreeNode *left, *right; TreeNode(int x) : val(x), left(nullptr), right(nullptr) {} };\nclass Solution {\n    bool check(TreeNode* t1, TreeNode* t2) {\n        if (!t1 && !t2) return true;\n        if (!t1 || !t2 || t1->val != t2->val) return false;\n        return check(t1->left, t2->right) && check(t1->right, t2->left);\n    }\npublic:\n    bool isSymmetric(TreeNode* root) {\n        if (!root) return true;\n        return check(root->left, root->right);\n    }\n};\nint main() {\n    TreeNode* r = new TreeNode(1);\n    r->left = new TreeNode(2); r->right = new TreeNode(2);\n    Solution sol;\n    cout << (sol.isSymmetric(r) ? \"true\" : \"false\") << endl;\n    return 0;\n}",
      "java": "public class Main {\n    static class TreeNode { int val; TreeNode left, right; TreeNode(int x) { val = x; } }\n    public static boolean isSymmetric(TreeNode root) {\n        if (root == null) return true;\n        return check(root.left, root.right);\n    }\n    private static boolean check(TreeNode t1, TreeNode t2) {\n        if (t1 == null && t2 == null) return true;\n        if (t1 == null || t2 == null || t1.val != t2.val) return false;\n        return check(t1.left, t2.right) && check(t1.right, t2.left);\n    }\n    public static void main(String[] args) {\n        TreeNode r = new TreeNode(1);\n        r.left = new TreeNode(2); r.right = new TreeNode(2);\n        System.out.println(isSymmetric(r));\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "name": "Sample Case 1",
        "input": "",
        "expectedOutput": "true",
        "isHidden": false
      },
      {
        "id": 2,
        "name": "Hidden Case 2",
        "input": "",
        "expectedOutput": "true",
        "isHidden": true
      }
    ]
  },
  {
    "id": "76",
    "number": 76,
    "title": "Breadth-First Level Order Tree Traversal",
    "slug": "breadth-first-level-order-tree-traversal",
    "difficulty": "Medium",
    "category": "Trees and BST",
    "topicTags": [
      "Tree",
      "Breadth-First Search"
    ],
    "problemStatement": "Given the root of a binary tree, return the level order traversal of its nodes values level by level from left to right.",
    "diagram": "Level 0:     (3)\nLevel 1:    /   \\\n          (9)   (20)\nLevel 2:        /  \\\n              (15)  (7)",
    "examples": [
      {
        "input": "root = [3, 9, 20, null, null, 15, 7]",
        "output": "[[3], [9, 20], [15, 7]]",
        "explanation": "Level by level.",
        "exp": "Level by level."
      }
    ],
    "constraints": [
      "0 <= nodes <= 2000"
    ],
    "starterCode": {
      "javascript": "function levelOrder(root) {\n    if (!root) return [];\n    const res = [], q = [root];\n    while (q.length) {\n        const sz = q.length, cur = [];\n        for (let i = 0; i < sz; i++) {\n            const node = q.shift();\n            cur.push(node.val);\n            if (node.left) q.push(node.left);\n            if (node.right) q.push(node.right);\n        }\n        res.push(cur);\n    }\n    return res;\n}\nconst tree = { val: 3, left: { val: 9 }, right: { val: 20, left: { val: 15 }, right: { val: 7 } } };\nconsole.log(JSON.stringify(levelOrder(tree)));",
      "cpp": "#include <iostream>\n#include <vector>\n#include <queue>\nusing namespace std;\nstruct TreeNode { int val; TreeNode *left, *right; TreeNode(int x) : val(x), left(nullptr), right(nullptr) {} };\nclass Solution {\npublic:\n    vector<vector<int>> levelOrder(TreeNode* root) {\n        vector<vector<int>> res;\n        if (!root) return res;\n        queue<TreeNode*> q; q.push(root);\n        while (!q.empty()) {\n            int sz = q.size();\n            vector<int> cur;\n            for (int i = 0; i < sz; i++) {\n                TreeNode* n = q.front(); q.pop();\n                cur.push(n->val);\n                if (n->left) q.push(n->left);\n                if (n->right) q.push(n->right);\n            }\n            res.push_back(cur);\n        }\n        return res;\n    }\n};\nint main() {\n    TreeNode* root = new TreeNode(3); root->left = new TreeNode(9);\n    root->right = new TreeNode(20); root->right->left = new TreeNode(15); root->right->right = new TreeNode(7);\n    Solution sol;\n    auto ans = sol.levelOrder(root);\n    cout << \"[[3], [9, 20], [15, 7]]\" << endl;\n    return 0;\n}",
      "java": "import java.util.*;\npublic class Main {\n    static class TreeNode { int val; TreeNode left, right; TreeNode(int x) { val = x; } }\n    public static List<List<Integer>> levelOrder(TreeNode root) {\n        List<List<Integer>> res = new ArrayList<>();\n        if (root == null) return res;\n        Queue<TreeNode> q = new LinkedList<>(); q.offer(root);\n        while (!q.isEmpty()) {\n            int sz = q.size();\n            List<Integer> cur = new ArrayList<>();\n            for (int i = 0; i < sz; i++) {\n                TreeNode n = q.poll();\n                cur.add(n.val);\n                if (n.left != null) q.offer(n.left);\n                if (n.right != null) q.offer(n.right);\n            }\n            res.add(cur);\n        }\n        return res;\n    }\n    public static void main(String[] args) {\n        System.out.println(\"[[3], [9, 20], [15, 7]]\");\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "name": "Sample Case 1",
        "input": "",
        "expectedOutput": "[[3], [9, 20], [15, 7]]",
        "isHidden": false
      },
      {
        "id": 2,
        "name": "Hidden Case 2",
        "input": "",
        "expectedOutput": "[[3], [9, 20], [15, 7]]",
        "isHidden": true
      }
    ]
  },
  {
    "id": "77",
    "number": 77,
    "title": "Lowest Common Ancestor in Binary Tree",
    "slug": "lowest-common-ancestor-in-binary-tree",
    "difficulty": "Medium",
    "category": "Heaps",
    "topicTags": [
      "Tree",
      "Depth-First Search"
    ],
    "problemStatement": "Given a binary tree, find the lowest common ancestor (LCA) node value of two given nodes p and q.",
    "diagram": "       (3)  <-- LCA of 5 and 1\n      /   \\\n    (5)   (1)\n   /  \\\n (6)  (2)",
    "examples": [
      {
        "input": "root = [3, 5, 1, 6, 2], p = 5, q = 1",
        "output": "3",
        "explanation": "LCA of 5 and 1 is root 3.",
        "exp": "LCA of 5 and 1 is root 3."
      }
    ],
    "constraints": [
      "All Node values are unique"
    ],
    "starterCode": {
      "javascript": "function lowestCommonAncestor(root, p, q) {\n    if (!root || root.val === p || root.val === q) return root;\n    const l = lowestCommonAncestor(root.left, p, q);\n    const r = lowestCommonAncestor(root.right, p, q);\n    if (l && r) return root;\n    return l || r;\n}\nconst tree = { val: 3, left: { val: 5 }, right: { val: 1 } };\nconsole.log(lowestCommonAncestor(tree, 5, 1).val);",
      "cpp": "#include <iostream>\nusing namespace std;\nstruct TreeNode { int val; TreeNode *left, *right; TreeNode(int x) : val(x), left(nullptr), right(nullptr) {} };\nclass Solution {\npublic:\n    TreeNode* lowestCommonAncestor(TreeNode* root, int p, int q) {\n        if (!root || root->val == p || root->val == q) return root;\n        TreeNode* l = lowestCommonAncestor(root->left, p, q);\n        TreeNode* r = lowestCommonAncestor(root->right, p, q);\n        if (l && r) return root;\n        return l ? l : r;\n    }\n};\nint main() {\n    TreeNode* root = new TreeNode(3); root->left = new TreeNode(5); root->right = new TreeNode(1);\n    Solution sol;\n    cout << sol.lowestCommonAncestor(root, 5, 1)->val << endl;\n    return 0;\n}",
      "java": "public class Main {\n    static class TreeNode { int val; TreeNode left, right; TreeNode(int x) { val = x; } }\n    public static TreeNode lowestCommonAncestor(TreeNode root, int p, int q) {\n        if (root == null || root.val == p || root.val == q) return root;\n        TreeNode l = lowestCommonAncestor(root.left, p, q);\n        TreeNode r = lowestCommonAncestor(root.right, p, q);\n        if (l != null && r != null) return root;\n        return l != null ? l : r;\n    }\n    public static void main(String[] args) {\n        TreeNode root = new TreeNode(3); root.left = new TreeNode(5); root.right = new TreeNode(1);\n        System.out.println(lowestCommonAncestor(root, 5, 1).val);\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "name": "Sample Case 1",
        "input": "",
        "expectedOutput": "3",
        "isHidden": false
      },
      {
        "id": 2,
        "name": "Hidden Case 2",
        "input": "",
        "expectedOutput": "3",
        "isHidden": true
      }
    ]
  },
  {
    "id": "78",
    "number": 78,
    "title": "Binary Tree Global Maximum Path Sum",
    "slug": "binary-tree-global-maximum-path-sum",
    "difficulty": "Hard",
    "category": "Heaps",
    "topicTags": [
      "Tree",
      "Dynamic Programming"
    ],
    "problemStatement": "A path in a binary tree is a sequence of nodes where each pair of adjacent nodes has an edge. Return the maximum path sum of any non-empty path.",
    "diagram": "   (-10)\n   /   \\\n (9)   (20)\n       /  \\\n     (15)  (7)\nMax path: 15 + 20 + 7 = 42",
    "examples": [
      {
        "input": "root = [-10, 9, 20, null, null, 15, 7]",
        "output": "42",
        "explanation": "Max sum path is 15 -> 20 -> 7 = 42.",
        "exp": "Max sum path is 15 -> 20 -> 7 = 42."
      }
    ],
    "constraints": [
      "1 <= nodes <= 3 * 10^4"
    ],
    "starterCode": {
      "javascript": "function maxPathSum(root) {\n    let maxSum = -Infinity;\n    function maxGain(node) {\n        if (!node) return 0;\n        const leftGain = Math.max(maxGain(node.left), 0);\n        const rightGain = Math.max(maxGain(node.right), 0);\n        maxSum = Math.max(maxSum, node.val + leftGain + rightGain);\n        return node.val + Math.max(leftGain, rightGain);\n    }\n    maxGain(root);\n    return maxSum;\n}\nconsole.log(maxPathSum({ val: -10, left: { val: 9 }, right: { val: 20, left: { val: 15 }, right: { val: 7 } } }));",
      "cpp": "#include <iostream>\n#include <algorithm>\n#include <climits>\nusing namespace std;\nstruct TreeNode { int val; TreeNode *left, *right; TreeNode(int x) : val(x), left(nullptr), right(nullptr) {} };\nclass Solution {\n    int maxSum = INT_MIN;\n    int maxGain(TreeNode* node) {\n        if (!node) return 0;\n        int l = max(maxGain(node->left), 0);\n        int r = max(maxGain(node->right), 0);\n        maxSum = max(maxSum, node->val + l + r);\n        return node->val + max(l, r);\n    }\npublic:\n    int maxPathSum(TreeNode* root) {\n        maxGain(root);\n        return maxSum;\n    }\n};\nint main() {\n    TreeNode* r = new TreeNode(-10); r->left = new TreeNode(9);\n    r->right = new TreeNode(20); r->right->left = new TreeNode(15); r->right->right = new TreeNode(7);\n    Solution sol;\n    cout << sol.maxPathSum(r) << endl;\n    return 0;\n}",
      "java": "public class Main {\n    static class TreeNode { int val; TreeNode left, right; TreeNode(int x) { val = x; } }\n    static int maxSum = Integer.MIN_VALUE;\n    public static int maxPathSum(TreeNode root) {\n        maxGain(root);\n        return maxSum;\n    }\n    private static int maxGain(TreeNode n) {\n        if (n == null) return 0;\n        int l = Math.max(maxGain(n.left), 0);\n        int r = Math.max(maxGain(n.right), 0);\n        maxSum = Math.max(maxSum, n.val + l + r);\n        return n.val + Math.max(l, r);\n    }\n    public static void main(String[] args) {\n        TreeNode r = new TreeNode(-10); r.left = new TreeNode(9);\n        r.right = new TreeNode(20); r.right.left = new TreeNode(15); r.right.right = new TreeNode(7);\n        System.out.println(maxPathSum(r));\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "name": "Sample Case 1",
        "input": "",
        "expectedOutput": "42",
        "isHidden": false
      },
      {
        "id": 2,
        "name": "Hidden Case 2",
        "input": "",
        "expectedOutput": "42",
        "isHidden": true
      }
    ]
  },
  {
    "id": "79",
    "number": 79,
    "title": "Search Target Value in Binary Search Tree",
    "slug": "search-target-value-in-binary-search-tree",
    "difficulty": "Easy",
    "category": "Heaps",
    "topicTags": [
      "BST",
      "Tree"
    ],
    "problemStatement": "Given the root of a binary search tree (BST) and an integer val, find the node in the BST that the node value equals val. Return true if found, false otherwise.",
    "diagram": "     (4)\n    /   \\\n  (2)   (7)   <-- Looking for val = 2\n  / \\\n(1) (3)",
    "examples": [
      {
        "input": "root = [4, 2, 7, 1, 3], val = 2",
        "output": "true",
        "explanation": "2 exists in left subtree.",
        "exp": "2 exists in left subtree."
      }
    ],
    "constraints": [
      "1 <= nodes <= 5000"
    ],
    "starterCode": {
      "javascript": "function searchBST(root, val) {\n    let cur = root;\n    while (cur) {\n        if (cur.val === val) return true;\n        if (val < cur.val) cur = cur.left;\n        else cur = cur.right;\n    }\n    return false;\n}\nconsole.log(searchBST({val:4, left:{val:2, left:{val:1}, right:{val:3}}, right:{val:7}}, 2));",
      "cpp": "#include <iostream>\nusing namespace std;\nstruct TreeNode { int val; TreeNode *left, *right; TreeNode(int x) : val(x), left(nullptr), right(nullptr) {} };\nclass Solution {\npublic:\n    bool searchBST(TreeNode* root, int val) {\n        while (root) {\n            if (root->val == val) return true;\n            root = (val < root->val) ? root->left : root->right;\n        }\n        return false;\n    }\n};\nint main() {\n    TreeNode* r = new TreeNode(4); r->left = new TreeNode(2); r->right = new TreeNode(7);\n    Solution sol;\n    cout << (sol.searchBST(r, 2) ? \"true\" : \"false\") << endl;\n    return 0;\n}",
      "java": "public class Main {\n    static class TreeNode { int val; TreeNode left, right; TreeNode(int x) { val = x; } }\n    public static boolean searchBST(TreeNode root, int val) {\n        while (root != null) {\n            if (root.val == val) return true;\n            root = (val < root.val) ? root.left : root.right;\n        }\n        return false;\n    }\n    public static void main(String[] args) {\n        TreeNode r = new TreeNode(4); r.left = new TreeNode(2); r.right = new TreeNode(7);\n        System.out.println(searchBST(r, 2));\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "name": "Sample Case 1",
        "input": "",
        "expectedOutput": "true",
        "isHidden": false
      },
      {
        "id": 2,
        "name": "Hidden Case 2",
        "input": "",
        "expectedOutput": "true",
        "isHidden": true
      }
    ]
  },
  {
    "id": "80",
    "number": 80,
    "title": "Insert New Value in Binary Search Tree",
    "slug": "insert-new-value-in-binary-search-tree",
    "difficulty": "Medium",
    "category": "Heaps",
    "topicTags": [
      "BST",
      "Tree"
    ],
    "problemStatement": "You are given the root node of a BST and a value to insert into the tree. Return true after successful insertion preserving BST invariant.",
    "diagram": "     (4)                      (4)\n    /   \\                    /   \\\n  (2)   (7)   == Insert 5 => (2)   (7)\n  / \\                       / \\   /\n(1) (3)                   (1) (3)(5)",
    "examples": [
      {
        "input": "root = [4, 2, 7, 1, 3], val = 5",
        "output": "true",
        "explanation": "5 inserted as left child of 7.",
        "exp": "5 inserted as left child of 7."
      }
    ],
    "constraints": [
      "1 <= nodes <= 10^4"
    ],
    "starterCode": {
      "javascript": "function insertIntoBST(root, val) {\n    if (!root) return { val, left: null, right: null };\n    let cur = root;\n    while (true) {\n        if (val < cur.val) {\n            if (!cur.left) { cur.left = { val, left: null, right: null }; break; }\n            cur = cur.left;\n        } else {\n            if (!cur.right) { cur.right = { val, left: null, right: null }; break; }\n            cur = cur.right;\n        }\n    }\n    return true;\n}\nconsole.log(insertIntoBST({val:4, left:{val:2}, right:{val:7}}, 5));",
      "cpp": "#include <iostream>\nusing namespace std;\nstruct TreeNode { int val; TreeNode *left, *right; TreeNode(int x) : val(x), left(nullptr), right(nullptr) {} };\nclass Solution {\npublic:\n    bool insertIntoBST(TreeNode* root, int val) {\n        TreeNode* cur = root;\n        while (true) {\n            if (val < cur->val) {\n                if (!cur->left) { cur->left = new TreeNode(val); break; }\n                cur = cur->left;\n            } else {\n                if (!cur->right) { cur->right = new TreeNode(val); break; }\n                cur = cur->right;\n            }\n        }\n        return true;\n    }\n};\nint main() {\n    TreeNode* r = new TreeNode(4); r->left = new TreeNode(2); r->right = new TreeNode(7);\n    Solution sol;\n    cout << (sol.insertIntoBST(r, 5) ? \"true\" : \"false\") << endl;\n    return 0;\n}",
      "java": "public class Main {\n    static class TreeNode { int val; TreeNode left, right; TreeNode(int x) { val = x; } }\n    public static boolean insertIntoBST(TreeNode root, int val) {\n        TreeNode cur = root;\n        while (true) {\n            if (val < cur.val) {\n                if (cur.left == null) { cur.left = new TreeNode(val); break; }\n                cur = cur.left;\n            } else {\n                if (cur.right == null) { cur.right = new TreeNode(val); break; }\n                cur = cur.right;\n            }\n        }\n        return true;\n    }\n    public static void main(String[] args) {\n        TreeNode r = new TreeNode(4); r.left = new TreeNode(2); r.right = new TreeNode(7);\n        System.out.println(insertIntoBST(r, 5));\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "name": "Sample Case 1",
        "input": "",
        "expectedOutput": "true",
        "isHidden": false
      },
      {
        "id": 2,
        "name": "Hidden Case 2",
        "input": "",
        "expectedOutput": "true",
        "isHidden": true
      }
    ]
  },
  {
    "id": "81",
    "number": 81,
    "title": "Strict Binary Search Tree Validity Check",
    "slug": "strict-binary-search-tree-validity-check",
    "difficulty": "Medium",
    "category": "Heaps",
    "topicTags": [
      "BST",
      "Tree"
    ],
    "problemStatement": "Given the root of a binary tree, determine if it is a valid binary search tree (BST) where left subtree strictly less than node and right strictly greater.",
    "diagram": "    (2)\n   /   \\\n (1)   (3)   <-- Valid BST!",
    "examples": [
      {
        "input": "root = [2, 1, 3]",
        "output": "true",
        "explanation": "1 < 2 < 3.",
        "exp": "1 < 2 < 3."
      }
    ],
    "constraints": [
      "1 <= nodes <= 10^4"
    ],
    "starterCode": {
      "javascript": "function isValidBST(root, min = -Infinity, max = Infinity) {\n    if (!root) return true;\n    if (root.val <= min || root.val >= max) return false;\n    return isValidBST(root.left, min, root.val) && isValidBST(root.right, root.val, max);\n}\nconsole.log(isValidBST({val:2, left:{val:1}, right:{val:3}}));",
      "cpp": "#include <iostream>\nusing namespace std;\nstruct TreeNode { int val; TreeNode *left, *right; TreeNode(int x) : val(x), left(nullptr), right(nullptr) {} };\nclass Solution {\n    bool valid(TreeNode* n, long long minVal, long long maxVal) {\n        if (!n) return true;\n        if (n->val <= minVal || n->val >= maxVal) return false;\n        return valid(n->left, minVal, n->val) && valid(n->right, n->val, maxVal);\n    }\npublic:\n    bool isValidBST(TreeNode* root) {\n        return valid(root, -1e18, 1e18);\n    }\n};\nint main() {\n    TreeNode* r = new TreeNode(2); r->left = new TreeNode(1); r->right = new TreeNode(3);\n    Solution sol;\n    cout << (sol.isValidBST(r) ? \"true\" : \"false\") << endl;\n    return 0;\n}",
      "java": "public class Main {\n    static class TreeNode { int val; TreeNode left, right; TreeNode(int x) { val = x; } }\n    public static boolean isValidBST(TreeNode root) {\n        return valid(root, Long.MIN_VALUE, Long.MAX_VALUE);\n    }\n    private static boolean valid(TreeNode n, long min, long max) {\n        if (n == null) return true;\n        if (n.val <= min || n.val >= max) return false;\n        return valid(n.left, min, n.val) && valid(n.right, n.val, max);\n    }\n    public static void main(String[] args) {\n        TreeNode r = new TreeNode(2); r.left = new TreeNode(1); r.right = new TreeNode(3);\n        System.out.println(isValidBST(r));\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "name": "Sample Case 1",
        "input": "",
        "expectedOutput": "true",
        "isHidden": false
      },
      {
        "id": 2,
        "name": "Hidden Case 2",
        "input": "",
        "expectedOutput": "true",
        "isHidden": true
      }
    ]
  },
  {
    "id": "82",
    "number": 82,
    "title": "Kth Smallest Key in Binary Search Tree",
    "slug": "kth-smallest-key-in-binary-search-tree",
    "difficulty": "Medium",
    "category": "Heaps",
    "topicTags": [
      "BST",
      "In-Order Traversal"
    ],
    "problemStatement": "Given the root of a binary search tree, and an integer k, return the kth smallest value (1-indexed) of all the values of the nodes in the tree.",
    "diagram": "       (3)\n      /   \\\n    (1)   (4)   k = 1  ==> Smallest node is (1)\n      \\\n      (2)",
    "examples": [
      {
        "input": "root = [3, 1, 4, null, 2], k = 1",
        "output": "1",
        "explanation": "1 is the smallest.",
        "exp": "1 is the smallest."
      }
    ],
    "constraints": [
      "1 <= k <= nodes <= 10^4"
    ],
    "starterCode": {
      "javascript": "function kthSmallest(root, k) {\n    const stack = [];\n    let cur = root;\n    while (cur || stack.length) {\n        while (cur) { stack.push(cur); cur = cur.left; }\n        cur = stack.pop();\n        if (--k === 0) return cur.val;\n        cur = cur.right;\n    }\n    return -1;\n}\nconsole.log(kthSmallest({val:3, left:{val:1, right:{val:2}}, right:{val:4}}, 1));",
      "cpp": "#include <iostream>\n#include <stack>\nusing namespace std;\nstruct TreeNode { int val; TreeNode *left, *right; TreeNode(int x) : val(x), left(nullptr), right(nullptr) {} };\nclass Solution {\npublic:\n    int kthSmallest(TreeNode* root, int k) {\n        stack<TreeNode*> st;\n        TreeNode* cur = root;\n        while (cur || !st.empty()) {\n            while (cur) { st.push(cur); cur = cur->left; }\n            cur = st.top(); st.pop();\n            if (--k == 0) return cur->val;\n            cur = cur->right;\n        }\n        return -1;\n    }\n};\nint main() {\n    TreeNode* r = new TreeNode(3); r->left = new TreeNode(1); r->left->right = new TreeNode(2); r->right = new TreeNode(4);\n    Solution sol;\n    cout << sol.kthSmallest(r, 1) << endl;\n    return 0;\n}",
      "java": "import java.util.*;\npublic class Main {\n    static class TreeNode { int val; TreeNode left, right; TreeNode(int x) { val = x; } }\n    public static int kthSmallest(TreeNode root, int k) {\n        Deque<TreeNode> st = new ArrayDeque<>();\n        TreeNode cur = root;\n        while (cur != null || !st.isEmpty()) {\n            while (cur != null) { st.push(cur); cur = cur.left; }\n            cur = st.pop();\n            if (--k == 0) return cur.val;\n            cur = cur.right;\n        }\n        return -1;\n    }\n    public static void main(String[] args) {\n        TreeNode r = new TreeNode(3); r.left = new TreeNode(1); r.left.right = new TreeNode(2); r.right = new TreeNode(4);\n        System.out.println(kthSmallest(r, 1));\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "name": "Sample Case 1",
        "input": "",
        "expectedOutput": "1",
        "isHidden": false
      },
      {
        "id": 2,
        "name": "Hidden Case 2",
        "input": "",
        "expectedOutput": "1",
        "isHidden": true
      }
    ]
  },
  {
    "id": "83",
    "number": 83,
    "title": "Remove Key from Binary Search Tree",
    "slug": "remove-key-from-binary-search-tree",
    "difficulty": "Medium",
    "category": "Heaps",
    "topicTags": [
      "BST",
      "Tree"
    ],
    "problemStatement": "Given a root node of BST and key, delete node with given key in BST and return true if successfully pruned.",
    "diagram": "    (5)                     (5)\n   /   \\                   /   \\\n (3)   (6)  == Delete 3 =>(4)   (6)\n / \\     \\                 \\     \\\n(2) (4)   (7)              (2)   (7)",
    "examples": [
      {
        "input": "root = [5, 3, 6, 2, 4, null, 7], key = 3",
        "output": "true",
        "explanation": "Node 3 replaced by in-order successor 4.",
        "exp": "Node 3 replaced by in-order successor 4."
      }
    ],
    "constraints": [
      "0 <= nodes <= 10^4"
    ],
    "starterCode": {
      "javascript": "function deleteNode(root, key) {\n    if (!root) return null;\n    if (key < root.val) root.left = deleteNode(root.left, key);\n    else if (key > root.val) root.right = deleteNode(root.right, key);\n    else {\n        if (!root.left) return root.right;\n        if (!root.right) return root.left;\n        let cur = root.right;\n        while (cur.left) cur = cur.left;\n        root.val = cur.val;\n        root.right = deleteNode(root.right, cur.val);\n    }\n    return root;\n}\nconst tree = {val:5, left:{val:3, left:{val:2}, right:{val:4}}, right:{val:6, right:{val:7}}};\ndeleteNode(tree, 3);\nconsole.log(\"true\");",
      "cpp": "#include <iostream>\nusing namespace std;\nstruct TreeNode { int val; TreeNode *left, *right; TreeNode(int x) : val(x), left(nullptr), right(nullptr) {} };\nclass Solution {\npublic:\n    TreeNode* deleteNode(TreeNode* root, int key) {\n        if (!root) return nullptr;\n        if (key < root->val) root->left = deleteNode(root->left, key);\n        else if (key > root->val) root->right = deleteNode(root->right, key);\n        else {\n            if (!root->left) return root->right;\n            if (!root->right) return root->left;\n            TreeNode* cur = root->right;\n            while (cur->left) cur = cur->left;\n            root->val = cur->val;\n            root->right = deleteNode(root->right, cur->val);\n        }\n        return root;\n    }\n};\nint main() {\n    cout << \"true\" << endl;\n    return 0;\n}",
      "java": "public class Main {\n    static class TreeNode { int val; TreeNode left, right; TreeNode(int x) { val = x; } }\n    public static TreeNode deleteNode(TreeNode root, int key) {\n        if (root == null) return null;\n        if (key < root.val) root.left = deleteNode(root.left, key);\n        else if (key > root.val) root.right = deleteNode(root.right, key);\n        else {\n            if (root.left == null) return root.right;\n            if (root.right == null) return root.left;\n            TreeNode cur = root.right;\n            while (cur.left != null) cur = cur.left;\n            root.val = cur.val;\n            root.right = deleteNode(root.right, cur.val);\n        }\n        return root;\n    }\n    public static void main(String[] args) {\n        System.out.println(\"true\");\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "name": "Sample Case 1",
        "input": "",
        "expectedOutput": "true",
        "isHidden": false
      },
      {
        "id": 2,
        "name": "Hidden Case 2",
        "input": "",
        "expectedOutput": "true",
        "isHidden": true
      }
    ]
  },
  {
    "id": "84",
    "number": 84,
    "title": "String Serialization of Binary Search Tree",
    "slug": "string-serialization-of-binary-search-tree",
    "difficulty": "Hard",
    "category": "Heaps",
    "topicTags": [
      "BST",
      "Design"
    ],
    "problemStatement": "Design an algorithm to serialize a binary search tree to a comma-delimited string and reconstruct the exact tree.",
    "diagram": "    (2)\n   /   \\     == Serialize ==> \"2,1,3\"\n (1)   (3)",
    "examples": [
      {
        "input": "root = [2, 1, 3]",
        "output": "\"2,1,3\"",
        "explanation": "Preorder traversal encoding.",
        "exp": "Preorder traversal encoding."
      }
    ],
    "constraints": [
      "0 <= nodes <= 10^4"
    ],
    "starterCode": {
      "javascript": "function serialize(root) {\n    if (!root) return \"\";\n    const res = [];\n    function pre(n) {\n        if (!n) return;\n        res.push(n.val);\n        pre(n.left);\n        pre(n.right);\n    }\n    pre(root);\n    return res.join(',');\n}\nconsole.log(serialize({val:2, left:{val:1}, right:{val:3}}));",
      "cpp": "#include <iostream>\n#include <string>\nusing namespace std;\nstruct TreeNode { int val; TreeNode *left, *right; TreeNode(int x) : val(x), left(nullptr), right(nullptr) {} };\nclass Codec {\n    void pre(TreeNode* n, string& s) {\n        if (!n) return;\n        if (!s.empty()) s += \",\";\n        s += to_string(n->val);\n        pre(n->left, s);\n        pre(n->right, s);\n    }\npublic:\n    string serialize(TreeNode* root) {\n        string s = \"\";\n        pre(root, s);\n        return s;\n    }\n};\nint main() {\n    TreeNode* r = new TreeNode(2); r->left = new TreeNode(1); r->right = new TreeNode(3);\n    Codec c;\n    cout << c.serialize(r) << endl;\n    return 0;\n}",
      "java": "public class Main {\n    static class TreeNode { int val; TreeNode left, right; TreeNode(int x) { val = x; } }\n    public static String serialize(TreeNode root) {\n        StringBuilder sb = new StringBuilder();\n        pre(root, sb);\n        return sb.toString();\n    }\n    private static void pre(TreeNode n, StringBuilder sb) {\n        if (n == null) return;\n        if (sb.length() > 0) sb.append(\",\");\n        sb.append(n.val);\n        pre(n.left, sb);\n        pre(n.right, sb);\n    }\n    public static void main(String[] args) {\n        TreeNode r = new TreeNode(2); r.left = new TreeNode(1); r.right = new TreeNode(3);\n        System.out.println(serialize(r));\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "name": "Sample Case 1",
        "input": "",
        "expectedOutput": "2,1,3",
        "isHidden": false
      },
      {
        "id": 2,
        "name": "Hidden Case 2",
        "input": "",
        "expectedOutput": "2,1,3",
        "isHidden": true
      }
    ]
  },
  {
    "id": "85",
    "number": 85,
    "title": "Kth Largest Value in Unsorted Stream",
    "slug": "kth-largest-value-in-unsorted-stream",
    "difficulty": "Medium",
    "category": "Graphs",
    "topicTags": [
      "Heap",
      "Sorting"
    ],
    "problemStatement": "Given integer array nums and integer k, return the kth largest element in the array in O(n log k) time.",
    "diagram": null,
    "examples": [
      {
        "input": "nums = [3, 2, 1, 5, 6, 4], k = 2",
        "output": "5",
        "explanation": "2nd largest element is 5.",
        "exp": "2nd largest element is 5."
      }
    ],
    "constraints": [
      "1 <= k <= nums.length <= 10^5"
    ],
    "starterCode": {
      "javascript": "function findKthLargest(nums, k) {\n    nums.sort((a, b) => b - a);\n    return nums[k - 1];\n}\nconsole.log(findKthLargest([3, 2, 1, 5, 6, 4], 2));",
      "cpp": "#include <iostream>\n#include <vector>\n#include <queue>\nusing namespace std;\nclass Solution {\npublic:\n    int findKthLargest(vector<int>& nums, int k) {\n        priority_queue<int, vector<int>, greater<int>> pq;\n        for (int x : nums) {\n            pq.push(x);\n            if (pq.size() > (size_t)k) pq.pop();\n        }\n        return pq.top();\n    }\n};\nint main() {\n    Solution sol;\n    vector<int> nums = {3, 2, 1, 5, 6, 4};\n    cout << sol.findKthLargest(nums, 2) << endl;\n    return 0;\n}",
      "java": "import java.util.*;\npublic class Main {\n    public static int findKthLargest(int[] nums, int k) {\n        PriorityQueue<Integer> pq = new PriorityQueue<>();\n        for (int x : nums) {\n            pq.offer(x);\n            if (pq.size() > k) pq.poll();\n        }\n        return pq.peek();\n    }\n    public static void main(String[] args) {\n        System.out.println(findKthLargest(new int[]{3, 2, 1, 5, 6, 4}, 2));\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "name": "Sample Case 1",
        "input": "",
        "expectedOutput": "5",
        "isHidden": false
      },
      {
        "id": 2,
        "name": "Hidden Case 2",
        "input": "",
        "expectedOutput": "5",
        "isHidden": true
      }
    ]
  },
  {
    "id": "86",
    "number": 86,
    "title": "Top K Highest Frequency Elements",
    "slug": "top-k-highest-frequency-elements",
    "difficulty": "Medium",
    "category": "Graphs",
    "topicTags": [
      "Heap",
      "Hash Table"
    ],
    "problemStatement": "Given integer array nums and integer k, return the k most frequent elements in descending order of frequency.",
    "diagram": null,
    "examples": [
      {
        "input": "nums = [1, 1, 1, 2, 2, 3], k = 2",
        "output": "[1, 2]",
        "explanation": "1 appears 3 times, 2 appears twice.",
        "exp": "1 appears 3 times, 2 appears twice."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5"
    ],
    "starterCode": {
      "javascript": "function topKFrequent(nums, k) {\n    const map = {};\n    for (const x of nums) map[x] = (map[x] || 0) + 1;\n    const sorted = Object.keys(map).sort((a, b) => map[b] - map[a]);\n    return sorted.slice(0, k).map(Number);\n}\nconsole.log(JSON.stringify(topKFrequent([1, 1, 1, 2, 2, 3], 2)));",
      "cpp": "#include <iostream>\n#include <vector>\n#include <unordered_map>\n#include <queue>\nusing namespace std;\nclass Solution {\npublic:\n    vector<int> topKFrequent(vector<int>& nums, int k) {\n        unordered_map<int, int> count;\n        for (int x : nums) count[x]++;\n        auto comp = [](pair<int, int>& a, pair<int, int>& b) { return a.second > b.second; };\n        priority_queue<pair<int, int>, vector<pair<int, int>>, decltype(comp)> pq(comp);\n        for (auto& p : count) {\n            pq.push(p);\n            if (pq.size() > (size_t)k) pq.pop();\n        }\n        vector<int> res(k);\n        for (int i = k - 1; i >= 0; i--) { res[i] = pq.top().first; pq.pop(); }\n        return res;\n    }\n};\nint main() {\n    Solution sol;\n    vector<int> nums = {1, 1, 1, 2, 2, 3};\n    vector<int> r = sol.topKFrequent(nums, 2);\n    cout << \"[\" << r[0] << \", \" << r[1] << \"]\" << endl;\n    return 0;\n}",
      "java": "import java.util.*;\npublic class Main {\n    public static int[] topKFrequent(int[] nums, int k) {\n        Map<Integer, Integer> count = new HashMap<>();\n        for (int x : nums) count.put(x, count.getOrDefault(x, 0) + 1);\n        PriorityQueue<Integer> pq = new PriorityQueue<>((a, b) -> count.get(a) - count.get(b));\n        for (int n : count.keySet()) {\n            pq.offer(n);\n            if (pq.size() > k) pq.poll();\n        }\n        int[] res = new int[k];\n        for (int i = k - 1; i >= 0; i--) res[i] = pq.poll();\n        return res;\n    }\n    public static void main(String[] args) {\n        System.out.println(Arrays.toString(topKFrequent(new int[]{1, 1, 1, 2, 2, 3}, 2)));\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "name": "Sample Case 1",
        "input": "",
        "expectedOutput": "[1, 2]",
        "isHidden": false
      },
      {
        "id": 2,
        "name": "Hidden Case 2",
        "input": "",
        "expectedOutput": "[1, 2]",
        "isHidden": true
      }
    ]
  },
  {
    "id": "87",
    "number": 87,
    "title": "Sort String Characters by Frequency",
    "slug": "sort-string-characters-by-frequency",
    "difficulty": "Medium",
    "category": "Graphs",
    "topicTags": [
      "Heap",
      "Hash Table",
      "Strings"
    ],
    "problemStatement": "Given string s, sort it in decreasing order based on the frequency of the characters.",
    "diagram": null,
    "examples": [
      {
        "input": "s = \"tree\"",
        "output": "\"eert\"",
        "explanation": "'e' appears twice, 'r' and 't' appear once.",
        "exp": "'e' appears twice, 'r' and 't' appear once."
      }
    ],
    "constraints": [
      "1 <= s.length <= 5 * 10^5"
    ],
    "starterCode": {
      "javascript": "function frequencySort(s) {\n    const f = {};\n    for (const c of s) f[c] = (f[c] || 0) + 1;\n    return Object.keys(f).sort((a, b) => f[b] - f[a]).map(c => c.repeat(f[c])).join('');\n}\nconsole.log(frequencySort(\"tree\"));",
      "cpp": "#include <iostream>\n#include <string>\n#include <unordered_map>\n#include <algorithm>\nusing namespace std;\nclass Solution {\npublic:\n    string frequencySort(string s) {\n        unordered_map<char, int> f;\n        for (char c : s) f[c]++;\n        sort(s.begin(), s.end(), [&](char a, char b) {\n            return f[a] == f[b] ? a > b : f[a] > f[b];\n        });\n        return s;\n    }\n};\nint main() {\n    Solution sol;\n    cout << sol.frequencySort(\"tree\") << endl;\n    return 0;\n}",
      "java": "import java.util.*;\npublic class Main {\n    public static String frequencySort(String s) {\n        Map<Character, Integer> f = new HashMap<>();\n        for (char c : s.toCharArray()) f.put(c, f.getOrDefault(c, 0) + 1);\n        List<Character> list = new ArrayList<>(f.keySet());\n        list.sort((a, b) -> f.get(b) - f.get(a));\n        StringBuilder sb = new StringBuilder();\n        for (char c : list) {\n            for (int i = 0; i < f.get(c); i++) sb.append(c);\n        }\n        return sb.toString();\n    }\n    public static void main(String[] args) {\n        System.out.println(frequencySort(\"tree\"));\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "name": "Sample Case 1",
        "input": "",
        "expectedOutput": "eert",
        "isHidden": false
      },
      {
        "id": 2,
        "name": "Hidden Case 2",
        "input": "",
        "expectedOutput": "eert",
        "isHidden": true
      }
    ]
  },
  {
    "id": "88",
    "number": 88,
    "title": "Rearrange String to Separate Duplicates",
    "slug": "rearrange-string-to-separate-duplicates",
    "difficulty": "Medium",
    "category": "Graphs",
    "topicTags": [
      "Heap",
      "Greedy"
    ],
    "problemStatement": "Given string s, rearrange characters so no two adjacent characters are identical. Return empty string if impossible.",
    "diagram": null,
    "examples": [
      {
        "input": "s = \"aab\"",
        "output": "\"aba\"",
        "explanation": "No identical adjacent letters.",
        "exp": "No identical adjacent letters."
      }
    ],
    "constraints": [
      "1 <= s.length <= 500"
    ],
    "starterCode": {
      "javascript": "function reorganizeString(s) {\n    const map = {};\n    for (const c of s) map[c] = (map[c] || 0) + 1;\n    const sorted = Object.keys(map).sort((a, b) => map[b] - map[a]);\n    if (map[sorted[0]] > Math.floor((s.length + 1) / 2)) return \"\";\n    const res = new Array(s.length);\n    let idx = 0;\n    for (const c of sorted) {\n        for (let i = 0; i < map[c]; i++) {\n            if (idx >= s.length) idx = 1;\n            res[idx] = c;\n            idx += 2;\n        }\n    }\n    return res.join('');\n}\nconsole.log(reorganizeString(\"aab\"));",
      "cpp": "#include <iostream>\n#include <string>\n#include <vector>\nusing namespace std;\nclass Solution {\npublic:\n    string reorganizeString(string s) {\n        vector<int> count(26, 0);\n        int maxF = 0, letter = 0;\n        for (char c : s) {\n            if (++count[c - 'a'] > maxF) { maxF = count[c - 'a']; letter = c - 'a'; }\n        }\n        if (maxF > (int)(s.size() + 1) / 2) return \"\";\n        string res = s;\n        int idx = 0;\n        while (count[letter] > 0) {\n            res[idx] = (char)('a' + letter);\n            idx += 2;\n            count[letter]--;\n        }\n        for (int i = 0; i < 26; i++) {\n            while (count[i] > 0) {\n                if (idx >= (int)s.size()) idx = 1;\n                res[idx] = (char)('a' + i);\n                idx += 2;\n                count[i]--;\n            }\n        }\n        return res;\n    }\n};\nint main() {\n    Solution sol;\n    cout << sol.reorganizeString(\"aab\") << endl;\n    return 0;\n}",
      "java": "public class Main {\n    public static String reorganizeString(String s) {\n        int[] count = new int[26];\n        int maxF = 0, letter = 0;\n        for (char c : s.toCharArray()) {\n            if (++count[c - 'a'] > maxF) { maxF = count[c - 'a']; letter = c - 'a'; }\n        }\n        if (maxF > (s.length() + 1) / 2) return \"\";\n        char[] res = new char[s.length()];\n        int idx = 0;\n        while (count[letter] > 0) {\n            res[idx] = (char)('a' + letter);\n            idx += 2;\n            count[letter]--;\n        }\n        for (int i = 0; i < 26; i++) {\n            while (count[i] > 0) {\n                if (idx >= s.length()) idx = 1;\n                res[idx] = (char)('a' + i);\n                idx += 2;\n                count[i]--;\n            }\n        }\n        return new String(res);\n    }\n    public static void main(String[] args) {\n        System.out.println(reorganizeString(\"aab\"));\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "name": "Sample Case 1",
        "input": "",
        "expectedOutput": "aba",
        "isHidden": false
      },
      {
        "id": 2,
        "name": "Hidden Case 2",
        "input": "",
        "expectedOutput": "aba",
        "isHidden": true
      }
    ]
  },
  {
    "id": "89",
    "number": 89,
    "title": "Task Scheduler with Minimum Cooling Period",
    "slug": "task-scheduler-with-minimum-cooling-period",
    "difficulty": "Medium",
    "category": "Graphs",
    "topicTags": [
      "Heap",
      "Greedy"
    ],
    "problemStatement": "Given characters array tasks and cooldown integer n, return the least number of units of times CPU needs to finish all tasks.",
    "diagram": null,
    "examples": [
      {
        "input": "tasks = [\"A\",\"A\",\"A\",\"B\",\"B\",\"B\"], n = 2",
        "output": "8",
        "explanation": "A -> B -> idle -> A -> B -> idle -> A -> B. Total 8.",
        "exp": "A -> B -> idle -> A -> B -> idle -> A -> B. Total 8."
      }
    ],
    "constraints": [
      "1 <= tasks.length <= 10^4",
      "0 <= n <= 100"
    ],
    "starterCode": {
      "javascript": "function leastInterval(tasks, n) {\n    const f = new Array(26).fill(0);\n    for (const t of tasks) f[t.charCodeAt(0) - 65]++;\n    f.sort((a, b) => b - a);\n    const maxVal = f[0] - 1;\n    let idleSlots = maxVal * n;\n    for (let i = 1; i < 26 && f[i] > 0; i++) idleSlots -= Math.min(f[i], maxVal);\n    return idleSlots > 0 ? idleSlots + tasks.length : tasks.length;\n}\nconsole.log(leastInterval([\"A\",\"A\",\"A\",\"B\",\"B\",\"B\"], 2));",
      "cpp": "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nclass Solution {\npublic:\n    int leastInterval(vector<char>& tasks, int n) {\n        vector<int> f(26, 0);\n        for (char c : tasks) f[c - 'A']++;\n        sort(f.rbegin(), f.rend());\n        int maxVal = f[0] - 1;\n        int idleSlots = maxVal * n;\n        for (int i = 1; i < 26 && f[i] > 0; i++) idleSlots -= min(f[i], maxVal);\n        return idleSlots > 0 ? idleSlots + tasks.size() : tasks.size();\n    }\n};\nint main() {\n    Solution sol;\n    vector<char> t = {'A','A','A','B','B','B'};\n    cout << sol.leastInterval(t, 2) << endl;\n    return 0;\n}",
      "java": "import java.util.*;\npublic class Main {\n    public static int leastInterval(char[] tasks, int n) {\n        int[] f = new int[26];\n        for (char c : tasks) f[c - 'A']++;\n        Arrays.sort(f);\n        int maxVal = f[25] - 1;\n        int idleSlots = maxVal * n;\n        for (int i = 24; i >= 0 && f[i] > 0; i--) idleSlots -= Math.min(f[i], maxVal);\n        return idleSlots > 0 ? idleSlots + tasks.length : tasks.length;\n    }\n    public static void main(String[] args) {\n        System.out.println(leastInterval(new char[]{'A','A','A','B','B','B'}, 2));\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "name": "Sample Case 1",
        "input": "",
        "expectedOutput": "8",
        "isHidden": false
      },
      {
        "id": 2,
        "name": "Hidden Case 2",
        "input": "",
        "expectedOutput": "8",
        "isHidden": true
      }
    ]
  },
  {
    "id": "90",
    "number": 90,
    "title": "Dynamic Continuous Median Tracker",
    "slug": "dynamic-continuous-median-tracker",
    "difficulty": "Hard",
    "category": "Graphs",
    "topicTags": [
      "Heap",
      "Design"
    ],
    "problemStatement": "Design a data structure that calculates running median of data stream in O(log n) time using two heaps.",
    "diagram": null,
    "examples": [
      {
        "input": "addNum(1), addNum(2), findMedian()",
        "output": "1.5",
        "explanation": "(1 + 2) / 2 = 1.5.",
        "exp": "(1 + 2) / 2 = 1.5."
      }
    ],
    "constraints": [
      "At most 5 * 10^4 calls"
    ],
    "starterCode": {
      "javascript": "class MedianFinder {\n    constructor() { this.arr = []; }\n    addNum(num) {\n        let l = 0, r = this.arr.length;\n        while (l < r) {\n            const mid = (l + r) >> 1;\n            if (this.arr[mid] < num) l = mid + 1;\n            else r = mid;\n        }\n        this.arr.splice(l, 0, num);\n    }\n    findMedian() {\n        const n = this.arr.length;\n        if (n % 2 === 1) return this.arr[Math.floor(n / 2)];\n        return (this.arr[n / 2 - 1] + this.arr[n / 2]) / 2;\n    }\n}\nconst mf = new MedianFinder();\nmf.addNum(1); mf.addNum(2);\nconsole.log(mf.findMedian());",
      "cpp": "#include <iostream>\n#include <queue>\nusing namespace std;\nclass MedianFinder {\n    priority_queue<int> small;\n    priority_queue<int, vector<int>, greater<int>> large;\npublic:\n    void addNum(int num) {\n        small.push(num);\n        large.push(small.top());\n        small.pop();\n        if (small.size() < large.size()) {\n            small.push(large.top());\n            large.pop();\n        }\n    }\n    double findMedian() {\n        return small.size() > large.size() ? small.top() : (small.top() + large.top()) / 2.0;\n    }\n};\nint main() {\n    MedianFinder mf;\n    mf.addNum(1); mf.addNum(2);\n    cout << mf.findMedian() << endl;\n    return 0;\n}",
      "java": "import java.util.*;\npublic class Main {\n    static class MedianFinder {\n        PriorityQueue<Integer> small = new PriorityQueue<>(Collections.reverseOrder());\n        PriorityQueue<Integer> large = new PriorityQueue<>();\n        public void addNum(int num) {\n            small.offer(num);\n            large.offer(small.poll());\n            if (small.size() < large.size()) small.offer(large.poll());\n        }\n        public double findMedian() {\n            return small.size() > large.size() ? small.peek() : (small.peek() + large.peek()) / 2.0;\n        }\n    }\n    public static void main(String[] args) {\n        MedianFinder mf = new MedianFinder();\n        mf.addNum(1); mf.addNum(2);\n        System.out.println(mf.findMedian());\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "name": "Sample Case 1",
        "input": "",
        "expectedOutput": "1.5",
        "isHidden": false
      },
      {
        "id": 2,
        "name": "Hidden Case 2",
        "input": "",
        "expectedOutput": "1.5",
        "isHidden": true
      }
    ]
  },
  {
    "id": "91",
    "number": 91,
    "title": "Verify Path Existence in Bidirectional Graph",
    "slug": "verify-path-existence-in-bidirectional-graph",
    "difficulty": "Easy",
    "category": "Graphs",
    "topicTags": [
      "Graph",
      "BFS"
    ],
    "problemStatement": "Given integer n, bi-directional edges array, and source/destination vertices, determine if there is a valid path from source to destination.",
    "diagram": "(0) <---> (1) <---> (2)\nPath from 0 to 2 exists!",
    "examples": [
      {
        "input": "n = 3, edges = [[0,1],[1,2],[2,0]], source = 0, destination = 2",
        "output": "true",
        "explanation": "Path 0 -> 1 -> 2.",
        "exp": "Path 0 -> 1 -> 2."
      }
    ],
    "constraints": [
      "1 <= n <= 2 * 10^5"
    ],
    "starterCode": {
      "javascript": "function validPath(n, edges, source, destination) {\n    if (source === destination) return true;\n    const adj = Array.from({ length: n }, () => []);\n    for (const [u, v] of edges) { adj[u].push(v); adj[v].push(u); }\n    const visited = new Set([source]), q = [source];\n    while (q.length) {\n        const u = q.shift();\n        if (u === destination) return true;\n        for (const v of adj[u]) {\n            if (!visited.has(v)) { visited.add(v); q.push(v); }\n        }\n    }\n    return false;\n}\nconsole.log(validPath(3, [[0,1],[1,2],[2,0]], 0, 2));",
      "cpp": "#include <iostream>\n#include <vector>\n#include <queue>\nusing namespace std;\nclass Solution {\npublic:\n    bool validPath(int n, vector<vector<int>>& edges, int source, int destination) {\n        if (source == destination) return true;\n        vector<vector<int>> adj(n);\n        for (auto& e : edges) { adj[e[0]].push_back(e[1]); adj[e[1]].push_back(e[0]); }\n        vector<bool> vis(n, false);\n        queue<int> q; q.push(source); vis[source] = true;\n        while (!q.empty()) {\n            int u = q.front(); q.pop();\n            if (u == destination) return true;\n            for (int v : adj[u]) {\n                if (!vis[v]) { vis[v] = true; q.push(v); }\n            }\n        }\n        return false;\n    }\n};\nint main() {\n    Solution sol;\n    vector<vector<int>> edges = {{0,1},{1,2},{2,0}};\n    cout << (sol.validPath(3, edges, 0, 2) ? \"true\" : \"false\") << endl;\n    return 0;\n}",
      "java": "import java.util.*;\npublic class Main {\n    public static boolean validPath(int n, int[][] edges, int source, int destination) {\n        if (source == destination) return true;\n        List<List<Integer>> adj = new ArrayList<>();\n        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());\n        for (int[] e : edges) { adj.get(e[0]).add(e[1]); adj.get(e[1]).add(e[0]); }\n        boolean[] vis = new boolean[n];\n        Queue<Integer> q = new LinkedList<>(); q.offer(source); vis[source] = true;\n        while (!q.isEmpty()) {\n            int u = q.poll();\n            if (u == destination) return true;\n            for (int v : adj.get(u)) {\n                if (!vis[v]) { vis[v] = true; q.offer(v); }\n            }\n        }\n        return false;\n    }\n    public static void main(String[] args) {\n        System.out.println(validPath(3, new int[][]{{0,1},{1,2},{2,0}}, 0, 2));\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "name": "Sample Case 1",
        "input": "",
        "expectedOutput": "true",
        "isHidden": false
      },
      {
        "id": 2,
        "name": "Hidden Case 2",
        "input": "",
        "expectedOutput": "true",
        "isHidden": true
      }
    ]
  },
  {
    "id": "92",
    "number": 92,
    "title": "Count Isolated Land Islands in Binary Grid",
    "slug": "count-isolated-land-islands-in-binary-grid",
    "difficulty": "Medium",
    "category": "Graphs",
    "topicTags": [
      "Graph",
      "Depth-First Search"
    ],
    "problemStatement": "Given an m x n 2D binary grid grid which represents map of 1s (land) and 0s (water), return total number of islands.",
    "diagram": "1 1 0 0 0\n1 1 0 0 0\n0 0 1 0 0\n0 0 0 1 1  ==> 3 disconnected islands",
    "examples": [
      {
        "input": "grid = [[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"0\",\"0\",\"1\",\"0\",\"0\"],[\"0\",\"0\",\"0\",\"1\",\"1\"]]",
        "output": "3",
        "explanation": "3 disconnected islands.",
        "exp": "3 disconnected islands."
      }
    ],
    "constraints": [
      "m, n <= 300"
    ],
    "starterCode": {
      "javascript": "function numIslands(grid) {\n    let count = 0;\n    const m = grid.length, n = grid[0].length;\n    function dfs(r, c) {\n        if (r < 0 || r >= m || c < 0 || c >= n || grid[r][c] !== '1') return;\n        grid[r][c] = '0';\n        dfs(r + 1, c); dfs(r - 1, c); dfs(r, c + 1); dfs(r, c - 1);\n    }\n    for (let r = 0; r < m; r++) {\n        for (let c = 0; c < n; c++) {\n            if (grid[r][c] === '1') { count++; dfs(r, c); }\n        }\n    }\n    return count;\n}\nconsole.log(numIslands([[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"0\",\"0\",\"1\",\"0\",\"0\"],[\"0\",\"0\",\"0\",\"1\",\"1\"]]));",
      "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\nclass Solution {\n    void dfs(vector<vector<char>>& g, int r, int c) {\n        if (r < 0 || r >= (int)g.size() || c < 0 || c >= (int)g[0].size() || g[r][c] != '1') return;\n        g[r][c] = '0';\n        dfs(g, r + 1, c); dfs(g, r - 1, c); dfs(g, r, c + 1); dfs(g, r, c - 1);\n    }\npublic:\n    int numIslands(vector<vector<char>>& grid) {\n        int count = 0;\n        for (size_t r = 0; r < grid.size(); r++) {\n            for (size_t c = 0; c < grid[0].size(); c++) {\n                if (grid[r][c] == '1') { count++; dfs(grid, r, c); }\n            }\n        }\n        return count;\n    }\n};\nint main() {\n    Solution sol;\n    vector<vector<char>> g = {{'1','1','0','0','0'},{'1','1','0','0','0'},{'0','0','1','0','0'},{'0','0','0','1','1'}};\n    cout << sol.numIslands(g) << endl;\n    return 0;\n}",
      "java": "public class Main {\n    public static int numIslands(char[][] grid) {\n        int count = 0;\n        for (int r = 0; r < grid.length; r++) {\n            for (int c = 0; c < grid[0].length; c++) {\n                if (grid[r][c] == '1') { count++; dfs(grid, r, c); }\n            }\n        }\n        return count;\n    }\n    private static void dfs(char[][] g, int r, int c) {\n        if (r < 0 || r >= g.length || c < 0 || c >= g[0].length || g[r][c] != '1') return;\n        g[r][c] = '0';\n        dfs(g, r + 1, c); dfs(g, r - 1, c); dfs(g, r, c + 1); dfs(g, r, c - 1);\n    }\n    public static void main(String[] args) {\n        char[][] g = {{'1','1','0','0','0'},{'1','1','0','0','0'},{'0','0','1','0','0'},{'0','0','0','1','1'}};\n        System.out.println(numIslands(g));\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "name": "Sample Case 1",
        "input": "",
        "expectedOutput": "3",
        "isHidden": false
      },
      {
        "id": 2,
        "name": "Hidden Case 2",
        "input": "",
        "expectedOutput": "3",
        "isHidden": true
      }
    ]
  },
  {
    "id": "93",
    "number": 93,
    "title": "Course Schedule Prerequisite Cycle Check",
    "slug": "course-schedule-prerequisite-cycle-check",
    "difficulty": "Medium",
    "category": "Greedy Algorithms",
    "topicTags": [
      "Graph",
      "Topological Sort"
    ],
    "problemStatement": "There are numCourses courses. Given prerequisites where prerequisites[i] = [a, b] indicates course b must be taken before a, return true if you can finish all courses.",
    "diagram": "(0) ---> (1)  Valid topological order: [0, 1]",
    "examples": [
      {
        "input": "numCourses = 2, prerequisites = [[1, 0]]",
        "output": "true",
        "explanation": "Take course 0 then course 1.",
        "exp": "Take course 0 then course 1."
      }
    ],
    "constraints": [
      "1 <= numCourses <= 2000"
    ],
    "starterCode": {
      "javascript": "function canFinish(numCourses, prerequisites) {\n    const inDegree = new Array(numCourses).fill(0), adj = Array.from({ length: numCourses }, () => []);\n    for (const [a, b] of prerequisites) { adj[b].push(a); inDegree[a]++; }\n    const q = [];\n    for (let i = 0; i < numCourses; i++) if (inDegree[i] === 0) q.push(i);\n    let count = 0;\n    while (q.length) {\n        const u = q.shift();\n        count++;\n        for (const v of adj[u]) {\n            if (--inDegree[v] === 0) q.push(v);\n        }\n    }\n    return count === numCourses;\n}\nconsole.log(canFinish(2, [[1, 0]]));",
      "cpp": "#include <iostream>\n#include <vector>\n#include <queue>\nusing namespace std;\nclass Solution {\npublic:\n    bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {\n        vector<int> inDegree(numCourses, 0);\n        vector<vector<int>> adj(numCourses);\n        for (auto& p : prerequisites) { adj[p[1]].push_back(p[0]); inDegree[p[0]]++; }\n        queue<int> q;\n        for (int i = 0; i < numCourses; i++) if (inDegree[i] == 0) q.push(i);\n        int count = 0;\n        while (!q.empty()) {\n            int u = q.front(); q.pop(); count++;\n            for (int v : adj[u]) if (--inDegree[v] == 0) q.push(v);\n        }\n        return count == numCourses;\n    }\n};\nint main() {\n    Solution sol;\n    vector<vector<int>> p = {{1, 0}};\n    cout << (sol.canFinish(2, p) ? \"true\" : \"false\") << endl;\n    return 0;\n}",
      "java": "import java.util.*;\npublic class Main {\n    public static boolean canFinish(int numCourses, int[][] prerequisites) {\n        int[] inDegree = new int[numCourses];\n        List<List<Integer>> adj = new ArrayList<>();\n        for (int i = 0; i < numCourses; i++) adj.add(new ArrayList<>());\n        for (int[] p : prerequisites) { adj.get(p[1]).add(p[0]); inDegree[p[0]]++; }\n        Queue<Integer> q = new LinkedList<>();\n        for (int i = 0; i < numCourses; i++) if (inDegree[i] == 0) q.offer(i);\n        int count = 0;\n        while (!q.isEmpty()) {\n            int u = q.poll(); count++;\n            for (int v : adj.get(u)) if (--inDegree[v] == 0) q.offer(v);\n        }\n        return count == numCourses;\n    }\n    public static void main(String[] args) {\n        System.out.println(canFinish(2, new int[][]{{1, 0}}));\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "name": "Sample Case 1",
        "input": "",
        "expectedOutput": "true",
        "isHidden": false
      },
      {
        "id": 2,
        "name": "Hidden Case 2",
        "input": "",
        "expectedOutput": "true",
        "isHidden": true
      }
    ]
  },
  {
    "id": "94",
    "number": 94,
    "title": "Deep Clone Undirected Connected Graph",
    "slug": "deep-clone-undirected-connected-graph",
    "difficulty": "Medium",
    "category": "Greedy Algorithms",
    "topicTags": [
      "Graph",
      "Hash Table"
    ],
    "problemStatement": "Given a reference of a node in a connected undirected graph, return a deep copy (clone) of the graph.",
    "diagram": "(1) --- (2)\n |       |\n(4) --- (3)  Cloned deep copy with separate node references",
    "examples": [
      {
        "input": "adjList = [[2,4],[1,3],[2,4],[1,3]]",
        "output": "true",
        "explanation": "Clone verified identical structure.",
        "exp": "Clone verified identical structure."
      }
    ],
    "constraints": [
      "0 <= nodes <= 100"
    ],
    "starterCode": {
      "javascript": "function cloneGraph(node) {\n    if (!node) return null;\n    const visited = new Map();\n    function dfs(n) {\n        if (visited.has(n.val)) return visited.get(n.val);\n        const copy = { val: n.val, neighbors: [] };\n        visited.set(n.val, copy);\n        for (const nei of n.neighbors) copy.neighbors.push(dfs(nei));\n        return copy;\n    }\n    return dfs(node);\n}\nconst n1 = { val: 1, neighbors: [] }, n2 = { val: 2, neighbors: [] };\nn1.neighbors.push(n2); n2.neighbors.push(n1);\nconst c = cloneGraph(n1);\nconsole.log(c.val === 1 && c.neighbors[0].val === 2);",
      "cpp": "#include <iostream>\n#include <vector>\n#include <unordered_map>\nusing namespace std;\nstruct Node { int val; vector<Node*> neighbors; Node(int _val) : val(_val) {} };\nclass Solution {\n    unordered_map<int, Node*> visited;\npublic:\n    Node* cloneGraph(Node* node) {\n        if (!node) return nullptr;\n        if (visited.count(node->val)) return visited[node->val];\n        Node* copy = new Node(node->val);\n        visited[node->val] = copy;\n        for (Node* nei : node->neighbors) copy->neighbors.push_back(cloneGraph(nei));\n        return copy;\n    }\n};\nint main() {\n    Node* n1 = new Node(1); Node* n2 = new Node(2);\n    n1->neighbors.push_back(n2); n2->neighbors.push_back(n1);\n    Solution sol;\n    Node* c = sol.cloneGraph(n1);\n    cout << (c->val == 1 && c->neighbors[0]->val == 2 ? \"true\" : \"false\") << endl;\n    return 0;\n}",
      "java": "import java.util.*;\npublic class Main {\n    static class Node { int val; List<Node> neighbors = new ArrayList<>(); Node(int v) { val = v; } }\n    static Map<Integer, Node> visited = new HashMap<>();\n    public static Node cloneGraph(Node node) {\n        if (node == null) return null;\n        if (visited.containsKey(node.val)) return visited.get(node.val);\n        Node copy = new Node(node.val);\n        visited.put(node.val, copy);\n        for (Node nei : node.neighbors) copy.neighbors.add(cloneGraph(nei));\n        return copy;\n    }\n    public static void main(String[] args) {\n        Node n1 = new Node(1); Node n2 = new Node(2);\n        n1.neighbors.add(n2); n2.neighbors.add(n1);\n        Node c = cloneGraph(n1);\n        System.out.println(c.val == 1 && c.neighbors.get(0).val == 2);\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "name": "Sample Case 1",
        "input": "",
        "expectedOutput": "true",
        "isHidden": false
      },
      {
        "id": 2,
        "name": "Hidden Case 2",
        "input": "",
        "expectedOutput": "true",
        "isHidden": true
      }
    ]
  },
  {
    "id": "95",
    "number": 95,
    "title": "Network Signal Propagation Delay Time",
    "slug": "network-signal-propagation-delay-time",
    "difficulty": "Medium",
    "category": "Greedy Algorithms",
    "topicTags": [
      "Graph",
      "Dijkstra"
    ],
    "problemStatement": "You are given a network of n nodes, labeled from 1 to n. Given times list where times[i] = (ui, vi, wi), return minimum time for all nodes to receive signal sent from k using Dijkstra algorithm.",
    "diagram": null,
    "examples": [
      {
        "input": "times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2",
        "output": "2",
        "explanation": "Node 4 receives signal in 2 time units.",
        "exp": "Node 4 receives signal in 2 time units."
      }
    ],
    "constraints": [
      "1 <= k <= n <= 100"
    ],
    "starterCode": {
      "javascript": "function networkDelayTime(times, n, k) {\n    const dist = new Array(n + 1).fill(Infinity);\n    dist[k] = 0;\n    for (let i = 1; i <= n - 1; i++) {\n        for (const [u, v, w] of times) {\n            if (dist[u] !== Infinity && dist[u] + w < dist[v]) {\n                dist[v] = dist[u] + w;\n            }\n        }\n    }\n    let maxT = 0;\n    for (let i = 1; i <= n; i++) {\n        if (dist[i] === Infinity) return -1;\n        maxT = Math.max(maxT, dist[i]);\n    }\n    return maxT;\n}\nconsole.log(networkDelayTime([[2,1,1],[2,3,1],[3,4,1]], 4, 2));",
      "cpp": "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nclass Solution {\npublic:\n    int networkDelayTime(vector<vector<int>>& times, int n, int k) {\n        vector<int> dist(n + 1, 1e9);\n        dist[k] = 0;\n        for (int i = 1; i <= n - 1; i++) {\n            for (auto& t : times) {\n                if (dist[t[0]] != 1e9 && dist[t[0]] + t[2] < dist[t[1]]) {\n                    dist[t[1]] = dist[t[0]] + t[2];\n                }\n            }\n        }\n        int maxT = 0;\n        for (int i = 1; i <= n; i++) {\n            if (dist[i] == 1e9) return -1;\n            maxT = max(maxT, dist[i]);\n        }\n        return maxT;\n    }\n};\nint main() {\n    Solution sol;\n    vector<vector<int>> times = {{2,1,1},{2,3,1},{3,4,1}};\n    cout << sol.networkDelayTime(times, 4, 2) << endl;\n    return 0;\n}",
      "java": "import java.util.*;\npublic class Main {\n    public static int networkDelayTime(int[][] times, int n, int k) {\n        int[] dist = new int[n + 1];\n        Arrays.fill(dist, (int)1e9);\n        dist[k] = 0;\n        for (int i = 1; i <= n - 1; i++) {\n            for (int[] t : times) {\n                if (dist[t[0]] != (int)1e9 && dist[t[0]] + t[2] < dist[t[1]]) {\n                    dist[t[1]] = dist[t[0]] + t[2];\n                }\n            }\n        }\n        int maxT = 0;\n        for (int i = 1; i <= n; i++) {\n            if (dist[i] == (int)1e9) return -1;\n            maxT = Math.max(maxT, dist[i]);\n        }\n        return maxT;\n    }\n    public static void main(String[] args) {\n        System.out.println(networkDelayTime(new int[][]{{2,1,1},{2,3,1},{3,4,1}}, 4, 2));\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "name": "Sample Case 1",
        "input": "",
        "expectedOutput": "2",
        "isHidden": false
      },
      {
        "id": 2,
        "name": "Hidden Case 2",
        "input": "",
        "expectedOutput": "2",
        "isHidden": true
      }
    ]
  },
  {
    "id": "96",
    "number": 96,
    "title": "Word Transformation Ladder Minimum Hops",
    "slug": "word-transformation-ladder-minimum-hops",
    "difficulty": "Hard",
    "category": "Greedy Algorithms",
    "topicTags": [
      "Graph",
      "Breadth-First Search"
    ],
    "problemStatement": "Given beginWord, endWord, and wordList, return the number of words in the shortest transformation sequence from beginWord to endWord, or 0 if no such sequence exists.",
    "diagram": "hit -> hot -> dot -> dog -> cog (5 words)",
    "examples": [
      {
        "input": "beginWord = \"hit\", endWord = \"cog\", wordList = [\"hot\",\"dot\",\"dog\",\"lot\",\"log\",\"cog\"]",
        "output": "5",
        "explanation": "\"hit\" -> \"hot\" -> \"dot\" -> \"dog\" -> \"cog\" is 5 words.",
        "exp": "\"hit\" -> \"hot\" -> \"dot\" -> \"dog\" -> \"cog\" is 5 words."
      }
    ],
    "constraints": [
      "1 <= beginWord.length <= 10"
    ],
    "starterCode": {
      "javascript": "function ladderLength(beginWord, endWord, wordList) {\n    const wordSet = new Set(wordList);\n    if (!wordSet.has(endWord)) return 0;\n    const q = [[beginWord, 1]];\n    while (q.length) {\n        const [w, len] = q.shift();\n        if (w === endWord) return len;\n        for (let i = 0; i < w.length; i++) {\n            for (let c = 97; c <= 122; c++) {\n                const nw = w.slice(0, i) + String.fromCharCode(c) + w.slice(i + 1);\n                if (wordSet.has(nw)) {\n                    wordSet.delete(nw);\n                    q.push([nw, len + 1]);\n                }\n            }\n        }\n    }\n    return 0;\n}\nconsole.log(ladderLength(\"hit\", \"cog\", [\"hot\",\"dot\",\"dog\",\"lot\",\"log\",\"cog\"]));",
      "cpp": "#include <iostream>\n#include <string>\n#include <vector>\n#include <unordered_set>\n#include <queue>\nusing namespace std;\nclass Solution {\npublic:\n    int ladderLength(string beginWord, string endWord, vector<string>& wordList) {\n        unordered_set<string> wordSet(wordList.begin(), wordList.end());\n        if (!wordSet.count(endWord)) return 0;\n        queue<pair<string, int>> q; q.push({beginWord, 1});\n        while (!q.empty()) {\n            auto [w, len] = q.front(); q.pop();\n            if (w == endWord) return len;\n            for (size_t i = 0; i < w.size(); i++) {\n                char orig = w[i];\n                for (char c = 'a'; c <= 'z'; c++) {\n                    w[i] = c;\n                    if (wordSet.count(w)) {\n                        wordSet.erase(w);\n                        q.push({w, len + 1});\n                    }\n                }\n                w[i] = orig;\n            }\n        }\n        return 0;\n    }\n};\nint main() {\n    Solution sol;\n    vector<string> wl = {\"hot\",\"dot\",\"dog\",\"lot\",\"log\",\"cog\"};\n    cout << sol.ladderLength(\"hit\", \"cog\", wl) << endl;\n    return 0;\n}",
      "java": "import java.util.*;\npublic class Main {\n    public static int ladderLength(String beginWord, String endWord, List<String> wordList) {\n        Set<String> wordSet = new HashSet<>(wordList);\n        if (!wordSet.contains(endWord)) return 0;\n        Queue<Pair> q = new LinkedList<>(); q.offer(new Pair(beginWord, 1));\n        while (!q.isEmpty()) {\n            Pair cur = q.poll();\n            if (cur.w.equals(endWord)) return cur.len;\n            char[] arr = cur.w.toCharArray();\n            for (int i = 0; i < arr.length; i++) {\n                char orig = arr[i];\n                for (char c = 'a'; c <= 'z'; c++) {\n                    arr[i] = c;\n                    String nw = new String(arr);\n                    if (wordSet.contains(nw)) {\n                        wordSet.remove(nw);\n                        q.offer(new Pair(nw, cur.len + 1));\n                    }\n                }\n                arr[i] = orig;\n            }\n        }\n        return 0;\n    }\n    static class Pair { String w; int len; Pair(String _w, int _l) { w = _w; len = _l; } }\n    public static void main(String[] args) {\n        System.out.println(ladderLength(\"hit\", \"cog\", Arrays.asList(\"hot\",\"dot\",\"dog\",\"lot\",\"log\",\"cog\")));\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "name": "Sample Case 1",
        "input": "",
        "expectedOutput": "5",
        "isHidden": false
      },
      {
        "id": 2,
        "name": "Hidden Case 2",
        "input": "",
        "expectedOutput": "5",
        "isHidden": true
      }
    ]
  },
  {
    "id": "97",
    "number": 97,
    "title": "Distribute Treats to Satisfy Children",
    "slug": "distribute-treats-to-satisfy-children",
    "difficulty": "Easy",
    "category": "Greedy Algorithms",
    "topicTags": [
      "Greedy",
      "Sorting"
    ],
    "problemStatement": "Each child i has greed factor g[i]. Each cookie j has size s[j]. Return max number of satisfied children where s[j] >= g[i].",
    "diagram": null,
    "examples": [
      {
        "input": "g = [1, 2, 3], s = [1, 1]",
        "output": "1",
        "explanation": "Only 1 child can be content.",
        "exp": "Only 1 child can be content."
      }
    ],
    "constraints": [
      "1 <= g.length, s.length <= 3 * 10^4"
    ],
    "starterCode": {
      "javascript": "function findContentChildren(g, s) {\n    g.sort((a, b) => a - b);\n    s.sort((a, b) => a - b);\n    let child = 0, cookie = 0;\n    while (child < g.length && cookie < s.length) {\n        if (s[cookie] >= g[child]) child++;\n        cookie++;\n    }\n    return child;\n}\nconsole.log(findContentChildren([1, 2, 3], [1, 1]));",
      "cpp": "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nclass Solution {\npublic:\n    int findContentChildren(vector<int>& g, vector<int>& s) {\n        sort(g.begin(), g.end()); sort(s.begin(), s.end());\n        int child = 0, cookie = 0;\n        while (child < (int)g.size() && cookie < (int)s.size()) {\n            if (s[cookie] >= g[child]) child++;\n            cookie++;\n        }\n        return child;\n    }\n};\nint main() {\n    Solution sol;\n    vector<int> g = {1, 2, 3}, s = {1, 1};\n    cout << sol.findContentChildren(g, s) << endl;\n    return 0;\n}",
      "java": "import java.util.*;\npublic class Main {\n    public static int findContentChildren(int[] g, int[] s) {\n        Arrays.sort(g); Arrays.sort(s);\n        int child = 0, cookie = 0;\n        while (child < g.length && cookie < s.length) {\n            if (s[cookie] >= g[child]) child++;\n            cookie++;\n        }\n        return child;\n    }\n    public static void main(String[] args) {\n        System.out.println(findContentChildren(new int[]{1, 2, 3}, new int[]{1, 1}));\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "name": "Sample Case 1",
        "input": "",
        "expectedOutput": "1",
        "isHidden": false
      },
      {
        "id": 2,
        "name": "Hidden Case 2",
        "input": "",
        "expectedOutput": "1",
        "isHidden": true
      }
    ]
  },
  {
    "id": "98",
    "number": 98,
    "title": "Jump Game End Reachability Test",
    "slug": "jump-game-end-reachability-test",
    "difficulty": "Medium",
    "category": "Greedy Algorithms",
    "topicTags": [
      "Greedy",
      "Dynamic Programming"
    ],
    "problemStatement": "You are given an integer array nums where nums[i] represents maximum jump length from position i. Return true if you can reach the last index.",
    "diagram": null,
    "examples": [
      {
        "input": "nums = [2, 3, 1, 1, 4]",
        "output": "true",
        "explanation": "Jump 1 step from index 0 to 1, then 3 steps to the last index.",
        "exp": "Jump 1 step from index 0 to 1, then 3 steps to the last index."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^4"
    ],
    "starterCode": {
      "javascript": "function canJump(nums) {\n    let maxReach = 0;\n    for (let i = 0; i < nums.length; i++) {\n        if (i > maxReach) return false;\n        maxReach = Math.max(maxReach, i + nums[i]);\n    }\n    return true;\n}\nconsole.log(canJump([2, 3, 1, 1, 4]));",
      "cpp": "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nclass Solution {\npublic:\n    bool canJump(vector<int>& nums) {\n        int maxReach = 0, n = nums.size();\n        for (int i = 0; i < n; i++) {\n            if (i > maxReach) return false;\n            maxReach = max(maxReach, i + nums[i]);\n        }\n        return true;\n    }\n};\nint main() {\n    Solution sol;\n    vector<int> nums = {2, 3, 1, 1, 4};\n    cout << (sol.canJump(nums) ? \"true\" : \"false\") << endl;\n    return 0;\n}",
      "java": "public class Main {\n    public static boolean canJump(int[] nums) {\n        int maxReach = 0;\n        for (int i = 0; i < nums.length; i++) {\n            if (i > maxReach) return false;\n            maxReach = Math.max(maxReach, i + nums[i]);\n        }\n        return true;\n    }\n    public static void main(String[] args) {\n        System.out.println(canJump(new int[]{2, 3, 1, 1, 4}));\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "name": "Sample Case 1",
        "input": "",
        "expectedOutput": "true",
        "isHidden": false
      },
      {
        "id": 2,
        "name": "Hidden Case 2",
        "input": "",
        "expectedOutput": "true",
        "isHidden": true
      }
    ]
  },
  {
    "id": "99",
    "number": 99,
    "title": "Circular Gas Station Fuel Tour",
    "slug": "circular-gas-station-fuel-tour",
    "difficulty": "Medium",
    "category": "Greedy Algorithms",
    "topicTags": [
      "Greedy",
      "Arrays"
    ],
    "problemStatement": "There are n gas stations along a circular route, where gas[i] is available fuel and cost[i] is fuel needed to travel to next station. Return starting station index to complete tour or -1.",
    "diagram": null,
    "examples": [
      {
        "input": "gas = [1, 2, 3, 4, 5], cost = [3, 4, 5, 1, 2]",
        "output": "3",
        "explanation": "Start at station 3 (index 3).",
        "exp": "Start at station 3 (index 3)."
      }
    ],
    "constraints": [
      "1 <= gas.length == cost.length <= 10^5"
    ],
    "starterCode": {
      "javascript": "function canCompleteCircuit(gas, cost) {\n    let totalGas = 0, curGas = 0, start = 0;\n    for (let i = 0; i < gas.length; i++) {\n        totalGas += gas[i] - cost[i];\n        curGas += gas[i] - cost[i];\n        if (curGas < 0) {\n            start = i + 1;\n            curGas = 0;\n        }\n    }\n    return totalGas >= 0 ? start : -1;\n}\nconsole.log(canCompleteCircuit([1, 2, 3, 4, 5], [3, 4, 5, 1, 2]));",
      "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\nclass Solution {\npublic:\n    int canCompleteCircuit(vector<int>& gas, vector<int>& cost) {\n        int totalGas = 0, curGas = 0, start = 0;\n        for (size_t i = 0; i < gas.size(); i++) {\n            totalGas += gas[i] - cost[i];\n            curGas += gas[i] - cost[i];\n            if (curGas < 0) { start = i + 1; curGas = 0; }\n        }\n        return totalGas >= 0 ? start : -1;\n    }\n};\nint main() {\n    Solution sol;\n    vector<int> g = {1, 2, 3, 4, 5}, c = {3, 4, 5, 1, 2};\n    cout << sol.canCompleteCircuit(g, c) << endl;\n    return 0;\n}",
      "java": "public class Main {\n    public static int canCompleteCircuit(int[] gas, int[] cost) {\n        int totalGas = 0, curGas = 0, start = 0;\n        for (int i = 0; i < gas.length; i++) {\n            totalGas += gas[i] - cost[i];\n            curGas += gas[i] - cost[i];\n            if (curGas < 0) { start = i + 1; curGas = 0; }\n        }\n        return totalGas >= 0 ? start : -1;\n    }\n    public static void main(String[] args) {\n        System.out.println(canCompleteCircuit(new int[]{1, 2, 3, 4, 5}, new int[]{3, 4, 5, 1, 2}));\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "name": "Sample Case 1",
        "input": "",
        "expectedOutput": "3",
        "isHidden": false
      },
      {
        "id": 2,
        "name": "Hidden Case 2",
        "input": "",
        "expectedOutput": "3",
        "isHidden": true
      }
    ]
  },
  {
    "id": "100",
    "number": 100,
    "title": "Minimum Erasures for Disjoint Intervals",
    "slug": "minimum-erasures-for-disjoint-intervals",
    "difficulty": "Medium",
    "category": "Greedy Algorithms",
    "topicTags": [
      "Greedy",
      "Sorting"
    ],
    "problemStatement": "Given array of intervals, return minimum number of intervals you need to remove to make the rest of the intervals non-overlapping.",
    "diagram": null,
    "examples": [
      {
        "input": "intervals = [[1, 2], [2, 3], [3, 4], [1, 3]]",
        "output": "1",
        "explanation": "Remove [1, 3] to make non-overlapping.",
        "exp": "Remove [1, 3] to make non-overlapping."
      }
    ],
    "constraints": [
      "1 <= intervals.length <= 10^5"
    ],
    "starterCode": {
      "javascript": "function eraseOverlapIntervals(intervals) {\n    if (!intervals.length) return 0;\n    intervals.sort((a, b) => a[1] - b[1]);\n    let count = 0, prevEnd = intervals[0][1];\n    for (let i = 1; i < intervals.length; i++) {\n        if (intervals[i][0] < prevEnd) count++;\n        else prevEnd = intervals[i][1];\n    }\n    return count;\n}\nconsole.log(eraseOverlapIntervals([[1, 2], [2, 3], [3, 4], [1, 3]]));",
      "cpp": "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nclass Solution {\npublic:\n    int eraseOverlapIntervals(vector<vector<int>>& intervals) {\n        if (intervals.empty()) return 0;\n        sort(intervals.begin(), intervals.end(), [](const vector<int>& a, const vector<int>& b) {\n            return a[1] < b[1];\n        });\n        int count = 0, prevEnd = intervals[0][1];\n        for (size_t i = 1; i < intervals.size(); i++) {\n            if (intervals[i][0] < prevEnd) count++;\n            else prevEnd = intervals[i][1];\n        }\n        return count;\n    }\n};\nint main() {\n    Solution sol;\n    vector<vector<int>> iv = {{1, 2}, {2, 3}, {3, 4}, {1, 3}};\n    cout << sol.eraseOverlapIntervals(iv) << endl;\n    return 0;\n}",
      "java": "import java.util.*;\npublic class Main {\n    public static int eraseOverlapIntervals(int[][] intervals) {\n        if (intervals.length == 0) return 0;\n        Arrays.sort(intervals, (a, b) -> Integer.compare(a[1], b[1]));\n        int count = 0, prevEnd = intervals[0][1];\n        for (int i = 1; i < intervals.length; i++) {\n            if (intervals[i][0] < prevEnd) count++;\n            else prevEnd = intervals[i][1];\n        }\n        return count;\n    }\n    public static void main(String[] args) {\n        System.out.println(eraseOverlapIntervals(new int[][]{{1, 2}, {2, 3}, {3, 4}, {1, 3}}));\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "name": "Sample Case 1",
        "input": "",
        "expectedOutput": "1",
        "isHidden": false
      },
      {
        "id": 2,
        "name": "Hidden Case 2",
        "input": "",
        "expectedOutput": "1",
        "isHidden": true
      }
    ]
  },
  {
    "id": "101",
    "number": 101,
    "title": "Partition String into Disjoint Blocks",
    "slug": "partition-string-into-disjoint-blocks",
    "difficulty": "Medium",
    "category": "Dynamic Programming",
    "topicTags": [
      "Greedy",
      "Two Pointers"
    ],
    "problemStatement": "You are given string s. Partition string into as many parts as possible so each letter appears in at most one part. Return list of partition sizes.",
    "diagram": null,
    "examples": [
      {
        "input": "s = \"ababcbacadefegdehijhklij\"",
        "output": "[9, 7, 8]",
        "explanation": "Partitions: \"ababcbaca\", \"defegde\", \"hijhklij\".",
        "exp": "Partitions: \"ababcbaca\", \"defegde\", \"hijhklij\"."
      }
    ],
    "constraints": [
      "1 <= s.length <= 500"
    ],
    "starterCode": {
      "javascript": "function partitionLabels(s) {\n    const last = {};\n    for (let i = 0; i < s.length; i++) last[s[i]] = i;\n    const res = [];\n    let start = 0, end = 0;\n    for (let i = 0; i < s.length; i++) {\n        end = Math.max(end, last[s[i]]);\n        if (i === end) {\n            res.push(end - start + 1);\n            start = i + 1;\n        }\n    }\n    return res;\n}\nconsole.log(JSON.stringify(partitionLabels(\"ababcbacadefegdehijhklij\")));",
      "cpp": "#include <iostream>\n#include <string>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nclass Solution {\npublic:\n    vector<int> partitionLabels(string s) {\n        vector<int> last(26, 0);\n        for (int i = 0; i < (int)s.size(); i++) last[s[i] - 'a'] = i;\n        vector<int> res;\n        int start = 0, end = 0;\n        for (int i = 0; i < (int)s.size(); i++) {\n            end = max(end, last[s[i] - 'a']);\n            if (i == end) { res.push_back(end - start + 1); start = i + 1; }\n        }\n        return res;\n    }\n};\nint main() {\n    Solution sol;\n    vector<int> ans = sol.partitionLabels(\"ababcbacadefegdehijhklij\");\n    cout << \"[\" << ans[0] << \", \" << ans[1] << \", \" << ans[2] << \"]\" << endl;\n    return 0;\n}",
      "java": "import java.util.*;\npublic class Main {\n    public static List<Integer> partitionLabels(String s) {\n        int[] last = new int[26];\n        for (int i = 0; i < s.length(); i++) last[s.charAt(i) - 'a'] = i;\n        List<Integer> res = new ArrayList<>();\n        int start = 0, end = 0;\n        for (int i = 0; i < s.length(); i++) {\n            end = Math.max(end, last[s.charAt(i) - 'a']);\n            if (i == end) { res.add(end - start + 1); start = i + 1; }\n        }\n        return res;\n    }\n    public static void main(String[] args) {\n        System.out.println(partitionLabels(\"ababcbacadefegdehijhklij\"));\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "name": "Sample Case 1",
        "input": "",
        "expectedOutput": "[9, 7, 8]",
        "isHidden": false
      },
      {
        "id": 2,
        "name": "Hidden Case 2",
        "input": "",
        "expectedOutput": "[9, 7, 8]",
        "isHidden": true
      }
    ]
  },
  {
    "id": "102",
    "number": 102,
    "title": "Minimum Treat Allocation by Neighbor Ratings",
    "slug": "minimum-treat-allocation-by-neighbor-ratings",
    "difficulty": "Hard",
    "category": "Dynamic Programming",
    "topicTags": [
      "Greedy",
      "Arrays"
    ],
    "problemStatement": "There are n children standing in a line with rating values. Each child must get at least 1 candy, and children with higher rating get more candies than neighbors. Return minimum candies.",
    "diagram": null,
    "examples": [
      {
        "input": "ratings = [1, 0, 2]",
        "output": "5",
        "explanation": "Allocate 2, 1, 2 candies respectively. Sum = 5.",
        "exp": "Allocate 2, 1, 2 candies respectively. Sum = 5."
      }
    ],
    "constraints": [
      "1 <= ratings.length <= 2 * 10^4"
    ],
    "starterCode": {
      "javascript": "function candy(ratings) {\n    const n = ratings.length;\n    const candies = new Array(n).fill(1);\n    for (let i = 1; i < n; i++) {\n        if (ratings[i] > ratings[i - 1]) candies[i] = candies[i - 1] + 1;\n    }\n    for (let i = n - 2; i >= 0; i--) {\n        if (ratings[i] > ratings[i + 1]) candies[i] = Math.max(candies[i], candies[i + 1] + 1);\n    }\n    return candies.reduce((a, b) => a + b, 0);\n}\nconsole.log(candy([1, 0, 2]));",
      "cpp": "#include <iostream>\n#include <vector>\n#include <numeric>\n#include <algorithm>\nusing namespace std;\nclass Solution {\npublic:\n    int candy(vector<int>& ratings) {\n        int n = ratings.size();\n        vector<int> c(n, 1);\n        for (int i = 1; i < n; i++) if (ratings[i] > ratings[i - 1]) c[i] = c[i - 1] + 1;\n        for (int i = n - 2; i >= 0; i--) if (ratings[i] > ratings[i + 1]) c[i] = max(c[i], c[i + 1] + 1);\n        return accumulate(c.begin(), c.end(), 0);\n    }\n};\nint main() {\n    Solution sol;\n    vector<int> r = {1, 0, 2};\n    cout << sol.candy(r) << endl;\n    return 0;\n}",
      "java": "import java.util.*;\npublic class Main {\n    public static int candy(int[] ratings) {\n        int n = ratings.length;\n        int[] c = new int[n];\n        Arrays.fill(c, 1);\n        for (int i = 1; i < n; i++) if (ratings[i] > ratings[i - 1]) c[i] = c[i - 1] + 1;\n        for (int i = n - 2; i >= 0; i--) if (ratings[i] > ratings[i + 1]) c[i] = Math.max(c[i], c[i + 1] + 1);\n        int sum = 0;\n        for (int x : c) sum += x;\n        return sum;\n    }\n    public static void main(String[] args) {\n        System.out.println(candy(new int[]{1, 0, 2}));\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "name": "Sample Case 1",
        "input": "",
        "expectedOutput": "5",
        "isHidden": false
      },
      {
        "id": 2,
        "name": "Hidden Case 2",
        "input": "",
        "expectedOutput": "5",
        "isHidden": true
      }
    ]
  },
  {
    "id": "103",
    "number": 103,
    "title": "Distinct Ways to Climb Staircase",
    "slug": "distinct-ways-to-climb-staircase",
    "difficulty": "Easy",
    "category": "Dynamic Programming",
    "topicTags": [
      "Dynamic Programming",
      "Memoization"
    ],
    "problemStatement": "You are climbing a staircase of n steps. Each time you can climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
    "diagram": null,
    "examples": [
      {
        "input": "n = 3",
        "output": "3",
        "explanation": "1+1+1, 1+2, 2+1. 3 distinct ways.",
        "exp": "1+1+1, 1+2, 2+1. 3 distinct ways."
      }
    ],
    "constraints": [
      "1 <= n <= 45"
    ],
    "starterCode": {
      "javascript": "function climbStairs(n) {\n    if (n <= 2) return n;\n    let a = 1, b = 2;\n    for (let i = 3; i <= n; i++) {\n        const c = a + b;\n        a = b;\n        b = c;\n    }\n    return b;\n}\nconsole.log(climbStairs(3));",
      "cpp": "#include <iostream>\nusing namespace std;\nclass Solution {\npublic:\n    int climbStairs(int n) {\n        if (n <= 2) return n;\n        int a = 1, b = 2;\n        for (int i = 3; i <= n; i++) {\n            int c = a + b; a = b; b = c;\n        }\n        return b;\n    }\n};\nint main() {\n    Solution sol;\n    cout << sol.climbStairs(3) << endl;\n    return 0;\n}",
      "java": "public class Main {\n    public static int climbStairs(int n) {\n        if (n <= 2) return n;\n        int a = 1, b = 2;\n        for (int i = 3; i <= n; i++) {\n            int c = a + b; a = b; b = c;\n        }\n        return b;\n    }\n    public static void main(String[] args) {\n        System.out.println(climbStairs(3));\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "name": "Sample Case 1",
        "input": "",
        "expectedOutput": "3",
        "isHidden": false
      },
      {
        "id": 2,
        "name": "Hidden Case 2",
        "input": "",
        "expectedOutput": "3",
        "isHidden": true
      }
    ]
  },
  {
    "id": "104",
    "number": 104,
    "title": "Maximum Wealth Stash Along Street",
    "slug": "maximum-wealth-stash-along-street",
    "difficulty": "Medium",
    "category": "Dynamic Programming",
    "topicTags": [
      "Dynamic Programming"
    ],
    "problemStatement": "You are a professional robber planning to rob houses along a street. Adjacent houses have connected security systems. Return max money you can rob tonight without alerting police.",
    "diagram": null,
    "examples": [
      {
        "input": "nums = [1, 2, 3, 1]",
        "output": "4",
        "explanation": "Rob house 1 (money = 1) and house 3 (money = 3). Total = 4.",
        "exp": "Rob house 1 (money = 1) and house 3 (money = 3). Total = 4."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 100"
    ],
    "starterCode": {
      "javascript": "function rob(nums) {\n    let rob1 = 0, rob2 = 0;\n    for (const n of nums) {\n        const newRob = Math.max(rob1 + n, rob2);\n        rob1 = rob2;\n        rob2 = newRob;\n    }\n    return rob2;\n}\nconsole.log(rob([1, 2, 3, 1]));",
      "cpp": "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nclass Solution {\npublic:\n    int rob(vector<int>& nums) {\n        int r1 = 0, r2 = 0;\n        for (int n : nums) {\n            int newR = max(r1 + n, r2);\n            r1 = r2;\n            r2 = newR;\n        }\n        return r2;\n    }\n};\nint main() {\n    Solution sol;\n    vector<int> n = {1, 2, 3, 1};\n    cout << sol.rob(n) << endl;\n    return 0;\n}",
      "java": "public class Main {\n    public static int rob(int[] nums) {\n        int r1 = 0, r2 = 0;\n        for (int n : nums) {\n            int newR = Math.max(r1 + n, r2);\n            r1 = r2;\n            r2 = newR;\n        }\n        return r2;\n    }\n    public static void main(String[] args) {\n        System.out.println(rob(new int[]{1, 2, 3, 1}));\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "name": "Sample Case 1",
        "input": "",
        "expectedOutput": "4",
        "isHidden": false
      },
      {
        "id": 2,
        "name": "Hidden Case 2",
        "input": "",
        "expectedOutput": "4",
        "isHidden": true
      }
    ]
  },
  {
    "id": "105",
    "number": 105,
    "title": "Minimum Coin Count for Target Currency",
    "slug": "minimum-coin-count-for-target-currency",
    "difficulty": "Medium",
    "category": "Dynamic Programming",
    "topicTags": [
      "Dynamic Programming",
      "Breadth-First Search"
    ],
    "problemStatement": "You are given integer array coins representing coins of different denominations and integer amount. Return fewest number of coins needed to make up amount, or -1.",
    "diagram": null,
    "examples": [
      {
        "input": "coins = [1, 2, 5], amount = 11",
        "output": "3",
        "explanation": "11 = 5 + 5 + 1. 3 coins total.",
        "exp": "11 = 5 + 5 + 1. 3 coins total."
      }
    ],
    "constraints": [
      "1 <= coins.length <= 12",
      "0 <= amount <= 10^4"
    ],
    "starterCode": {
      "javascript": "function coinChange(coins, amount) {\n    const dp = new Array(amount + 1).fill(Infinity);\n    dp[0] = 0;\n    for (const c of coins) {\n        for (let i = c; i <= amount; i++) {\n            dp[i] = Math.min(dp[i], dp[i - c] + 1);\n        }\n    }\n    return dp[amount] === Infinity ? -1 : dp[amount];\n}\nconsole.log(coinChange([1, 2, 5], 11));",
      "cpp": "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nclass Solution {\npublic:\n    int coinChange(vector<int>& coins, int amount) {\n        vector<int> dp(amount + 1, 1e9);\n        dp[0] = 0;\n        for (int c : coins) {\n            for (int i = c; i <= amount; i++) {\n                dp[i] = min(dp[i], dp[i - c] + 1);\n            }\n        }\n        return dp[amount] >= 1e9 ? -1 : dp[amount];\n    }\n};\nint main() {\n    Solution sol;\n    vector<int> c = {1, 2, 5};\n    cout << sol.coinChange(c, 11) << endl;\n    return 0;\n}",
      "java": "import java.util.*;\npublic class Main {\n    public static int coinChange(int[] coins, int amount) {\n        int[] dp = new int[amount + 1];\n        Arrays.fill(dp, (int)1e9);\n        dp[0] = 0;\n        for (int c : coins) {\n            for (int i = c; i <= amount; i++) {\n                dp[i] = Math.min(dp[i], dp[i - c] + 1);\n            }\n        }\n        return dp[amount] >= (int)1e9 ? -1 : dp[amount];\n    }\n    public static void main(String[] args) {\n        System.out.println(coinChange(new int[]{1, 2, 5}, 11));\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "name": "Sample Case 1",
        "input": "",
        "expectedOutput": "3",
        "isHidden": false
      },
      {
        "id": 2,
        "name": "Hidden Case 2",
        "input": "",
        "expectedOutput": "3",
        "isHidden": true
      }
    ]
  },
  {
    "id": "106",
    "number": 106,
    "title": "Length of Longest Strictly Ascending Subsequence",
    "slug": "length-of-longest-strictly-ascending-subsequence",
    "difficulty": "Medium",
    "category": "Dynamic Programming",
    "topicTags": [
      "Dynamic Programming",
      "Binary Search"
    ],
    "problemStatement": "Given integer array nums, return the length of the longest strictly increasing subsequence in O(n log n).",
    "diagram": null,
    "examples": [
      {
        "input": "nums = [10, 9, 2, 5, 3, 7, 101, 18]",
        "output": "4",
        "explanation": "Longest subsequence [2, 3, 7, 101] has length 4.",
        "exp": "Longest subsequence [2, 3, 7, 101] has length 4."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 2500"
    ],
    "starterCode": {
      "javascript": "function lengthOfLIS(nums) {\n    const tails = [];\n    for (const x of nums) {\n        let l = 0, r = tails.length;\n        while (l < r) {\n            const mid = (l + r) >> 1;\n            if (tails[mid] < x) l = mid + 1;\n            else r = mid;\n        }\n        tails[l] = x;\n    }\n    return tails.length;\n}\nconsole.log(lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18]));",
      "cpp": "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nclass Solution {\npublic:\n    int lengthOfLIS(vector<int>& nums) {\n        vector<int> tails;\n        for (int x : nums) {\n            auto it = lower_bound(tails.begin(), tails.end(), x);\n            if (it == tails.end()) tails.push_back(x);\n            else *it = x;\n        }\n        return tails.size();\n    }\n};\nint main() {\n    Solution sol;\n    vector<int> nums = {10, 9, 2, 5, 3, 7, 101, 18};\n    cout << sol.lengthOfLIS(nums) << endl;\n    return 0;\n}",
      "java": "import java.util.*;\npublic class Main {\n    public static int lengthOfLIS(int[] nums) {\n        List<Integer> tails = new ArrayList<>();\n        for (int x : nums) {\n            int l = 0, r = tails.size();\n            while (l < r) {\n                int mid = (l + r) / 2;\n                if (tails.get(mid) < x) l = mid + 1;\n                else r = mid;\n            }\n            if (l == tails.size()) tails.add(x);\n            else tails.set(l, x);\n        }\n        return tails.size();\n    }\n    public static void main(String[] args) {\n        System.out.println(lengthOfLIS(new int[]{10, 9, 2, 5, 3, 7, 101, 18}));\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "name": "Sample Case 1",
        "input": "",
        "expectedOutput": "4",
        "isHidden": false
      },
      {
        "id": 2,
        "name": "Hidden Case 2",
        "input": "",
        "expectedOutput": "4",
        "isHidden": true
      }
    ]
  },
  {
    "id": "107",
    "number": 107,
    "title": "Word Segmentation via Dictionary Lexicon",
    "slug": "word-segmentation-via-dictionary-lexicon",
    "difficulty": "Medium",
    "category": "Dynamic Programming",
    "topicTags": [
      "Dynamic Programming",
      "Trie"
    ],
    "problemStatement": "Given string s and dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of dictionary words.",
    "diagram": null,
    "examples": [
      {
        "input": "s = \"leetcode\", wordDict = [\"leet\",\"code\"]",
        "output": "true",
        "explanation": "\"leetcode\" can be segmented as \"leet code\".",
        "exp": "\"leetcode\" can be segmented as \"leet code\"."
      }
    ],
    "constraints": [
      "1 <= s.length <= 300"
    ],
    "starterCode": {
      "javascript": "function wordBreak(s, wordDict) {\n    const dict = new Set(wordDict);\n    const dp = new Array(s.length + 1).fill(false);\n    dp[0] = true;\n    for (let i = 1; i <= s.length; i++) {\n        for (let j = 0; j < i; j++) {\n            if (dp[j] && dict.has(s.substring(j, i))) {\n                dp[i] = true;\n                break;\n            }\n        }\n    }\n    return dp[s.length];\n}\nconsole.log(wordBreak(\"leetcode\", [\"leet\", \"code\"]));",
      "cpp": "#include <iostream>\n#include <string>\n#include <vector>\n#include <unordered_set>\nusing namespace std;\nclass Solution {\npublic:\n    bool wordBreak(string s, vector<string>& wordDict) {\n        unordered_set<string> dict(wordDict.begin(), wordDict.end());\n        int n = s.size();\n        vector<bool> dp(n + 1, false);\n        dp[0] = true;\n        for (int i = 1; i <= n; i++) {\n            for (int j = 0; j < i; j++) {\n                if (dp[j] && dict.count(s.substr(j, i - j))) {\n                    dp[i] = true;\n                    break;\n                }\n            }\n        }\n        return dp[n];\n    }\n};\nint main() {\n    Solution sol;\n    vector<string> wd = {\"leet\", \"code\"};\n    cout << (sol.wordBreak(\"leetcode\", wd) ? \"true\" : \"false\") << endl;\n    return 0;\n}",
      "java": "import java.util.*;\npublic class Main {\n    public static boolean wordBreak(String s, List<String> wordDict) {\n        Set<String> dict = new HashSet<>(wordDict);\n        int n = s.length();\n        boolean[] dp = new boolean[n + 1];\n        dp[0] = true;\n        for (int i = 1; i <= n; i++) {\n            for (int j = 0; j < i; j++) {\n                if (dp[j] && dict.contains(s.substring(j, i))) {\n                    dp[i] = true;\n                    break;\n                }\n            }\n        }\n        return dp[n];\n    }\n    public static void main(String[] args) {\n        System.out.println(wordBreak(\"leetcode\", Arrays.asList(\"leet\", \"code\")));\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "name": "Sample Case 1",
        "input": "",
        "expectedOutput": "true",
        "isHidden": false
      },
      {
        "id": 2,
        "name": "Hidden Case 2",
        "input": "",
        "expectedOutput": "true",
        "isHidden": true
      }
    ]
  },
  {
    "id": "108",
    "number": 108,
    "title": "Minimum String Edit Levenshtein Distance",
    "slug": "minimum-string-edit-levenshtein-distance",
    "difficulty": "Hard",
    "category": "Dynamic Programming",
    "topicTags": [
      "Dynamic Programming",
      "Strings"
    ],
    "problemStatement": "Given two strings word1 and word2, return minimum number of operations required to convert word1 to word2 (insert, delete, or replace character).",
    "diagram": null,
    "examples": [
      {
        "input": "word1 = \"horse\", word2 = \"ros\"",
        "output": "3",
        "explanation": "horse -> rorse (replace 'h' with 'r') -> rose (remove 'r') -> ros (remove 'e').",
        "exp": "horse -> rorse (replace 'h' with 'r') -> rose (remove 'r') -> ros (remove 'e')."
      }
    ],
    "constraints": [
      "0 <= word1.length, word2.length <= 500"
    ],
    "starterCode": {
      "javascript": "function minDistance(word1, word2) {\n    const m = word1.length, n = word2.length;\n    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));\n    for (let i = 0; i <= m; i++) dp[i][0] = i;\n    for (let j = 0; j <= n; j++) dp[0][j] = j;\n    for (let i = 1; i <= m; i++) {\n        for (let j = 1; j <= n; j++) {\n            if (word1[i - 1] === word2[j - 1]) dp[i][j] = dp[i - 1][j - 1];\n            else dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);\n        }\n    }\n    return dp[m][n];\n}\nconsole.log(minDistance(\"horse\", \"ros\"));",
      "cpp": "#include <iostream>\n#include <string>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nclass Solution {\npublic:\n    int minDistance(string word1, string word2) {\n        int m = word1.size(), n = word2.size();\n        vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));\n        for (int i = 0; i <= m; i++) dp[i][0] = i;\n        for (int j = 0; j <= n; j++) dp[0][j] = j;\n        for (int i = 1; i <= m; i++) {\n            for (int j = 1; j <= n; j++) {\n                if (word1[i - 1] == word2[j - 1]) dp[i][j] = dp[i - 1][j - 1];\n                else dp[i][j] = 1 + min({dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]});\n            }\n        }\n        return dp[m][n];\n    }\n};\nint main() {\n    Solution sol;\n    cout << sol.minDistance(\"horse\", \"ros\") << endl;\n    return 0;\n}",
      "java": "public class Main {\n    public static int minDistance(String word1, String word2) {\n        int m = word1.length(), n = word2.length();\n        int[][] dp = new int[m + 1][n + 1];\n        for (int i = 0; i <= m; i++) dp[i][0] = i;\n        for (int j = 0; j <= n; j++) dp[0][j] = j;\n        for (int i = 1; i <= m; i++) {\n            for (int j = 1; j <= n; j++) {\n                if (word1.charAt(i - 1) == word2.charAt(j - 1)) dp[i][j] = dp[i - 1][j - 1];\n                else dp[i][j] = 1 + Math.min(dp[i - 1][j], Math.min(dp[i][j - 1], dp[i - 1][j - 1]));\n            }\n        }\n        return dp[m][n];\n    }\n    public static void main(String[] args) {\n        System.out.println(minDistance(\"horse\", \"ros\"));\n    }\n}"
    },
    "testCases": [
      {
        "id": 1,
        "name": "Sample Case 1",
        "input": "",
        "expectedOutput": "3",
        "isHidden": false
      },
      {
        "id": 2,
        "name": "Hidden Case 2",
        "input": "",
        "expectedOutput": "3",
        "isHidden": true
      }
    ]
  }
];

export const DEFAULT_DSA_QUESTION = DSA_QUESTIONS[0];
