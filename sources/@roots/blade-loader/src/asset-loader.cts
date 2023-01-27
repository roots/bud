import {join} from 'node:path'

import type {LoaderDefinitionFunction} from 'webpack'

const loader: LoaderDefinitionFunction<{publicPath?: string}> =
  async function (source: string) {
    const options = this.getOptions()
    const assetMatches = source.matchAll(/@asset\((.*)\)/g)

    if (assetMatches) {
      await Promise.all(
        [...assetMatches].map(async ([match, request]) => {
          request = request.replaceAll(`'`, ``).replaceAll(`"`, ``)

          this.addDependency(join(this.context, request))

          const signifier = await this.importModule(request, {
            publicPath: options?.publicPath ?? ``,
          })

          source.replace(match, signifier)
        }),
      )
    }

    return source
  }

export default loader
