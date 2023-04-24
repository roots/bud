import {resolve} from 'import-meta-resolve'

import logger from '../logger/index.js'

let path: string

let transformer: typeof import('esbuild-wasm')

export const getImplementation = async (context: string) => {
  if (transformer) return transformer

  const sources: Array<[string, string]> = [
    [`esbuild`, context],
    [`esbuild`, import.meta.url],
    [`esbuild-wasm`, context],
    [`esbuild-wasm`, import.meta.url],
  ]

  await sources.reduce(async (promised, props) => {
    await promised
    if (transformer) return
    await trySource(...props)
  }, Promise.resolve())

  if (!transformer) {
    throw new Error(`Neither esbuild nor esbuild-wasm could be found.`)
  }

  return transformer
}

async function trySource(signifier: string, context: any) {
  try {
    path = await resolve(signifier, context)
    logger.log(
      `using transformer:`,
      path,
      `resolved from context:`,
      context,
    )
    transformer = await import(path)
    return transformer
  } catch (err) {}
}
