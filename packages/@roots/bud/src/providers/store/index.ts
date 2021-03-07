import {Service} from '@roots/bud-framework'
import {Store} from '@roots/bud-typings'
import {get} from '@roots/bud-support'

import * as webpack from './webpack'
import * as patterns from './patterns'
import * as server from './server'
import {isEqual} from 'lodash'

export default class extends Service implements Store {
  public get<T = any>(key: Store.Keys): T {
    return get(this.repository, key)
  }
}

declare type StoreFactoryArgs = {
  args: {[key: string]: any}
  env: {[key: string]: any}
  source: <T = any>(keys: [string, string], fallback: any) => T
}

export const repositories: (
  args: StoreFactoryArgs,
) => {[key: string]: any} = ({args, env, source}) => ({
  args,
  env,
  webpack,
  patterns,
  server,
  options: {
    ci: source(['ci', 'BUILD_CI'], false),
    discover: source(['discover', 'BUILD_DISCOVER'], true),
    bail: source(['bail', 'BUILD_BAIL'], true),
    cache: source(['cache', 'BUILD_CACHE'], true),
    clean: source(['clean', 'BUILD_CLEAN'], true),
    devtool: source(['devtool', 'BUILD_DEVTOOL'], 'none'),
    hash: source(['hash', 'BUILD_HASH'], false),
    hot: source(['hot', 'BUILD_HOT'], false),
    html: source(['html', 'BUILD_HTML'], true),
    log: source(['log', 'BUILD_LOG'], false),
    manifest: source(['manifest', 'BUILD_MANIFEST'], true),
    minify: source(
      ['minify', 'BUILD_MINIFY'],
      args.mode && isEqual(args.mode, 'production'),
    ),
    mode: source(['mode', 'BUILD_OPT_MODE'], 'production'),
    parallelism: source(
      ['parallelism', 'BUILD_OPT_PARALLELISM'],
      1,
    ),
  },
  locations: {
    project: source(
      ['location.project', 'BUILD_PROJECT'],
      process.cwd(),
    ),
    src: source(['location.src', 'BUILD_SRC'], 'src'),
    dist: source(['location.dist', 'BUILD_DIST'], 'dist'),
    storage: source(
      ['location.storage', 'BUILD_STORAGE'],
      '.bud',
    ),
    modules: source(
      ['location.modules', 'BUILD_MODULES'],
      'node_modules',
    ),
    publicPath: source(['location.public', 'BUILD_PUBLIC'], '/'),
    records: source(['records', 'BUILD_RECORDS'], 'records.js'),
  },
  theme: {
    spacing: source(['theme.spacer', 'BUILD_THEME_SPACER'], 1),
    colors: {
      foreground: source(
        ['theme.color.foreground', 'BUILD_THEME_FOREGROUND'],
        '#FFFFFF',
      ),
      faded: source(
        ['theme.color.faded', 'BUILD_THEME_FADED'],
        '#6C758F',
      ),
      primary: source(
        ['theme.color.primary', 'BUILD_THEME_PRIMARY'],
        '#545DD7',
      ),
      primaryAlt: source(
        ['theme.color.primary.alt', 'BUILD_THEME_PRIMARY_ALT'],
        '#663399',
      ),
      error: source(
        ['theme.color.error', 'BUILD_THEME_ERROR'],
        '#dc3545',
      ),
      errorAlt: source(
        ['theme.color.errorAlt', 'BUILD_THEME_ERROR_ALT'],
        '#b22222',
      ),
      warning: source(
        ['theme.color.warning', 'BUILD_THEME_WARNING'],
        '#FF611A',
      ),
      success: source(
        ['theme.color.success', 'BUILD_THEME_SUCCESS'],
        '#46D46A',
      ),
      accent: source(
        ['theme.color.accent', 'BUILD_THEME_ACCENT'],
        '#ff69b4',
      ),
      flavor: source(
        ['theme.color.flavor', 'BUILD_THEME_FLAVOR'],
        '#78C5D7',
      ),
    },
    screens: [
      [
        source(
          ['theme.screens.sm.lower', 'BUILD_THEME_SM_LOWER'],
          0,
        ),
        source(
          ['theme.screens.sm.upper', 'BUILD_THEME_SM_UPPER'],
          40,
        ),
      ],
      [
        source(
          ['theme.screens.md.lower', 'BUILD_THEME_MD_LOWER'],
          41,
        ),
        source(
          ['theme.screens.md.upper', 'BUILD_THEME_MD_UPPER'],
          60,
        ),
      ],
      [
        source(
          ['theme.screens.lg.lower', 'BUILD_THEME_LG_LOWER'],
          61,
        ),
        source(
          ['theme.screens.lg.upper', 'BUILD_THEME_LG_UPPER'],
          80,
        ),
      ],
      [
        source(
          ['theme.screens.xl.lower', 'BUILD_THEME_XL_LOWER'],
          81,
        ),
        source(
          ['theme.screens.xl.upper', 'BUILD_THEME_XL_UPPER'],
          Infinity,
        ),
      ],
    ],
    columns: 12,
  },
})
