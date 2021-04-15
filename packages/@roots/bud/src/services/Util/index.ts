import {Service} from '@roots/bud-framework'
import _ from 'lodash'
import globby from 'globby'

export class Util extends Service {
  public name = 'service/util'

  public noop = _.noop

  /**
   *
   */
  public get globby(): typeof globby {
    return globby
  }
}
