import {Framework} from '@roots/bud-framework'
export const resolveUrl = (app: Framework) =>
  app.hooks.filter('build.items.resolveUrl', {
    loader: require.resolve('resolve-url-loader'),
    options: {
      root: app.store.get('locations.css') ?? undefined,
      sourceMap: true,
    },
  })
