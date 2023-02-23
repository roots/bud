export default {
  test: {
    hookTimeout: 240000,
    testTimeout: 240000,
    include: [`./sources/tests/e2e/*.test.ts`],
    threads: false,
  },
}
