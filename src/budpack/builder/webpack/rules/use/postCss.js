import {loaders} from '../util/loaders'

/**
 * PostCSS
 * @typedef {function} postCss
 * @return {object}
 */
const postCss = builder => ({
  builder,
  config: {
    loader: loaders.postCss,
    options: {
      ident: 'postcss',
      parser: 'postcss-scss',
      ...builder.bud.options.postCss,
    },
  },
  output: {},
  make: function () {
    this.builder.bud.hooks.call('pre_postcss', this)
    this.output = this.builder.bud.features.postCss ? this.config : {}
    this.builder.bud.hooks.call('post_postcss', this.output)

    return this.output
  },
})

export {postCss}
