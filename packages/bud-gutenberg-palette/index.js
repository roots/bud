const plugin = require('palette-webpack-plugin')

const setPaletteBlacklist = function (blacklist) {
  this.options.set('palette-blacklist', blacklist)
  return this
}

const adapter = () => ({
  make: function () {
    return new plugin({
      blacklist: this.bud.options.get('palette-blacklist'),
    })
  },
})

module.exports = () => ({
  make: function () {
    this.bud.setPaletteBlacklist = setPaletteBlacklist
    this.bud.adapters.add(adapter)
  },
})
