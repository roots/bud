import type {Framework} from '@roots/bud-typings'

export const test = ({store}: Framework) =>
  store.get('patterns.sass')

export const exclude = ({store}: Framework) =>
  store.get('patterns.modules')

export const use = ({options, build}: Framework) => [
  options.is('mode', 'production')
    ? build.get('items.minicss')
    : build.get('items.style'),
  build.get('items.css'),
  build.get('items.sass'),
  build.get('items.resolveUrl'),
]
