import { ops } from "../../shared/ops.js";

// Part A: write the brute force here.
// Group the words that are anagrams of each other. Idea: give every word a key made by SORTING
// its letters ("eat" and "tea" both become "aet"), and keep one group per key.
// Return the groups, each group a list of the original words. The order of the groups and the
// order inside a group do not matter. Do not change the array you are given.
// Call ops.tick() once for each basic step (for example each comparison the letter sort makes),
// and write down in solution.md what you counted.
// input: ["ab", "abb", "ba", "aab", "bab", "bba"] output: [["ab", "ba"], ["abb", "bab", "bba"], ["aab"]]
export function groupAnagramsBrute(words: string[]): string[][] {
  void ops;

  // The map is the heart of the solution: key -> the words that share that key.
  // Example after reading "eat" and "tea": { "aet" => ["eat", "tea"] }
  const groups = new Map<string, string[]>();

  // Look at every word once, in the order given.
  for (const word of words) {
    // Count one step of work for handling this word.
    ops.tick();

    // Build the key of this word by sorting its letters, so all anagrams get the same key:
    // "eat" -> "aet", "tea" -> "aet", "ate" -> "aet".
    // word.split("") makes a NEW array of characters, so sorting it does not change `words`.
    const key = word
      .split("") // "eat" -> ["e", "a", "t"]
      .sort((a, b) => {
        // The sort calls this function every time it compares two letters.
        // Counting these calls is how we count the work done by the sort.
        ops.tick();
        // Negative = a comes first, positive = b comes first, 0 = same letter.
        return a < b ? -1 : a > b ? 1 : 0;
      }) // ["e", "a", "t"] -> ["a", "e", "t"]
      .join(""); // ["a", "e", "t"] -> "aet"  (the empty word "" gives the key "")

    // Has an earlier word already created a group for this key?
    const group = groups.get(key);
    if (group) {
      // Yes: this word is an anagram of the words already in that group, so join it.
      group.push(word);
    } else {
      // No: this is the first word with this key, so start a new group holding just this word.
      groups.set(key, [word]);
    }
  }

  // The map's values are the groups. Turn them into a plain array of arrays.
  return [...groups.values()];
}
