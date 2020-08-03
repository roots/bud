import {build} from '../webpack'
import {renderCompilerDashboard} from './renderCompilerDashboard'
import {compileSafeMode} from './renderSafeMode'
import type {Bud} from './types'
import type {WebpackConfig} from './types'

const compiler = (bud: Bud): void => {
  bud.hooks.call('pre_compiler')

  /**
   * Use bud's default dashboard when enabled
   */
  const dashboardEnabled: boolean = bud.features.enabled('dashboard')

  /**
   * webpack configuration
   */
  const compiledConfig: WebpackConfig = build(bud).make()

  bud.logger.info({name: 'render compiler dashboard', ...compiledConfig}, `Webpack config generator results.`)

  bud.hooks.call('pre_dashboard')

  /**
   * Run compiler.
   */
  dashboardEnabled
    ? renderCompilerDashboard(bud, compiledConfig) // enabled: bud compiler
    : compileSafeMode(bud, compiledConfig) // disabled: simple stats output

  bud.hooks.call('post_dashboard')

  bud.hooks.call('post_compiler')
}

export {compiler}
