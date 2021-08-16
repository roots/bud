import * as ncc from '@vercel/ncc'
import {copy, outputFile, remove} from 'fs-extra'
import * as path from 'path'

import options from './options'

const build = async (): Promise<void> => {
  const source = path.join(__dirname, `../index.ts`)
  const output = path.join(
    __dirname,
    `../../lib/tmp/cjs/index.js`,
  )

  const {code} = await ncc(source, options)

  await outputFile(
    output,
    code.replaceAll(/require\("node:(.*)"\)/g, 'require("$1")'),
  )

  await remove(path.join(__dirname, `../../lib/cjs`))

  await copy(
    path.join(__dirname, `../../lib/tmp/cjs`),
    path.join(__dirname, `../../lib/cjs`),
  )

  await remove(path.join(__dirname, `../../lib/tmp`))
}

build()
