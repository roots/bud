import type {Bud, Dashboard} from './types'

const dashboard: Dashboard = function (this: Bud, enabled: boolean) {
  this.features.set('dashboard', enabled ?? true)

  return this
}

export {dashboard}
