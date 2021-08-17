import * as ncc from '@vercel/ncc'
import {ensureDir, outputFile} from 'fs-extra'
import * as path from 'path'

import options from './options'

const build = async (): Promise<void> => {
  const source = path.join(__dirname, `../index.ts`)
  const output = path.join(__dirname, `../../lib/cjs/index.js`)

  /**
   * Ensure there is a lib/tmp/esm dir to work in
   */
  await ensureDir(path.join(__dirname, `../../lib/cjs/`))

  /**
   * Compile with ncc and output to lib/cjs
   */
  const {code} = await ncc(source, options)
  await outputFile(
    output,
    code.replaceAll(/require\("node:(.*)"\)/g, 'require("$1")'),
    'utf8',
  )
}

build()
