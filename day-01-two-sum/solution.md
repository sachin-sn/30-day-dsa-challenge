# Day 1: Two Sum, my notes

## Predictions (written before any code)

1. Brute force complexity: O(n2)
2. Brute force operations at n = 1,000: 1000000
3. Better solution (complexity, operations at n = 1,000): 1000

My counting rule (what one `ops.tick()` means):

## Output

```
Day 1: Two Sum (worst case: the pair is at the end)
      n      brute ops  better ops  brute ms  better ms  ops ratio
  1,000        500,499       1,000     0.500      0.073     500.5x
 10,000     50,004,999      10,000     46.76      0.648    5000.5x
100,000  5,000,049,999     100,000     11885       7.48   50000.5x

Run on 2026-10-26, MacBook Pro, Node via tsx. Operation counts are exact; the milliseconds are one machine, one run (median of 7 for the fast ones).
```

## Hint level used

None / 1 / 2 / 3 (delete the others)

used hint level 1

## Interview explanation (3 sentences)

1. In order to achieve optimal time complexity, I used hashMaps and stored the index of each value and calculated the first sum
2. Was able to achive O(n) as the map.has('key') is just O(1) in time complexity there by reducing the loops
3. Brute force use a few variables, constant (O(1)), however long it runs, In comparision that of hash map, it can take up to n entries, so O(n). At 100,000 numbers that’s a map with about 100,000 entries, which is real memory.

## Edge cases I would ask about

- One edge case was typescript error, where by default expectations was it returns [number, number], but there is probablity that array can have no records that matches the target.

## Diagram check

(Does `diagrams/flow.mmd` match my code? Does `diagrams/trace.mmd` match the first example? Write "diagram checked" or what is wrong.)

## Same pattern, other problems

Claude's draft; check it and add one problem or use from your own experience. Mark "solved" only for what you really solved.

**How to spot it.** The problem asks for two items that fit together, and the partner of each item can be computed (here: `target - x`), so you can look it up instead of searching for it.

**Other problems that use it.**

| Problem                             | The twist compared with today                                     | Status     |
| ----------------------------------- | ----------------------------------------------------------------- | ---------- |
| Two Sum II (sorted input)           | Sorted, so two pointers need no extra memory                      | not solved |
| 4Sum II                             | Four arrays; store all sums of two of them in a map               | not solved |
| Count pairs with a given difference | The partner is `x + k` and `x - k`; count them, not just find one | not solved |

**Where it is used outside interviews.** Joining two datasets on a key (a hash join in a database); matching payments to refunds.

## Not measured / still open

-
