import {Bud} from '@roots/bud-typings'
import {Error} from '@roots/bud-cli'

export const run: Run = function (safeMode = false) {
  if (!safeMode && !this.mode.ci) {
    this.cli.run()
    return
  }

  this.compiler.compile()

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
  production: function (this: Bud.Bud) {
    this.hooks
      .on('compiler.stats', stats => {
        console.log(stats.string)
        return stats
      })
      .on('compiler.error', error => {
        new Error(error, 'Compilation error\n', true)
      })

    this.compiler.run()
  },

  /**
   * Development build
   */
  development: function (this: Bud.Bud) {

    this.compiler.compile().hooks.done.tap('stats', stats => {
      if (stats.hasErrors()) {
        console.error(
          stats.toString(this.compiler.statsOptions.string),
        )
        console.log(`\n`)
      } else {
        stats &&
          console.log(
            stats.toString(this.compiler.statsOptions.string),
          )
        console.log(`\n`)
      }

      return stats
    })

    this.server.run()
  },
}

export type Run<T = Bud.Contract> = (
  this: T,
  safeMode?: boolean,
) => void
