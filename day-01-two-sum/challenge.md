# Day 1: Two Sum (hash map)

Started: Mon 2026-10-26

## The problem, in my own words

You get a list of integers `nums` and one integer `target`. There is at most one pair of different
positions holding two numbers that add up to `target`. Return those two positions as `[i, j]` with `i < j`,
or `null` if no such pair exists.

- The same position cannot be used twice. The same value can appear twice, at two positions.
- Numbers can be negative or zero.
- There is never more than one answer, so there is nothing to choose between. The list can be empty or have one element; then the answer is `null`.

```ts
twoSumBrute(nums: number[], target: number): [number, number] | null
twoSumBetter(nums: number[], target: number): [number, number] | null
```

## Four examples

| nums | target | answer | why |
|------|--------|--------|-----|
| `[2, 7, 11, 15]` | 9 | `[0, 1]` | 2 + 7 = 9 |
| `[3, 2, 4]` | 6 | `[1, 2]` | 2 + 4 = 6; the 3 at index 0 would need another 3 |
| `[3, 3]` | 6 | `[0, 1]` | the same value is fine at two different positions |
| `[1, 2, 3]` | 10 | `null` | no two numbers add up to 10 |

## Before any code: three predictions (in `solution.md`, 5 minutes)

1. The time complexity of your brute force.
2. How many operations it does at n = 1,000 (use your own counting rule and write it down).
3. Your guess for the better solution: complexity, and operations at n = 1,000.

The benchmark input puts the pair at the last two positions, so both solutions do their most work.
Predict for that worst case.

## The 90 minutes

| Minutes | Step |
|---------|------|
| 5  | Predictions in `solution.md` |
| 30 | Part A: write `src/brute.ts`, run `npx tsx day-01-two-sum/src/tests.ts` until it passes |
| 30 | Part B: write `src/better.ts`, run the tests, then `npx tsx day-01-two-sum/src/bench.ts` |
| 25 | Notes in `solution.md`: output, interview explanation, edge cases, diagram check, pattern remark, not measured |

Run these from the repo root.

## Counting operations

Call `ops.tick()` once per basic step (a comparison, a lookup, one pass of a loop). Pick one rule, use
the same rule in both files, and write it in `solution.md`. `bench.ts` resets the counter before each run.

## Hints

Only after 20 minutes of being stuck, one level at a time: (1) the name of the pattern, (2) the idea in
one sentence, (3) pseudocode. Write the level you used in `solution.md`.

## Diagrams

`diagrams/flow.mmd` and `diagrams/trace.mmd` are drafts. After your code works, check that they match what
you wrote, and write "diagram checked" (or what is wrong) in `solution.md`.
