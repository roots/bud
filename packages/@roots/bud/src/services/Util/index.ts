import {Service} from '@roots/bud-framework'
import _ from 'lodash'
import globby from 'globby'
import path from 'path'

export class Util extends Service {
  /**
   * Service
   */
  public name = 'service/util'

  /**
   * Noop
   */
  public noop = _.noop

  /**
   * Lodash
   */
  public get _(): typeof _ {
    return _
  }

  /**
   * Path
   */
  public get path(): typeof path {
    return path
  }

  /**
   * Globby
   */
  public get globby(): typeof globby {
    return globby
  }
}
