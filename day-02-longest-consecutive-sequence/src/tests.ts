import { longestConsecutiveBrute } from "./brute.js";
import { longestConsecutiveBetter } from "./better.js";
import { makeSmallCase, reference } from "./cases.js";

type Solver = (nums: number[]) => number;

interface Fixed {
  name: string;
  nums: number[];
  expected: number;
}

const fixed: Fixed[] = [
  { name: "example 1", nums: [100, 4, 200, 1, 3, 2], expected: 4 },
  { name: "example 2", nums: [0, 3, 7, 2, 5, 8, 4, 6, 0, 1], expected: 9 },
  { name: "example 3: duplicates", nums: [1, 2, 0, 1], expected: 3 },
  { name: "empty list", nums: [], expected: 0 },
  { name: "one number", nums: [5], expected: 1 },
  { name: "all the same", nums: [7, 7, 7], expected: 1 },
  { name: "negatives through zero", nums: [-1, -2, -3, 0, 1], expected: 5 },
  { name: "no two are neighbours", nums: [10, 30, 20], expected: 1 },
  { name: "longest run is not the first", nums: [9, 1, 4, 7, 3, -1, 0, 5, 8, -1, 6], expected: 7 },
  { name: "huge values", nums: [1000000000, 999999999, -1000000000], expected: 2 },
  { name: "already sorted", nums: [1, 2, 3, 4, 5], expected: 5 },
  { name: "sorted backwards", nums: [5, 4, 3, 2, 1], expected: 5 },
];

let failures = 0;

// Check the tests themselves first, so a wrong test is never blamed on your code.
for (const f of fixed) {
  if (reference(f.nums) !== f.expected) {
    console.error(`TEST BUG: fixed case "${f.name}" expects ${f.expected} but the reference says ${reference(f.nums)}.`);
    process.exit(2);
  }
}

function runSolver(label: string, fn: Solver): void {
  let passed = 0;
  let failed = 0;
  const shown: string[] = [];

  const check = (name: string, nums: number[], expected: number) => {
    const original = [...nums];
    const input = [...nums];
    try {
      const r = fn(input);
      const unchanged = input.length === original.length && input.every((v, i) => v === original[i]);
      if (r === expected && unchanged) passed++;
      else {
        failed++;
        if (shown.length < 5)
          shown.push(
            r !== expected
              ? `  FAIL ${name}: got ${JSON.stringify(r)}, expected ${expected}`
              : `  FAIL ${name}: the input array was changed (copy it before sorting)`,
          );
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      if (msg.startsWith("TODO")) throw e;
      failed++;
      if (shown.length < 5) shown.push(`  ERROR ${name}: ${msg}`);
    }
  };

  try {
    for (const f of fixed) check(f.name, f.nums, f.expected);
    for (let seed = 1; seed <= 300; seed++) {
      const n = seed % 40;
      const nums = makeSmallCase(n, seed);
      check(`random n=${n} seed=${seed}`, nums, reference(nums));
    }
    for (const n of [500, 2000]) {
      const nums = makeSmallCase(n, 7);
      check(`random n=${n}`, nums, reference(nums));
    }
  } catch {
    console.log(`${label}: not written yet (still has the TODO). Skipped.`);
    return;
  }

  console.log(`${label}: ${passed} passed, ${failed} failed`);
  for (const s of shown) console.log(s);
  if (failed > 0) failures++;
}

console.log("Part A: brute force");
runSolver("brute ", longestConsecutiveBrute);
console.log("\nPart B: better solution");
runSolver("better", longestConsecutiveBetter);

if (failures > 0) process.exit(1);
