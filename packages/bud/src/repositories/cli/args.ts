import {argv} from 'yargs'

/**
 * Resolve a value from CLI, envvar or a fallback.
 *
 * Order of precedence:
 *  - cli
 *  - env
 *  - fallback
 */
const source = function (argKey, env, fallback) {
  const fromCli = argv && argKey ? argv[argKey] : null
  const fromEnv = env ?? null

  return fromCli ?? fromEnv ?? fallback
}

const args = function (framework) {
  const env = framework.env

  return {
    level: argv['level'] ?? 'info',
    mode: source('env', env.get('APP_ENV'), 'none'),
    host: source('host', env.get('APP_DEV_HOST'), false),
    port: source('port', env.get('APP_DEV_PORT'), null),
    proxy: source('proxy', env.get('APP_DEV_PROXY'), null),
    src: source('src', env.get('APP_SRC'), null),
    dist: source('dist', env.get('APP_DIST'), null),
    feature: source('feature', env.get('APP_BUILD_FEATURE'), null),
  }
}

export {args}
