import isString from '@roots/bud-support/lodash/isString'
import type {Compiler} from '@roots/bud-support/webpack'

/**
 * Remove empty modules from the compilation
 */
export default class FixStyleOnlyEntrypoints {
  /**
   * Apply plugin
   */
  public apply({hooks}: Compiler) {
    hooks.thisCompilation.tap(this.constructor.name, compilation =>
      compilation.hooks.chunkAsset.tap(
        this.constructor.name,
        (chunk, file) => {
          if (!/\.(js|mjs)$/.test(file)) return

          const modules = new Set<string>()
          const add = (id: unknown) => modules.add(isString(id) ? id : ``)

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
