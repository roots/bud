import type {Bud, Dashboard} from './types'

const dashboard: Dashboard = function (this: Bud, enabled: boolean) {
  this.features.enable('dashboard')

  return this
}

export {dashboard}
