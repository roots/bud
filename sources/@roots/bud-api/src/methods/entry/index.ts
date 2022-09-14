import type {Bud} from '@roots/bud-framework'
import {isArray, isString} from '@roots/bud-support/lodash-es'

import {globAssets} from './globAssets.js'
import type {EntryObject} from './util'
import {
  applyToImports,
  facade,
  isGlobular,
  makeEntry,
  method,
  reduceEntry,
} from './util.js'

export const entry: method = async function (...input) {
  const app = this as Bud

  if (input.length > 1 && !isString(input[0])) {
    app.error(
      `the first parameter in a multi-parameter call to bud.entry must be a string`,
    )
    return app
  }

  if ((input.length == 1 && isString(input[0])) || isArray(input[0])) {
    input = [`default`, input[0]]
  }

  const normal = isString(input[0])
    ? makeEntry(input[0], input[1])
    : Object.entries(input[0]).reduce(reduceEntry, {})

  const records = await applyToImports(normal, async (request: string) =>
    isGlobular(request) ? await globAssets.bind(this)(request) : request,
  )

  app.hooks.on(`build.entry`, a =>
    records.reduce((a, [k, v]) => ({...a, [k]: v}), a),
  )

  return app
}

export type {method, facade}

export {EntryObject}
