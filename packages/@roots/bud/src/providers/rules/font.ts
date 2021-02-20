import type {Framework} from '@roots/bud-typings'

export const test = function (app: Framework) {
  return app.store.get('patterns.font')
}

export const use = function (app: Framework) {
  return [app.build.get('items.file')]
}
