import type {LoaderDefinitionFunction} from 'webpack'

import * as handlers from '@roots/blade-loader/module-loader/handlers'

const loader: LoaderDefinitionFunction<any> = function (source) {
  return Object.values(handlers.repository)
    .filter(({pattern}) => source.match(pattern))
    .map(loader => handlers.make.call(this, loader))
    .filter(Boolean)
    .join(`\n`)
}

export default loader
