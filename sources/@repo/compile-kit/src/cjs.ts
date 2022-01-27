import {paths} from '@repo/constants'
import {emptydir, ensureDir, outputFile, remove} from 'fs-extra'
import {join} from 'path'

import * as config from '../ncc.config'
import {ncc} from './ncc'

const packageArgument = process.argv[2]

/**
 * Compile CJS down to single zero-dependency file
 *
 * @see {@link https://github.com/vercel/ncc}
 *
 * @param pkg - packagename
 * @returns
 */
export const compileCjs = async (pkg: string): Promise<void> => {
  /**
   * Ensure target/lib/cjs is present
   */
  try {
    await ensureDir(join(paths.root, `/sources/${pkg}/lib/cjs/`))
  } catch (err) {}

  /**
   * ...and empty
   */
  try {
    await emptydir(join(paths.root, `/sources/${pkg}/lib/cjs/`))
  } catch (err) {}

  /**
   * And that ts knows we've invalidated its build
   */
  try {
    await remove(join(paths.root, `/sources/${pkg}/lib/tsconfig.tsbuildinfo`))
  } catch (err) {}

  /**
   * Compile source
   */
  let {code} = await ncc(
    join(paths.root, `/sources/${pkg}/src/index.ts`),
    config.options,
  )

  if (code?.replaceAll)
    code = code.replaceAll(/require\("node:(\w*)"\)/g, `require('$1')`)

  /**
   * Write entrypoint
   */
  await outputFile(
    join(paths.root, `/sources/${pkg}/lib/cjs/index.js`),
    code,
    'utf8',
  )

  return
}

compileCjs(packageArgument)
