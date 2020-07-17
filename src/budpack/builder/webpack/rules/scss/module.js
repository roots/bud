import {loaders} from '../util/loaders'
import {patterns} from '../util/patterns'
import {postCss} from '../use/postCss'
import {implementation} from './implementation'

/**
 * SCSS modules
 * @typedef {function} cssModule
 * @return {object}
 */
const module = builder => ({
  builder,
  output: {},
  test: patterns.scssModule,
  miniCss: loaders.miniCss,
  css: {
    loader: loaders.css,
    options: {
      modules: true,
      onlyLocals: false,
    },
  },
  resolveUrl: {
    loader: loaders.resolveUrl,
    options: {
      engine: 'postcss',
      sourceMap: builder.bud.features.map,
      debug: true,
    },
  },
  postCss: {
    ...postCss(builder).make(),
  },
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
        this.miniCss,
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
    this.builder.bud.hooks.call('pre_scss_module', this)
  },

  /**
   * hook: post_scss_module
   */
  post: function () {
    this.builder.bud.hooks.call('post_scss_module', this.output)
  },
})

export {module}
