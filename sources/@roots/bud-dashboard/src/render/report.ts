/* eslint-disable no-console */
import type {Bud} from '@roots/bud-framework'
import chalk from 'chalk'
import type {StatsCompilation} from 'webpack'

import {theme} from '../theme.js'
import * as assets from './assets.js'
import * as table from './table.js'

export const report = ({
  app,
  count,
  compilation,
}: {
  app: Bud
  count: [number, number]
  compilation: StatsCompilation
}) => {
  const staticGroup = assets.statics(compilation)
  const staticDisplay = staticGroup.splice(0, 5)

  app.dashboard.log(
    table.make([
      ...assets.group(assets.assets(compilation)).filter(Boolean),
      ...assets.group(staticDisplay).filter(Boolean),
    ]),
  )

  staticGroup.length &&
    app.dashboard.log(
      chalk.italic.dim(
        `+ ${staticGroup.length} additional static assets\n\n`,
      ),
    )
}

export const summary = (app: Bud, compilation: StatsCompilation) => {
  app.dashboard.log(
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
    app.dashboard.log(
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
}
