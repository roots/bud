import {env} from 'process'

import GithubActionsReporter from 'vitest-github-actions-reporter'
import {defineConfig} from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      provider: `v8`,
      reporter: [`text`, `html`],
    },
    hookTimeout: 60000,
    include: [
      `sources/@roots/*/src/**/*.test.{ts,tsx}`,
      `sources/@roots/*/test/**/*.test.{ts,tsx}`,
      `sources/@roots/*/tests/**/*.test.{ts,tsx}`,
      `tests/unit/**/*.test.ts`,
      `tests/reproductions/**/*.test.ts`,
    ],
    includeSource: [`sources/@roots/*/src/**/*.{ts,tsx}`],
    reporters: [
      `basic`,
      env.GITHUB_ACTIONS ? new GithubActionsReporter() : ``,
    ],
    testTimeout: 60000,
  },
})
