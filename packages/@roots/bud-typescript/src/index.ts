import './interfaces'
import {Framework} from '@roots/bud-framework'
import {Item, Module} from '@roots/bud-typings'
import * as apiFns from './api'

// Extension identifier
export const name: Module['name'] = '@roots/bud-typescript'

// Extension api
export const api: Module['api'] = apiFns

// Extension boot
export const boot: Module['boot'] = ({
  build,
  disk,
  store,
  subscribe,
  publish,
}: Framework): void => {
  const hasTs =
    disk.glob.sync(['*.ts', '*.tsx', '**/*.ts', '**/*.tsx'], {
      cwd: disk.path.join(
        subscribe('location/project'),
        subscribe('location/src'),
      ),
    }).length > 0

  if (!hasTs) {
    disk.logger.warn('No ts found, skipping.')
    return
  }

  // Set regexp pattern for ts
  store.set('patterns.ts', /\.(ts|tsx)$/)

  // Add tsx? to resolvable extensions
  publish(
    {
      'build/resolve/extensions': extensions => [
        ...extensions,
        '.ts',
        '.tsx',
      ],
    },
    '@roots/bud-typescript',
  )

  // Set ts-loader
  build.set('items.ts', {loader: 'ts-loader'})

  // Set ts rules
  build.set('rules.ts', {
    test: ({store}: Framework): RegExp =>
      store.get('patterns.ts'),

    exclude: ({store}: Framework): RegExp =>
      store.get('patterns.modules'),

    use: ({build}: Framework): Item[] => [
      build.access('items.cache'),
      build.access('items.ts'),
    ],
  })
}
