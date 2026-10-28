import { makeRng, randInt } from "../../shared/random.js";

// Tiny alphabet, short words: many anagrams and many repeated words. Good for correctness tests.
export function makeSmallWords(n: number, seed: number): string[] {
  const rng = makeRng(seed);
  const words: string[] = [];
  for (let i = 0; i < n; i++) {
    const len = randInt(rng, 0, 6);
    let w = "";
    for (let j = 0; j < len; j++) w += "abc"[randInt(rng, 0, 2)];
    words.push(w);
  }
  return words;
}

// Benchmark input: n words of k letters (a-z). About a quarter as many different letter sets as words,
// each word a shuffle of one of them, so there are real groups of anagrams. Same seed every run.
export function makeBenchWords(n: number, k: number, seed = 42): string[] {
  const rng = makeRng(seed);
  const pool = Math.max(1, Math.floor(n / 4));
  const bases: string[][] = [];
  for (let i = 0; i < pool; i++) {
    bases.push(Array.from({ length: k }, () => String.fromCharCode(97 + randInt(rng, 0, 25))));
  }
  const words: string[] = [];
  for (let i = 0; i < n; i++) {
    const letters = [...bases[randInt(rng, 0, pool - 1)]];
    for (let j = letters.length - 1; j > 0; j--) {
      const r = randInt(rng, 0, j);
      [letters[j], letters[r]] = [letters[r], letters[j]];
    }
    words.push(letters.join(""));
  }
  return words;
}

// Makes two answers comparable: sort inside each group, then sort the groups.
export function normalize(groups: string[][]): string[][] {
  return groups
    .map((g) => [...g].sort())
    .sort((a, b) => (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : a.length - b.length));
}

const letterKey = (w: string) => [...w].sort().join("");

// Checks an answer against the input without using any solution: the same words come back (each
// exactly as many times as they went in), every group holds only anagrams of one another, and no
// two groups hold anagrams of each other. Returns null if fine, otherwise what is wrong.
export function validate(groups: unknown, input: string[]): string | null {
  if (!Array.isArray(groups) || groups.some((g) => !Array.isArray(g) || g.some((x) => typeof x !== "string"))) {
    return "the result must be a list of lists of strings";
  }
  const gs = groups as string[][];
  const got = gs.flat().sort();
  const want = [...input].sort();
  if (got.length !== want.length || got.some((v, i) => v !== want[i])) {
    return "the words in the groups are not exactly the input words (missing, extra or repeated)";
  }
  const seen = new Set<string>();
  for (const g of gs) {
    if (g.length === 0) return "there is an empty group";
    const keys = new Set(g.map(letterKey));
    if (keys.size > 1) return `a group mixes words that are not anagrams: ${JSON.stringify(g)}`;
    const key = [...keys][0];
    if (seen.has(key)) return `anagrams of "${g[0]}" are split over two groups`;
    seen.add(key);
  }
  return null;
}
