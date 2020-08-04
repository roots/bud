import {build} from './webpack'
import {renderCompilerDashboard} from './renderCompilerDashboard'
import {compileSafeMode} from './renderSafeMode'
import type {Bud} from './types'
import type {WebpackConfig} from './types'

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
    this.bud.hooks.call('compiler.dashboard.pre')

    this.dashboardEnabled()
      ? renderCompilerDashboard(this.bud, this.config) // enabled: bud compiler
      : compileSafeMode(this.bud, this.config) // disabled: simple stats output

    this.bud.hooks.call('compiler.dashboard.post')
  },
})

export {compiler}
