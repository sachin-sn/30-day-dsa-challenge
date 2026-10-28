# Day 3: Group Anagrams (hash map as a key)

Started: Wed 2026-10-28

## The problem, in my own words

You get a list of words made of lowercase letters `a` to `z`. Two words are anagrams if they use exactly the same
letters the same number of times (`eat` and `tea`, but not `aab` and `abb`). Put the words that are anagrams of each
other into one group, and return all the groups.

- Each group is a list of the original words. The order of the groups, and the order inside a group, do not matter.
- A word that appears twice appears twice in its group.
- The empty word `""` is a word too: all empty words form one group.
- An empty list gives an empty list of groups.
- Do not change the array you are given.

```ts
groupAnagramsBrute(words: string[]): string[][]
groupAnagramsBetter(words: string[]): string[][]
```

## Examples

| words | answer (any order) |
|-------|--------------------|
| `["eat", "tea", "tan", "ate", "nat", "bat"]` | `[["eat", "tea", "ate"], ["tan", "nat"], ["bat"]]` |
| `[""]` | `[[""]]` |
| `["abc", "bca", "cab", "abc"]` | `[["abc", "bca", "cab", "abc"]]` |
| `[]` | `[]` |

## The two solutions

- **Part A (brute):** make a key for each word by sorting its letters (`eat` and `tea` both become `aet`), and keep
  one group per key.
- **Part B (better):** build a key for each word without sorting its letters, and keep one group per key.

Both follow the same plan, so the question of the day is how much the key costs. If you would rather write a
different brute force (for example comparing every pair of words), tell me first, because it changes what the
predictions mean.

## Before any code: predictions (in `solution.md`, 5 minutes)

Let n be the number of words and k the length of a word.

1. The time complexity of your brute force, in n and k.
2. How many operations it does at n = 1,000 with k = 10 (write down your counting rule; the comparisons of the letter
   sort count).
3. Your guess for the better solution: complexity, and operations at n = 1,000 with k = 10.
4. Will the gap between the two be big or small with short words (k = 10)? And with long words (k = 1,000)? Why?

The benchmark runs both: many short words, then fewer long words.

## The 90 minutes

| Minutes | Step |
|---------|------|
| 5  | Predictions in `solution.md` |
| 30 | Part A: write `src/brute.ts`, run `npx tsx day-03-group-anagrams/src/tests.ts` until it passes |
| 30 | Part B: write `src/better.ts`, run the tests, then `npx tsx day-03-group-anagrams/src/bench.ts` |
| 25 | Notes in `solution.md`: output, interview explanation, edge cases, diagram check, pattern remark, not measured |

Run these from the repo root.

## Counting operations

Call `ops.tick()` once per basic step and use one rule in both files. Think about what the basic step is when part of
the work is a sort and part of it is a pass over the letters. Write the rule in `solution.md`.

## Hints

Only after 20 minutes of being stuck, one level at a time: (1) the name of the pattern, (2) the idea in
one sentence, (3) pseudocode. Write the level you used in `solution.md`.

## Diagrams

`diagrams/flow.mmd` and `diagrams/trace.mmd` are drafts. Once your code works, check that they match what you wrote
(for example, does your key really get built without sorting?), and write "diagram checked" or what is wrong in
`solution.md`.
