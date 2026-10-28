import { makeRng, randArray } from "../../shared/random.js";

// Small values in a small range: many duplicates and many runs, good for correctness tests.
export function makeSmallCase(n: number, seed: number): number[] {
  const rng = makeRng(seed);
  return randArray(rng, n, -n, n);
}

// Benchmark input: n numbers from 0..2n. About 60% of the values are different, so there are
// runs of many lengths and plenty of duplicates. Same seed every run.
export function makeBenchInput(n: number): number[] {
  const rng = makeRng(42);
  return randArray(rng, n, 0, 2 * n);
}

// A trusted answer for the tests, written differently from both solutions: sort the distinct values.
export function reference(nums: number[]): number {
  const sorted = [...new Set(nums)].sort((a, b) => a - b);
  let best = 0;
  let run = 0;
  for (let i = 0; i < sorted.length; i++) {
    run = i > 0 && sorted[i] === sorted[i - 1] + 1 ? run + 1 : 1;
    if (run > best) best = run;
  }
  return best;
}
