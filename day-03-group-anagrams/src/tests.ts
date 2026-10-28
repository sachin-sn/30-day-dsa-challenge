import { groupAnagramsBrute } from "./brute.js";
import { groupAnagramsBetter } from "./better.js";
import { makeSmallWords, normalize, validate } from "./cases.js";

type Solver = (words: string[]) => string[][];

interface Fixed {
  name: string;
  words: string[];
  expected: string[][]; // any order is fine
}

const fixed: Fixed[] = [
  {
    name: "example 1",
    words: ["eat", "tea", "tan", "ate", "nat", "bat"],
    expected: [["eat", "tea", "ate"], ["tan", "nat"], ["bat"]],
  },
  { name: "example 2: one empty word", words: [""], expected: [[""]] },
  { name: "example 3: one word", words: ["a"], expected: [["a"]] },
  { name: "no words", words: [], expected: [] },
  { name: "repeated words stay in the group", words: ["abc", "bca", "cab", "abc"], expected: [["abc", "bca", "cab", "abc"]] },
  { name: "two empty words", words: ["", ""], expected: [["", ""]] },
  { name: "different lengths never group", words: ["ab", "ba", "abc"], expected: [["ab", "ba"], ["abc"]] },
  { name: "letter counts matter", words: ["aab", "aba", "baa", "abb"], expected: [["aab", "aba", "baa"], ["abb"]] },
  { name: "nothing in common", words: ["ab", "cd", "ef"], expected: [["ab"], ["cd"], ["ef"]] },
  { name: "same letter, different counts", words: ["zzz", "zz", "z"], expected: [["zzz"], ["zz"], ["z"]] },
  {
    name: "longer words",
    words: ["listen", "silent", "enlist", "google", "gogole"],
    expected: [["listen", "silent", "enlist"], ["google", "gogole"]],
  },
];

let failures = 0;

// Check the tests themselves first, so a wrong test is never blamed on your code.
for (const f of fixed) {
  const problem = validate(f.expected, f.words);
  if (problem) {
    console.error(`TEST BUG: fixed case "${f.name}" has a wrong expected answer: ${problem}`);
    process.exit(2);
  }
}

function runSolver(label: string, fn: Solver): void {
  let passed = 0;
  let failed = 0;
  const shown: string[] = [];

  const check = (name: string, words: string[], expected?: string[][]) => {
    const original = [...words];
    const input = [...words];
    let problem: string | null;
    try {
      const r = fn(input);
      problem = validate(r, original);
      if (!problem && input.some((w, i) => w !== original[i])) problem = "the input array was changed (copy it first)";
      if (!problem && expected && JSON.stringify(normalize(r)) !== JSON.stringify(normalize(expected))) {
        problem = `got ${JSON.stringify(normalize(r))}, expected ${JSON.stringify(normalize(expected))}`;
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      if (msg.startsWith("TODO")) throw e;
      problem = `error: ${msg}`;
    }
    if (problem === null) passed++;
    else {
      failed++;
      if (shown.length < 5) shown.push(`  FAIL ${name}: ${problem}`);
    }
  };

  try {
    for (const f of fixed) check(f.name, f.words, f.expected);
    for (let seed = 1; seed <= 300; seed++) {
      const n = seed % 40;
      check(`random n=${n} seed=${seed}`, makeSmallWords(n, seed));
    }
    for (const n of [500, 2000]) check(`random n=${n}`, makeSmallWords(n, 7));
  } catch {
    console.log(`${label}: not written yet (still has the TODO). Skipped.`);
    return;
  }

  console.log(`${label}: ${passed} passed, ${failed} failed`);
  for (const s of shown) console.log(s);
  if (failed > 0) failures++;
}

console.log("Part A: brute force");
runSolver("brute ", groupAnagramsBrute);
console.log("\nPart B: better solution");
runSolver("better", groupAnagramsBetter);

if (failures > 0) process.exit(1);
