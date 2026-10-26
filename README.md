# 30-Day DSA Challenge

One data-structures-and-algorithms problem a day, in TypeScript, in a 90-minute format. I write a
brute force and a better solution myself, count the operations of both, time them, and explain
why the better one does less work with two Mermaid diagrams.

## How a day works

| Minutes | Step |
|---------|------|
| 5  | Predictions in `solution.md`, written by me before any code runs |
| 30 | Part A: write `brute.ts`, run the tests until they pass |
| 30 | Part B: write `better.ts`, run the tests, then run the benchmark |
| 25 | Notes: output, interview explanation, edge cases, diagram check, pattern remark, not measured |

Rules: the problem text, tests, benchmark script and first diagram drafts are written by Claude;
I write both solutions. Hints come in three levels (pattern name, one-sentence idea, pseudocode)
only after 20 minutes of being stuck, and the level used is written in `solution.md`.
Operations are counted with the shared counter, time is measured too, and what was not measured
is written down. Blog and LinkedIn posts are written only on request.

## Run

```
npm install
npx tsx day-01-two-sum/src/tests.ts
npx tsx day-01-two-sum/src/bench.ts
```

(`npx tsx` is needed because Node v22.2.0 cannot run TypeScript files directly.)

Render a diagram to SVG for the blog:

```
npx -p @mermaid-js/mermaid-cli mmdc -i day-01-two-sum/diagrams/flow.mmd -o day-01-two-sum/diagrams/flow.svg
```

## Shared files

- `shared/ops.ts`: the operation counter (`ops.tick()`, `ops.reset()`, `ops.count`).
- `shared/random.ts`: a seeded random generator, so every run uses the same inputs.
- `shared/bench.ts`: runs both solutions on each size, checks that they agree, and prints the table.

## Days

| Day | Problem | Pattern | Status |
|-----|---------|---------|--------|
| 1   | Two Sum | Hash map | In progress (started 2026-10-26) |
| 2   | Longest Consecutive Sequence | Hash set | Not started |
| 3   | Group Anagrams | Hash map as a key | Not started |
| 4   | Subarray Sum Equals K | Prefix sum + hash map | Not started |
| 5   | Product of Array Except Self | Prefix and suffix | Not started |
| 6   | 3Sum | Sort + two pointers | Not started |
| 7   | Container With Most Water | Two pointers | Not started |
| 8   | Trapping Rain Water | Two pointers | Not started |
| 9   | Maximum sum of a subarray of size k | Fixed sliding window | Not started |
| 10  | Longest Substring Without Repeating Characters | Variable sliding window | Not started |
| 11  | Longest Repeating Character Replacement | Sliding window | Not started |
| 12  | Sliding Window Maximum | Monotonic deque | Not started |
| 13  | Valid Parentheses | Stack | Not started |
| 14  | Daily Temperatures | Monotonic stack | Not started |
| 15  | Largest Rectangle in Histogram | Monotonic stack | Not started |
| 16  | Search in Rotated Sorted Array | Binary search | Not started |
| 17  | Koko Eating Bananas | Binary search on the answer | Not started |
| 18  | Top K Frequent Elements | Heap / bucket | Not started |
| 19  | Kth Largest Element | Heap | Not started |
| 20  | Linked List Cycle | Fast and slow pointers | Not started |
| 21  | Validate Binary Search Tree | Tree recursion with bounds | Not started |
| 22  | Diameter of Binary Tree | Tree recursion, return two things | Not started |
| 23  | Redundant Connection | Union-Find | Not started |
| 24  | Course Schedule | Topological sort | Not started |
| 25  | Climbing Stairs | Memoization | Not started |
| 26  | House Robber | Dynamic programming | Not started |
| 27  | Coin Change | Dynamic programming | Not started |
| 28  | Longest Increasing Subsequence | DP + binary search | Not started |
| 29  | Implement Trie (prefix search) | Trie | Not started |
| 30  | LRU Cache (capstone) | Hash map + doubly linked list | Not started |
