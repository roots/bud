import {env} from 'process'

import {defineConfig} from 'vitest/config'

import shared from './config.shared'

export default defineConfig({
  test: {
    ...shared,
    coverage: {
      include: [`sources/@roots/*/src/**/*.{ts,tsx}`],
      provider: `v8`,
    },
    exclude: [`sources/@repo/**/*`, `**/node_modules/**/*`],
    include: [
      `sources/@roots/*/src/*.test.{ts,tsx}`,
      `sources/@roots/*/src/**/*.test.{ts,tsx}`,
      `sources/@roots/*/test/*.test.{ts,tsx}`,
      `sources/@roots/*/test/**/*.test.{ts,tsx}`,
      `sources/@roots/*/tests/*.test.{ts,tsx}`,
      `sources/@roots/*/tests/**/*.test.{ts,tsx}`,
      `tests/unit/**/*.test.ts`,
      `tests/reproductions/**/*.test.ts`,
      `tests/integration/*.test.ts`,
    ],
    includeSource: [`sources/@roots/*/src/**/*.{ts,tsx}`],
  },
})
