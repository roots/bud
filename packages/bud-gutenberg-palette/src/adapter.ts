import plugin from 'palette-webpack-plugin'

const adapter = () => ({
  make: function (this: any) {
    return new plugin({
      blacklist: this.bud.options.get('palette-blacklist'),
    })
  },
})

exports = adapter
