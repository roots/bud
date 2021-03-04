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
  hooks,
  logger,
}: Framework): void => {
  const hasTs =
    disk.glob.sync(['*.ts', '*.tsx', '**/*.ts', '**/*.tsx'], {
      cwd: disk.path.join(
        disk.get('project').baseDir,
        store.get('locations.src'),
      ),
    }).length > 0

  if (!hasTs) {
    logger.warn({hasTs, msg: 'No ts found, skipping.'})
    return
  }

  // Set regexp pattern for ts
  store.set('patterns.ts', /\.(ts|tsx)$/)

  // Add tsx? to resolvable extensions
  hooks.on('webpack.resolve.extensions', extensions => [
    ...extensions,
    '.ts',
    '.tsx',
  ])

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
