import type {Context} from '@roots/bud-framework/options/context'

import {Command, Option} from '@roots/bud-support/clipanion'
import BudCommand from '@roots/bud/cli/commands/bud'
import cache from '@roots/bud/cli/flags/cache'
import ci from '@roots/bud/cli/flags/ci'
import clean from '@roots/bud/cli/flags/clean'
import devtool from '@roots/bud/cli/flags/devtool'
import discover from '@roots/bud/cli/flags/discover'
import editor from '@roots/bud/cli/flags/editor'
import esm from '@roots/bud/cli/flags/esm'
import force from '@roots/bud/cli/flags/force'
import hash from '@roots/bud/cli/flags/hash'
import html from '@roots/bud/cli/flags/html'
import immutable from '@roots/bud/cli/flags/immutable'
import input from '@roots/bud/cli/flags/input'
import minimize from '@roots/bud/cli/flags/minimize'
import output from '@roots/bud/cli/flags/output'
import publicPath from '@roots/bud/cli/flags/publicPath'
import runtime from '@roots/bud/cli/flags/runtime'
import splitChunks from '@roots/bud/cli/flags/splitChunks'
import storage from '@roots/bud/cli/flags/storage'
import use from '@roots/bud/cli/flags/use'

/**
 * `bud build` command
 */
export default class BudBuildCommand extends BudCommand {
  /**
   * {@link Command.paths}
   */
  public static override paths = [[`build`]]

  /**
   * {@link Command.usage}
   */
  public static override usage = Command.Usage({
    category: `build`,

    description: `Compile source assets`,

    details: `\
      \`bud build production\` compiles source assets in \`production\` mode. Run \`bud build production --help\` for usage.

      \`bud build development\` compiles source assets in \`development\` mode and serves updated modules. Run \`bud build development --help\` for usage.

      If you run this command without a configuration file \`bud\` will look for an entrypoint at \`@src/index.js\`.
    `,

    examples: [[`compile source assets`, `$0 build`]],
  })

  public cache = cache

  public ci = ci

  public clean = clean

  public devtool = devtool

  public discover = discover

  public override dry = Option.Boolean(`--dry`, false, {
    description: `run in dry mode`,
  })

  public editor = editor

  public esm = esm

  public force = force

  public hash = hash

  public html = html

  public immutable = immutable

  public input = input

  public minimize = minimize

  public output = output

  public publicPath = publicPath

  public runtime = runtime

  public override silent = Option.Boolean(`--silent`, false, {
    description: `suppress stdout output`,
  })

  public splitChunks = splitChunks

  public storage = storage

  public use = use

  /**
   * {@link Command.withContext}
   */
  public override withContext = async (context: Context) => {
    if (`withSubcommandContext` in this) {
      context = await this.withSubcommandContext(context)
    }

    return {
      ...context,
      cache: this.cache,
      ci: this.ci,
      clean: this.clean,
      debug: this.debug,
      devtool: this.devtool,
      discover: this.discover,
      editor: this.editor,
      esm: this.esm,
      force: this.force,
      hash: this.hash,
      html: this.html,
      immutable: this.immutable,
      input: this.input,
      minimize: this.minimize,
      output: this.output,
      publicPath: this.publicPath,
      runtime: this.runtime,
      silent: this.silent,
      splitChunks: this.splitChunks,
      storage: this.storage,
      target: this.filter,
      use: this.use,
    }
  }

  /**
   * {@link Command.execute}
   */
  public override async execute() {
    await this.makeBud()
    await this.bud?.run()
  }
}
