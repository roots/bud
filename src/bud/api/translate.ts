import type {Bud, Translate} from './Types'

const translate: Translate = function (output: string): Bud {
  this.state.features.translate = output ? true : false

  this.state.features.translate &&
    (() => {
      this.state.options.babel = {
        ...this.state.options.babel,
        plugins: [
          ...this.state.options.babel.plugins,
          [this.require('@wordpress/babel-plugin-makepot'), {output}],
        ],
      }
    })()

  return this
}

export {translate}
