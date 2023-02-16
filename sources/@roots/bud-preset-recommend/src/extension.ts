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
}
