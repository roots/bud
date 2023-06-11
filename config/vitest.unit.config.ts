export default {
  test: {
    coverage: {
      provider: `istanbul`,
      reporter: [`text`, `json`, `html`],
    },
    hookTimeout: 60000,
    include: [
      `sources/@roots/*/src/*.test.ts`,
      `sources/@roots/*/src/**/*.test.ts`,
      `sources/@roots/*/src/*.test.tsx`,
      `sources/@roots/*/src/**/*.test.tsx`,
      `sources/@roots/*/test/*.test.ts`,
      `sources/@roots/*/test/**/*.test.ts`,
      `sources/@roots/*/test/*.test.tsx`,
      `sources/@roots/*/test/**/*.test.tsx`,
      `tests/unit/*.test.ts`,
      `tests/reproductions/*.test.ts`,
    ],
    testTimeout: 60000,
  },
}
