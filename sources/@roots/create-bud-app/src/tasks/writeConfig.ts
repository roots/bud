import {dirname, join, resolve} from 'node:path'
import {fileURLToPath} from 'node:url'

import type {Filesystem} from '@roots/filesystem'

export default async function writeConfig(fs: Filesystem) {
  const {data} = await import(`../state.js`)

  process.stdout.write(`Writing bud.config.ts... \n`)

  if (data.config) {
    await fs.copy(
      resolve(
        process.cwd(),
        join(
          dirname(fileURLToPath(import.meta.url)),
          `..`,
          `..`,
          `templates`,
          `default`,
          `bud.config.ts`,
        ),
      ),
      join(process.cwd(), data.name, `bud.config.ts`),
    )
  }
}
