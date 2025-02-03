import { fibonacciSeriesOptimized } from "../mathLogic/fib"
process.on("message", (n: number) => {
  const result = fibonacciSeriesOptimized(n)
  console.log(`[Worker 1][${process.pid}] calling fib(${n})`)
  process.send?.(result)
})
