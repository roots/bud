import {eslintFormatter as formatter} from '@roots/bud-support'

export const options = {
  formatter,
  failOnError: true,
  fix: false,
}

export const boot = (bud: Framework.Bud): void => {
  const config = bud.fs.has('.eslintrc.js')
    ? bud.fs.get('.eslintrc.json')
    : null

  if (bud.fs.exists(config)) {
    bud.extensions.setOptions('@roots/bud-eslint', config)
  }

  bud.features.set('eslint', true)

  const base = bud.components['rules'].get('js.use')(bud)

  bud.components['rules'].set('js.use', bud => [
    ...base,
    bud.components['items'].get('eslint').make(),
  ])
}

export const registerLoader = [
  'eslint',
  require.resolve('eslint-loader'),
]

export * as registerItems from './registerItems'
