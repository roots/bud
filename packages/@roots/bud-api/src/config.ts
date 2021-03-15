import {Framework} from '@roots/bud-framework'

declare module '@roots/bud-framework' {
  interface Framework {
    /**
     * ## config  [💁 Fluent]
     *
     * Fine-tunings.
     *
     * ### Usage
     *
     * ```js
     * app.config({
     *   css: {
     *     relativeDistUrls: false,
     *   },
     * })
     * ```
     */
    config: Framework.Api.Config
  }

  namespace Framework.Api {
    export type Config = (config: {
      css?: {
        relativeUrls?: boolean
      }
    }) => Framework
  }
}

export const config: Framework.Api.Config = function ({css}) {
  css?.relativeUrls && _cssRelativeUrls.bind(this)()

  return this
}

/**
 * Relativize dist url()
 */
const _cssRelativeUrls = function (this: Framework) {
  const relativePath = this.disk.path.posix.relative(
    this.subscribe('location/dist', 'api/config'),
    this.subscribe('location/src', 'api/config'),
  )

  this.publish(
    {
      'item/minicss/options/publicPath': () =>
        this.disk.path.posix.normalize(
          this.disk.path.posix.dirname(relativePath),
        ),
    },
    'api/config',
  )
}
