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
import entrypoints from '@roots/bud/cli/flags/entrypoints'
import entrypointsHtml from '@roots/bud/cli/flags/entrypoints.html'
import esm from '@roots/bud/cli/flags/esm'
import hash from '@roots/bud/cli/flags/hash'
import html from '@roots/bud/cli/flags/html'
import immutable from '@roots/bud/cli/flags/immutable'
import lazy from '@roots/bud/cli/flags/lazy'
import minimize from '@roots/bud/cli/flags/minimize'
import runtime from '@roots/bud/cli/flags/runtime'
import silent from '@roots/bud/cli/flags/silent'
import splitChunks from '@roots/bud/cli/flags/splitChunks'
import browserslistUpdateCheck from '@roots/bud/cli/helpers/browserslistUpdate'
import budUpdateCheck from '@roots/bud/cli/helpers/budUpdate'

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
        \`bud build\` compiles source assets in \`production\` mode. Run \`bud build production --help\` for usage.

        \`bud dev\` compiles source assets in \`development\` mode and serves updated modules. Run \`bud build development --help\` for usage.

        If you run this command without a configuration file \`bud\` will look for an entrypoint at \`@src/index.js\`.
      `,
  })

  public override dry = dry(false)

  public override silent = silent(false)

  public browserslistUpdate = browserslistUpdate

  public ci = ci

  public dashboard = dashboard

  public [`dashboard.assets`] = dashboardAssets

  public [`dashboard.compact`] = dashboardCompact

  public [`dashboard.entrypoints`] = dashboardEntrypoints

  public [`dashboard.server`] = dashboardServer

  public devtool = devtool

  public discover = discover

  public editor = editor

  public entrypoints = entrypoints

  public [`entrypoints.html`] = entrypointsHtml

  public esm = esm

  public hash = hash

  public html = html

  public immutable = immutable

  public lazy = lazy

  public minimize = minimize

  public runtime = runtime

  public splitChunks = splitChunks

  /**
   * {@link BudCommand.execute}
   */
  public override async execute() {
    await this.makeBud()
    await browserslistUpdateCheck(this.bud)
    await budUpdateCheck(this.bud)
    await this.bud.run()
  }
}
