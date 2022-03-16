import {paths} from '@repo/constants'
import {
  emptydir,
  ensureDir,
  outputFile,
  readFile,
  readJson,
  remove,
  writeFile,
  writeJson,
} from 'fs-extra'
import {join} from 'path'

import * as config from '../../ncc.config'
import {ncc} from './ncc'

/**
 * Compiles package down to a single ESM file
 */
export const compileEsm = async pkg => {
  /**
   * Read package.json contents
   */
  const prettyPackageJson = await readFile(
    join(paths.sources, `${pkg}/package.json`),
  )

  /**
   * Restore the original package.json
   */
  const restoreJson = async () =>
    writeFile(
      join(paths.sources, `${pkg}/package.json`),
      prettyPackageJson,
      'utf8',
    )

  /**
   * Read package.json contents
   */
  const packageJson = await readJson(
    join(paths.sources, `${pkg}/package.json`),
  )

  try {
    /**
     * Writes type:module prop to package.json so build will compile as ESM
     */
    await writeJson(join(paths.sources, `${pkg}/package.json`), {
      ...packageJson,
      type: 'module',
    })

    /**
     * Package boundary indicating ESM export
     */
    await writeJson(join(paths.sources, `${pkg}/lib/esm/package.json`), {
      type: 'module',
    })

    /**
     * Run ncc and output to lib/tmp/esm
     */
    const {code} = await ncc(
      join(paths.sources, `${pkg}/src/index.ts`),
      config.options,
    )

    /**
     * Write entrypoint
     */
    await outputFile(
      join(paths.sources, `${pkg}/lib/esm/index.js`),
      code,
      'utf8',
    )

    /**
     * Restore original json
     */
    await restoreJson()
  } catch (err) {
    await restoreJson()
    process.exit(1)
  }
}
