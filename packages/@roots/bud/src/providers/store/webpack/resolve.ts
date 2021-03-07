import {Configuration} from 'webpack'
import {Framework} from '@roots/bud-framework'

export const alias = (app: Framework) =>
  app.hooks.filter('webpack.resolve.alias', {})

export const extensions = (app: Framework) =>
  app.hooks
    .filter(`webpack.resolve.extensions`, [
      '.wasm',
      '.mjs',
      '.js',
      '.css',
      '.json',
    ])
    .filter(
      (value, index, self) => self.indexOf(value) === index,
    )

export const modules: (
  app: Framework,
) => Configuration['resolve']['modules'] = app => {
  return app.hooks.filter(`webpack.resolve.modules`, [
    app.store.get('locations.src'),
    app.store.get('locations.modules'),
    ...app.extensions
      .getEntries()
      .filter(([k, v]) => k.includes('@roots/'))
      .map(([k, v]) =>
        app.fs.path.posix.join(
          app.disk.get('@roots').baseDir,
          k.replace('@roots/', ''),
          'node_modules',
        ),
      ),
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
