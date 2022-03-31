import type {Framework} from '@roots/bud-framework'
import {lodash} from '@roots/bud-support'

import {globAssets} from './globAssets'
import {
  applyToImports,
  facade,
  isGlobular,
  makeEntry,
  method,
  NormalValue,
  reduceEntry,
} from './util'

const {isString} = lodash

export const entry: method = async function (...input) {
  const ctx = this as Framework

  const normalize = async (
    value: Record<string, NormalValue>,
  ): Promise<Array<[string, NormalValue]>> =>
    await applyToImports(value, async (request: string) =>
      isGlobular(request) ? await globAssets.bind(this)(request) : request,
    )

  const records = await normalize(
    isString(input[0])
      ? makeEntry(input[0], input[1])
      : Object.entries(input[0]).reduce(reduceEntry, {}),
  )

  ctx.hooks.on('build.entry', a =>
    records.reduce((a, [k, v]) => ({...a, [k]: v}), a),
  )

  return ctx
}

export type {method, facade}
