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
  features,
  options,
  loaders,
  paths,
  cli,
  adapters,
  patterns,
  rules,
  uses,
  configs,
  env,
}
