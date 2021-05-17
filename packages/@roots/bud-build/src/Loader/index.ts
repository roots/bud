import type {Framework} from '@roots/bud-framework'
import {Loader as Contract} from './interface'
import {boundMethod as bind} from 'autobind-decorator'
import {Base} from '../shared/Base'

export class Loader extends Base {
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
