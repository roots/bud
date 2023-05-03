import {dirname, join, resolve} from 'node:path'
import {fileURLToPath} from 'node:url'

import type {Filesystem} from '@roots/filesystem'

export default async function writeSrc(fs: Filesystem) {
  const {data} = await import(`../state.js`)

  process.stdout.write(`Writing boilerplate source... \n`)

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
          `src`,
        ),
      ),
      join(data.directory, `src`),
      {overwrite: true},
    )
  }
}
