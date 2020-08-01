import {Bud} from './types'

const plugins = (bud: Bud) => ({
  bud,
  adapters: bud.adapters.entries(),
  controller: bud.adapters.controller(bud),

  make: function () {
    this.adapters = this.adapters.map(adapter => this.controller.build(adapter))

    return {
      plugins: this.adapters.filter(adapter => adapter),
    }
  },
})

export {plugins}
