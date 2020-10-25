import {eslintFormatter as formatter} from '@roots/bud-support'

export const registerLoader = [
  'eslint',
  require.resolve('eslint-loader'),
]

export * as registerItems from './items'

export * as registerRules from './rules'

export const boot: Framework.Extension.Register = bud => {
  const configPath = bud.disk.get('project').has('eslintrc.js')
    ? bud.disk.get('project').get('eslintrc.js')
    : bud.disk
        .get('@roots/bud-eslint')
        .get('lib/presets/roots.js')

  bud.extensions.setOptions('@roots/bud-eslint', {
    eslintPath: require.resolve('eslint'),
    configPath,
    formatter,
    failOnError: true,
    fix: false,
  })

  bud.features.set('eslint', true)
}
