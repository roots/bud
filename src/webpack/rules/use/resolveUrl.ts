import {loaders} from '../util/loaders'

const resolveUrl = builder => ({
  builder,

  loader: loaders.resolveUrl,

  options: {
    engine: 'postcss',
    sourceMap: builder.bud.features.map,
    debug: true,
  },

  make: function () {
    this.builder.bud.hooks.call('pre_resolveurl', this)
    this.output = {
      loader: this.loader,
      options: this.options,
    }
    this.builder.bud.hooks.call(
      'post_resolveurl',
      this.output,
    )

    return this.output
  },
})

export {resolveUrl}
