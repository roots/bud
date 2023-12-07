import {env} from 'node:process'

import {defineConfig} from 'vitest/config'
import GithubActionsReporter from 'vitest-github-actions-reporter'

export default defineConfig({
  test: {
    hookTimeout: 240000,
    include: [`tests/e2e/*.test.ts`],
    poolOptions: {
      threads: {
        singleThread: true,
      },
    },
    reporters: [
      `basic`,
      env.GITHUB_ACTIONS ? new GithubActionsReporter() : ``,
    ],
    testTimeout: 240000,
  },
})
