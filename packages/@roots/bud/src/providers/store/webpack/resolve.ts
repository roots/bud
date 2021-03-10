import {Configuration} from 'webpack'
import {Framework} from '@roots/bud-framework'

export const alias = (app: Framework) =>
  app.hooks.filter(
    'webpack.resolve.alias',
    app.store.get('options.resolve.alias'),
  )

export const extensions = (app: Framework) =>
  app.hooks
    .filter(
      `webpack.resolve.extensions`,
      app.store.get('options.resolve.extensions'),
    )
    .filter(
      (value, index, self) => self.indexOf(value) === index,
    )

export const modules: (
  app: Framework,
) => Configuration['resolve']['modules'] = app => {
  return app.hooks.filter(`webpack.resolve.modules`, [
    app.store.get('locations.src'),
    app.store.get('locations.modules'),
    ...app.store.get('options.resolve.modules'),
    ...app.discovery.getEntries().map(([k, v]) => {
      return app.disk.path.posix.join(v.path, 'node_modules')
    }),
  ])
}

/**
  @webpack5

  export const fallback: Configuration['resolve']['fallback'] = {
    setImmediate: false,
    module: false,
    dns: 'mock',
    process: false,
    Buffer: false,
    fs: false,
    http2: false,
    net: false,
    tls: false,
    child_process: false,
  }
*/
