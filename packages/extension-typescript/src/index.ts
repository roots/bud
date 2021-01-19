import {Bud} from '@roots/bud'

// Extension identifier
export const name = '@roots/bud-typescript'

// Extension interfaces
export * from './interfaces'

// Extension api
export * as api from './api'

// Fallback tsconfig in case user doesn't have one
const tsConfig: string = `{
  "compilerOptions": {
    "sourceMap": true
  }
}`

// Extension boot
export const boot = ({build, disk, store, hooks}: Bud): void => {
  !disk.get('project').exists('tsconfig.json') &&
    disk.get('project').write('tsconfig.json', tsConfig)

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
    test: ({store}: Bud): RegExp => store.get('patterns.ts'),

    exclude: ({store}: Bud): RegExp =>
      store.get('patterns.modules'),

    use: ({build}: Bud): Bud.Item[] => [
      build.access('items.cache'),
      build.access('items.ts'),
    ],
  })
}
