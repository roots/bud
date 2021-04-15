import {Api, Hooks} from '@roots/bud-framework'

declare module '@roots/bud-framework' {
  interface Framework {
    /**
     * ## path [💁 Fluent]
     *
     * Get a filepath.
     *
     * ### Usage
     *
     * Absolute path to the dist directory:
     *
     * ```js
     * app.path('dist')
     * ```
     *
     * Absolute path to `scripts/app.js` in the dist directory:
     *
     * ```js
     * app.path('dist', 'scripts/app.js')
     *  ```
     */
    path: Api.Path
  }

  namespace Api {
    type Path = (
      locale: keyof Hooks.Locale.Definitions,
      path?: string,
    ) => string
  }
}

export const path: Api.Path = function (locale, path?) {
  if (locale !== 'project') {
    locale = this.disk.path.join(
      this.hooks.filter('location/project'),
      this.hooks.filter(`location/${locale}`),
    )
  } else {
    locale = this.hooks.filter('location/project')
  }

  return path ? this.disk.path.join(locale, path) : locale
}
