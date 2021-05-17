import {Framework} from '@roots/bud-framework'

namespace Loader {
  export type Output = string
  export type Src = (app?: Framework) => Output
  export type Input = Src | Output
}

interface Loader {
  make(app: Framework): Loader.Output
}

export {Loader}
