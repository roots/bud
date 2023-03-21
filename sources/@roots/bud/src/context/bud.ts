import {dirname, join, resolve, sep} from 'node:path'
import {fileURLToPath} from 'node:url'

import type {Context} from '@roots/bud-framework/options'

let bud: Context[`bud`] = {}

export const get = async fs => {
  const resolvedPath = dirname(fileURLToPath(import.meta.url))
  bud.manifestPath = resolve(
    join(resolvedPath, `..`, `..`, `package.json`),
  )

  const manifest = await fs.read(bud.manifestPath)
  bud.label = manifest.name.split(sep).pop()

  bud.version = manifest.version

  return bud
}

export default bud
