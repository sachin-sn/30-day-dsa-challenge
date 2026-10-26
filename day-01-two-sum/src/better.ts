import { ops } from "../../shared/ops.js";

// Part B: write the better solution here (after brute.ts passes the tests).
// Same contract as the brute force: return [i, j] with i < j and nums[i] + nums[j] === target, or null if there is no pair.
// Count the basic step the same way you did in brute.ts, so the two numbers can be compared.
export function twoSumBetter(
  nums: number[],
  target: number,
): [number, number] | null {
  void ops;
  void nums;
  void target;
  let firstSumMap = new Map();
  for (let index = 0; index < nums.length; index++) {
    ops.tick(); // counting on loops
    const balance = target - nums[index];
    if (firstSumMap.has(balance)) {
      return [firstSumMap.get(balance), index];
    } else {
      firstSumMap.set(nums[index], index);
    }
  }
  return null;
}
