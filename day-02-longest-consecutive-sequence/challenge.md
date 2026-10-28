# Day 2: Longest Consecutive Sequence (hash set)

Started: Tue 2026-10-27

## The problem, in my own words

You get a list of integers `nums`, in any order, possibly with duplicates. A *run* is a set of numbers that
follow each other with no gap, like 4, 5, 6 (the numbers do not have to be next to each other in the list).
Return the length of the longest run you can find in `nums`.

- Duplicates count once: `[1, 2, 2, 3]` has a run of 3.
- Numbers can be negative or zero.
- An empty list has no run, so the answer is `0`. A list with one number has a run of `1`.
- Do not change the array you are given. The benchmark uses the same array for both solutions, so a solution that sorts
  it in place would break the other one. The tests check this.

```ts
longestConsecutiveBrute(nums: number[]): number
longestConsecutiveBetter(nums: number[]): number
```

## Examples

| nums | answer | why |
|------|--------|-----|
| `[100, 4, 200, 1, 3, 2]` | 4 | 1, 2, 3, 4 |
| `[0, 3, 7, 2, 5, 8, 4, 6, 0, 1]` | 9 | 0 to 8; the second 0 counts once |
| `[1, 2, 0, 1]` | 3 | 0, 1, 2; the duplicate 1 counts once |
| `[]` | 0 | nothing to count |

## Before any code: three predictions (in `solution.md`, 5 minutes)

1. The time complexity of your brute force (sort a copy, then walk the sorted list).
2. How many operations it does at n = 1,000 (write down your counting rule; the sort's comparisons count too).
3. Your guess for the better solution: complexity, and operations at n = 1,000. Also guess what the ratio between
   the two will look like at n = 100,000. Is it as big as Day 1's?

The benchmark input is random numbers from 0 to 2n, so it has many duplicates and runs of many lengths.

## The 90 minutes

| Minutes | Step |
|---------|------|
| 5  | Predictions in `solution.md` |
| 30 | Part A: write `src/brute.ts` (sort a copy, walk it), run `npx tsx day-02-longest-consecutive-sequence/src/tests.ts` until it passes |
| 30 | Part B: write `src/better.ts`, run the tests, then `npx tsx day-02-longest-consecutive-sequence/src/bench.ts` |
| 25 | Notes in `solution.md`: output, interview explanation, edge cases, diagram check, pattern remark, not measured |

Run these from the repo root.

## Counting operations

Call `ops.tick()` once per basic step, and pick one rule for both files. In the brute force, the sort is where most of
the work happens, so think about how you can count its comparisons. Write the rule in `solution.md`.

## Hints

Only after 20 minutes of being stuck, one level at a time: (1) the name of the pattern, (2) the idea in
one sentence, (3) pseudocode. Write the level you used in `solution.md`.

## Diagrams

`diagrams/flow.mmd` and `diagrams/trace.mmd` are drafts. Once your code works, check that they match what you wrote
(for example, does your solution only start counting at the first number of a run?), and write "diagram checked" or
what is wrong in `solution.md`.
