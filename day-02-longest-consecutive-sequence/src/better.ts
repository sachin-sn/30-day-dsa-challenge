import { ops } from "../../shared/ops.js";

// Part B: write the better solution here (after brute.ts passes the tests).
// Same contract as the brute force, and do not change the array you are given.
// Count the basic step the same way you did in brute.ts, so the two numbers can be compared.
// sample input [100, 4, 200, 1, 3, 2] expected output: 4 i.e., 1,2,3,4
export function longestConsecutiveBetter(nums: number[]): number {
  void ops;
  if (nums.length <= 1) {
    return nums.length;
  }
  const numsSet = new Set(nums);
  let longestSequence = 0;

  numsSet.forEach((num) => {
    ops.tick();
    // If num - 1 exists, num is in the middle of a run, so a run starting here was
    // already counted from its first number. Skip it.
    if (numsSet.has(num - 1)) return;
    let length = 1;
    while (numsSet.has(num + length)) {
      ops.tick();
      length++;
    }
    if (length > longestSequence) {
      longestSequence = length;
    }
  });
  return longestSequence;
}
