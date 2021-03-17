import {Service} from '@roots/bud-framework'
import {Build as Base} from '@roots/bud-build'
import * as builders from '../builders'

export class Build extends Base implements Service {
  public name = 'service/build'

  public builders = builders
}
