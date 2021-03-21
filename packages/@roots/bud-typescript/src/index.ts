import './interfaces'
import {Framework} from '@roots/bud-framework'
import {Module} from '@roots/bud-typings'

/**
 * Enum
 */
const TS_GLOB = ['*.ts', '*.tsx', '**/*.ts', '**/*.tsx']
const WARN_NO_TS = 'No ts found, skipping.'

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
  disk,
  publish,
  subscribe,
  store,
  src,
}: Framework) => {
  const tsFiles = disk.glob.sync(TS_GLOB, {cwd: src()})
  const utilized = tsFiles.length > 0

  // If there is no typescript to compile, bounce early.
  if (!utilized) {
    // @warning in case this isn't intended
    disk.logger.warn({
      message: WARN_NO_TS,
      suffix: {tsFiles, utilized, TS_GLOB},
    })
    return
  }

  // Set regexp pattern for ts
  store.set('patterns.ts', /\.(ts|tsx)$/)

  // Filterable config
  publish(
    {
      // Resolve ts extensions
      'build/resolve/extensions': e => [...e, '.ts', '.tsx'],
      // Rule
      rule: (rule: {[key: string]: Framework['subscribe']}) => ({
        'rule/ts': subscribe('rule/ts', name),
        ...rule,
      }),
      'rule/ts': () => ({
        test: subscribe('rule/ts/test', name),
        exclude: subscribe('rule/ts/exclude', name),
        use: subscribe('rule/ts/use', name),
      }),
      'rule/ts/test': () => store.get('patterns.ts'),
      'rule/ts/exclude': () => store.get('patterns.modules'),
      'rule/ts/use': () => [
        subscribe('item/babel', name),
        subscribe('item/ts', name),
      ],
      // RuleSetUse item
      'item/ts': () => ({
        loader: subscribe('item/ts/loader', name),
        options: subscribe('item/ts/options', name),
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
      'item/ts/loader': () => subscribe('loader/ts', name),
      // Loader
      'loader/ts': () => require.resolve('ts-loader'),
    },
    name,
  )
}
