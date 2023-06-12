import {Service, ServiceContainer} from '@roots/bud-framework'
import * as Framework from '@roots/bud-framework'

class Bud extends Framework.Bud {
  public override implementation = Bud
}

export default Bud
export {Service, ServiceContainer}
