import {Framework} from '@roots/bud-framework'
import {boundMethod as bind} from 'autobind-decorator'
import {Base} from '../shared/Base'

export {Loader}

namespace Loader {
  export type Output = string
  export type Input = Src | Output
  export type Src = (app: Framework) => Output
}

class Loader extends Base {
  protected src: Loader.Src

  public constructor(src: Loader.Input) {
    super()
    this.src = this.normalizeInput<Loader.Output>(src)
  }

  @bind
  public make(app: Framework): Loader.Output {
    return this.src(app)
  }
}
