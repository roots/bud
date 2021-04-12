import {Service} from '@roots/bud-framework'
import {lodash} from '@roots/bud-support'

export class Util extends Service {
  public name = 'service/util'

  public noop = lodash.noop
}
