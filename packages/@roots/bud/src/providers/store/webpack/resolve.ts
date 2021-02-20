import {Configuration} from 'webpack'
import {Bud} from '../../../Bud'

export const alias = (app: Bud) =>
  app.hooks.filter('webpack.resolve.alias', {})

export const extensions = (app: Bud) =>
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
  app: Bud,
) => Configuration['resolve']['modules'] = app =>
  app.hooks.filter(`webpack.resolve.modules`, [
    app.src(),
    app.project('node_modules'),
  ])

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
