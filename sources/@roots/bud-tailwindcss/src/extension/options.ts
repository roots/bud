import {
  Extension,
  type StrictPublicExtensionApi,
} from '@roots/bud-framework/extension'
import {options} from '@roots/bud-framework/extension/decorators'
import resolveConfig from 'tailwindcss/resolveConfig.js'
import type {Config, ThemeConfig} from 'tailwindcss/types/config.js'

type Options = {
  resolvedConfig?: ReturnType<typeof resolveConfig>
  config: Config
  configPath: string
}

type BudTailwindOptionsPublicInterface = StrictPublicExtensionApi<
  BudTailwindOptionsApi,
  Options
> & {
  generateImports(
    imports: Array<`${keyof ThemeConfig & string}`> | boolean,
  ): void
}

/**
 * TailwindCSS configuration
 */
@options<Options>({
  resolvedConfig: undefined,
  config: undefined,
  configPath: undefined,
})
class BudTailwindOptionsApi extends Extension<Options> {
  /**
   * Tailwind config path
   */
  public declare configPath: BudTailwindOptionsPublicInterface[`configPath`]
  public declare getConfigPath: BudTailwindOptionsPublicInterface[`getConfigPath`]
  public declare setConfigPath: BudTailwindOptionsPublicInterface[`setConfigPath`]

  /**
   * Tailwind config
   */
  public declare config: BudTailwindOptionsPublicInterface[`config`]
  public declare getConfig: BudTailwindOptionsPublicInterface[`getConfig`]
  public declare setConfig: BudTailwindOptionsPublicInterface[`setConfig`]

  /**
   * Tailwind config (resolved)
   */
  public declare resolvedConfig: BudTailwindOptionsPublicInterface[`resolvedConfig`]
  public declare getResolvedConfig: BudTailwindOptionsPublicInterface[`getResolvedConfig`]
  public declare setResolvedConfig: BudTailwindOptionsPublicInterface[`setResolvedConfig`]
}

export {
  BudTailwindOptionsApi,
  type BudTailwindOptionsPublicInterface,
  type Options,
}
