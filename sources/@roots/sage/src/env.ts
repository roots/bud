import type Sage from './extension.js'
import type ThemeJSON from './theme/extension.js'

declare module '@roots/bud-framework' {
  interface Bud {
    /**
     * Generate a WordPress `theme.json`
     *
     * @example
     * Use default values:
     *
     * ```js
     * app.themeJson()
     * ```
     *
     * @example
     * Set with an object:
     *
     * ```js
     * app.themeJson({
     *   color: {
     *     palette: []
     *   }
     * })
     * ```
     *
     * @example
     * Set with a callback. Callback supplies a container object.
     *
     * ```js
     * app.themeJson(theme => {
     *   theme.set('color.palette', [])
     *   return theme
     * })
     * ```
     *
     * @example
     * Set with a callback. Pass `true` as a second parameter to
     * specify that you would like to use a raw object rather than
     * a container.
     *
     * ```js
     * app.themeJson(theme => ({
     *   ...theme,
     *   color: {
     *     palette: [],
     *   },
     * }), true)
     * ```
     *
     * @public
     */
    themeJson: ThemeJSON['themeJson']

    /**
     * Use extended tailwind colors as theme.json colors
     *
     * @example
     * app.useTailwindColors()
     *
     * @public
     */
    useTailwindColors: ThemeJSON['useTailwindColors']
  }

  interface Locations {
    '@resources': string
    '@public': string
    '@fonts': string
    '@images': string
    '@scripts': string
    '@styles': string
    '@views': string
  }

  interface Modules {
    '@roots/sage': Sage
    'wp-theme-json': ThemeJSON
  }
}
