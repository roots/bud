import type {Bud} from '@roots/bud-framework'
import chalk from 'chalk'
import figures from 'figures'
import type {StatsCompilation} from 'webpack'

import * as components from './components.js'
import {theme} from './theme.js'

export const report = ({
  stats,
  warnings,
  errors,
  app,
}: {
  stats: StatsCompilation
  warnings: any
  errors: any
  app: Bud
}): string => {
  errors
    .map(error => error.message)
    .map(err => console.log(err.concat('\n')))
  warnings
    .map(error => error.message)
    .map(err => console.log(err.concat('\n')))

  if (errors && errors?.length > 0) return ''

  stats?.children?.map((compilation, i) => {
    console.log(
      chalk
        .hex(errors.length ? theme.red : theme.green)
        .underline(
          `\n${errors.length ? figures.cross : figures.tick} ${
            compilation.name
          }\n`,
        ),
    )

    compilation?.entrypoints &&
      components
        .report({
          appName: app.name,
          count: [i + 1, stats?.children?.length ?? 1],
          context: app.context,
          compilation,
        })
        .filter(output => output && output !== '')
        .map(i => console.log(i))

    console.log(components.summary(app, compilation).join(''))

    app.hooks.filter('feature.log') &&
      console.log(...components.framework(app))
  })

  return ''
}
