import {cli} from './cli'
import {env} from './env'
import {features} from './features'
import {paths} from './paths'
import loaderModules from './loaderModules'
import options from './options'
import patterns from './patterns'
import plugins from './plugins'
import rules from './rules'

export const repositories = {
  plugins: [plugins],
  stores: [
    features,
    loaderModules,
    options,
    paths,
    patterns,
    rules,
    env,
    ...cli,
  ],
}
