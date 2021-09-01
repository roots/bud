import ncc from '@vercel/ncc'
import {emptydir, ensureDir, outputFile, remove} from 'fs-extra'
import path from 'path'

import {nccOptions} from './options'

const build = async (pkg: `@roots/${string}`): Promise<void> => {
  /**
   * Ensure target/lib/cjs is present
   */
  try {
    await ensureDir(
      path.join(process.cwd(), `/packages/${pkg}/lib/cjs/`),
    )
  } catch (err) {}

  /**
   * ...and empty
   */
  try {
    await emptydir(
      path.join(process.cwd(), `/packages/${pkg}/lib/cjs/`),
    )
  } catch (err) {}

  /**
   * And that ts knows we've invalidated its build
   */
  try {
    await remove(
      path.join(
        process.cwd(),
        `/packages/${pkg}/lib/tsconfig.tsbuildinfo`,
      ),
    )
  } catch (err) {}

  /**
   * Compile source
   */
  const {code} = await ncc(
    path.join(process.cwd(), `/packages/${pkg}/src/index.ts`),
    nccOptions,
  )

  /**
   * Write entrypoint
   */
  await outputFile(
    path.join(
      process.cwd(),
      `/packages/${pkg}/lib/cjs/index.js`,
    ),
    code
      // make sure no esm style paths snuck in
      .replaceAll(/require\("node:(\w*)"\)/g, `require('$1')`),
    'utf8',
  )

  return
}

;(async pkg => {
  await build(pkg)
})(process.argv[2] as `@roots/${string}`)
