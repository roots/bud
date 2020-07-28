import {loaders} from '../util/loaders'

/**
 * PostCSS
 * @typedef {function} postCss
 * @return {object}
 */
const postCss = bud => ({
  bud,
  config: {
    loader: loaders.postCss,
    options: {
      ident: 'postcss',
      parser: 'postcss-scss',
      ...bud.state.options.postCss,
    },
  },
  output: {},
  make: function () {
    this.bud.hooks.call('pre_postcss', this)
    this.output = this.bud.state.features.postCss ? this.config : {}
    this.bud.hooks.call('post_postcss', this.output)

    return this.output
  },
})

export {postCss}
