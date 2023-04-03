import RefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import type {ReactRefreshPluginOptions as Options} from '@pmmmwh/react-refresh-webpack-plugin/types/lib/types.js'
import type {Bud} from '@roots/bud-framework'
import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  development,
  label,
  options,
  plugin,
} from '@roots/bud-framework/extension/decorators'
import {ExtensionError} from '@roots/bud-support/errors'
import isBoolean from '@roots/bud-support/lodash/isBoolean'
import isUndefined from '@roots/bud-support/lodash/isUndefined'

/**
 * @pmmmwh/react-refresh-webpack-plugin configuration
 */
@label(`@roots/bud-react/react-refresh`)
@plugin(RefreshPlugin)
@options<Options>({
  overlay: false,
  esModule: (app: Bud) =>
    app.context.files[`package.json`]?.module?.type === `module`,
})
@development
export default class BudReactRefresh extends Extension<
  Options,
  RefreshPlugin
> {
  /**
   * Extension to handle transformer
   */
  public transformExtension?: Extension

  /**
   * Explicitly set extension to handle react-refresh code transforms
   *
   * @remarks
   * By default the extension will be set automatically based on the
   * presence of `@roots/bud-swc`, `@roots/bud-typescript` or `@roots/bud-babel`
   * (listed in order of preference).
   */
  public setTransformExtension(extension: Extension) {
    this.transformExtension = extension
  }

  /**
   * {@link Extension.configAfter}
   */
  @bind
  public override async configAfter(bud: Bud) {
    if (bud.isCLI() && bud.context.args.hot === false) return

    if (!this.transformExtension) {
      const signifier = bud.react.useBabel
        ? `@roots/bud-react/babel-refresh`
        : bud.react.useSWC
        ? `@roots/bud-react/swc-refresh`
        : bud.react.useTypeScript
        ? `@roots/bud-react/typescript-refresh`
        : null

      if (signifier === null) {
        throw new ExtensionError(
          `@roots/bud-react/react-refresh: no transformer found`,
          {
            props: {
              details: `Install @roots/bud-swc, @roots/bud-typescript or @roots/bud-babel`,
            },
          },
        )
      }

      await bud.extensions.add(signifier)

      this.setTransformExtension(bud.extensions.get(signifier))

      this.logger.info(
        `Registered transformer`,
        this.transformExtension.label,
      )
    }

    /*

    if (
      this.transformExtension?.label !== `@roots/bud-react/babel-refresh`
    )
      return

    this.logger.log(`Injecting react-refresh/runtime`)

    const reactRefreshRuntime = await this.resolve(
      `react-refresh/runtime`,
      import.meta.url,
    )

    this.app.compilePaths([
      this.app.path(`@src`),
      dirname(reactRefreshRuntime),
    ])

    if (!bud.hasChildren)
      bud.hooks.on(`dev.client.scripts`, (scripts = new Set([])) =>
        scripts.add(() => reactRefreshRuntime),
      )
    else
      Object.values(bud.children).forEach(instance =>
        instance.hooks.on(`dev.client.scripts`, (scripts = new Set([])) =>
          scripts.add(() => reactRefreshRuntime),
        ),
      ) */
  }

  /**
   * Configure react-refresh-webpack-plugin
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
  public configure(userOptions?: Options | false): this {
    this.app.hooks.action(
      `config.after`,
      this.makeReactRefreshCallback(userOptions),
    )

    return this
  }

  /**
   * Callback handling react-refresh-webpack-plugin configuration
   */
  @bind
  protected makeReactRefreshCallback(
    userOptions?: Options | false,
  ): (bud: Bud) => Promise<unknown> {
    return async () => {
      if (!this.app.isDevelopment) return

      userOptions === false ? this.enable(false) : this.enable()

      if (isUndefined(userOptions) || isBoolean(userOptions)) return

      this.setOptions(userOptions)

      return this
    }
  }
}
