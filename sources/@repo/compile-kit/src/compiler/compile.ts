import {paths} from '@repo/constants'
import fs from 'fs-extra'
import {join} from 'node:path'

import {ncc} from './ncc.js'

/**
 * Compiles package down to a single ESM file
 */
export const compile = async ([input, output]: [
  string,
  string,
]): Promise<void> => {
  const {default: config} = await import(
    '../../../../../config/ncc.config.mjs'
  )

  try {
    const {code} = await ncc(join(paths.sources, input), config)
    await fs.outputFile(join(paths.sources, output), code, 'utf8')
  } catch (err) {}
}
