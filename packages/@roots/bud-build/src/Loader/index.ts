import {boundMethod as bind} from 'autobind-decorator'
import {Base} from '../shared/Base'

import type {
  Framework,
  Loader as Contract,
} from '@roots/bud-framework'

export class Loader extends Base implements Contract {
  protected src: Contract.Src

  public constructor(src: Contract.Input) {
    super()
    this.src = this.normalizeInput<string>(src)
  }

  @bind
  public make(app: Framework): string {
    return this.src(app)
  }
}
