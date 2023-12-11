import {env} from 'node:process'

import GithubActionsReporter from 'vitest-github-actions-reporter'

const reporters: Array<any>  = [`basic`]
if (env.GITHUB_ACTIONS) reporters.push(new GithubActionsReporter())

export default reporters
