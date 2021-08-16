import * as ncc from '@vercel/ncc'
import {outputFile} from 'fs-extra'
import * as path from 'path'

export default async (): Promise<void> => {
  const job = {
    source: path.join(__dirname, `../index.ts`),
    output: path.join(__dirname, `../../lib/cjs/index.js`),
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

  ncc(job.source, job.options).then(async ({code}) => {
    await outputFile(
      job.output,
      code.replaceAll(
        /require\("node:(.*)"\)/g,
        'require("$1")',
      ),
    )
  })
}
