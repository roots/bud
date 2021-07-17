import {Base} from '../shared/Base'

import {boundMethod as bind} from 'autobind-decorator'

import type {Framework, Build} from '@roots/bud-framework'

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
