import { twoSumBrute } from "./brute.js";
import { twoSumBetter } from "./better.js";
import { makeCase, makeNoMatchCase } from "./cases.js";

type Solver = (nums: number[], target: number) => [number, number] | null;
type Pair = [number, number];

interface Fixed {
  name: string;
  nums: number[];
  target: number;
  expected: Pair | null; // null = no pair exists, the solution must return null
}

// Every fixed case has exactly one valid pair, or none when expected is null (checked below before any solution runs).
const fixed: Fixed[] = [
  { name: "example 1", nums: [2, 7, 11, 15], target: 9, expected: [0, 1] },
  { name: "example 2", nums: [3, 2, 4], target: 6, expected: [1, 2] },
  { name: "example 3: same value twice", nums: [3, 3], target: 6, expected: [0, 1] },
  { name: "all negative", nums: [-1, -2, -3, -4, -5], target: -8, expected: [2, 4] },
  { name: "zeros", nums: [0, 4, 3, 0], target: 0, expected: [0, 3] },
  { name: "equal pair in the middle", nums: [1, 5, 5, 8], target: 10, expected: [1, 2] },
  { name: "target in the middle of the values", nums: [5, 75, 25], target: 100, expected: [1, 2] },
  { name: "negative plus positive", nums: [-10, 20, 7, 4], target: 10, expected: [0, 1] },
  { name: "half of target is present once", nums: [4, 1, 7], target: 8, expected: [1, 2] },
  { name: "no pair", nums: [1, 2, 3], target: 10, expected: null },
  { name: "empty list", nums: [], target: 5, expected: null },
  { name: "one element (cannot use it twice)", nums: [5], target: 10, expected: null },
  { name: "half of target present once (cannot use it twice)", nums: [4, 1], target: 8, expected: null },
  { name: "pair at the far end", nums: [1, 2, 3, 4, 5, 6, 7, 100, 200], target: 300, expected: [7, 8] },
];

function countPairs(nums: number[], target: number): number {
  let c = 0;
  for (let i = 0; i < nums.length; i++)
    for (let j = i + 1; j < nums.length; j++) if (nums[i] + nums[j] === target) c++;
  return c;
}

function sameAs(r: unknown, expected: Pair | null): boolean {
  if (expected === null) return r === null;
  return Array.isArray(r) && r.length === 2 && r[0] === expected[0] && r[1] === expected[1];
}

let failures = 0;

// Check the tests themselves first, so a wrong test is never blamed on your code.
for (const f of fixed) {
  const pairs = countPairs(f.nums, f.target);
  const ok =
    f.expected === null ? pairs === 0 : pairs === 1 && f.nums[f.expected[0]] + f.nums[f.expected[1]] === f.target;
  if (!ok) {
    console.error(`TEST BUG: fixed case "${f.name}" does not match its expected pair count.`);
    process.exit(2);
  }
}

function runSolver(label: string, fn: Solver): boolean {
  let passed = 0;
  let failed = 0;
  const shown: string[] = [];

  const check = (name: string, nums: number[], target: number, expected: Pair | null) => {
    try {
      const r = fn([...nums], target);
      if (sameAs(r, expected)) passed++;
      else {
        failed++;
        if (shown.length < 5) shown.push(`  FAIL ${name}: got ${JSON.stringify(r)}, expected ${JSON.stringify(expected)}`);
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      if (msg.startsWith("TODO")) throw e;
      failed++;
      if (shown.length < 5) shown.push(`  ERROR ${name}: ${msg}`);
    }
  };

  try {
    for (const f of fixed) check(f.name, f.nums, f.target, f.expected);
    for (let seed = 1; seed <= 300; seed++) {
      const n = 2 + (seed % 40);
      const c = makeCase(n, seed, "random");
      check(`random n=${n} seed=${seed}`, c.nums, c.target, c.expected);
    }
    for (let seed = 1; seed <= 100; seed++) {
      const n = seed % 30;
      const c = makeNoMatchCase(n, seed);
      check(`no match n=${n} seed=${seed}`, c.nums, c.target, null);
    }
    for (const n of [200, 1000]) {
      const c = makeCase(n, 7, "random");
      check(`random n=${n}`, c.nums, c.target, c.expected);
    }
  } catch {
    console.log(`${label}: not written yet (still has the TODO). Skipped.`);
    return false;
  }

  console.log(`${label}: ${passed} passed, ${failed} failed`);
  for (const s of shown) console.log(s);
  if (failed > 0) failures++;
  return failed === 0;
}

console.log("Part A: brute force");
runSolver("brute ", twoSumBrute);
console.log("\nPart B: better solution");
runSolver("better", twoSumBetter);

if (failures > 0) process.exit(1);
