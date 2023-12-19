import type {Bud} from '@roots/bud-framework'
import type BudWordPressDependencies from '@roots/bud-wordpress-dependencies'
import type BudWordPressExternals from '@roots/bud-wordpress-externals'
import type WordPressThemeJSON from '@roots/bud-wordpress-theme-json'

import {
  Extension,
  type Option,
  type PublicExtensionApi,
} from '@roots/bud-framework/extension'
import {
  bind,
  dependsOn,
  expose,
  label,
  options,
} from '@roots/bud-framework/extension/decorators'
import chalk from '@roots/bud-support/chalk'
import figures from '@roots/bud-support/figures'

/**
 * WordPress preset options
 */
interface Options {
  exclude: Array<string>
  hmr: boolean
  notify: boolean
}

/**
 * WordPress Preset API
 */
interface PublicExtension extends PublicExtensionApi<BudPresetWordPress> {
  /**
   * {@link BudWordPressDependencies}
   */
  dependencies: BudWordPressDependencies
  /**
   * Exclude dependencies from externals and the `entrypoints.json` manifest
   *
   * @default []
   */
  exclude: Option<PublicExtension, Options, `exclude`>[`value`]
  /**
   * {@link BudWordPressExternals}
   */
  externals: BudWordPressExternals

  /**
   * Get excluded dependencies
   *
   * @returns Array<string>
   */
  getExclude: Option<PublicExtension, Options, `exclude`>[`get`]
  /**
   * Get `@roots/wordpress-hmr` functionality
   *
   * @returns boolean
   */
  getHmr: Option<PublicExtension, Options, `hmr`>[`get`]
  /**
   * Get WordPress editor toast notifications
   *
   * @returns boolean
   */
  getNotify: Option<PublicExtension, Options, `notify`>[`get`]

  /**
   * Enable `@roots/wordpress-hmr` functionality
   *
   * @default true
   */
  hmr: Option<PublicExtension, Options, `hmr`>[`value`]
  /**
   * {@link WordPressThemeJSON}
   */
  json: WordPressThemeJSON
  /**
   * WordPress editor toast notifications
   *
   * @default true
   */
  notify: Option<PublicExtension, Options, `notify`>[`value`]

  /**
   * Set excluded dependencies
   *
   * @param value Array<string>
   * @returns this
   *
   * @example
   * ```js
   * bud.wp.setExclude(['react'])
   * ```
   *
   * @example
   * ```js
   * bud.wp.setExclude(exclude => [...exclude, 'react'])
   * ```
   */
  setExclude: Option<PublicExtension, Options, `exclude`>[`set`]
  /**
   * Set `@roots/wordpress-hmr` functionality
   *
   * @param value boolean
   * @returns this
   *
   * @example
   * ```js
   * bud.wp.setHmr(false)
   * ```
   *
   * @example
   * ```js
   * bud.wp.setHmr(hmr => false)
   * ```
   */
  setHmr: Option<PublicExtension, Options, `hmr`>[`set`]
  /**
   * Set WordPress editor toast notifications
   *
   * @param value boolean
   * @returns this
   *
   * @example
   * ```js
   * bud.wp.setNotify(false)
   * ```
   *
   * @example
   * ```js
   * bud.wp.setNotify(notify => false)
   * ```
   */
  setNotify: Option<PublicExtension, Options, `notify`>[`set`]
}

/**
 * WordPress preset
 */
