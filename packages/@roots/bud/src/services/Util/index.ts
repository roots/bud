import {Service} from '@roots/bud-framework'
import _ from 'lodash'
import globby from 'globby'

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
   * Globby
   */
  public get globby(): typeof globby {
    return globby
  }
}
