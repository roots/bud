import type {Framework, Module} from '@roots/bud-framework'
/**
 * Register an extension or set of extensions
 *
 * @example
 * Add packaged bud extensions:
 *
 * ```js
 * bud.use([
 *   require('@roots/bud-babel'),
 *   require('@roots/bud-react'),
 * ])
 * ```
 *
 * @example
 * Add an extension inline (also works with an array of extensions):
 *
 * ```js
 * bud.use({
 *  name: 'my-webpack-plugin',
 *  make: () => new MyWebpackPlugin(),
 * })
 * ```
 *
 * @example
 * Add a webpack plugin inline (also work with an array of plugins):
 *
 * ```js
 * bud.use(new MyWebpackPlugin())
 * ```
 */
interface use {
  (source: use.Input): Framework
}
declare namespace use {
  type Input = Module | Module[]
}
declare const use: use
export {use}
//# sourceMappingURL=index.d.ts.map
