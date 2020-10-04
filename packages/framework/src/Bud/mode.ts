import Bud from './index'

const mode = function (this: Bud): Bud.Mode {
  return {
    is: check => this.store['build'].is('mode', check),
    get: () => this.store['build'].get('mode'),
    set: mode => {
      this.store['build'].set('mode', mode)
      return this
    },
  }
}

export {mode as default}
