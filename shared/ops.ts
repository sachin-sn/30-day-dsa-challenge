// The shared operation counter. A solution calls ops.tick() each time it does its
// basic step (a comparison, a lookup, one pass of a loop). bench.ts resets it
// before each run and reads it afterwards.
export const ops = {
  count: 0,
  tick(n = 1): void {
    this.count += n;
  },
  reset(): void {
    this.count = 0;
  },
};
