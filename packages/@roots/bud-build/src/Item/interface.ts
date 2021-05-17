import type {Framework} from '@roots/bud-framework'
import type {Loader} from '../Loader/interface'

namespace Item {
  export type LoaderFn = (app?: Framework) => Loader
  export type OptionsFn = (app?: Framework) => Options
  export type Options = {[key: string]: any}

  export interface Output {
    loader: Loader.Output
    options?: {[key: string]: any}
  }
}

interface Item {
  setLoader(loader: Item.LoaderFn): void

  setOptions(options: Item.OptionsFn): void

  mergeOptions(options: Item.Options, app: Framework): void

  make(app: Framework): Item.Output
}

export {Item}
