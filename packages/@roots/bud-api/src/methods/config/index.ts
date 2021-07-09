import type {Framework} from '@roots/bud-framework'

declare module '@roots/bud-framework' {
  interface Framework {
    /**
     * ## config
     *
     * Modify bud's baseline config.
     *
     * Values defined in this function are more
     * likely to be overwritten by framework hooks
     *
     * ### Usage
     *
     * ```js
     * app.config({
     *   theme: {
     *     colors: {
     *       foreground: '#FFFFFF',
     *       faded: '#6C758F',
     *       primary: '#545DD7',
     *       primaryAlt: '#663399',
     *       error: '#dc3545',
     *       errorAlt: '#b22222',
     *       warning: '#FF611A',
     *       success: '#46D46A',
     *       accent: '#ff69b4',
     *       flavor: '#78C5D7',
     *     },
     *   },
     * })
     * ```
     */
    config: Framework.Api.Config
  }

  namespace Framework.Api {
    type Config = (config?: any) => Framework
  }
}

const config: Framework.Api.Config = function (config) {
  this.store.mergeStore(config)

  return this
}

export {config}
