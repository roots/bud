import {env} from 'node:process'
import GithubActionsReporter from 'vitest-github-actions-reporter'
import {defineConfig} from 'vitest/config'

export default defineConfig({
  test: {
    hookTimeout: 240000,
    include: [`tests/integration/**/*.test.ts`],
    reporters: [
      `basic`,
      env.GITHUB_ACTIONS ? new GithubActionsReporter() : ``,
    ],
    testTimeout: 240000,
  },
})
