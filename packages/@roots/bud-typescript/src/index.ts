import './interface'
import {Module, Framework} from '@roots/bud-framework'

/**
 * Extension name
 */
export const name: Module['name'] = '@roots/bud-typescript'

/**
 * Registered devDependencies
 */
export const devDependencies: Module['devDependencies'] = [
  'typescript',
]

/**
 * Extension config api
 */
export * as api from './api'

/**
 * Boot
 */
export const boot: Module['boot'] = ({
  publish,
  subscribe,
  store,
}: Framework) => {
  // Set regexp pattern for ts
  store.set('patterns.ts', /\.(ts|tsx)$/)

  // Filterable config
  publish(
    {
      // Resolve ts extensions
      'build/resolve/extensions': e => [...e, '.ts', '.tsx'],
      // Rule
      rule: (rule: {[key: string]: Framework['subscribe']}) => ({
        'rule/ts': subscribe('rule/ts'),
        ...rule,
      }),
      'rule/ts': () => ({
        test: subscribe('rule/ts/test'),
        exclude: subscribe('rule/ts/exclude'),
        use: subscribe('rule/ts/use'),
      }),
      'rule/ts/test': () => store.get('patterns.ts'),
      'rule/ts/exclude': () => store.get('patterns.modules'),
      'rule/ts/use': () => [
        subscribe('item/babel'),
        subscribe('item/ts'),
      ],
      'item/ts': () => ({
        loader: subscribe('item/ts/loader'),
        options: subscribe('item/ts/options'),
      }),
      'item/ts/options': () => ({
        transpileOnly: subscribe(
          'item/ts/options/transpileOnly',
        ),
        happyPackMode: subscribe(
          'item/ts/options/happyPackMode',
        ),
      }),
      'item/ts/options/happyPackMode': () => true,
      'item/ts/options/transpileOnly': () => true,
      'item/ts/loader': () => subscribe('loader/ts'),
      'loader/ts': () => require.resolve('ts-loader'),
    },
    name,
  )
}
