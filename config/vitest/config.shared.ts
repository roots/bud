import type {UserConfig} from 'vitest'

import {env} from 'node:process'

import GithubActionsReporter from 'vitest-github-actions-reporter'

export default {
  hookTimeout: 240000,
  reporters: env.GITHUB_ACTIONS
    ? [`basic`, new GithubActionsReporter()]
    : [`basic`],
  testTimeout: 240000,
  watch: false,
} satisfies UserConfig
