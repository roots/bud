import type {Bud} from '@roots/bud-framework'
import type BudWordPressDependencies from '@roots/bud-wordpress-dependencies'
import type BudWordPressExternals from '@roots/bud-wordpress-externals'
import type WordPressThemeJson from '@roots/bud-wordpress-theme-json'

import {join} from 'node:path'

import {
  DynamicOption,
  Extension,
  type OptionGetter,
  type OptionSetter,
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
  scriptDebug: boolean
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
  scriptDebug: DynamicOption.make(({env}) => env.isTrue(`SCRIPT_DEBUG`)),
})
@expose(`wp`)
export default class BudPresetWordPress extends Extension<Options> {
  public declare scriptDebug: Options[`scriptDebug`]
  public declare getScriptDebug: OptionGetter<Options, `scriptDebug`>
  public declare setScriptDebug: OptionSetter<
    BudPresetWordPress,
    Options,
    `scriptDebug`
  >

  /**
   * Exclude dependencies from externals and the `entrypoints.json` manifest
   *
   * @default []
   */
  public declare readonly exclude: Options[`exclude`]
  /**
   * Get excluded dependencies
   *
   * @returns Array<string>
   */
  public declare getExclude: OptionGetter<Options, `exclude`>
  /**
   * Set excluded dependencies
   */
  public declare setExclude: OptionSetter<
    BudPresetWordPress,
    Options,
    `exclude`
  >

  /**
   * Enable `@roots/wordpress-hmr` functionality
   *
   * @default true
   */
  public declare readonly hmr: Options[`hmr`]
  /**
   * Get `@roots/wordpress-hmr` functionality
   *
   * @returns boolean
   */
  public declare getHmr: OptionGetter<Options, `hmr`>
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
  public declare setHmr: OptionSetter<BudPresetWordPress, Options, `hmr`>

  /**
   * WordPress editor toast notifications value
   *
   * @returns boolean
   */
  public declare notify: Options[`notify`]
  /**
   * Get WordPress editor toast notifications
   *
   * @returns boolean
   */
  public declare getNotify: OptionGetter<Options, `notify`>
  /**
   * Toggle WordPress editor toast notifications
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
  public declare setNotify: OptionSetter<
    BudPresetWordPress,
    Options,
    `notify`
  >

  /**
   * {@link BudWordPressDependencies}
   */
  public get dependencies(): BudWordPressDependencies {
    return this.app.extensions.get(`@roots/bud-wordpress-dependencies`)
  }
  /**
   * {@link BudWordPressExternals}
   */
  public get externals(): BudWordPressExternals {
    return this.app.extensions.get(`@roots/bud-wordpress-externals`)
  }
  /**
   * {@link WordPressThemeJson}
   */
  public get json(): WordPressThemeJson {
    return this.app.extensions.get(
      `@roots/bud-wordpress-theme-json`,
    ) as unknown as WordPressThemeJson
  }

  /**
   * {@link Extension.boot}
   */
  @bind
  public override async boot(bud: Bud) {
    await this.compilerCheck(bud)

    if (bud.extensions.has(`@roots/bud-tailwindcss`))
      await bud.extensions.add(
        await this.resolve(
          `@roots/bud-tailwindcss-theme-json`,
          import.meta.url,
        ),
      )
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
     * If `SCRIPT_DEBUG` env value is not set, exclude `react-refresh/runtime` from externals
     * and inclusion in entrypoints.json dependencies array(s).
     *
     * Unless user has manually overridden this. Common example: if they have set SCRIPT_DEBUG
     * directly in their WordPress config file (which bud.js does not have access to it).
     */
    !this.getScriptDebug() &&
      this.setExclude((exclude = []) => [
        ...exclude,
        join(`react-refresh`, `runtime`),
      ])

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
    if (!this.getHmr()) return

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
          notify: this.getNotify(),
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
