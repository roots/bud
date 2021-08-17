import * as ncc from '@vercel/ncc'
import {
  ensureDir,
  outputFile,
  readFile,
  readJson,
  writeFile,
  writeJson,
} from 'fs-extra'
import * as path from 'path'

import options from './options'

const source = path.join(__dirname, `../index.ts`)
const output = path.join(__dirname, `../../lib/esm/index.js`)

/**
 * Compiles entire package down to a single ESM file
 */
const build = async (): Promise<void> => {
  /**
   * Read package.json contents
   */
  const prettyPackageJson = await readFile(
    path.join(__dirname, `../../package.json`),
  )

  /**
   * Restore the original package.json
   */
  const restoreJson = async () =>
    writeFile(
      path.join(__dirname, `../../package.json`),
      prettyPackageJson,
      'utf8',
    )

  /**
   * Read package.json contents
   */
  const packageJson = await readJson(
    path.join(__dirname, `../../package.json`),
  )

  try {
    /**
     * Write {type: module} into package.json so build will compile as ESM
     */
    await writeJson(path.join(__dirname, `../../package.json`), {
      ...packageJson,
      type: 'module',
    })

    /**
     * Ensure there is a lib/tmp/esm dir to work in
     */
    await ensureDir(path.join(__dirname, `../../lib/esm/`))

    /**
     * Drop a package.json indicating ESM into lib/tmp/esm.
     */
    await writeJson(
      path.join(__dirname, `../../lib/esm/package.json`),
      {type: 'module'},
    )

    /**
     * Run ncc and output to lib/tmp/esm
     */
    const {code} = await ncc(source, options)
    await outputFile(output, code, 'utf8')

    /**
     * Restore original json
     */
    await restoreJson()
  } catch (err) {
    await restoreJson()
    process.exit(1)
  }
}

build()
