import {eslintFormatter as formatter} from '@roots/bud-support'

export const options = bud => {
  const project = bud.disk.get('project')

  const configPath = project.has('eslintrc.js')
    ? project.get('eslintrc.js')
    : project.has('eslint.config.js')
    ? project.get('eslint.config.js')
    : project.has('.eslintrc')
    ? project.get('eslintrc')
    : ''

  return {
    eslintPath: require.resolve('eslint'),
    configPath,
    formatter,
    failOnError: true,
    fix: false,
  }
}

export const registerLoader = [
  'eslint-loader',
  require.resolve('eslint-loader'),
]

export * as registerItems from './items'

export * as registerRules from './rules'
