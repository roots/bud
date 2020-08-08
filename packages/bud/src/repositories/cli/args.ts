import {argv} from 'yargs'

const args = (env: any) => ({
  log: argv['log'],
  hot: argv['hot'],
  watch: argv['watch'],
  level: argv['level'] ?? 'info',
  mode: argv['env'] ?? env.get('APP_ENV') ?? 'none',
  host: argv['host'] ?? env.get('APP_DEV_HOST') ?? false,
  port: argv['port'] ?? env.get('APP_DEV_PORT') ?? null,
  proxy: argv['proxy'] ?? env.get('APP_DEV_PROXY') ?? null,
  src: argv['src'] ?? env.get('APP_SRC') ?? null,
  dist: argv['dist'] ?? env.get('APP_DIST') ?? null,
  feature: argv['feature'] ?? env.get('APP_BUILD_FEATURE') ?? null,
})

export {args}
