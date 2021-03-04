import {Service} from '@roots/bud-framework'
import {Framework, Store} from '@roots/bud-typings'
import {get} from '@roots/bud-support'

import * as webpack from './webpack'
import * as patterns from './patterns'
import * as server from './server'
import {parse} from 'yargs'
import {isBoolean} from 'lodash'

/**
 * process.argv
 */
const makeArgs = () => {
  let raw = parse(process.argv.slice(1))
  raw = {
    ...raw,
    ...raw._.reduce(
      (a, v, i) => ({
        ...a,
        [v]: true,
      }),
      {},
    ),
  }

  raw.mode = raw.development ? 'development' : 'production'
  return raw
}

const args = makeArgs()

export default class extends Service implements Store {
  public get<T = any>(key: Store.Keys): T {
    return get(this.repository, key)
  }
}

export const repositories: Framework.Index<any> = {
  args,
  webpack,
  patterns,
  server,
  options: {
    ci: isBoolean(args.ci) ? args.ci : false,
    autodiscover: isBoolean(args.autodiscover)
      ? args.autodiscover
      : false,
    bail: isBoolean(args.bail) ? args.bail : true,
    cache: isBoolean(args.cache) ? args.cache : true,
    clean: isBoolean(args.clean) ? args.clean : true,
    devtool: args.devtool ? args.devtool : 'none',
    hash: isBoolean(args.hash) ? args.hash : false,
    hot: isBoolean(args.hot) ? args.hot : true,
    html: isBoolean(args.html) ? args.html : true,
    log: args.log ? args.log : false,
    manifest: isBoolean(args.manifest) ? args.manifest : true,
    minify: isBoolean(args.minify)
      ? args.minify
      : args.mode && args.mode == 'production',
    mode: args.mode,
    parallelism: args.parallelism ? args.paralellism : 1,
  },
  locations: {
    project: args.project
      ? process.cwd().concat('/').concat('dist')
      : process.cwd().concat('/'),
    src: args.src ?? 'src/',
    dist: args.dist ?? 'dist/',
    storage: args.storage ?? '.bud',
    modules: args.modules ?? 'node_modules',
    publicPath: args.publicPath ?? '/',
    records: args.records ?? 'records',
  },
  theme: {
    spacing: 1,
    colors: {
      foreground: '#FFFFFF',
      faded: '#6C758F',
      primary: '#545DD7',
      primaryAlt: '#663399',
      error: '#dc3545',
      errorAlt: '#b22222',
      warning: '#FF611A',
      success: '#46D46A',
      accent: '#ff69b4',
      flavor: '#78C5D7',
    },
    screens: [
      [0, 40],
      [41, 60],
      [61, 80],
      [81, Infinity],
    ],
    columns: 12,
  },
}
