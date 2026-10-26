import { makeRng, randInt } from "../../shared/random.js";

export interface TwoSumCase {
  nums: number[];
  target: number;
  expected: [number, number] | null; // null = no pair exists
}

// Builds an input that has exactly one valid pair, so both solutions must give the same answer.
// All values are different, and no filler value can pair up with another value to reach the target.
// placement "end" puts the pair at the last two positions: the worst case for a left-to-right scan.
export function makeCase(n: number, seed: number, placement: "random" | "end" = "random"): TwoSumCase {
  if (n < 2) throw new Error("n must be at least 2");
  const rng = makeRng(seed);
  const span = 10 * n;

  const a = randInt(rng, -span, span);
  let b = randInt(rng, -span, span);
  while (b === a) b = randInt(rng, -span, span);
  const target = a + b;

  const used = new Set<number>([a, b]);
  const filler: number[] = [];
  while (filler.length < n - 2) {
    const x = randInt(rng, -span, span);
    if (used.has(x) || used.has(target - x)) continue;
    used.add(x);
    filler.push(x);
  }

  if (placement === "end") {
    return { nums: [...filler, a, b], target, expected: [n - 2, n - 1] };
  }

  const items = [
    { v: a, planted: true },
    { v: b, planted: true },
    ...filler.map((v) => ({ v, planted: false })),
  ];
  for (let i = items.length - 1; i > 0; i--) {
    const j = randInt(rng, 0, i);
    [items[i], items[j]] = [items[j], items[i]];
  }
  const planted: number[] = [];
  items.forEach((it, idx) => {
    if (it.planted) planted.push(idx);
  });
  return { nums: items.map((it) => it.v), target, expected: [planted[0], planted[1]] };
}

// Builds an input with no valid pair: all values are different and none of them has its partner (target - x) in the list.
export function makeNoMatchCase(n: number, seed: number): TwoSumCase {
  const rng = makeRng(seed);
  const span = 10 * Math.max(n, 2);
  const target = randInt(rng, -span, span);
  const used = new Set<number>();
  const nums: number[] = [];
  while (nums.length < n) {
    const x = randInt(rng, -span, span);
    if (used.has(x) || used.has(target - x)) continue;
    used.add(x);
    nums.push(x);
  }
  return { nums, target, expected: null };
}
