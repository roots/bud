import webpack from 'webpack'
import progressPlugin from './plugins/progress'
import builds from './builds'
import {Bud} from '@roots/bud-typings'

/**
 * @todo fix this fuckboi typing.
 */
export declare interface CompileOptions {
  bud: Bud
  mode: string
  progressCallback: (percentage: number, message: string) => void
  compilerCallback: (error: string, stats: any) => void
  expressCallback: any
}

/**
 * Compile builds.
 */
const compile = (options: CompileOptions): void => {
  const {bud, mode, progressCallback} = options

  builds[mode].before(options)

  bud.apply('compiler', webpack(bud.config(bud)))

  const progress = progressPlugin(progressCallback)
  progress.apply(bud.compiler)

  builds[mode].after(options)

  bud.compiler.hooks.emit.tapAsync(
    'bud-manifest',
    (compilation, callback) => {
      /**
       * Request webpack stats.
       */
      const entrypointsManifest = Object.entries(
        /**
         * The compilation object
         * is huge but `namedChunkGroups` is the fastest
         * way to what we want.
         */
        compilation.getStats().toJson({
          assets: false,
          cachedAssets: false,
          entrypoints: true,
          source: false,
        }).namedChunkGroups,
      )

        /**
         * We want to reduce it to a single object
         * with named entrypoints as keys and chunks
         * subgrouped by type.
         */
        .reduce((chunks, [name, chunk]) => {
          return {
            ...(chunks ?? []),
            [name]: {
              /**
               * This is the primary, named chunk likely
               * specified directly by the user.
               */
              entry: [
                /**
                 * We're going to filter this chunks assets for
                 * things that aren't:
                 *  - sourcemap
                 *  - a runtime chunk
                 *  - a vendor chunk
                 */
                ...chunk.assets.filter(
                  asset =>
                    !/^(vendor)\//.test(asset) &&
                    !/^(runtime)\//.test(asset) &&
                    !/.*\.map/.test(asset),
                ),

                /**
                 * And finally resolve the path
                 * against our web root reference.
                 */
              ].map(entry =>
                bud.fs.resolve(bud.paths.get('public'), entry),
              ),

              /**
               * Do the same exact thing but test for
               * runtimeChunks
               */
              runtime: [
                ...chunk.assets.filter(
                  asset =>
                    /^(runtime)\//.test(asset) &&
                    !/.*\.map/.test(asset),
                ),
              ].map(entry =>
                bud.fs.resolve(bud.paths.get('public'), entry),
              ),

              /**
               * And, lastly, the vendor chunk group.
               */
              vendor: [
                ...chunk.assets.filter(
                  asset =>
                    /^(vendor)\//.test(asset) &&
                    !/.*\.map/.test(asset),
                ),
              ].map(entry =>
                bud.fs.resolve(bud.paths.get('public'), entry),
              ),
            },
          }
        }, {})

      /**
       * Write to JSON
       */
      bud.fs.outputFileSync(
        bud.dist('entrypoints.json'),
        bud.util.pretty(
          JSON.stringify(entrypointsManifest),
          'json',
        ),
      )

      /** we dip. */
      return callback()
    },
  )
}

export {compile as default}
