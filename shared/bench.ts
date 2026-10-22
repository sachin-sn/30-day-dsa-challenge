import { isDeepStrictEqual } from "node:util";
import { ops } from "./ops.js";

export interface BenchOptions<I, R> {
  name: string;
  sizes: number[];
  // Builds the input for one size. Use makeRng(seed) inside so it is the same every run.
  makeInput: (n: number) => I;
  brute: (input: I) => R;
  better: (input: I) => R;
  // Decides if two results are the same answer. Default: deep equality.
  equal?: (a: R, b: R) => boolean;
  // The brute force is not run at sizes above this.
  bruteMaxN?: number;
  // The brute force is also skipped when the estimate for this size is above this many ms.
  bruteLimitMs?: number;
  // The estimate grows the last measured time by (n / previous n) ** bruteGrowth. Default 2.
  bruteGrowth?: number;
}

interface Measured<R> {
  ops: number;
  ms: number;
  result: R;
}

function measure<I, R>(fn: (input: I) => R, input: I): Measured<R> {
  ops.reset();
  const start = performance.now();
  const result = fn(input);
  const ms = performance.now() - start;
  return { ops: ops.count, ms, result };
}

// Fast functions are timed several times and the median is used.
function measureTimed<I, R>(fn: (input: I) => R, input: I): Measured<R> {
  const first = measure(fn, input);
  if (first.ms > 50) return first;
  const times = [first.ms];
  for (let i = 0; i < 6; i++) times.push(measure(fn, input).ms);
  times.sort((a, b) => a - b);
  return { ...first, ms: times[Math.floor(times.length / 2)] };
}

const fmt = (n: number) => n.toLocaleString("en-US");
const fmtMs = (ms: number) => (ms < 1 ? ms.toFixed(3) : ms < 100 ? ms.toFixed(2) : ms.toFixed(0));

export function runBench<I, R>(o: BenchOptions<I, R>): void {
  const equal = o.equal ?? ((a: R, b: R) => isDeepStrictEqual(a, b));
  const limit = o.bruteLimitMs ?? 10_000;
  const growth = o.bruteGrowth ?? 2;
  const maxN = o.bruteMaxN ?? Infinity;

  console.log(`${o.name}`);
  const header = ["n", "brute ops", "better ops", "brute ms", "better ms", "ops ratio"];
  const rows: string[][] = [];
  let prev: { n: number; ms: number } | null = null;

  for (const n of o.sizes) {
    const input = o.makeInput(n);
    const better = measureTimed(o.better, input);

    const estimate = prev ? prev.ms * Math.pow(n / prev.n, growth) : 0;
    const skip = n > maxN || estimate > limit;
    if (skip) {
      rows.push([fmt(n), "not run", fmt(better.ops), "not run", fmtMs(better.ms), "—"]);
      continue;
    }

    const brute = measureTimed(o.brute, input);
    prev = { n, ms: brute.ms };
    if (!equal(brute.result, better.result)) {
      console.error(`\nSTOP: brute and better disagree at n = ${fmt(n)}`);
      console.error("brute :", brute.result);
      console.error("better:", better.result);
      process.exit(1);
    }
    const ratio = better.ops > 0 ? (brute.ops / better.ops).toFixed(1) + "x" : "—";
    rows.push([fmt(n), fmt(brute.ops), fmt(better.ops), fmtMs(brute.ms), fmtMs(better.ms), ratio]);
  }

  const all = [header, ...rows];
  const widths = header.map((_, c) => Math.max(...all.map((r) => r[c].length)));
  for (const r of all) console.log(r.map((cell, c) => cell.padStart(widths[c])).join("  "));
  console.log('\n"not run" = the brute force was skipped because it would take too long; write that down.');
}
