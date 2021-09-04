/**
 * ⚡️ Frontend build tools combining the best parts of Symfony Encore and Laravel Mix
 *
 * - 💁 Composable - Build boss web applications with a modular, configurable build system
 * - 💪 Modern - Modern framework that scales from a single file to thousands of lines of code
 * - 🌱 Easy - Low bundle size and fast build times
 *
 * @see https://roots.io/bud
 * @see https://github.com/roots/bud
 *
 * @remarks
 * The `@roots/bud-dashboard` package implements the {@link Dashboard Dashboard Service}
 *
 * @export {Components} Components used in the package
 * @export {hooks}      Hooks used by the package
 * @export {Dashboard}  The dashboard service class
 * @export {Error}      An error component used by the package
 * @packageDocumentation
 */

export {Dashboard} from './Dashboard'
export {Error} from './Error'

export * as Components from './components'
export * as hooks from './hooks'
