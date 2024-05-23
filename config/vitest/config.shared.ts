import type {UserConfig} from 'vitest'

import {env} from 'node:process'

import {path} from '@repo/constants'
import GithubActionsReporter from 'vitest-github-actions-reporter'

export default {
  dir: path(),
  hookTimeout: 240000,
  pool: `threads`,
  poolOptions: {
    threads: {
      singleThread: true,
    },
  },
  reporters: env.GITHUB_ACTIONS
    ? [`basic`, new GithubActionsReporter()]
    : [`basic`],
  testTimeout: 240000,
  watch: false,
} satisfies UserConfig
