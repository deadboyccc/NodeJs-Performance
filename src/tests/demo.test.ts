const sum = (a: number, b: number) => {
  return a + b
}
describe("sum function", () => {
  // Describe block for grouping tests

  it("adds 1 + 2 to equal 3", () => {
    expect(sum(1, 2)).toBe(3)
  })

  it("adds -1 + 1 to equal 0", () => {
    expect(sum(-1, 1)).toBe(0)
  })

  it("adds 0 + 0 to equal 0", () => {
    expect(sum(0, 0)).toBe(0)
  })

  it("adds large numbers correctly", () => {
    expect(sum(1000000, 2000000)).toBe(3000000)
  })
})
