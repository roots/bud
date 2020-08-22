import {adapters} from './adapters'
import {cli} from './cli'
import {configs} from './configs'
import {env} from './env'
import {features} from './features'
import {options} from './options'
import {paths} from './paths'
import {patterns} from './patterns'
import {loaders, rules, uses} from './rulesets'

export const repositories = {
  extensions: [adapters],
  files: [configs],
  stores: [
    paths,
    env,
    ...cli,
    features,
    options,
    loaders,
    cli,
    adapters,
    patterns,
    rules,
    uses,
  ],
}
