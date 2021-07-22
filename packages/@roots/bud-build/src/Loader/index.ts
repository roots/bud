import type {Build, Framework} from '@roots/bud-framework'
import {boundMethod as bind} from 'autobind-decorator'

import {Base} from '../shared/Base'

export class Loader extends Base implements Build.Loader {
  protected src: Build.Loader.Src

  public constructor(src: Build.Loader.Input) {
    super()
    this.src = this.normalizeInput<string>(src)
  }

  @bind
  public make(app: Framework): string {
    return this.src(app)
  }
}
