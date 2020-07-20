import webpack from 'webpack'
import React from 'react'
import {render} from 'ink'
import {Runner} from '.'

/**
 * Compiler renderer
 *
 * @type  {BudRenderer}
 * @param {bud} bude
 * @param {Configuration} webpackConfig
 */
const renderCompilerDashboard: BudRenderer = (
  bud: bud,
  webpackConfig: Configuration,
): void => {
  const runnerProps: RunnerProps = {
    config: bud,
    webpackConfig,
    compiler: webpack(webpackConfig),
  }

  const application = React.createElement(
    Runner,
    runnerProps,
  )

  /** 🚀 */
  render(application)
}

export {renderCompilerDashboard}

import type {Configuration, Compiler} from 'webpack'
import type {bud} from '../builder'

export interface RunnerProps {
  config: object
  webpackConfig: Configuration
  compiler: Compiler
}

export type BudRenderer = (
  config: bud,
  webpackConfig: Configuration,
) => void
