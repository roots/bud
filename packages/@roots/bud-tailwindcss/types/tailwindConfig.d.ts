import type {Framework} from '@roots/bud-framework'
import {TailwindConfig} from 'tailwindcss/tailwind-config'
interface tailwindConfig {
  (this: Framework, config?: TailwindConfig): Framework
}
declare function tailwindConfig(
  this: Framework,
  config?: TailwindConfig,
): Framework
export {tailwindConfig}
//# sourceMappingURL=tailwindConfig.d.ts.map
