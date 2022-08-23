import type Context from './context'

/**
 * Application args
 *
 * @public
 */
export default class Args {
  public data: Context['data']['args'] = {
    browser: undefined,
    cache: undefined,
    ci: undefined,
    clean: undefined,
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
    notify: undefined,
    overlay: undefined,
    publicPath: undefined,
    reload: undefined,
    splitChunks: undefined,
    target: undefined,
  }
}
