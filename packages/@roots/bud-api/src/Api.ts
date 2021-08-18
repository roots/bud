import {Service} from '@roots/bud-framework'

import {Repository} from './repository'

interface Api extends Service<Repository> {
  repository: Repository
  bootstrap(): void
}

class Api extends Service<Repository> {
  public name = 'api'

  public repository = Repository

  public bootstrap() {
    this.bindMacro<Repository>(this.all())
  }
}

export {Api}
