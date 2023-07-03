import type {
  Compiler,
  WebpackPluginInstance,
} from '@roots/bud-framework/config'
import type {ExtensionLiteral} from '@roots/bud-framework/extension'

import isString from '@roots/bud-support/lodash/isString'

/**
 * Remove empty modules from the compilation
 */
export default class FixStyleOnlyEntrypoints
  implements WebpackPluginInstance, ExtensionLiteral
{
  /**
   * {@link WebpackPluginInstance.apply}
   */
  public apply({hooks}: Compiler) {
    hooks.thisCompilation.tap(this.constructor.name, compilation =>
      compilation.hooks.chunkAsset.tap(
        this.constructor.name,
        (chunk, file) => {
          if (!/\.(js|mjs)$/.test(file)) return

          const modules = new Set<string>()
          const add = (id: unknown) =>
            id && isString(id) && modules.add(id)

          const chunkModules =
            compilation.chunkGraph.getChunkEntryModulesIterable(chunk)

          for (const module of chunkModules) {
            add(module.identifier())
            for (const resource of module.dependencies)
              add(resource.getResourceIdentifier())
          }

          modules.size > 1 &&
            Array.from(modules).every(ident =>
              /\.(css|scss|sass)((-|\?).*)?$/.test(ident),
            ) &&
            compilation.deleteAsset(file)
        },
      ),
    )
  }
}
