import type {Framework} from '@roots/bud-typings'

export const test = function (app: Framework) {
  return app.store.access('patterns.js')
}

export const exclude = (app: Framework) =>
  app.store.access('patterns.modules')

export const use = function (app: Framework) {
  return [app.build.access('items.raw')]
}
