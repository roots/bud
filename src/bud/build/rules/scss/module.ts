import {loaders} from '../util/loaders'
import {patterns} from '../util/patterns'
import {postCss} from '../use/postCss'
import {resolveUrl} from '../use/resolveUrl'
import {implementation} from './implementation'

/**
 * SCSS modules
 * @typedef {function} cssModule
 * @return {object}
 */
const module = bud => ({
  bud,
  output: {},
  test: patterns.scssModule,
  css: {
    loader: loaders.css,
    options: {
      modules: true,
      onlyLocals: false,
    },
  },
  resolveUrl: resolveUrl(bud).make(),
  postCss: postCss(bud).make(),
  scss: {
    loader: loaders.scss,
    options: {
      sourceMap: true,
      implementation: implementation(),
    },
  },

  /**
   * Make SCSS loaders object.
   */
  make: function () {
    this.pre()

    this.output = {
      test: this.test,
      use: Object.values([
        loaders.miniCss(this.bud.features.enabled('hot')),
        ,
        this.css,
        this.resolveUrl,
        this.postCss,
        this.scss,
      ]),
    }

    this.post()

    return this.output
  },

  /**
   * hook: pre_scss_module
   */
  pre: function () {
    this.bud.hooks.call('pre_scss_module', this)
  },

  /**
   * hook: post_scss_module
   */
  post: function () {
    this.bud.hooks.call('post_scss_module', this.output)
  },
})

export {module}
