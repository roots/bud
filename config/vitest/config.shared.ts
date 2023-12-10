import {env} from 'node:process'

import GithubActionsReporter from 'vitest-github-actions-reporter'

const reporters: Array<any>  = [`basic`]
if (env.GITHUB_ACTIONS) reporters.push(new GithubActionsReporter())

const shared = {
  hookTimeout: 240000,
  reporters,
  testTimeout: 240000,
}

export default shared
