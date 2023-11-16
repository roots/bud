import BudCommand from '@roots/bud/cli/commands'
import browserslistUpdate from '@roots/bud/cli/flags/browserslist-update'
import ci from '@roots/bud/cli/flags/ci'
import dashboard from '@roots/bud/cli/flags/dashboard'
import dashboardAssets from '@roots/bud/cli/flags/dashboard.assets'
import dashboardCompact from '@roots/bud/cli/flags/dashboard.compact'
import dashboardEntrypoints from '@roots/bud/cli/flags/dashboard.entrypoints'
import dashboardServer from '@roots/bud/cli/flags/dashboard.server'
import devtool from '@roots/bud/cli/flags/devtool'
import discover from '@roots/bud/cli/flags/discover'
import dry from '@roots/bud/cli/flags/dry'
import editor from '@roots/bud/cli/flags/editor'
import entrypointsHtml from '@roots/bud/cli/flags/entrypoints.html'
import esm from '@roots/bud/cli/flags/esm'
import hash from '@roots/bud/cli/flags/hash'
import html from '@roots/bud/cli/flags/html'
import immutable from '@roots/bud/cli/flags/immutable'
import input from '@roots/bud/cli/flags/input'
import lazy from '@roots/bud/cli/flags/lazy'
import minimize from '@roots/bud/cli/flags/minimize'
import notify from '@roots/bud/cli/flags/notify'
import output from '@roots/bud/cli/flags/output'
import publicPath from '@roots/bud/cli/flags/publicPath'
import runtime from '@roots/bud/cli/flags/runtime'
import silent from '@roots/bud/cli/flags/silent'
import splitChunks from '@roots/bud/cli/flags/splitChunks'
import storage from '@roots/bud/cli/flags/storage'
import browserslistUpdateCheck from '@roots/bud/cli/helpers/browserslistUpdate'
import isBoolean from '@roots/bud-support/lodash/isBoolean'
import logger from '@roots/bud-support/logger'

/**
 * `bud build` command
 */
export default class BudBuildCommand extends BudCommand {
  /**
   * {@link BudCommand.paths}
   */
  public static override paths = [[`build`]]

  /**
   * {@link BudCommand.usage}
   */
  public static override usage = BudCommand.Usage({
    category: `build`,
    description: `Compile source assets`,
    details: `\
      \`bud build production\` compiles source assets in \`production\` mode. Run \`bud build production --help\` for usage.

      \`bud build development\` compiles source assets in \`development\` mode and serves updated modules. Run \`bud build development --help\` for usage.

      If you run this command without a configuration file \`bud\` will look for an entrypoint at \`@src/index.js\`.
    `,
  })

  public browserslistUpdate = browserslistUpdate

  public [`dashboard.assets`] = dashboardAssets

  public [`dashboard.compact`] = dashboardCompact

  public [`dashboard.entrypoints`] = dashboardEntrypoints

  public [`dashboard.server`] = dashboardServer

  public [`dashboard`] = dashboard

  public [`entrypoints.html`] = entrypointsHtml

  public ci = ci

  public devtool = devtool

  public discover = discover

  public override dry = dry(false)

  public editor = editor

  public esm = esm

  public hash = hash

  public html = html

  public immutable = immutable

  public input = input

  public lazy = lazy

  public minimize = minimize

  public override notify = notify

  public output = output

  public publicPath = publicPath

  public runtime = runtime

  public override silent = silent(false)

  public splitChunks = splitChunks

  public override storage = storage

  /**
   * {@link BudCommand.execute}
   */
  public override async execute() {
    await this.makeBud()

    if (isBoolean(this[`entrypoints.html`])) {
      this.bud.entrypoints.set(`emitHtml`, this[`entrypoints.html`])
    }

    if (this.bud.env.has(`BUD_BROWSERSLIST_UPDATE`)) {
      this.bud.context.browserslistUpdate = this.bud.env.get(`BUD_BROWSERSLIST_UPDATE`)
    }
    if (this.browserslistUpdate !== undefined) {
      this.bud.context.browserslistUpdate = this.browserslistUpdate
    }

    await browserslistUpdateCheck(this.bud).catch(error => {
      logger.error(error)
    })

    await this.bud.run()
  }
}
