import {join} from 'node:path'

import type {LoaderDefinitionFunction} from 'webpack'

const loader: LoaderDefinitionFunction<{publicPath?: string}> =
  async function (source: string) {
    const options = this.getOptions()
    this.addBuildDependency(this.resource)
    const matches = source.matchAll(/@asset\(['"](.*?)['"]\)/g)

    if (matches) {
      await Promise.all(
        [...matches].map(async ([match, request]) => {
          const absolutePath = join(this.rootContext, request)
          this.addBuildDependency(absolutePath)
          const resolvedPath = await this.importModule(request, {
            publicPath: options?.publicPath ?? ``,
          })
          source = source.replace(match, resolvedPath)
        }),
      )
    }

    return source
  }

export default loader
