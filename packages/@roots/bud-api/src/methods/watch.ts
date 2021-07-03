import {Framework, Server} from '@roots/bud-framework'

declare module '@roots/bud-framework' {
  interface Framework {
    /**
     * ## watch  [💁 Fluent]
     *
     * Configure the list of files that, when modified,
     * will force the browser to reload (even in hot mode).
     *
     * ### Usage
     *
     * ```js
     * app.watch(['templates/*.html'])
     * ```
     */
    watch: Framework.Api.Watch
  }

  namespace Framework.Api {
    export {Watch}
  }
}

type Watch = (
  files: Server.Configuration['watch']['files'],
  options?: Server.Configuration['watch']['options'],
) => Framework

export const watch: Watch = function (files, options) {
  const target = this.isChild ? this.parent : this

  if (!target.isDevelopment || !target.server) {
    target.log('Skipping watched files in production')
    return this
  }

  files && this.server.config.set('watch.files', files)
  options && this.server.config.set('watch.options', options)

  return this
}
