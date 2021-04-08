import '@roots/bud-hooks'
import '@roots/bud-framework'

import {Webpack} from '@roots/bud-support'
import {Theme} from '@roots/ink-use-style'

/**
 * @fix SWR thinking its in the browser.
 */
declare module NodeJS {
  interface Global {
    navigator: any
  }
}

declare module '@roots/bud-framework' {
  namespace Framework {
    interface Pkgs {
      [key: string]: Pkg
    }

    interface Pkg {
      path: string
      type: 'preset' | 'extension'
      core: boolean
      [key: string]: any
    }

    interface Config {
      entry: Webpack.Configuration['entry'] & {
        [key: string]: any
      }
      externals: Webpack.Configuration['externals'] & {
        [key: string]: any
      }
      define: Webpack.DefinePlugin['definitions']
      install: boolean
      bail: boolean
      cache: boolean
      clean: boolean
      ci: boolean
      debug: boolean
      devtool: any
      discover: boolean
      fileFormat: string
      hash: boolean
      hashFormat: string
      html: {
        enabled: boolean
        template: string
        replace: {[key: string]: string}
      }
      template: string
      log: boolean
      noEmit: boolean
      manifest: boolean
      minify: boolean
      mode: ('production' | 'development') &
        Webpack.Configuration['mode']
      namedModules: boolean
      node: Webpack.Configuration['node']
      parallelism: Webpack.Configuration['parallelism']
      profile: Webpack.Configuration['profile']
      removeEmptyChunks: Webpack.Configuration['optimization']['removeEmptyChunks']
      runtimeChunk: Webpack.Configuration['optimization']['runtimeChunk']
      splitChunks: Webpack.Configuration['optimization']['splitChunks']
      stats: Webpack.Configuration['stats']
      target: Webpack.Configuration['target']
      resolve:
        | Webpack.Configuration['resolve']
        | {
            alias:
              | Webpack.Configuration['resolve']['alias']
              | {
                  [key: string]: any
                }
            extensions: Webpack.Configuration['resolve']['extensions']
            modules:
              | Webpack.Configuration['resolve']['modules']
              | string[]
          }
      server: {
        host: string
        port: number
        proxy: {
          host: string
          port: number
        }
        middleware: {
          [key: string]: boolean
        }
        watch: {
          files: string[]
          options: {
            persistant: boolean
          }
        }
        methods: string[]
        browser: {
          indicator: boolean
          log: boolean
          overlay: boolean
        }
      }
      location: {
        project: string
        src: string
        dist: string
        modules: string
        publicPath: string
        records: string
        storage: string
      }
      theme: Theme
    }
  }
}
