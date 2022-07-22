/* eslint-disable no-console */
import type {Bud} from '@roots/bud-framework'
import chalk from 'chalk'
import figures from 'figures'
import type {StatsCompilation} from 'webpack'
import format from 'webpack-format-messages'

import {theme} from '../theme.js'
import * as components from './report.js'

export const compilationMapFactory =
  (app, stats) => async (compilation, i) => {
    let out = []

    out.push(
      chalk.hex(stats?.errors?.length ? theme.red : theme.green)(
        `${stats?.errors?.length ? figures.cross : figures.tick} ${
          app.name
        }\n`,
      ),
    )

    stats.errorsCount &&
      out.push(
        stats.errors
          .filter(str => !str.moduleIdentifier)
          .map(format.formatMessage)
          .filter(Boolean)
          .join('\n'),
      )

    stats.warningsCount &&
      out.push(stats.warnings.map(format.formatMessage).join('\n'))

    !stats.errorsCount &&
      compilation?.entrypoints &&
      out.push(
        components
          .report({
            app,
            count: [i + 1, compilation?.stats?.children?.length ?? 1],
            compilation,
          })
          .flat()
          .filter(Boolean)
          .join('\n'),
      )

    out.push(
      components
        .summary(app, compilation)
        .flat()
        .filter(Boolean)
        .join('\n'),
    )

    return out.join('\n')
  }

export const render = async ({
  stats,
  app,
}: {
  stats: StatsCompilation
  app: Bud
}) => {
  if (!stats) return

  const renderCompilation = compilationMapFactory(app, stats)

  await Promise.all(
    stats?.children?.map(
      async (child, i) => await renderCompilation(child, i),
    ),
  ).then(res => {
    app.dashboard.log(...res)
  })
}
