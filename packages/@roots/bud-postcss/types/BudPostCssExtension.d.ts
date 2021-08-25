import type {Module} from '@roots/bud-extensions'
import {PostCssConfig} from './Config'
interface BudPostCssExtension extends Module {
  api: {
    postcss: PostCssConfig
  }
  boot: Module.Boot
}
declare const BudPostCssExtension: BudPostCssExtension
export {BudPostCssExtension}
//# sourceMappingURL=BudPostCssExtension.d.ts.map
