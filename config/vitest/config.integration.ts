import {env} from 'node:process'

import GithubActionsReporter from 'vitest-github-actions-reporter'
import {defineConfig} from 'vitest/config'

import alias from './alias.js'

export default defineConfig({
  test: {
    alias,
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
