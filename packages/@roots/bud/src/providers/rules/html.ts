import type {Framework} from '@roots/bud-typings'

export const test = ({store}: Framework) =>
  store.get('patterns.html')

export const use = ({build}: Framework) => [
  build.access('items.raw'),
]
