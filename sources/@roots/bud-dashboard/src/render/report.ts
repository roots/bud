/* eslint-disable no-console */
import type {Bud} from '@roots/bud-framework'
import chalk from 'chalk'
import type {StatsCompilation} from 'webpack'

import * as assets from './assets.js'
import * as table from './table.js'
import {theme} from './theme.js'

export const report = ({
  app,
  count,
  compilation,
}: {
  app: Bud
  count: [number, number]
  compilation: StatsCompilation
}) => {
  let out = []

  const staticGroup = assets.statics(compilation)
  const staticDisplay = staticGroup.splice(0, 5)

  out.push(
    table.make([
      ...assets.group(assets.assets(compilation)).filter(Boolean),
      ...assets.group(staticDisplay).filter(Boolean),
    ]),
  )

  staticGroup.length &&
    out.push(
      chalk.italic.dim(
        `+ ${staticGroup.length} additional static assets\n\n`,
      ),
    )

  return out
}

export const Summary = (app: Bud, compilation: StatsCompilation) => {
  let out = []

  out.push(
    table.make([
      [
        chalk.hex(theme.magenta)(`mode`),
        chalk.hex(theme.foregroundColor)(app.mode),
        chalk.hex(theme.magenta)(`hash`),
        chalk.hex(theme.foregroundColor)(compilation.hash),
      ],
      [
        chalk.hex(theme.magenta)(app.context.application.name),
        chalk.hex(theme.foregroundColor)(app.context.application.version),
        chalk.hex(theme.magenta)('webpack'),
        chalk.hex(theme.foregroundColor)(compilation.version),
      ],
      [
        chalk.hex(theme.magenta)('node'),
        chalk.hex(theme.foregroundColor)(process.versions.node),
        '',
        '',
      ],
    ]),
  )

  app.isDevelopment &&
    out.push(
      table.make(
        [
          [
            chalk.hex(theme.magenta)(`server url:`),
            app.server.connection.url.toString(),
          ],
          app.hooks.filter('dev.middleware.enabled').includes('proxy')
            ? [
                chalk.hex(theme.magenta)('proxy url:'),
                app.hooks.filter('dev.middleware.proxy.target').toString(),
              ]
            : null,
        ].filter(Boolean),
      ),
    )

  return out
}
