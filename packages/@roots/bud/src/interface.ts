import '@roots/bud-framework'

import {Theme} from '@roots/ink-use-style'
import {Webpack} from '@roots/bud-support'

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
      name: string
      browser: {
        indicator: true
        log: true
        overlay: true
      }
      install: boolean
      entry: {
        [key: string]: any
      }
      alias: {
        [key: string]: any
      }
      externals: {
        [key: string]: any
      }
      bail: boolean
      cache: boolean
      clean: boolean
      ci: boolean
      define: {
        [key: string]: any
      }
      devtool: any
      discover: boolean
      fileFormat: string
      hash: boolean
      hashFormat: string
      html: boolean
      template: string
      log: boolean
      noEmit: boolean
      manifest: boolean
      minify: boolean
      mode: 'production' | 'development'
      namedModules: boolean
      node: Webpack.Configuration['node']
      parallelism: number
      profile: boolean
      runtimeChunk: boolean
      splitChunksEnabled: boolean
      splitChunks: {
        chunks: string
        minSize: number
        maxSize: number
        minChunks: number
        maxAsyncRequests: number
        maxInitialRequests: number
      }
      stats: boolean
      target: string
      resolve: {
        extensions: string[]
        modules: string[]
      }
      server: {
        middleware: {
          [key: string]: boolean
        }
        watch: {
          files: string[]
          options: {
            persistant: boolean
          }
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
