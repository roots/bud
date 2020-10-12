import {eslintFormatter as formatter} from '@roots/bud-support'

export const options: Framework.Extension['options'] = {
  formatter,
  failOnError: true,
  fix: false,
}

export const boot: Framework.Extension['boot'] = bud => {
  const config = bud.fs.has('.eslintrc.js')
    ? bud.fs.get('.eslintrc.json')
    : null

  if (bud.fs.exists(config)) {
    bud.extensions.setOptions('eslint', config)
  }

  bud.features.set('eslint', true)

  const base = bud.components['rules'].get('js.use')(bud)
  bud.components['rules'].set('js.use', bud => [
    ...base,
    bud.build.items.eslint.make(),
  ])
}

export const registerLoader: Framework.Extension['registerLoader'] = [
  'eslint',
  require.resolve('eslint-loader'),
]

export * as registerItems from './registerItems'
