import { ops } from "../../shared/ops.js";

// Part A: write the brute force here.
// Return [i, j] with i < j and nums[i] + nums[j] === target.
// Call ops.tick() once for each basic step, and write down in solution.md what you counted.
// Example input [2, 7, 11, 15]	9
export function twoSumBrute(
  nums: number[],
  target: number,
): [number, number] | null {
  void ops;
  void nums;
  void target;

  for (let index = 0; index < nums.length; index++) {
    ops.tick(); // counting on first loop
    const element = nums[index];
    for (let j = index + 1; j < nums.length; j++) {
      ops.tick(); // counting on second loop
      if (target === element + nums[j]) {
        return [index, j];
      }
    }
  }
  return null;
}
