export default {
  test: {
    hookTimeout: 24e4,
    testTimeout: 24e4,
    include: [`tests/e2e/*.test.ts`],
    threads: false
  }
};
