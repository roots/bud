import * as ncc from '@vercel/ncc'
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
import * as path from 'path'

import {nccOptions} from './options'

/**
 * Compiles entire package down to a single ESM file
 */
const build = async (pkg: `@roots/${string}`): Promise<void> => {
  try {
    await ensureDir(
      path.join(process.cwd(), `/packages/${pkg}/lib/esm/`),
    )
  } catch (err) {}

  try {
    await emptydir(
      path.join(process.cwd(), `/packages/${pkg}/lib/esm/`),
    )
  } catch (err) {}

  try {
    await remove(
      path.join(
        process.cwd(),
        `/packages/${pkg}/lib/tsconfig-esm.tsbuildinfo`,
      ),
    )
  } catch (err) {}

  /**
   * Read package.json contents
   */
  const prettyPackageJson = await readFile(
    path.join(process.cwd(), `/packages/${pkg}/package.json`),
  )

  /**
   * Restore the original package.json
   */
  const restoreJson = async () =>
    writeFile(
      path.join(process.cwd(), `/packages/${pkg}/package.json`),
      prettyPackageJson,
      'utf8',
    )

  /**
   * Read package.json contents
   */
  const packageJson = await readJson(
    path.join(process.cwd(), `/packages/${pkg}/package.json`),
  )

  try {
    /**
     * Write {type: module} into package.json so build will compile as ESM
     */
    await writeJson(
      path.join(process.cwd(), `/packages/${pkg}/package.json`),
      {
        ...packageJson,
        type: 'module',
      },
    )

    /**
     * Package boundary indicating ESM export
     */
    await writeJson(
      path.join(
        process.cwd(),
        `/packages/${pkg}/lib/esm/package.json`,
      ),
      {type: 'module'},
    )

    /**
     * Run ncc and output to lib/tmp/esm
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
        `/packages/${pkg}/lib/esm/index.js`,
      ),
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

;(async pkg => {
  await build(pkg)
})(process.argv[2] as `@roots/${string}`)
