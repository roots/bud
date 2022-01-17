import ncc from '@vercel/ncc'
import {emptydir, ensureDir, outputFile, remove} from 'fs-extra'
import {join} from 'path'

import {nccOptions} from './options'

export const compileCjs = async (pkg: string): Promise<void> => {
  /**
   * Ensure target/lib/cjs is present
   */
  try {
    await ensureDir(
      join(process.cwd(), `/sources/${pkg}/lib/cjs/`),
    )
  } catch (err) {}

  /**
   * ...and empty
   */
  try {
    await emptydir(
      join(process.cwd(), `/sources/${pkg}/lib/cjs/`),
    )
  } catch (err) {}

  /**
   * And that ts knows we've invalidated its build
   */
  try {
    await remove(
      join(
        process.cwd(),
        `/sources/${pkg}/lib/tsconfig.tsbuildinfo`,
      ),
    )
  } catch (err) {}

  /**
   * Compile source
   */
  let {code} = await ncc(
    join(process.cwd(), `/sources/${pkg}/src/index.ts`),
    nccOptions,
  )

  if (code?.replaceAll)
    code = code.replaceAll(
      /require\("node:(\w*)"\)/g,
      `require('$1')`,
    )

  /**
   * Write entrypoint
   */
  await outputFile(
    join(process.cwd(), `/sources/${pkg}/lib/cjs/index.js`),
    code,
    'utf8',
  )

  return
}

compileCjs(process.argv[2])
