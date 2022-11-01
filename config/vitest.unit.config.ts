export default {
  test: {
    coverage: {
      provider: `istanbul`,
      reporter: [`text`, `json`, `html`],
    },
    deps: {
      interopDefault: true,
    },
    include: [
      `sources/@roots/*/src/**/*.test.ts`,
      `tests/unit/**/*.test.ts`,
    ],
  },
}
