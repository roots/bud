import {plugin} from './adapter'
import {api} from './api'
import {Extension} from '@roots/bud'

const palette: Extension = bud => ({
  bud,
  name: 'palette-webpack-plugin',
  make: function () {
    this.bud.apply('setPaletteBlacklist', api)
    this.bud.plugins.push(plugin)
  },
})

export {palette}
