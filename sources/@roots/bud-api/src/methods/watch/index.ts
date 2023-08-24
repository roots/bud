import type {Bud} from '@roots/bud-framework'
import type {WatchOptions} from '@roots/bud-support/chokidar'

import isString from '@roots/bud-support/lodash/isString'

export type Parameters =
  | [Array<string> | string, WatchOptions?]
  | [WatchOptions]

export interface watch {
  (...params: Parameters): Promise<Bud>
}

export const watch: watch = async function (this: Bud, ...params) {
  if (!this.isDevelopment) return this

  const [files, options] = makeFilesAndOptions(...params)

  this.hooks.on(`dev.watch.files`, (watchlist = new Set()) => {
    files.map(file => watchlist.add(file))
    return watchlist
  })

  this.hooks.on(`dev.watch.options`, (watchOptions = {}) => ({
    ...watchOptions,
    ...options,
  }))

  return this
}

const makeFilesAndOptions = (
  ...params: Parameters
): [Array<string>, WatchOptions] => {
  let files: Array<string> = []
  let options: WatchOptions = {}

  if (Array.isArray(params[0])) {
    files = params[0]
  }
  if (isString(params[0])) {
    files = [params[0]]
  }
  if (params[0] && !Array.isArray(params[0]) && !isString(params[0])) {
    options = params[0]
  }
  if (params[1]) {
    options = params[1]
  }

  return [files, options]
}
