import {build} from '../webpack'
import {renderCompilerDashboard} from './renderCompilerDashboard'
import {compileSafeMode} from './renderSafeMode'
import type {Bud} from './types'
import type {WebpackConfig} from './types'

const compiler = (bud: Bud): void => {
  /**
   * Use bud's default dashboard when enabled
   */
  const dashboardEnabled: boolean = bud.features.enabled('dashboard')

  /**
   * webpack configuration
   */
  const compiledConfig: WebpackConfig = build(bud).make()

  bud.hooks.call('compiler.dashboard.pre')

  /**
   * Run compiler.
   */
  dashboardEnabled
    ? renderCompilerDashboard(bud, compiledConfig) // enabled: bud compiler
    : compileSafeMode(bud, compiledConfig) // disabled: simple stats output

  bud.hooks.call('compiler.dashboard.post')
}

export {compiler}
