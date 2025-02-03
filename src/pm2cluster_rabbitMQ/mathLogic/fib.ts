export function fibonacciSeriesOptimized(n: number): number {
  if (n <= 0) {
    throw new Error("enter positive nums")
  }
  let a = 0,
    b = 1,
    sum = 0
  for (let i = 0; i < n; i++) {
    sum += a
    ;[a, b] = [b, a + b]
  }
  return sum
}
