import type {Framework} from '@roots/bud-typings'

export const test = (app: Framework) =>
  app.store.get('patterns.css')

export const exclude = (app: Framework) =>
  app.store.get('patterns.modules')

export const use = (app: Framework) => [
  app.isProduction
    ? app.build.access('items.minicss')
    : app.build.access('items.style'),
  app.build.access('items.css'),
]
