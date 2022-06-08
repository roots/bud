import {paths} from '@repo/constants'
import fs from 'fs-extra'
import {join} from 'node:path'

import config from '../../ncc.config.js'
import {ncc} from './ncc.js'

/**
 * Compiles package down to a single ESM file
 */
export const compileEsm = async pkg => {
  const compilerConfig = await config()

  /**
   * Read package.json contents
   */
  const prettyPackageJson = await fs.readFile(
    join(paths.sources, `${pkg}/package.json`),
  )

  /**
   * Restore the original package.json
   */
  const restoreJson = async () =>
    await fs.writeFile(
      join(paths.sources, `${pkg}/package.json`),
      prettyPackageJson,
      'utf8',
    )

  /**
   * Read package.json contents
   */
  const packageJson = await fs.readJson(
    join(paths.sources, `${pkg}/package.json`),
  )

  try {
    /**
     * Writes type:module prop to package.json so build will compile as ESM
     */
    await fs.writeJson(join(paths.sources, `${pkg}/package.json`), {
      ...packageJson,
      type: 'module',
    })

    /**
     * Package boundary indicating ESM export
     */
    await fs.writeJson(
      join(paths.sources, `${pkg}/lib/esm/package.json`),
      {
        type: 'module',
      },
    )

    /**
     * Run ncc and output to lib/tmp/esm
     */
    const {code} = await ncc(
      join(paths.sources, `${pkg}/src/index.ts`),
      compilerConfig.options,
    )

    /**
     * Write entrypoint
     */
    await fs.outputFile(
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
