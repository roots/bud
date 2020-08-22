import {argv} from 'yargs'
import type {Bud} from '../..'

const args = {
  repository: 'args',
  contents: (bud: Bud) => ({
    log: argv['log'],
    hot: argv['hot'],
    watch: argv['watch'],
    level: argv['level'] ?? 'info',
    mode: argv['env'] ?? bud.env.get('APP_ENV') ?? 'none',
    host: argv['host'] ?? bud.env.get('APP_DEV_HOST') ?? false,
    port: argv['port'] ?? bud.env.get('APP_DEV_PORT') ?? null,
    proxy: argv['proxy'] ?? bud.env.get('APP_DEV_PROXY') ?? null,
    src: argv['src'] ?? bud.env.get('APP_SRC') ?? null,
    dist: argv['dist'] ?? bud.env.get('APP_DIST') ?? null,
    feature:
      argv['feature'] ?? bud.env.get('APP_BUILD_FEATURE') ?? null,
  }),
}

export {args}
