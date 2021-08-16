import * as ncc from '@vercel/ncc'
import {outputFile} from 'fs-extra'
import * as path from 'path'

export default async (): Promise<void> => {
  const job = {
    entry: {
      cjs: path.join(__dirname, `../../lib/cjs/index.js`),
      esm: path.join(__dirname, `../../lib/esm/index.js`),
      dts: path.join(__dirname, `../../lib/types/index.d.ts`),
    },
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

  ncc(path.join(__dirname, `../index.ts`), job.options).then(
    async ({assets, code}) => {
      await outputFile(
        path.join(__dirname, `../../lib/cjs/index.js`),
        code.replaceAll(
          /require\("node:(.*)"\)/g,
          'require("$1")',
        ),
      )
    },
  )

  ncc(job.entry.esm, job.options).then(
    async ({assets, code}) => {
      await outputFile(
        path.join(__dirname, `../../lib/esm/index.js`),
        code,
      )
    },
  )
}
