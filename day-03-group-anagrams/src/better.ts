import { ops } from "../../shared/ops.js";

// Part B: write the better solution here (after brute.ts passes the tests).
// Same contract as the brute force. This time build the key WITHOUT sorting the letters of each word.
// Count the basic step the same way you did in brute.ts, so the two numbers can be compared.
export function groupAnagramsBetter(words: string[]): string[][] {
  void ops;

  // Same idea as the brute force: a map from key -> the words that share that key.
  // Only the way the key is built is different (no sorting).
  const groups = new Map<string, string[]>();

  // Look at every word once, in the order given.
  for (const word of words) {
    // Count one step of work for handling this word.
    ops.tick();

    // 26 slots, one per letter: slot 0 is "a", slot 1 is "b", ... slot 25 is "z".
    // Every slot starts at 0, meaning "this letter has not been seen yet".
    const counts = new Array<number>(26).fill(0);

    // Walk through the letters of the word once. This costs k steps for a word of k letters,
    // where the sort in the brute force costs about k log k.
    for (let i = 0; i < word.length; i++) {
      // Count one step of work for this letter.
      ops.tick();
      // charCodeAt(i) is the number of the letter ("a" is 97, "b" is 98, ... "z" is 122).
      // Subtracting 97 gives its slot (0 to 25), and ++ adds one to that letter's count.
      // "eat": e -> slot 4, a -> slot 0, t -> slot 19, so those slots become 1.
      counts[word.charCodeAt(i) - 97]++;
    }

    // Turn the 26 counts into one string to use as the key:
    // "eat" -> "1,0,0,0,1,0,...,1,0,0,0,0,0,0" (a=1, e=1, t=1, everything else 0).
    // "tea" has the same counts, so it gets the same key. The commas matter: without them
    // the counts (1, 12) and (11, 2) would both turn into "112".
    const key = counts.join(",");

    // Has an earlier word already created a group for this key?
    const group = groups.get(key);
    if (group) {
      // Yes: it uses the same letters the same number of times, so it is an anagram. Join the group.
      group.push(word);
    } else {
      // No: first word with this key, so start a new group holding just this word.
      groups.set(key, [word]);
    }
  }

  // The map's values are the groups. Turn them into a plain array of arrays.
  return [...groups.values()];
}
