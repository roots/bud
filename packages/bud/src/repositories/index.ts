import {cli} from './cli'
import {configs} from './configs'
import {env} from './env'
import {features} from './features'
import {paths} from './paths'
import loaders from './loaders'
import options from './options'
import patterns from './patterns'
import plugins from './plugins'
import rules from './rules'
import uses from './uses'

export const repositories = {
  plugins: [plugins],
  files: [configs],
  stores: [
    features,
    loaders,
    options,
    paths,
    patterns,
    rules,
    uses,
    env,
    ...cli,
  ],
}
