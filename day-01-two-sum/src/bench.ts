import { runBench } from "../../shared/bench.js";
import { twoSumBrute } from "./brute.js";
import { twoSumBetter } from "./better.js";
import { makeCase, type TwoSumCase } from "./cases.js";

// The pair sits at the last two positions, so both solutions do their most work (worst case).
// Same seed every run, so the inputs are the same every time.
runBench<TwoSumCase, [number, number] | null>({
  name: "Day 1: Two Sum (worst case: the pair is at the end)",
  sizes: [1_000, 10_000, 100_000],
  makeInput: (n) => makeCase(n, 42, "end"),
  brute: (c) => twoSumBrute(c.nums, c.target),
  better: (c) => twoSumBetter(c.nums, c.target),
});
