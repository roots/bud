import {plugins} from './plugins'
import {cli} from './cli'
import {configs} from './configs'
import {env} from './env'
import {features} from './features'
import {options} from './options'
import {paths} from './paths'
import {patterns} from './patterns'
import {loaders, rules, uses} from './rulesets'

/**
 * Repositories
 */
export const repositories = {
  extensions: [plugins],
  files: [configs],
  stores: [
    /** Order is unimportant */
    features,
    loaders,
    options,
    paths,
    patterns,
    rules,
    uses,

    /** Order is important */
    env,
    ...cli,
  ],
}
