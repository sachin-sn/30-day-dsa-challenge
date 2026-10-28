import { runBench } from "../../shared/bench.js";
import { longestConsecutiveBrute } from "./brute.js";
import { longestConsecutiveBetter } from "./better.js";
import { makeBenchInput } from "./cases.js";

// Random numbers from 0..2n with many duplicates and runs of many lengths. Same seed every run.
// Neither solution may change the input, because both are run on the same array.
// bruteGrowth 1.2: a sort grows a bit faster than n, not like n squared.
runBench<number[], number>({
  name: "Day 2: Longest Consecutive Sequence (random numbers from 0..2n)",
  sizes: [1_000, 10_000, 100_000],
  makeInput: makeBenchInput,
  brute: longestConsecutiveBrute,
  better: longestConsecutiveBetter,
  bruteGrowth: 1.2,
});
