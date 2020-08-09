import type {Extension} from '@roots/bud'
import config from './api'

const purgecss: Extension = () => ({
  make: function (this: any) {
    this.bud.purge = config
  },
})

export = purgecss
