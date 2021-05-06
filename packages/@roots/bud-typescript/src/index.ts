import './interface'
import {Module} from '@roots/bud-extensions'

import * as api from './api'

const name: Module['name'] = '@roots/bud-typescript'

const boot: Module['boot'] = ({
  build,
  publish,
  hooks,
  store,
}) => {
  store.set('patterns.ts', /\.(ts|tsx)$/)

  build.loader.set('ts', require.resolve('ts-loader'))

  publish(
    {
      'build/resolve/extensions': e => [...e, '.ts', '.tsx'],

      rule: rule => ({
        'rule/ts': hooks.filter('rule/ts'),
        ...rule,
      }),

      'rule/ts': () => ({
        test: hooks.filter('rule/ts/test'),
        exclude: hooks.filter('rule/ts/exclude'),
        use: hooks.filter('rule/ts/use'),
      }),

      'rule/ts/test': () => store.get('patterns.ts'),
      'rule/ts/exclude': () => store.get('patterns.modules'),
      'rule/ts/use': () => [
        hooks.filter('item/babel'),
        hooks.filter('item/ts'),
      ],

      'item/ts': () => ({
        loader: hooks.filter('item/ts/loader'),
        options: hooks.filter('item/ts/options'),
      }),
      'item/ts/options': () => ({
        transpileOnly: hooks.filter(
          'item/ts/options/transpileOnly',
        ),
        happyPackMode: hooks.filter(
          'item/ts/options/happyPackMode',
        ),
      }),
      'item/ts/options/happyPackMode': () => true,
      'item/ts/options/transpileOnly': () => true,
      'item/ts/loader': build.loader.get('ts'),
    },
    name,
  )
}

const extension = {name, boot, api}
export {extension as default, name, boot, api}
