import {Container} from '@roots/container'

import {Framework} from './Framework'

export interface Env extends Container {
  getPublicEnv(): Framework.Index<any>
}
