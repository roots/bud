import * as ncc from '@vercel/ncc'
import {outputFile} from 'fs-extra'
import * as path from 'path'

export default async (): Promise<void> => {
  const job = {
    source: path.join(__dirname, `../../lib/esm/index.js`),
    options: {
      cache: false,
      filterAssetBase: process.cwd(),
      minify: false, // default
      sourceMap: false, // default
      watch: false, // default
      v8cache: false, // default
      quiet: false, // default
      debugLog: false, // default
    },
  }

  await outputFile(
    path.join(__dirname, `../../lib/esm/package.json`),
    `{"type": "module"}`,
  )

  ncc(job.source, job.options).then(async ({code}) => {
    await outputFile(job.source, code)
  })
}
