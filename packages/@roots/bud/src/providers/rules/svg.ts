import type {Framework} from '@roots/bud-typings'

export const test: Framework.Rule['test'] = function (
  app: Framework,
) {
  return app.store.get('patterns.svg')
}

export const use: Framework.Rule['use'] = function (
  app: Framework,
) {
  return [app.build.access('items.svg')]
}
