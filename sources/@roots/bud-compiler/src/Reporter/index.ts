/**
 * Based in part on {@link https://github.com/facebook/create-react-app/blob/5fc8350c89ff730cdfd067bbd86a90dab393d21b/packages/react-dev-utils/formatWebpackMessages.js}
 */

import {Bud} from '@roots/bud-framework'
import {lodash as _} from '@roots/bud-support'
import {isString} from 'lodash-es'
import {StatsCompilation, StatsError} from 'webpack'

import BudError from './BudError.js'

export interface BudReport {
  errors: Array<BudError>
  warnings: Array<BudError>
}

const reporter =
  (app: Bud) =>
  (error: StatsError): Set<BudError> => {
    if (!error || !error.message) return null

    const reports = new Set<BudError>()

    /**
     * Eslint groups all errors under one error..
     */

    const captureEslint =
      /\x1B\[0m\x1B\[4m(?<file>.+)\x1B\[24m\x1B\[0m\n\x1B\[0m  (?<message>\x1B\[2m(?<line>[0-9]+):(?<column>[0-9]+)\x1B\[22m  \x1B\[31merror\x1B\[39m .*)/

    error.message.split('\x1B[0m\x1B[0m\n').forEach((str: string) => {
      const groups = captureEslint.exec(str)?.groups
      if (!groups?.file) return

      const report = new BudError(error)

      Object.entries(groups)
        .filter(([k, v]) => k && v)
        .map(([key, value]) => {
          app.info('eslint capture key value:', key, value)
          report[key] = value
        })

      report.hasFile() &&
        report.setFile(file => file.replace(app.path(), '.'))

      reports.add(report)
    })

    if (reports.size > 0) return reports

    /**
     * Non eslint reporter continues..
     */

    const report = new BudError(error)

    if (error.loc && isString(error.loc)) {
      const [column, line] = error.loc.split(':')
      report.column = column ? Number.parseInt(column) : 0
      report.line = line ? Number.parseInt(line.split('-').pop()) : 0
    }

    const captureGroups = [
      /(?<file>.+)\n\s\s(?<line>[0-9]+):(?<column>[0])\s.+/,
      /\((?<line>[0-9]+):(?<column>[0-9]+)\)\s(?<file>.*?)\s/,
      /SyntaxError:\s(?<file>.+?):\s.+\s\((?<line>[0-9]+):(?<column>[0-9]+)\)/,
    ]
    captureGroups.forEach(captureGroup => {
      report.message?.split('\n').map(message =>
        Object.entries(captureGroup.exec(message)?.groups ?? {})
          .filter(([k, v]) => k && v)
          .map(([key, value]) => {
            app.info(captureGroup, key, value)
            report[key] = value
          }),
      )
    })

    /**
     * @remarks
     * Sourced from react-dev-util
     */
    report
      .setMessage(message =>
        message
          .split('\n')
          .filter(str => !/Module [A-z ]+\(from/.test(str))
          .join('\n'),
      )
      .setMessage(message =>
        message
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
      .setMessage(message =>
        message
          .split('-- inner error --\n')
          .shift()
          .replaceAll(app.path(), '.')
          .trim(),
      )

    report.hasFile() &&
      report.setFile(file => file.replace(app.path(), '.'))

    reports.add(report)

    return reports
  }

/**
 * Apply bud context to reporter
 */
export const curryReporter: (
  app: Bud,
) => (stats: StatsError) => Set<BudError> = app => reporter(app)

/**
 * Create report
 */
export const report = (app: Bud, stats: StatsCompilation): BudReport => {
  const result: BudReport = {errors: [], warnings: []}

  try {
    stats.errors
      .map(curryReporter(app))
      .filter(Boolean)
      .flatMap(set => Array.from(set))
      .filter(Boolean)
      .filter(
        ({message: subject}) =>
          !result.errors.some(({message}) => subject === message),
      )
      .map(error => result.errors.push(error))

    stats.warnings
      .map(curryReporter(app))
      .filter(Boolean)
      .flatMap(set => Array.from(set))
      .filter(Boolean)
      .filter(
        ({message: subject}) =>
          !result.warnings.some(({message}) => subject === message),
      )
      .map(item => result.warnings.push(item))

    app.info(result)

    return result
  } catch (err) {
    app.error(result, err)
  }
}
