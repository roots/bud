import {IgnoreEmitPlugin} from './externals'
import * as Extension from './../../Extend/Extension'

const ignoreEmit: Extension.Factory = bud => ({
  bud,
  options: [
    /**
     * Prevent Webpack 4 from creating useless .css.js files
     * when an entrypoint includes only css assets.
     */
    /\.*\.css.?\.js/,

    /**
     * Stop users from owning themselves with a wholescale moment/locale import.
     * @see {@link https://git.io/JUaNq}
     */
    /^\.\/locale$/,
    /moment$/,
  ],

  make: function () {
    return new IgnoreEmitPlugin(this.options)
  },

  when: function () {
    return this.options?.length && this.options.length > 0
  },
})

export {ignoreEmit as default}
