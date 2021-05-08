import {Framework} from '@roots/bud-framework'
import {boundMethod as bind} from 'autobind-decorator'
import {BaseComponent} from '../shared/Base'

export class Loader extends BaseComponent {
  protected src: (app: Framework) => string

  public constructor(
    src: ((app: Framework) => string) | string,
  ) {
    super()

    this.src = this.normalizeInput<string>(src)
  }

  @bind
  public make(app: Framework) {
    return this.src(app)
  }
}
