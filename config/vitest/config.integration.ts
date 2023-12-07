import {env} from 'node:process'

import {defineConfig} from 'vitest/config'
import GithubActionsReporter from 'vitest-github-actions-reporter'

export default defineConfig({
  test: {
    hookTimeout: 240000,
    include: [`tests/integration/**/*.test.ts`],
    reporters: [
      `basic`,
      env.GITHUB_ACTIONS ? new GithubActionsReporter() : ``,
    ],
    setupFiles: [`./config/vitest/setup.integration.ts`],
    testTimeout: 240000,
  },
})
