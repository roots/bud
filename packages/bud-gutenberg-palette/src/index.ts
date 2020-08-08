import adapter from './adapter'
import api from './api'

const jsonPalette = () => ({
  make: function (this: any) {
    this.bud.setPaletteBlacklist = api
    this.bud.adapters.add(adapter)
  },
})

export = jsonPalette
