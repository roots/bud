import {join} from 'path'

/**
 * Webpack resolvers.
 *
 * @param {Bud} bud
 * @return {object}
 */
const webpackResolve = bud => ({
  bud,

  options: {
    resolve: {
      extensions: bud.hooks.filter(
        'filter_webpack_resolve_extensions',
        bud.options.get('extensions'),
      ),
      modules: [bud.project('node_modules'), bud.state.paths.src],
    },
  },

  make: function () {
    /**
     * Resolve modules from framework
     */
    if (
      this.bud.state.paths.project !== this.bud.state.paths.framework
    ) {
      this.options.resolve.modules.push(
        join(this.bud.state.paths.framework, 'node_modules'),
      )
    }

    /**
     * JSX support
     */
    if (
      this.bud.features.enabled('jsx') &&
      !this.options.resolve.extensions.includes('.jsx')
    ) {
      this.options.resolve.extensions.push('.jsx')
    }

    /**
     * Vue support
     */
    if (
      this.bud.features.enabled('vue') &&
      !this.options.resolve.extensions.includes('.vue')
    ) {
      this.options.resolve.extensions.push('.vue')
    }

    /**
     * TS support
     */
    if (
      this.bud.features.enabled('typescript') &&
      !(
        this.options.resolve.extensions.includes('.ts') ||
        this.options.resolve.extensions.includes('.tsx')
      )
    ) {
      this.options.resolve.extensions.push('.ts')
      this.options.resolve.extensions.push('.tsx')
    }

    /**
     * Alias resolution
     */
    if (this.bud.options.has('alias')) {
      this.options.resolve.alias = this.bud.options.get('alias')
    }

    return this.bud.hooks.filter(
      'filter_webpack_resolve',
      this.options,
    )
  },
})

export {webpackResolve}
