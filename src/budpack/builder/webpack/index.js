import {devServer} from './devServer'
import {entry} from './entry'
import {externals} from './externals'
import {general} from './general'
import {loaders} from './loaders/loaders'
import {optimization} from './optimization'
import {output} from './output'
import {webpackResolve} from './webpackResolve'
import {plugins} from './plugins/index'

/**
 * Make Webpack Config
 *
 * @param  {import('./../base/mode').inProduction} inProduction
 * @return {object}
 */
const webpackConfig = bud => ({
  bud,
  compile: function () {
    return {
      ...entry(this.bud),
      ...output(this.bud),
      ...loaders(this.bud).compile(),
      ...optimization(this.bud),
      ...plugins(this.bud),
      ...webpackResolve(this.bud),
      ...externals(this.bud),
      ...devServer(this.bud),
      ...general(this.bud),
    }
  },
})

export {webpackConfig}
