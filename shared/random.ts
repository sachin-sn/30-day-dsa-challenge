// Seeded random numbers (mulberry32), so every run of a test or benchmark
// uses the same inputs.
export type Rng = () => number; // returns a number in [0, 1)

export function makeRng(seed: number): Rng {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Integer from lo to hi, both included.
export function randInt(rng: Rng, lo: number, hi: number): number {
  return lo + Math.floor(rng() * (hi - lo + 1));
}

export function randArray(rng: Rng, n: number, lo: number, hi: number): number[] {
  const out: number[] = new Array(n);
  for (let i = 0; i < n; i++) out[i] = randInt(rng, lo, hi);
  return out;
}
