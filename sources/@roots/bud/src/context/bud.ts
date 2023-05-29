import {dirname, join, resolve, sep} from 'node:path'
import {fileURLToPath} from 'node:url'

import type {Context} from '@roots/bud-framework/options'

export const get = async (fs: any): Promise<Context[`bud`]> => {
  const resolvedPath = dirname(fileURLToPath(import.meta.url))

  const manifestPath = resolve(
    join(resolvedPath, `..`, `..`, `package.json`),
  )

  const manifest = await fs.read(manifestPath)
  const label = manifest.name.split(sep).pop()
  const version = manifest.version

  return {
    label,
    version,
    manifestPath,
  }
}
