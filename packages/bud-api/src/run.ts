import {Framework, Api} from '@roots/bud-typings'

export const run: Api.Run = function (safeMode = false) {
  if (!safeMode && !this.mode.ci) {
    return this.cli.run()
  }

  this.compiler.compile().hooks.done.tap('stats', stats => {
    if (stats.hasErrors() && this.mode.is('development')) {
      console.error(
        stats.toString(this.compiler.statsOptions.string),
      )
      console.log(`\n`)
    } else {
      console.log(
        stats.toString(this.compiler.statsOptions.string),
      )
      console.log(`\n`)
    }
  })

  this.when(
    this.mode.is('production'),
    ci.production.bind(this),
    ci.development.bind(this),
  )
}

/**
 * CI / Raw mode compatible
 */
const ci = {
  /**
   * Production build
   */
  production: function (this: Framework) {
    this.compiler.run()
  },

  /**
   * Development build
   */
  development: function (this: Framework) {
    this.server.run()
  },
}
