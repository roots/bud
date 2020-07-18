import {devServer} from './devServer'
import {entry} from './entry'
import {externals} from './externals'
import {general} from './general'
import {rules} from './rules/index'
import {optimization} from './optimization'
import {output} from './output'
import {webpackResolve} from './webpackResolve'
import {plugins} from './plugins/index'

/**
 * Make Webpack Config
 *
 * @param  {import('./../index')} bud
 * @return {object}
 */
const webpackConfig = bud => ({
  bud,
  compile: function () {
    this.bud.hooks.call('pre_webpack_config', this)

    this.config = {
      ...entry(this.bud).init().make(),
      ...output(this.bud).init().make(),
      ...rules(this.bud).make(),
      ...optimization(this.bud),
      ...plugins(this.bud).make(),
      ...webpackResolve(this.bud).make(),
      ...externals(this.bud).init().make(),
      ...devServer(this.bud).init().make(),
      ...general(this.bud).make(),
    }

    this.bud.hooks.call('post_webpack_config', this.config)

    return this.config
  },
})

export {webpackConfig}
