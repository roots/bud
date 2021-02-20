import type {Framework} from '@roots/bud-typings'

export const test = (app: Framework) =>
  app.store.get('patterns.css')

export const exclude = (app: Framework) =>
  app.store.get('patterns.modules')

export const use = (app: Framework) => [
  app.options.is('mode', 'production')
    ? app.build.get('items.minicss')
    : app.build.get('items.style'),
  app.build.get('items.css'),
]
