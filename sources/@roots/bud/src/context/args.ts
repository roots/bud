import type {Context} from '@roots/bud-framework/options'

import * as argv from './argv.js'

/**
 * Application args
 *
 * @public
 */
export default class Args {
  public data: Context['args'] = {
    basedir: argv.basedir,
    browser: undefined,
    cache: undefined,
    ci: undefined,
    clean: undefined,
    contextCache: !argv.noContextCache,
    clearContextCache: argv.clearContextCache,
    debug: undefined,
    devtool: undefined,
    dry: undefined,
    output: undefined,
    editor: undefined,
    esm: undefined,
    flush: undefined,
    hash: undefined,
    html: undefined,
    immutable: undefined,
    indicator: undefined,
    input: undefined,
    level: undefined,
    log: undefined,
    manifest: undefined,
    minimize: undefined,
    mode: undefined,
    notify: true,
    overlay: undefined,
    publicPath: undefined,
    reload: undefined,
    splitChunks: undefined,
    target: undefined,
  }

  public constructor(basedir: string) {
    this.data.basedir = basedir
  }
}
