/* eslint-disable no-console */
import type {Bud} from '@roots/bud-framework'
import chalk from 'chalk'
import figures from 'figures'
import type {StatsCompilation} from 'webpack'

import {theme} from '../theme.js'
import * as components from './report.js'

export const compilationMapFactory = (app, stats) => (compilation, i) => {
  console.log(
    chalk
      .hex(stats?.errors?.length ? theme.red : theme.green)
      .underline(
        `\n${stats?.errors?.length ? figures.cross : figures.tick} ${
          compilation.name
        }\n`,
      ),
  )

  compilation?.entrypoints &&
    components.report({
      app,
      count: [i + 1, compilation?.stats?.children?.length ?? 1],
      compilation,
    })

  components.summary(app, compilation)
}

export const render = ({
  stats,
  app,
}: {
  stats: StatsCompilation
  app: Bud
}): void => {
  if (!stats) return

  const json = stats?.toJson()

  if (json?.errors?.length > 0) return

  json?.children?.map(compilationMapFactory(app, json))
}
