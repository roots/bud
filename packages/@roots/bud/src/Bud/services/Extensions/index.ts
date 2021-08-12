import {Extensions as Base} from '@roots/bud-extensions'
import {Extensions as Contract} from '@roots/bud-framework'

import extensions from '../../extensions'

class Extensions extends Base implements Contract {
  public repository = extensions
}

export default Extensions
