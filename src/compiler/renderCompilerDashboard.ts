import webpack from 'webpack'
import React from 'react'
import {render} from 'ink'
import {Runner} from './Runner'

/**
 * Webpack compilation dashboard renderer.
 */
const renderCompilerDashboard: BudRenderer = (
  bud: bud,
  webpackConfig: Configuration,
): void => {
  /**
   * Runner props
   */
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

/**
 * Typings
 */
import type {Configuration, Compiler} from 'webpack'
import type {bud} from '../bud'

/**
 * Runner Props
 *
 * @interface
 * @property {bud} config - bud container
 * @property {Configuration} webpackConfig - webpack configuration object
 * @property {Compiler} compiler - webpack compiler
 */
export interface RunnerProps {
  config: object
  webpackConfig: Configuration
  compiler: Compiler
}

/**
 * BudRenderer
 *
 * @typedef {BudRenderer}
 * @param {bud} bud
 * @param {Configuration} webpackConfig
 * @return {void}
 */
export type BudRenderer = (
  config: bud,
  webpackConfig: Configuration,
) => void
