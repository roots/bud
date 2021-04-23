import {flags} from '@oclif/command'

const parseAsKeyed = (key: string) => {
  return function (input, ctx) {
    return {input}
  }
}

const defaultKeyed = (key: string, value: any) => {
  return ctx => ({[key]: value})
}

export const boolean = flags.boolean
export const help = flags.help
export const string = flags.string

/**
 * --cache
 */
export const cache = flags.build({
  name: 'cache',
  description: 'Utilize webpack cache',
  hidden: false,
  required: false,
  dependsOn: [],
  exclusive: [],
  env: 'APP_BUILD_CACHE',
  default: defaultKeyed('cache', true),
  parse: parseAsKeyed('cache'),
})

/**
 * --ci
 */
export const ci = flags.build({
  name: 'ci',
  description: 'Run in continuous integration mode',
  hidden: false,
  required: false,
  dependsOn: [],
  exclusive: [],
  env: 'APP_BUILD_CI',
  default: defaultKeyed('ci', false),
  parse: parseAsKeyed('ci'),
})

/**
 * --debug
 */
export const debug = flags.build({
  name: 'debug',
  description: 'Run in debug mode',
  hidden: false,
  required: false,
  dependsOn: [],
  exclusive: [],
  env: 'APP_BUILD_DEBUG',
  default: defaultKeyed('debug', false),
  parse: parseAsKeyed('debug'),
})

/**
 * --log
 */
export const log = flags.build({
  name: 'log',
  description: 'Log results',
  hidden: false,
  required: false,
  dependsOn: [],
  exclusive: [],
  env: 'APP_BUILD_LOG',
  default: defaultKeyed('log', false),
  parse: parseAsKeyed('log'),
})

/**
 * --log
 */
export const manifest = flags.build({
  name: 'manifest',
  description: 'Generate a manifest',
  hidden: false,
  required: false,
  dependsOn: [],
  exclusive: [],
  env: 'APP_BUILD_MANIFEST',
  default: defaultKeyed('manifest', true),
  parse: parseAsKeyed('manifest'),
})

/**
 *
 * {
    help: flags.help({char: 'h'}),
    cache: flags.boolean(),
    ci: flags.boolean(),
    debug: flags.boolean(),
    log: flags.boolean(),
    hash: flags.boolean(),
    install: flags.boolean(),
    'locations.project': flags.string(),
    'locations.src': flags.string(),
    'locations.dist': flags.string(),
    'locations.storage': flags.string(),
    manifest: flags.boolean(),
    'server.middleware.hot': flags.boolean(),
    'server.middleware.proxy': flags.boolean(),
    'server.proxy.host': flags.string(),
    'server.proxy.port': flags.string(),
  }
 */
