import '@roots/bud-framework'
import {Theme} from '@roots/ink-use-style'

declare module '@roots/bud-framework' {
  interface Framework {
    /**
     * ## dashboard  [💁 Fluent]
     *
     * Copy files during compilation.
     *
     * You may specify paths with a string literal or glob pattern.
     *
     * ### Usage
     *
     * **Copy src/images to dist/images**
     *
     * ```js
     * app.copy({
     *   images: 'src/images/*.{png,gif,jpeg,jpg,webp}'
     * })
     * ```
     */
    theme: Framework.Dashboard.Theme
  }

  namespace Framework.Dashboard {
    interface Theme {
      colors: Framework.Dashboard.Colors
    }

    type Colors = (colors: Theme.Colors) => Framework
  }
}
