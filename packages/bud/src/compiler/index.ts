import {build} from './webpack'
import {renderCompilerDashboard} from './renderCompilerDashboard'
import type {Bud} from './types'

const compiler = (bud: Bud): any => ({
  bud,

  dashboardEnabled: function () {
    return this.bud.features.enabled('dashboard')
  },

  buildConfig: function () {
    this.config = build(this.bud)

    return this
  },

  compile: function () {
    renderCompilerDashboard(this.bud, this.config)
  },
})

export {compiler}
