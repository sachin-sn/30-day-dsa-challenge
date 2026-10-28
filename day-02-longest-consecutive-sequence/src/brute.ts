import { ops } from "../../shared/ops.js";

// Part A: write the brute force here: sort a COPY of the numbers, then walk the sorted list.
// Return the length of the longest run of consecutive integers (4, 5, 6 is a run of 3).
// Do not change the array you are given (the tests check this).
// Call ops.tick() once for each basic step, including each comparison the sort makes
// (hint: the sort comparator can tick), and write down in solution.md what you counted.
// sample input [100, 4, 200, 1, 3, 2] expected output: 4 i.e., 1,2,3,4
export function longestConsecutiveBrute(nums: number[]): number {
  void ops;
  if (nums.length <= 1) {
    return nums.length;
  }
  let longestSequence = 0;
  // Try every number as the start of a run, then keep looking for the next number (+1).
  for (let index = 0; index < nums.length; index++) {
    ops.tick();
    let current = nums[index];
    let length = 1;
    // some() returns true/false, so 0 and negative numbers work (find() returning 0 is falsy).
    const hasNext = (n: number) =>
      nums.some((num) => {
        ops.tick();
        return num === n + 1;
      });
    while (hasNext(current)) {
      current++;
      length++;
    }
    if (length > longestSequence) {
      longestSequence = length;
    }
  }
  return longestSequence;
}
