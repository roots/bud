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
    app.dashboard.progress.setHeader(
      chalk.hex(stats?.errors?.length ? theme.red : theme.green)(
        `${stats?.errors?.length ? figures.cross : figures.tick} ${
          app.name
        }`,
      ),
    )

    stats.errorsCount &&
      console.log(
        stats.errors
          .filter(str => !str.moduleIdentifier)
          .map(format.formatMessage)
          .join('\n'),
      )

    stats.warningsCount &&
      console.log(stats.warnings.map(format.formatMessage).join('\n'))

    !stats.errorsCount &&
      compilation?.entrypoints &&
      components.report({
        app,
        count: [i + 1, compilation?.stats?.children?.length ?? 1],
        compilation,
      })

    components.summary(app, compilation)
  }

export const render = async ({
  stats,
  app,
}: {
  stats: StatsCompilation
  app: Bud
}) => {
  if (!stats) return

  const json = stats?.toJson()

  const renderCompilation = compilationMapFactory(app, stats?.toJson())

  await Promise.all(
    json?.children?.map(
      async (child, i) => await renderCompilation(child, i),
    ),
  ).then(() => {
    app.dashboard.progress.updateTask('build', {
      barTransformFn: json.errorsCount
        ? chalk.hex(theme.red)
        : json.warningsCount
        ? chalk.hex(theme.yellow)
        : chalk.hex(theme.green),
    })

    console.log()
  })
}
