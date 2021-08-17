import * as ncc from '@vercel/ncc'
import {
  copy,
  outputFile,
  readJson,
  remove,
  writeJson,
} from 'fs-extra'
import * as path from 'path'

import options from './options'

const build = async (): Promise<void> => {
  /**
   * Compiling src/index.ts entrypoint
   */
  const source = path.join(__dirname, `../index.ts`)

  /**
   * ncc will output to lib/tmp
   */
  const output = path.join(
    __dirname,
    `../../lib/tmp/esm/index.js`,
  )

  /**
   * Read package.json contents
   */
  const packageJson = await readJson(
    path.join(__dirname, `../../package.json`),
  )

  /**
   * Write {type: module} into package.json so build will compile as ESM
   */
  await writeJson(path.join(__dirname, `../../package.json`), {
    ...packageJson,
    type: 'module',
  })

  /**
   * Drop a package.json indicating ESM into lib/tmp/esm.
   */
  await outputFile(
    path.join(__dirname, `../../lib/tmp/esm/package.json`),
    `{"type": "module"}`,
  )

  /**
   * Run ncc
   */
  const {code} = await ncc(source, options)

  /**
   * ncc output => lib/esm/tmp
   */
  await outputFile(output, code)

  /**
   * Restore the original package.json
   */
  await writeJson(path.join(__dirname, `../../package.json`), {
    ...packageJson,
  })

  /**
   * Clean lib/esm
   */
  await remove(path.join(__dirname, `../../lib/esm`))

  /**
   * Copy lib/tmp/esm to lib/esm
   */
  await copy(
    path.join(__dirname, `../../lib/tmp/esm`),
    path.join(__dirname, `../../lib/esm`),
  )

  /**
   * Remove lib/tmp
   */
  await remove(path.join(__dirname, `../../lib/tmp`))
}

build()
