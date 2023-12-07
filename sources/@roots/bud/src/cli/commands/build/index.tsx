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
import lazy from '@roots/bud/cli/flags/lazy'
import minimize from '@roots/bud/cli/flags/minimize'
import notify from '@roots/bud/cli/flags/notify'
import runtime from '@roots/bud/cli/flags/runtime'
import silent from '@roots/bud/cli/flags/silent'
import splitChunks from '@roots/bud/cli/flags/splitChunks'
import browserslistUpdateCheck from '@roots/bud/cli/helpers/browserslistUpdate'
import isBoolean from '@roots/bud-support/lodash/isBoolean'
import isString from '@roots/bud-support/lodash/isString'
import noop from '@roots/bud-support/lodash/noop'

import type {Override} from '../../helpers/override.js'

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

  public declare hot?: boolean

  public declare proxy?: string

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

  public lazy = lazy

  public minimize = minimize

  public override notify = notify

  public runtime = runtime

  public override silent = silent(false)

  public splitChunks = splitChunks

  /**
   * {@link BudCommand.execute}
   */
  public override async execute() {
    await this.makeBud()

    if (isBoolean(this[`entrypoints.html`]) && `entrypoints` in this.bud) {
      this.bud.entrypoints.set(`emitHtml`, this[`entrypoints.html`])
    }

    await Promise.all(
      [
        [
          this.browserslistUpdate,
          `BUD_BROWSERSLIST_UPDATE`,
          `browserslistUpdate`,
          b => async v => (b.root.context.browserslistUpdate = v),
        ] satisfies Override<boolean>,
        [
          this.devtool,
          `BUD_DEVTOOL`,
          `devtool`,
          b => async v => b.devtool(v),
        ] satisfies Override<any>,
        [
          this.esm,
          `BUD_ESM`,
          `esm`,
          b => async v => b.esm.enable(v),
        ] satisfies Override<boolean>,
        [
          this.hash,
          `BUD_HASH`,
          `hash`,
          b => async value => b.hash(value),
        ] satisfies Override<boolean | string>,
        [
          this.hot,
          `BUD_HOT`,
          `hot`,
          b => async v =>
            b.root.hooks.on(
              `dev.middleware.enabled`,
              ware =>
                ware?.filter(key => (v === false ? key !== `hot` : v)) ??
                [],
            ),
        ] satisfies Override<boolean>,
        [
          this.html,
          `BUD_HTML`,
          `html`,
          b => async v =>
            isString(v) ? b.html({template: v}) : b.html(v),
        ] satisfies Override<boolean | string>,
        [
          this.immutable,
          `BUD_IMMUTABLE`,
          `immutable`,
          b => async v => b.cdn.freeze(v),
        ] satisfies Override<boolean>,
        [
          this.lazy,
          `BUD_LAZY`,
          `lazy`,
          b => async v => b.lazy(v),
        ] satisfies Override<boolean>,
        [
          this.minimize,
          `BUD_MINIMIZE`,
          `minimize`,
          b => async v => b.minimize(v),
        ] satisfies Override<`css` | `js` | boolean>,
        [
          this.proxy,
          `BUD_PROXY_URL`,
          `proxy.url`,
          b => async v =>
            b.root.hooks.on(
              `dev.middleware.proxy.options.target`,
              new URL(v),
            ),
        ] satisfies Override<string>,
        [
          this.runtime,
          `BUD_RUNTIME`,
          `runtime`,
          b => async v => b.runtime(v),
        ] satisfies Override<`multiple` | `single` | boolean>,
        [
          this.splitChunks,
          `BUD_SPLIT_CHUNKS`,
          `splitChunks`,
          b => async v => b.splitChunks(v),
        ] satisfies Override<boolean>,
      ].map(this.override),
    ).catch(noop)

    await browserslistUpdateCheck(this.bud)

    await this.bud.run()
  }
}
