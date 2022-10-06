import type {Bud} from '@roots/bud-framework'
import {isArray, isString, isUndefined} from '@roots/bud-support/lodash-es'

import {globAssets} from './entry.glob.js'
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

  if (isUndefined(input[0])) {
    throw new Error(`bud.entry requires at least one argument`)
  }

  if (input.length > 1 && !isString(input[0])) {
    throw new Error(
      `the first parameter in a multi-parameter call to bud.entry must be a string`,
    )
  }

  if ((input.length == 1 && isString(input[0])) || isArray(input[0])) {
    input = [app.label, Array.isArray(input[0]) ? input[0] : [input[0]]]
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

  app.api.logger.success(`bud.entry: entrypoint(s) added`)

  return app
}

export type {method, facade}

export {EntryObject}
