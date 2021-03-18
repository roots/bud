import {Service} from '@roots/bud-framework'
import {Store, Webpack} from '@roots/bud-typings'

declare module '@roots/bud-framework' {
  namespace Framework {
    interface Store extends Service {
      /**
       * ## container.get
       *
       * Get a value from the container.
       *
       * If no key is passed the container store will be returned.
       *
       * ### Usage
       *
       * ```js
       * container.get('container.container-item')
       * ```
       *
       * ```js
       * container.get(['container', 'container-item'])
       * ```
       */
      get<T = any>(path: Store.Keys)
    }

    namespace Keys {
      type Keys =
        | `webpack.entry`
        | `webpack.devtool`
        | `webpack.plugins.${Store.Path<
            Webpack.Configuration['plugins']
          >}`
        | `webpack.stats.${Store.Path<
            Webpack.Configuration['stats']
          >}`
        | `webpack.module.${Store.Path<
            Webpack.Configuration['module']
          >}`
        | `webpack.optimization.${Store.Path<
            Webpack.Configuration['optimization']
          >}`
        | `webpack.performance.${Store.Path<
            Webpack.Configuration['performance']
          >}`
        | `webpack.resolve.${Store.Path<
            Webpack.Configuration['resolve']
          >}`
        | `webpack.${keyof Webpack.Configuration}`
        | `webpack`
        | `args.${string}`
        | `args`
        | `theme`
        | `theme.${string}`
        | `env.${string}`
        | `server.${string}`
        | `server`
        | `env`
        | `locations`
        | `locations.${string}`
        | `patterns`
        | `patterns.${string}`
        | `project`
        | `project.${string}`
        | `options`
        | `options.${string}`
        | `compilation.${string}`
    }
  }
}
