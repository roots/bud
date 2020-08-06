import plugin from 'palette-webpack-plugin'

/**
 * ## bud.setPaletteBlacklist
 *
 * @typedef {function ({blacklist: string}) => Bud}
 */
const setPaletteBlacklist = function (blacklist) {
  this.options.set('palette-blacklist', blacklist)
  return this
}

/**
 * Adapts Webpack plugin to Bud.
 */
const adapter = {
  name: 'palette-plugin',
  extension: {
    make: function () {
      return new plugin({
        blacklist: this.bud.options.get('palette-blacklist'),
      })
    },
  },
}

/**
 * Palette plugin
 *
 * @property {string} name - extension name
 * @property {Bud} bud - bud instance
 * @property {function () => void}    make - primary action of plugin
 * @property {function () => boolean} when - when false, plugin is skipped
 */
const palettePlugin = {
  name: 'palette-plugin',
  make: function () {
    this.bud.setPaletteBlacklist = setPaletteBlacklist
    this.bud.adapters.add(adapter)
  },
}

export {palettePlugin}
