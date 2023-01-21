import {join} from 'node:path'

// eslint-disable-next-line n/no-unpublished-import
import type {LoaderDefinitionFunction} from 'webpack'

// This loader matches and replaces all instances of `@asset(…)` with the asset path.
// It also adds the asset path as a dependency so that the loader will re-run if the path changes.
const loader: LoaderDefinitionFunction<{publicPath?: string}> =
  async function (source: string) {
    const options = this.getOptions()
    const assetMatches = source.matchAll(/@asset\((.*)\)/g)

    if (assetMatches) {
      await Promise.all(
        [...assetMatches].map(async ([_, request]) => {
          request = request.replaceAll(`'`, ``).replaceAll(`"`, ``)

          this.addDependency(join(this.context, request))

          await this.importModule(request, {
            publicPath: options?.publicPath ?? ``,
          })
        }),
      )
    }

    return source
  }

export default loader
