import {eslintFormatter as formatter} from '@roots/bud-support'

export const boot: Framework.Extension.Register = bud => {
  const project = bud.disk.get('project')
  const extension = bud.disk.get('@roots/bud-eslint')

  const configPath = project.has('eslintrc.js')
    ? project.get('eslintrc.js')
    : extension.get('lib/presets/roots.js')

  bud.extensions.setOptions('@roots/bud-eslint', {
    eslintPath: require.resolve('eslint'),
    configPath,
    formatter,
    failOnError: true,
    fix: false,
  })
}

export const registerLoader = [
  'eslint',
  require.resolve('eslint-loader'),
]

export * as registerItems from './items'

export * as registerRules from './rules'
