import {dirname, join, resolve} from 'node:path'
import {fileURLToPath} from 'node:url'

import type {Filesystem} from '@roots/filesystem'

export default async function writeReadme(fs: Filesystem) {
  const {data} = await import(`../state.js`)

  process.stdout.write(`Installing README.md... \n`)

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
          `README.md`,
        ),
      ),
      join(data.directory, `README.md`),
      {overwrite: true},
    )
  }
}
