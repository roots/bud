import ncc from '@vercel/ncc'
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

import {nccOptions} from './options'

/**
 * Compiles entire package down to a single ESM file
 */
export const compileEsm = async (pkg: string): Promise<void> => {
  try {
    await ensureDir(
      join(process.cwd(), `/sources/${pkg}/lib/esm/`),
    )
  } catch (err) {}

  try {
    await emptydir(
      join(process.cwd(), `/sources/${pkg}/lib/esm/`),
    )
  } catch (err) {}

  try {
    await remove(
      join(
        process.cwd(),
        `/sources/${pkg}/lib/tsconfig-esm.tsbuildinfo`,
      ),
    )
  } catch (err) {}

  /**
   * Read package.json contents
   */
  const prettyPackageJson = await readFile(
    join(process.cwd(), `/sources/${pkg}/package.json`),
  )

  /**
   * Restore the original package.json
   */
  const restoreJson = async () =>
    writeFile(
      join(process.cwd(), `/sources/${pkg}/package.json`),
      prettyPackageJson,
      'utf8',
    )

  /**
   * Read package.json contents
   */
  const packageJson = await readJson(
    join(process.cwd(), `/sources/${pkg}/package.json`),
  )

  try {
    /**
     * Writes type:module prop to package.json so build will compile as ESM
     */
    await writeJson(
      join(process.cwd(), `/sources/${pkg}/package.json`),
      {
        ...packageJson,
        type: 'module',
      },
    )

    /**
     * Package boundary indicating ESM export
     */
    await writeJson(
      join(
        process.cwd(),
        `/sources/${pkg}/lib/esm/package.json`,
      ),
      {type: 'module'},
    )

    /**
     * Run ncc and output to lib/tmp/esm
     */
    const {code} = await ncc(
      join(process.cwd(), `/sources/${pkg}/src/index.ts`),
      nccOptions,
    )

    /**
     * Write entrypoint
     */
    await outputFile(
      join(process.cwd(), `/sources/${pkg}/lib/esm/index.js`),
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
