import {env} from 'process'

import {defineConfig} from 'vitest/config'
import GithubActionsReporter from 'vitest-github-actions-reporter'

export default defineConfig({
  test: {
    coverage: {
      include: [`sources/@roots/*/src/**/*.{ts,tsx}`],
      provider: `v8`,
      reporter: [`text`, `html`],
    },
    exclude: [`sources/@repo/**/*`, `**/node_modules/**/*`],
    hookTimeout: 60000,
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
    reporters: [
      `default`,
      env.GITHUB_ACTIONS ? new GithubActionsReporter() : ``,
    ],
    testTimeout: 60000,
  },
})
