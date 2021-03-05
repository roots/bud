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
  const publicPath = this.disk.path.posix.normalize(
    this.disk.path.posix.dirname(
      this.disk.path.posix.relative(this.dist(), this.src()),
    ),
  )

  this.hooks.on('build.items.minicss.options', opts => ({
    ...opts,
    publicPath,
  }))
}
