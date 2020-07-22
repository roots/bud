/**
 * Dev server
 */
const devServer = (bud: Bud) => ({
  bud,
  options: {
    devServer: bud.state.options.dev,
  },
  make: function () {
    return this.options
  },
})

export {devServer}
import {Bud} from './../bud'
