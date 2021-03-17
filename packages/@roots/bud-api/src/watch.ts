import {Framework} from '@roots/bud-framework'
import {Server} from '@roots/bud-typings'

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
  watchlist: Server.Options['watch']['files'],
  watchoptions: Server.Options['watch']['options'],
) => Framework

export const watch: Watch = function (watchlist, watchoptions) {
  this.server.config.set('watch.list', watchlist)
  this.server.config.set('watch.options', watchoptions)

  return this
}
