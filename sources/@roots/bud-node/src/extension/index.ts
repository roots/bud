import type {Bud, Configuration} from '@roots/bud-framework'

import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  label,
  options,
} from '@roots/bud-framework/extension/decorators'

import builtIns from './built-ins.js'

/**
 * Node lib configuration
 */
@label(`@roots/bud-node`)
@options({
  export: `default`,
  target: `node`,
})
class BudNode extends Extension {
  /**
   * {@link Extension.register}
   */
  @bind
  public override async boot(bud: Bud) {
    await bud.sequence([
      /** Disable minification */
      async ({minimize}) => minimize(false),

      /** Disable runtime chunk */
      async ({runtime}) => runtime(false),

      /** Disable vendor chunks */
      async ({splitChunks}) => splitChunks(false),

      /** Disable file hashing */
      async ({hash}) => hash(false),

      /** Disable entrypoints.json */
      async ({entrypoints}) => entrypoints.enable(false),

      /** Disable manifest.json */
      async ({manifest}) => manifest.enable(false),

      /** Enable esm */
      async ({esm}) => esm.enable(),

      /** Setup hooks */
      async ({extensions, hooks}) => {
        /** Emit js to @dist root */
        hooks.on(`build.output.filename`, bud.relPath(`@name.js`))

        /** Emit css to @dist root */
        extensions
          .get(`@roots/bud-extensions/mini-css-extract-plugin`)
          .set(`filename`, bud.relPath(`@name.css`))

        /** Set library type  */
        hooks.on(`build.output.library.type`, `module`)

        /** Set library export */
        hooks.on(`build.output.library.export`, this.options.export)

        /** Set node core modules as external */
        hooks.on(
          `build.externalsPresets`,
          (options: Configuration[`externalsPresets`] = {}) => ({
            ...options,
            node: true,
          }),
        )

        hooks.on(`build.resolve.extensions`, (options) => {
          options.add(`.txt`)
          return options
        })

        /** Setup noop fallbacks for node core modules */
        hooks.async(
          `build.resolve`,
          async (options: Configuration[`resolve`] = {}) => ({
            ...options,
            fallback: {
              ...(options.fallback ?? {}),
              ...builtIns,
            },
          }),
        )
      },
    ])
  }
}

export {BudNode as default}
