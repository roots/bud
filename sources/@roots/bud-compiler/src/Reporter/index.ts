/**
 * Based on {@link https://github.com/facebook/create-react-app/blob/5fc8350c89ff730cdfd067bbd86a90dab393d21b/packages/react-dev-utils/formatWebpackMessages.js#L65-L73}
 */

import {Bud} from '@roots/bud-framework'
import {lodash as _} from '@roots/bud-support'
import {Stats, StatsError} from 'webpack'

import BudError from './BudError'

export interface BudReport {
  errors: Array<BudError>
  warnings: Array<BudError>
}

/**
 * Parse webpack err into something more workable
 */
const reporter = (app: Bud) => (statsError: StatsError) => {
  if (!statsError) return null
  if (statsError.moduleName.includes('webpack')) return null

  const report = new BudError(statsError)

  if (statsError.loc) {
    const [column, line] = statsError.loc.split(':')
    report.column = Number.parseInt(column)
    report.line = Number.parseInt(line.split('-').pop())
  }

  const lines = report.message.split('\n')

  lines.forEach((str: string) => {
    Object.entries(
      /\((?<line>[0-9]+):(?<column>[0-9]+)\)\s(?<file>.*?)\s/.exec(str)
        ?.groups ?? {},
    )
      .filter(([k, v]) => k && v)
      .map(([key, value]) => (report[key] = value))

    Object.entries(
      /SyntaxError:\s(?<file>.+?):\s.+\s\((?<line>[0-9]+):(?<column>[0-9]+)\)/.exec(
        str,
      )?.groups ?? {},
    )
      .filter(([k, v]) => k && v)
      .map(([key, value]) => (report[key] = value))
  })

  /**
   * @remarks
   * Sourced from react-dev-util
   */
  report.setMessage(
    report.message
      .split('\n')
      /**
       * Throw away lines like `'Module build failed (from ./node_modules/postcss-loader/dist/cjs.js):\n'`
       */
      .filter(str => !/Module [A-z ]+\(from/.test(str))
      .join('\n')
      .replace(
        /SyntaxError\s+\((\d+):(\d+)\)\s*(.+?)\n/g,
        `Syntax error: $3\n`,
      )
      .replace(
        /^.*export '(.+?)' was not found in '(.+?)'.*$/gm,
        `Attempted import error: '$1' is not exported from '$2'.`,
      )
      .replace(
        /^.*export 'default' \(imported as '(.+?)'\) was not found in '(.+?)'.*$/gm,
        `Attempted import error: '$2' does not contain a default export (imported as '$1').`,
      )
      .replace(
        /^.*export '(.+?)' \(imported as '(.+?)'\) was not found in '(.+?)'.*$/gm,
        `Attempted import error: '$1' is not exported from '$3' (imported as '$2').`,
      )
      .replace(/^\s*at\s((?!webpack:).)*:\d+:\d+[\s)]*(\n|$)/gm, '')
      .replace(/^\s*at\s<anonymous>(\n|$)/gm, ''),
  )

  report
    .setMessage(
      report.message
        .split('-- inner error --\n')
        .shift()
        .replaceAll(app.path(), '.')
        .trim(),
    )
    .setFile(report.file.replace(app.path(), '.'))

  return report
}

/**
 * Apply bud context to reporter
 */
export const curryReporter: (
  app: Bud,
) => (stats: StatsError) => BudError = app => reporter(app)

/**
 * Create report
 */
export const report = (app: Bud, stats: Stats): BudReport => {
  const jsonStats = stats.toJson()

  const result: BudReport = {errors: [], warnings: []}

  jsonStats.errors
    .map(curryReporter(app))
    .filter(Boolean)
    .forEach(m => {
      !result.errors.some(({message}) => m.message === message) &&
        result.errors.push(m)
    })

  jsonStats.warnings
    .map(curryReporter(app))
    .filter(Boolean)
    .filter(
      ({message: subject}) =>
        !result.warnings.some(({message}) => subject === message),
    )
    .map(item => result.warnings.push(item))

  return result
}
