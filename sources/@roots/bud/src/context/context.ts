/* eslint-disable no-console */
import type * as Options from '@roots/bud-framework/options'

import Args from './args.js'
import BudContext from './bud.js'
import Config from './config.js'
import Env from './env.js'
import Extensions from './extensions.js'
import Services from './services.js'

let contexts: Record<string, Options.Context> = {}

export default class Context {
  public data: Options.Context = {
    basedir: null,
    label: null,
    mode: null,
    bud: null,
    config: null,
    args: null,
    env: null,
    manifest: null,
    services: null,
    extensions: null,
    stdin: process.stdin,
    stdout: process.stdout,
    stderr: process.stderr,
    colorDepth: 256,
  }

  public async make(
    basedir: string,
    skipCache?: boolean,
  ): Promise<Options.Context> {
    if (!skipCache && contexts[basedir]) return contexts[basedir]

    this.data.basedir = basedir

    this.data.args = Args.data

    this.data.env = new Env(basedir).data

    this.data.config = await new Config(basedir)
      .find()
      .then(config => config.data)

    if (this.data.config[`package.json`])
      this.data.manifest = this.data.config[`package.json`].module

    this.data.bud = await new BudContext().find().then(({data}) => data)

    this.data.extensions = await new Extensions(this.data.manifest)
      .find()
      .then(({data}) => data)

    this.data.services = Services.data

    contexts[basedir] = this.data

    return contexts[basedir]
  }
}
