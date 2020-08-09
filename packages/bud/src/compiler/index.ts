import {build} from './webpack'
import {renderCompilerDashboard} from './renderCompilerDashboard'
import type {Bud} from './types'

const compiler = (bud: Bud): any => ({
  bud,

  dashboardEnabled: function () {
    return this.bud.features.enabled('dashboard')
  },

  buildConfig: function (): typeof compiler {
    this.config = build(this.bud).make()

    return this
  },

  compile: function () {
    renderCompilerDashboard(this.bud, this.config)
  },
})

export {compiler}
