import type {Framework, Module} from '@roots/bud-framework'
import {tailwindConfig} from './tailwindConfig'
interface BudTailwindCssExtension extends Module {
  boot: (app: Framework) => void
  api: {
    tailwind: tailwindConfig
  }
}
declare const BudTailwindCssExtension: BudTailwindCssExtension
export {BudTailwindCssExtension}
//# sourceMappingURL=BudTailwindCssExtension.d.ts.map
