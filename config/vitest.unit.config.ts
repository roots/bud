export default {
  test: {
    hookTimeout: 240000,
    testTimeout: 240000,
    coverage: {
      include: [
        `sources/@roots/*/src/*.ts`,
        `sources/@roots/*/src/*.tsx`,
        `sources/@roots/*/src/**/*.ts`,
        `sources/@roots/*/src/**/*.tsx`,
      ],
      exclude: [
        `sources/@roots/bud-support`,
      ],
      provider: `istanbul`,
      reporter: [`text`],
    },
    include: [
      `sources/@roots/*/src/*.test.ts`,
      `sources/@roots/*/src/*.test.tsx`,
      `sources/@roots/*/src/**/*.test.ts`,
      `sources/@roots/*/src/**/*.test.tsx`,
      `sources/@roots/*/test/*.test.ts`,
      `sources/@roots/*/test/*.test.tsx`,
      `sources/@roots/*/test/**/*.test.ts`,
      `sources/@roots/*/test/**/*.test.tsx`,
      `sources/tests/unit/*.test.ts`,
      `sources/tests/reproductions/*.test.ts`,
    ],
  },
}
