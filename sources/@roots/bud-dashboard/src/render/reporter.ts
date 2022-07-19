/* eslint-disable no-console */
import type {Bud} from '@roots/bud-framework'
import chalk from 'chalk'
import figures from 'figures'
import type {StatsCompilation} from 'webpack'

import {theme} from '../theme.js'
import * as components from './report.js'

export const render = ({
  stats,
  warnings,
  errors,
  app,
}: {
  stats: StatsCompilation
  warnings: any
  errors: any
  app: Bud
}): void => {
  errors
    .map(error => error.message)
    .map(err => console.log(err.concat('\n')))

  warnings
    .map(error => error.message)
    .map(err => console.log(err.concat('\n')))

  if (errors && errors?.length > 0) return

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
      components.report({
        app,
        count: [i + 1, stats?.children?.length ?? 1],
        compilation,
      })

    components.summary(app, compilation)
  })
}
