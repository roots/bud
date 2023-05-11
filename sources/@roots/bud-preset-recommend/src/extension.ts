import type {Bud} from '@roots/bud-framework'
import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  dependsOn,
  label,
} from '@roots/bud-framework/extension/decorators'

/**
 * Recommended preset
 */
@label(`@roots/bud-preset-recommend`)
@dependsOn([`@roots/bud-postcss`])
export default class BudPresetRecommend extends Extension {
  /**
   * This should be unnecessary in bud 7.0.0 as the user
   * will be required to explicitly install a compiler.
   *
   * {@link Extension.register}
   */
  @bind
  public override async register(bud: Bud) {
    await this.compilerCheck(bud)

    const compilers = [
      `@roots/bud-swc`,
      `@roots/bud-typescript`,
      `@roots/bud-esbuild`,
      `@roots/bud-babel`,
    ]
    if (compilers.some(compiler => bud.extensions.has(compiler))) {
      return
    }

    const projectDependencies = new Set([])

    if (bud.context.manifest?.devDependencies) {
      Object.keys(bud.context.manifest.devDependencies).forEach(
        dependency => {
          projectDependencies.add(dependency)
        },
      )
    }

    if (bud.context.manifest?.dependencies) {
      Object.keys(bud.context.manifest.dependencies).forEach(
        dependency => {
          projectDependencies.add(dependency)
        },
      )
    }

    if (projectDependencies.has(`@roots/bud-swc`)) {
      return await bud.extensions.add(`@roots/bud-swc`)
    }
    if (projectDependencies.has(`@roots/bud-esbuild`)) {
      return await bud.extensions.add(`@roots/bud-esbuild`)
    }
    if (projectDependencies.has(`@roots/bud-typescript`)) {
      return await bud.extensions.add(`@roots/bud-typescript`)
    }

    await bud.extensions.add(`@roots/bud-babel`)
  }

  /**
   * Compiler check
   *
   * @todo remove in bud 7.0.0
   */
  public async compilerCheck(bud: Bud) {
    const explicitDependencies = Object.keys({
      ...(bud?.context?.files?.[`package.json`]?.module?.dependencies ??
        {}),
      ...(bud?.context?.files?.[`package.json`]?.module?.devDependencies ??
        {}),
    })

    const supportedCompilers = [
      `@roots/bud-swc`,
      `@roots/bud-babel`,
      `@roots/bud-esbuild`,
      `@roots/bud-typescript`,
    ]

    const hasInstalledCompiler = supportedCompilers.some(compiler =>
      explicitDependencies.includes(compiler),
    )

    if (!hasInstalledCompiler) {
      this.logger.warn(
        `No compiler installed.`,
        `\n\n`,
        `In bud < 7.0.0, \`@roots/bud-preset-recommend\` included \`@roots/bud-babel\` as a fallback transpiler.`,
        `\n`,
        `In bud >= 7.0.0, you will be required to explicitly install a compiler. This warning will become an error.`,
        `\n`,
        `We recommend \`@roots/bud-swc\` for most projects`,
        `\n`,
      )
    }
  }
}
