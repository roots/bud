import type {Bud} from '@roots/bud-framework'
import {Extension} from '@roots/bud-framework/extension'
import {
  dependsOn,
  expose,
  label,
  options,
} from '@roots/bud-framework/extension/decorators'

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
@options<Options>({
  hmr: true,
  notify: true,
})
@expose(`wp`)
export default class BudPresetWordPress extends Extension<Options> {
  /**
   * {@link Extension.boot}
   */
  public override async boot(bud: Bud) {
    if (bud.extensions.has(`@roots/bud-tailwindcss`)) {
      await bud.extensions.add(`@roots/bud-tailwindcss-theme-json`)
    }

    bud.react?.refresh?.enable(false)
  }

  /**
   * {@link Extension.buildBefore}
   */
  public override async buildBefore({build}, options: Options) {
    if (!options.hmr) return

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
}
