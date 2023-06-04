import type {
  BudMinimizeCSS,
  BudMinimizeCSSPublicInterface,
} from './css-minimize/index.js'
import type {BudMinimize} from './extension.js'
import type {
  BudMinimizeJS,
  BudMinimizeJSPublicInterface,
} from './js-minimize/index.js'

declare module '@roots/bud-framework' {
  interface Bud {
    minify: BudMinimize

    /**
     * @deprecated Use {@link Bud.minify} instead.
     */
    terser: BudMinimizeJSPublicInterface

    /**
     * @deprecated Use {@link Bud.minify} instead.
     */
    minimizeCss: BudMinimizeCSSPublicInterface
  }
}

declare module '@roots/bud-framework' {
  interface Modules {
    '@roots/bud-terser': BudMinimize
    '@roots/bud-terser/js-minimize': BudMinimizeJS
    '@roots/bud-terser/css-minimize': BudMinimizeCSS
  }
}