@label(`@roots/bud-preset-wordpress`)
@dependsOn([
  `@roots/bud-preset-recommend`,
  `@roots/bud-wordpress-externals`,
  `@roots/bud-wordpress-dependencies`,
  `@roots/bud-wordpress-theme-json`,
  `@roots/bud-react`,
])
@options<Options>({
  exclude: [],
  hmr: true,
  notify: true,
})
@expose(`wp`)
export default class BudPresetWordPress
  extends Extension<Options>
  implements PublicExtension
{
  public declare exclude: PublicExtension[`exclude`]
  public declare getExclude: PublicExtension[`getExclude`]
  public declare setExclude: PublicExtension[`setExclude`]

  public declare hmr: PublicExtension[`hmr`]
  public declare getHmr: PublicExtension[`getHmr`]
  public declare setHmr: PublicExtension[`setHmr`]

  public declare notify: PublicExtension[`notify`]
  public declare getNotify: PublicExtension[`getNotify`]
  public declare setNotify: PublicExtension[`setNotify`]

  public get dependencies(): BudWordPressDependencies {
    return this.app.extensions.get(`@roots/bud-wordpress-dependencies`)
  }
  public get externals(): BudWordPressExternals {
    return this.app.extensions.get(`@roots/bud-wordpress-externals`)
  }
  public get json(): WordPressThemeJSON {
    return this.app.extensions.get(`@roots/bud-wordpress-theme-json`)
  }

  /**
   * {@link Extension.boot}
   */
  @bind
  public override async boot(bud: Bud) {
    await this.compilerCheck(bud)

    if (bud.extensions.has(`@roots/bud-tailwindcss`))
      await bud.extensions.add(`@roots/bud-tailwindcss-theme-json`)

    /**
     * WordPress will just straight up silently fail
     * if this environment variable is not set and we
     * try to include react-refresh (!)
     */
    !bud.env.isTrue(`SCRIPT_DEBUG`) &&
      this.setExclude((exclude = []) => [
        ...exclude,
        `react-refresh/runtime`,
      ])
  }

  /**
   * {@link Extension.buildBefore}
   */
  @bind
  public override async buildBefore(bud: Bud) {
    this.handleExclusions(bud)
    await this.handleHmr(bud)
  }

  @bind
  private handleExclusions({extensions}: Bud) {
    /**
     * If `react` is not included in {@link Options.exclude}
     * then remove it from the ProvidePlugin.
     */
    const provided = extensions.get(
      `@roots/bud-extensions/webpack-provide-plugin`,
    )
    if (!this.exclude.includes(`react`) && provided.get(`React`)) {
      provided.set(`React`, undefined)
    }

    /**
     * Exclude anything specified in {@link Options.exclude}
     */
    if (this.exclude.length) {
      ;[this.dependencies.setExclude, this.externals.setExclude].forEach(
        fn => fn((exclude = []) => [...exclude, ...this.exclude]),
      )
    }
  }

  @bind
  private async handleHmr({build, hooks}: Bud) {
    /** Bail if hmr option is false */
    if (!this.hmr) return

    /** Source loader */
    const loader = await this.resolve(
      `@roots/wordpress-hmr/loader`,
      import.meta.url,
    )

    /** Bail if unresolvable */
    if (!loader) return this.catch(`HMR loader not found`)

    /** Set loader alias */
    hooks.on(`build.resolveLoader.alias`, (aliases = {}) => ({
      ...aliases,
      [`@roots/wordpress-hmr/loader`]: loader,
    }))

    build
      .setLoader(
        `@roots/wordpress-hmr/loader`,
        await this.resolve(`@roots/wordpress-hmr/loader`, import.meta.url),
      )
      .setItem(`@roots/wordpress-hmr/loader`, {
        loader: `@roots/wordpress-hmr/loader`,
        options: {
          notify: this.get(`notify`),
        },
      })

    build.rules.js?.setUse((items = []) => [
      ...items,
      `@roots/wordpress-hmr/loader`,
    ])

    build.rules.ts?.setUse((items = []) => [
      ...items,
      `@roots/wordpress-hmr/loader`,
    ])
  }

  /**
   * Compiler check
   *
   * @todo remove in bud 7.0.0
   */
  @bind
  private async compilerCheck({context}: Bud) {
    const explicitDependencies = Object.keys({
      ...(context.manifest?.dependencies ?? {}),
      ...(context.manifest?.devDependencies ?? {}),
    })

    const supportedCompilers = [
      `@roots/bud-babel`,
      `@roots/bud-preset-recommend`,
      `@roots/bud-swc`,
      `@roots/bud-typescript`,
      `@roots/sage`,
    ]

    const hasInstalledCompiler = supportedCompilers.some(compiler =>
      explicitDependencies.includes(compiler),
    )

    if (!hasInstalledCompiler) {
      this.logger.warn(
        `\n\n`,
        chalk.yellow(`Action needed: no compiler installed`),
        `\n\n`,

        `Currently, ${chalk.blue(
          `@roots/bud-preset-wordpress`,
        )} includes ${chalk.blue(
          `@roots/bud-preset-recommend`,
        )} to provide compiler support.`,
        `\n\n`,

        `In bud > 7.0.0, ${chalk.blue(
          `@roots/bud-preset-wordpress`,
        )} will no longer include this preset.`,
        `\n\n`,

        `This is so users have a straightforward way to select their own compiler.`,
        `\n\n`,

        `At that time you will be required to explicitly install a compiler.`,
        chalk.bold(chalk.underline(`This warning will become an error.`)),
        `\n\n`,

        `For most projects we recommend installing`,
        chalk.blue(`@roots/bud-preset-recommend`),
        `which bundles swc and postcss support.`,
        `\n\n`,

        `Alternatively, you can install a compiler directly. Recommended options:`,
        `\n\n`,

        chalk.blue(figures.triangleRightSmall),
        `${chalk.blue(`@roots/bud-swc`)}: supports ES6 and TypeScript`,
        `\n`,
        chalk.blue(figures.triangleRightSmall),
        `${chalk.blue(
          `@roots/bud-typescript`,
        )}: supports ES6 and TypeScript`,
        `\n`,
        chalk.blue(figures.triangleRightSmall),
        `${chalk.blue(`@roots/bud-babel`)}: supports ES6`,
        `\n\n`,

        `${figures.warning} If you are using postcss features and choose to install a compiler directly (as opposed to using the preset)`,
        `\n`,
        `you will also want to add ${chalk.blue(`@roots/bud-postcss`)}`,
      )
    }
  }
}

export type {PublicExtension}
