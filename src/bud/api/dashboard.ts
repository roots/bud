import type {Bud, Dashboard} from './types'

const dashboard: Dashboard = function (this: Bud, enabled: boolean) {
  this.state.features.dashboard = enabled

  return this
}

export {dashboard}
