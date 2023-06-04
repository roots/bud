import type {BudMinimize} from '@roots/bud-terser'
import type {
  BudMinimizeCSS,
  BudMinimizeCSSPublicInterface,
} from '@roots/bud-terser/css-minimize'
import type {
  BudMinimizeJS,
  BudMinimizeJSPublicInterface,
} from '@roots/bud-terser/js-minimize'

declare module '@roots/bud-framework' {
  interface Bud {
    minify: BudMinimize
    /**
     * @deprecated Use {@link Bud.minify} instead.
     */
    minimizeCss: BudMinimizeCSSPublicInterface
    /**
     * @deprecated Use {@link Bud.minify} instead.
     */
    terser: BudMinimizeJSPublicInterface
  }
}

declare module '@roots/bud-framework' {
  interface Modules {
    '@roots/bud-terser': BudMinimize
    '@roots/bud-terser/js-minimize': BudMinimizeJS
    '@roots/bud-terser/css-minimize': BudMinimizeCSS
  }
}
