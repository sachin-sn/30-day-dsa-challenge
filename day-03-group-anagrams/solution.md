# Day 3: Group Anagrams, my notes

## Predictions (written before any code)

1. Brute force complexity (in n and k):
2. Brute force operations at n = 1,000, k = 10:
3. Better solution (complexity, operations at n = 1,000, k = 10):
4. Gap with short words (k = 10), and with long words (k = 1,000), and why:

My counting rule (what one `ops.tick()` means):

## Output

```
Day 3: Group Anagrams, many short words (k = 10 letters, n words)
      n  brute ops  better ops  brute ms  better ms  ops ratio
  1,000     23,872      11,000     0.884      0.860       2.2x
 10,000    238,218     110,000      7.92       7.63       2.2x
100,000  2,383,142   1,100,000       114      90.14       2.2x

Day 3: Group Anagrams, long words (k = 1,000 letters, n words)
    n  brute ops  better ops  brute ms  better ms  ops ratio
  100     787,338     100,100     15.11      0.328       7.9x
1,000   7,877,374   1,001,000       150       2.53       7.9x
5,000  39,384,087   5,005,000       753      13.24       7.9x

Run on 2026-10-29, MacBook Pro, Node via tsx. Operation counts are exact; the milliseconds are one machine, one run (median of 7 for the fast ones).
```

## Hint level used

hint level 3

## Interview explanation (3 sentences)

1. the solution works by creating a simple array of numbers represeting count of each alphabet present and fill rest with 0, eg. "aab" = "2,1,0,0,0,...0"
2. once it is merged, we will have a unique value = "210000...0" which will be same for "baa" or "aba" as well.
3. all the words, matching unique values, will have same letters and hence can be grouped together

## Edge cases I would ask about

- if the words can contain other characters (spaces, uppercase, digits), the 26-slot counting key breaks silently; the sorted-letters key still works.

## Diagram check

(Does `diagrams/flow.mmd` match my code? Does `diagrams/trace.mmd` match the first example? Write "diagram checked" or what is wrong.)

## Same pattern, other problems

Claude's draft; check it and add one problem or use from your own experience. Mark "solved" only for what you really solved.

**How to spot it.** Items are "the same" after some normalisation (sorting the letters, lowercasing, counting), so you can turn each item into a key and let a map collect everything that shares it.

**Other problems that use it.**

| Problem                       | The twist compared with today                                             | Status     |
| ----------------------------- | ------------------------------------------------------------------------- | ---------- |
| Valid Anagram                 | Only two words, so compare their letter counts                            | not solved |
| Find All Anagrams in a String | Slide a window over the text and keep the letter counts of the window     | not solved |
| Isomorphic Strings            | The key is the pattern of the word (`egg` and `add` both look like `abb`) | not solved |

**Where it is used outside interviews.** Grouping records by a normalised key (emails, product names, addresses) before comparing or merging them.

## Not measured / still open

-
