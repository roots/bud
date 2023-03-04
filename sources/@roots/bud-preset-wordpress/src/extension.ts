import type {Bud} from '@roots/bud'
import {Extension} from '@roots/bud-framework/extension'
import {
  dependsOn,
  label,
  options,
} from '@roots/bud-framework/extension/decorators'

interface Options {
  hmr: boolean
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
@options<Options>({hmr: true})
export default class BudPresetWordPress extends Extension<Options> {
  /**
   * {@link Extension.boot}
   */
  public override async boot(bud: Bud) {
    if (bud.extensions.has(`@roots/bud-tailwindcss`)) {
      await bud.extensions.add(`@roots/bud-tailwindcss-theme-json`)
    }

    bud.react.refresh.enable(false)
  }

  /**
   * {@link Extension.configAfter}
   */
  public override async buildBefore({build}, options: Options) {
    if (!options.hmr) return

    build
      .setLoader(`@roots/wordpress-hmr/loader`)
      .setItem(`@roots/wordpress-hmr/loader`, {
        loader: `@roots/wordpress-hmr/loader`,
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
