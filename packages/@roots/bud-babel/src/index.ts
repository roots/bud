import type {Build} from '@roots/bud-framework'

import {Babel} from './Babel'
import {Config} from './Config'
import {DEFAULT_PLUGINS, DEFAULT_PRESETS} from './constants'

declare module '@roots/bud-framework' {
  interface Framework {
    /**
     * Configure babel.
     *
     * @usage
     * ```js
     * app.babel.setPlugins([
     *  ['@babel/plugin-transform-runtime', {helpers: false}],
     *  '@babel/plugin-proposal-object-rest-spread',
     *  '@babel/plugin-syntax-dynamic-import',
     *  '@babel/plugin-proposal-class-properties',
     * ])
     * ```
     */
    babel: Config
  }

  namespace Framework {
    interface Extensions {
      '@roots/bud-babel': Babel
    }

    interface Loaders {
      babel: Build.Loader
    }

    interface Items {
      babel: Build.Item
    }
  }
}

export const {name, register, boot} = Babel
export {Config}
export {DEFAULT_PLUGINS, DEFAULT_PRESETS}

export default Babel
