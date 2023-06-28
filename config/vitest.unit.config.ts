export default {
  test: {
    coverage: {
      provider: `istanbul`,
      reporter: [`text`, `json`, `html`],
    },
    hookTimeout: 60000,
    include: [
      `sources/@roots/*/src/**/*.test.{ts,tsx}`,
      `sources/@roots/*/test/**/*.{ts,tsx}`,
      `sources/@roots/*/tests/**/*.{ts,tsx}`,
      `tests/unit/**/*.test.ts`,
      `tests/reproductions/**/*.test.ts`,
    ],
    includeSource: [`sources/@roots/*/src/**/*.{ts,tsx}`],
    testTimeout: 60000,
  },
}
