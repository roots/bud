import {Service} from '@roots/bud-framework'
import {noop} from 'lodash'

export class Util extends Service {
  public name = 'service/util'

  public noop = noop
}
