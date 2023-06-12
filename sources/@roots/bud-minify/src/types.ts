import type {BudMinimize} from '@roots/bud-minify'
import type {
  BudMinimizeCSS,
  BudMinimizeCSSPublicInterface,
} from '@roots/bud-minify/minify-css'
import type {
  BudMinimizeJS,
  BudMinimizeJSPublicInterface,
} from '@roots/bud-minify/minify-js'

declare module '@roots/bud-framework' {
  interface Bud {
    minify: BudMinimize

    /**
     * @deprecated Use {@link bud.minify} instead.
     */
    minimizeCss: BudMinimizeCSSPublicInterface
    /**
     * @deprecated Use {@link bud.minify} instead.
     */
    terser: BudMinimizeJSPublicInterface
  }

  interface Modules {
    '@roots/bud-minify': BudMinimize
    '@roots/bud-minify/minify-css': BudMinimizeCSS
    '@roots/bud-minify/minify-js': BudMinimizeJS
  }
}
