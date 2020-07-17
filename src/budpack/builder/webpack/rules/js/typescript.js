import {loaders} from './../util/loaders'

/**
 * Typescript
 * @typedef {function}
 */
const typescript = builder => ({
  builder,
  output: {},
  enabled: builder.bud.configs.typescript,
  loader: loaders.ts,
  options: {
    configFile: builder.bud.configs.typescript,
  },

  /**
   * Make typescript rules.
   */
  make: function() {
    this.pre()

    this.output =
      this.enabled ? {
        loader: this.loader,
        options: this.options,
      } : null

    this.post()

    return this.output
  },

  /**
   * Hook: pre_typescript
   */
  pre: function () {
    this.builder.bud.hooks.call('pre_typescript', this)
  },

  /**
   * Hook: post_typescript
   */
  post: function () {
    this.builder.bud.hooks.call('post_typescript', this.output)
  },
})

export {typescript}
