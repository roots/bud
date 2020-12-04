import {ProgressPlugin} from 'webpack'
import {Bud} from '@roots/bud-typings'

export const run: Run = function (safeMode = false) {
  if (!safeMode) {
    this.cli.run()
    return
  }

  this.addPlugin(
    'progress-plugin',
    new ProgressPlugin({
      activeModules: false,
      entries: true,
      modules: true,
      modulesCount: 5000,
      profile: false,
    }),
  )

  this.compiler.run((err, stats) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }

    console.log(
      stats.toString({
        all: false,
        version: true,
        hash: true,
        builtAt: true,
        assets: true,
        colors: true,
      }),
    )
  })
}

export type Run<T = Bud.Contract> = (
  this: T,
  safeMode?: boolean,
) => void
