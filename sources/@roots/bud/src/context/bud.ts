import {dirname, join, resolve, sep} from 'node:path'
import {fileURLToPath} from 'node:url'

import type {Context} from '@roots/bud-framework/options'

let bud: Partial<Context[`bud`]> = {}

export const get = async (fs: any): Promise<Context[`bud`]> => {
  const resolvedPath = dirname(fileURLToPath(import.meta.url))

  bud.manifestPath = resolve(
    join(resolvedPath, `..`, `..`, `package.json`),
  )

  const manifest = await fs.read(bud.manifestPath)
  bud.label = manifest.name.split(sep).pop()
  bud.version = manifest.version

  if (!isBudInterface(bud)) {
    throw new Error(`Context['bud'] interface not correctly implemented.`)
  }

  return bud
}

const isBudInterface = (
  value: Partial<Context[`bud`]> | Context[`bud`],
): value is Context[`bud`] => {
  return `label` in value && `version` in value && `manifestPath` in value
}

export default bud
