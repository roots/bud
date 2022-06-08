import {paths} from '@repo/constants'
import {log} from '@repo/logger'
import {writeFile} from 'fs-extra'
import {join} from 'path'

import config from '../../ncc.config'
import {ncc} from './ncc'

/**
 * Compile CJS down to single zero-dependency file
 *
 * @see {@link https://github.com/vercel/ncc}
 *
 * @param pkg - packagename
 * @returns Promise
 *
 * @public
 */
export const compileCjs = async pkg => {
  log(`compiling`, pkg)

  const compilerConfig = await config()

  const out = await ncc(join(paths.root, `sources/${pkg}/src/index.ts`), {
    ...compilerConfig.options,
  })

  try {
    await writeFile(
      join(paths.root, `sources/${pkg}/lib/esm/index.js`),
      out.code,
      'utf8',
    )
  } catch (err) {}
}
