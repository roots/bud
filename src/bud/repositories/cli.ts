import {argv} from 'yargs'

/**
 * Resolve a value from CLI, envvar or a fallback.
 *
 * Order of precedence:
 *  - cli
 *  - env
 *  - fallback
 */
const flag = function (argKey, env, fallback) {
  const fromCli = argv && argKey ? argv[argKey] : null
  const fromEnv = env ?? null

  return fromCli ?? fromEnv ?? fallback
}

const flags = function (framework) {
  const env = framework.env

  return {
    mode: flag('env', env.get('APP_ENV'), 'none'),
    hot: flag('hot', env.get('APP_DEV_HOT'), false),
    watch: flag('watch', env.get('APP_DEV_WATCH'), false),
    host: flag('host', env.get('APP_DEV_HOST'), false),
    port: flag('port', env.get('APP_DEV_PORT'), null),
    proxy: flag('proxy', env.get('APP_DEV_PROXY'), null),
    src: flag('src', env.get('APP_SRC'), null),
    dist: flag('dist', env.get('APP_DIST'), null),
    feature: flag('feature', env.get('APP_BUILD_FEATURE'), null),
  }
}

export {flags}
