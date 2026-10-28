# Day 2: Longest Consecutive Sequence, my notes

## Predictions (written before any code)

1. Brute force complexity: O(n3)
2. Brute force operations at n = 1,000: 1000X1000X1000
3. Better solution (complexity, operations at n = 1,000): O(Nlogn)
4. Ratio at n = 100,000 (bigger or smaller than Day 1's?): bigger

My counting rule (what one `ops.tick()` means): one iteration

## Output

```
Day 2: Longest Consecutive Sequence (random numbers from 0..2n)
      n       brute ops  better ops  brute ms  better ms  ops ratio
  1,000       1,300,577       1,106      3.72      0.126    1175.9x
 10,000     130,950,714      10,884       387      0.803   12031.5x
100,000  12,945,123,322     109,413     43989      10.23  118314.3x

Run on 2026-10-27, MacBook Pro, Node via tsx. Operation counts are exact; the milliseconds are one machine, one run (median of 7 for the fast ones).
```

## Hint level used

hint level 3

## Interview explanation (3 sentences)

1.
2.
3.

## Edge cases I would ask about

-

## Diagram check

(Does `diagrams/flow.mmd` match my code? Does `diagrams/trace.mmd` match the first example? Write "diagram checked" or what is wrong.)

## Same pattern, other problems

Claude's draft; check it and add one problem or use from your own experience. Mark "solved" only for what you really solved.

**How to spot it.** The problem asks "does this exist?" or "how long is this streak?" over data in no particular order, and you need to check neighbours (here `x - 1` and `x + 1`) without caring where they sit in the list. A set answers each check in one step.

**Other problems that use it.**

| Problem                    | The twist compared with today                                       | Status     |
| -------------------------- | ------------------------------------------------------------------- | ---------- |
| Contains Duplicate         | Just ask "have I seen this?" while walking the list                 | not solved |
| Missing Number             | Which number of 0..n is not in the set?                             | not solved |
| Intersection of Two Arrays | Put one list in a set, keep the numbers of the other that are in it | not solved |

**Where it is used outside interviews.** Removing duplicates in a data pipeline; counting consecutive-day streaks (days in a row with a login or a commit).

## Not measured / still open

-
