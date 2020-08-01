import type {Bud, Dashboard} from './types'

const dashboard: Dashboard = function (this: Bud, enabled: boolean) {
  enabled === false
    ? this.features.disable('dashboard')
    : this.features.enable('dashboard')

  return this
}

export {dashboard}
