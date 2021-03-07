import {Framework} from '.'
import fs from 'fs-extra'
import globby from 'globby'
import path from 'path'

/**
 * ## FS
 *
 * [🏡 Project home](https://roots.io/bud)
 */
export interface FS extends Framework.Service {
  /** @see fs-extra */
  util: typeof fs

  /** Globby library. */
  glob: typeof globby

  /** cwd */
  path: typeof path
}
