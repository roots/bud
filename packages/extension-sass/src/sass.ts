import type {Framework} from '@roots/bud-typings'

export const test = ({store}: Framework) =>
  store.access('patterns.sass')

export const exclude = ({store}: Framework) =>
  store.access('patterns.modules')

export const use = ({options, build}: Framework) => [
  options.is('mode', 'production')
    ? build.access('items.minicss')
    : build.access('items.style'),
  build.access('items.css'),
  build.access('items.sass'),
  build.access('items.resolveUrl'),
]
