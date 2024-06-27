import type {ReactRefreshPluginOptions} from '@pmmmwh/react-refresh-webpack-plugin/types/lib/types.js'
import type {Bud} from '@roots/bud-framework'

import RefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import {
  DynamicOption,
  Extension,
  type Option,
} from '@roots/bud-framework/extension'
import {
  bind,
  development,
  label,
  options,
} from '@roots/bud-framework/extension/decorators'
import omit from '@roots/bud-support/omit'

interface Options extends ReactRefreshPluginOptions {
  compilerExtension: Extension
}

/**
 * @pmmmwh/react-refresh-webpack-plugin configuration
 */
@label(`@roots/bud-react/react-refresh`)
@options<Options>({
  compilerExtension: undefined,
  esModule: DynamicOption.make(
    ({context}) => context.manifest?.type === `module`,
  ),
  overlay: false,
})
@development
export default class BudReactRefresh extends Extension<
  Options,
  RefreshPlugin
> {
  /**
   * The extension handling react-refresh compiler transforms
   *
   * @remarks
   * By default the extension will be set automatically based on the
   * presence of `@roots/bud-swc`, `@roots/bud-typescript` or `@roots/bud-babel`
   * (listed in order of preference).
   */
  public declare compilerExtension: Option<
    BudReactRefresh,
    Options,
    `compilerExtension`
  >[`value`]

  /**
   * Get the extension handling react-refresh compiler transforms
   *
   * @remarks
   * By default the extension will be set automatically based on the
   * presence of `@roots/bud-swc`, `@roots/bud-typescript` or `@roots/bud-babel`
   * (listed in order of preference).
   */
  public declare getCompilerExtension: Option<
    BudReactRefresh,
    Options,
    `compilerExtension`
  >[`get`]

  /**
   * Explicitly set extension to handle react-refresh compiler transforms
   *
   * @remarks
   * By default the extension will be set automatically based on the
   * presence of `@roots/bud-swc`, `@roots/bud-typescript` or `@roots/bud-babel`
   * (listed in order of preference).
   */
  public declare setCompilerExtension: Option<
    BudReactRefresh,
    Options,
    `compilerExtension`
  >[`set`]

  /**
   * {@link Extension.configAfter}
   */
  @bind
  public override async configAfter(bud: Bud) {
    if (!bud.isDevelopment) return
    if (!(`hot` in bud.server.enabledMiddleware)) return

    if (!this.compilerExtension) {
      const signifier = bud.swc?.enabled
        ? `@roots/bud-react/swc-refresh`
        : bud.typescript?.enabled && bud.typescript.babel === false
          ? `@roots/bud-react/typescript-refresh`
          : bud.babel?.enabled || bud.typescript?.babel === true
            ? `@roots/bud-react/babel-refresh`
            : false

      if (signifier === false) {
        return
      }

      await bud.extensions.add(signifier)

      this.setCompilerExtension(bud.extensions.get(signifier))

      this.logger.info(
        `Registered compiler extension for BudReactRefresh`,
        this.compilerExtension.label,
      )
    }
  }

  /**
   * {@link Extension.make}
   */
  @bind
  public override async make(
    _bud: Bud,
    options: Options,
  ): Promise<RefreshPlugin> {
    return new RefreshPlugin(omit(options, [`compilerExtension`]))
  }

  /**
   * Configure {@link RefreshPlugin}
   *
   * @example
   * Add react-refresh-webpack-plugin
   *
   * ```ts
   * bud.react.refresh(true)
   * ```
   *
   * @example
   * Remove react-refresh-webpack-plugin
   *
   * ```ts
   * bud.react.refresh(false)
   * ```
   *
   * @example
   * Configure react-refresh-webpack-plugin
   *
   * ```ts
   * bud.react.refresh({
   *   overlay: true,
   * })
   * ```
   *
   * @remarks
   * Configuration takes place during the `config.after` event
   */
  @bind
  public configure(userOptions?: false | Options): this {
    if (userOptions === false || !this.app.isDevelopment) {
      this.enable(false)
      return
    }

    this.enable(true)

    this.app.hooks.action(`config.after`, async () => {
      this.setOptions(userOptions)
    })

    return this
  }
}
