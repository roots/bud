import {type build} from '@roots/bud-support/esbuild-wasm'
import {resolve} from 'import-meta-resolve'

import logger from '../logger/index.js'

let path: string

interface transformer {
  build: typeof build
}

let transformer: transformer

export const getImplementation = async (
  context: string,
): Promise<transformer> => {
  if (transformer) return transformer

  const sources: Array<[string, string]> = [
    [`esbuild`, context],
    [`esbuild-wasm`, context],
    [`@roots/bud-support/esbuild-wasm`, import.meta.url],
  ]

  await sources.reduce(async (promised, [signifier, context]) => {
    await promised
    if (transformer) return

    try {
      path = await resolve(signifier, context)
      transformer = await import(path)
      if (transformer) {
        logger.log(`using esbuild:`, path)
      }
    } catch (err) {}
  }, Promise.resolve())

  if (!transformer) {
    throw new Error(`Neither esbuild nor esbuild-wasm could be found.`)
  }

  return transformer
}

export {transformer}
