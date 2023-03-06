import type {LoaderDefinitionFunction} from 'webpack'

import * as loaders from './loaders/index.cjs'

const loader: LoaderDefinitionFunction<any> = function (source) {
  return Object.values(loaders.repository)
    .filter(({pattern}) => source.match(pattern))
    .map(loader => loaders.make.call(this, loader))
    .filter(Boolean)
    .join(`\n`)
}

export default loader
