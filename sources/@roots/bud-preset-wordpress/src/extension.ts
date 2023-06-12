import type {Bud} from '@roots/bud-framework'

import {Extension} from '@roots/bud-framework/extension'
import {
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
  hmr: boolean
  notify: boolean
}

/**
 * WordPress preset
 */
@label(`@roots/bud-preset-wordpress`)
@dependsOn([
  `@roots/bud-preset-recommend`,
  `@roots/bud-wordpress-manifests`,
  `@roots/bud-wordpress-theme-json`,
  `@roots/bud-react`,
])
@options({
  hmr: true,
  notify: true,
})
@expose(`wp`)
export default class BudPresetWordPress extends Extension<Options> {
  /**
   * {@link Extension.boot}
   */
  public override async boot(bud: Bud) {
    await this.compilerCheck(bud)

    if (bud.extensions.has(`@roots/bud-tailwindcss`))
      await bud.extensions.add(`@roots/bud-tailwindcss-theme-json`)

    bud.react?.refresh?.enable(false)
  }

  /**
   * {@link Extension.buildBefore}
   */
  public override async buildBefore({build, hooks}) {
    /** Bail if hmr option is false */
    if (!this.get(`hmr`)) return

    /** Source loader */
    const loader = await this.resolve(
      `@roots/wordpress-hmr/loader`,
      import.meta.url,
    )
    /** Bail if unresolvable */
    if (!loader) return this.logger.error(`HMR loader not found`)

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
    // @ts-ignore
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
  public async compilerCheck({context}: Bud) {
    const manifest = context?.files?.[`package.json`]?.module
    if (!manifest) return

    const explicitDependencies = Object.keys({
      ...(manifest.dependencies ?? {}),
      ...(manifest.devDependencies ?? {}),
    })

    const supportedCompilers = [
      `@roots/sage`,
      `@roots/bud-preset-recommend`,
      `@roots/bud-babel`,
      `@roots/bud-swc`,
      `@roots/bud-typescript`,
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
