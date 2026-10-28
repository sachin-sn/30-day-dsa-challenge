import { runBench } from "../../shared/bench.js";
import { groupAnagramsBrute } from "./brute.js";
import { groupAnagramsBetter } from "./better.js";
import { makeBenchWords, normalize } from "./cases.js";
import { isDeepStrictEqual } from "node:util";

const same = (a: string[][], b: string[][]) => isDeepStrictEqual(normalize(a), normalize(b));

// Run 1: many short words (10 letters each). n is the number of words.
runBench<string[], string[][]>({
  name: "Day 3: Group Anagrams, many short words (k = 10 letters, n words)",
  sizes: [1_000, 10_000, 100_000],
  makeInput: (n) => makeBenchWords(n, 10),
  brute: groupAnagramsBrute,
  better: groupAnagramsBetter,
  equal: same,
  bruteGrowth: 1.2,
});

console.log("");

// Run 2: fewer but long words (1,000 letters each). Here the cost of sorting each word shows up more.
runBench<string[], string[][]>({
  name: "Day 3: Group Anagrams, long words (k = 1,000 letters, n words)",
  sizes: [100, 1_000, 5_000],
  makeInput: (n) => makeBenchWords(n, 1_000),
  brute: groupAnagramsBrute,
  better: groupAnagramsBetter,
  equal: same,
  bruteGrowth: 1.2,
});
