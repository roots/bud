import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  dependsOn,
  expose,
  label,
  production,
} from '@roots/bud-framework/extension/decorators'

import {type Api, BudTerserConfigApi} from './extension.config.js'

declare module '@roots/bud-framework' {
  interface Modules {
    '@roots/bud-terser': BudTerser
  }
}

/**
 * Terser configuration
 */
@label(`@roots/bud-terser`)
@dependsOn([`@roots/bud-terser/css-minimizer`])
@expose(`terser`)
@production
class BudTerser extends BudTerserConfigApi {
  /**
   * {@link Extension.buildBefore}
   */
  @bind
  public override async buildBefore({extensions, hooks}) {
    if (!this.enabled) {
      this.logger.info(`minimizer disabled. skipping terser config.`)
      return
    }

    const Terser = await import(`terser-webpack-plugin`)

    if (extensions.has(`@roots/bud-swc`)) {
      const minifier = Terser.swcMinify
      this.setMinify(() => minifier)
    } else if (extensions.has(`@roots/bud-esbuild`)) {
      const minifier = Terser.esbuildMinify
      this.setMinify(() => minifier)
    } else {
      const minifier = Terser.terserMinify
      this.setMinify(() => minifier)
    }

    hooks.on(`build.optimization.minimizer`, (minimizers = []) => {
      minimizers = [
        ...minimizers.filter(
          minimizer => !(minimizer instanceof Terser.default),
        ),
        new Terser.default(this.options),
      ]
      this.logger.success(`terser added to minimizers`, minimizers)
      return minimizers
    })
  }
}

export {BudTerser, type Api}
