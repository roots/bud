import type {Build, Framework} from '@roots/bud-framework'
import {Base} from '../shared/Base'
export declare class Item extends Base implements Build.Item {
  protected loader: Build.Item.LoaderFn
  protected options: Build.Item.OptionsFn
  constructor({loader, options}: Build.Item.ConstructorOptions)
  getLoader(app: Framework): Build.Loader
  setLoader(loader: Build.Loader | Build.Item.LoaderFn): void
  setOptions(
    options: Build.Item.OptionsFn | Build.Item.Options,
  ): void
  mergeOptions(options: Build.Item.Options, app: Framework): void
  make(app: Framework): Build.Item.Output
}
//# sourceMappingURL=index.d.ts.map
