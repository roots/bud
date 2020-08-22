import {build} from './webpack'
import {renderCompilerDashboard} from './renderCompilerDashboard'
import type {Bud} from './types'

interface CompilerController {
  bud: Bud
  dashboardEnabled: () => boolean
  buildConfig: () => CompilerController
  compile: () => void
}

type CompilerFactory = (bud: Bud) => CompilerController

const compiler: CompilerFactory = (bud: Bud): CompilerController => ({
  bud,

  dashboardEnabled: function (): boolean {
    return this.bud.features.enabled('dashboard')
  },

  buildConfig: function (): CompilerController {
    this.config = build(this.bud)

    return this
  },

  compile: function () {
    renderCompilerDashboard(this.bud, this.config)
  },
})

export {compiler}
export type {CompilerController, CompilerFactory}
