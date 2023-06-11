export default {
  test: {
    hookTimeout: 240000,
    include: [`tests/e2e/*.test.ts`],
    testTimeout: 240000,
    threads: false,
  },
}
