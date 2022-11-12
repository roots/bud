export default {
  test: {
    coverage: {
      provider: `istanbul`,
      reporter: [`text`, `json`, `html`],
    },
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
    ],
  },
}
