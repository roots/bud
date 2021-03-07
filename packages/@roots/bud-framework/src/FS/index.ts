import Service from '../Service'
import {fs, globby, lodash as _} from '@roots/bud-support'
import path from 'path'

/**
 * Disk
 */
export default class extends Service {
  /**
   * Service ident
   */
  public name = 'fs'

  /**
   * fs util
   *
   * @see fs-extra
   */
  public get util(): typeof fs {
    return fs
  }

  /**
   * Globby library.
   */
  public get glob(): typeof globby {
    return globby
  }

  /**
   * cwd
   */
  public get path(): typeof path {
    return path
  }
}
