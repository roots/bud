import path from 'path'
import chalk from 'chalk'
import stripAnsi from 'strip-ansi'
import table from 'text-table'

const cwd = process.cwd()

export type ESLintOptions = import('eslint').ESLint.Options
export type LintResult = import('eslint').ESLint.LintResult
export type LintResultData = import('eslint').ESLint.LintResultData
export type FormatterFunction = (
  results: LintResult[],
  data?: LintResultData | undefined,
) => string

/**
 * Is error
 */
function isError(message) {
  if (message.fatal || message.severity === 2) {
    return true
  }

  return false
}

/**
 * Get relative file path
 */
function getRelativePath(filePath: string): string {
  return path.relative(cwd, filePath)
}

/**
 * eslint formatter
 */
const formatter: FormatterFunction = function (results): string {
  let output = '\n'
  let hasErrors = false
  let reportContainsErrorRuleIDs = false

  results.forEach(result => {
    if (result.messages.length === 0) {
      return
    }

    let messages = result.messages.map(message => {
      let type: string

      if (isError(message)) {
        type = 'error'
        hasErrors = true
        if (message.ruleId) {
          reportContainsErrorRuleIDs = true
        }
      } else {
        type = 'warn'
      }

      let line = (message.line || 0).toString()

      if (message.column) {
        line += ':' + message.column
      }

      const position = chalk.bold('Line ' + line + ':')

      return [
        '',
        position,
        type,
        message.message.replace(/\.$/, ''),
        chalk.underline(message.ruleId || ''),
      ]
    })

    if (hasErrors) {
      messages = messages.filter(m => m[2] === 'error')
    }

    messages.forEach(m => {
      m[4] =
        m[2] === 'error' ? chalk.red(m[4]) : chalk.yellow(m[4])
      m.splice(2, 1)
    })

    const outputTable = table(messages, {
      align: ['l', 'l', 'l'],
      stringLength(str) {
        return stripAnsi(str).length
      },
    })

    // print the filename and relative path
    output += `${getRelativePath(result.filePath)}\n`

    // print the errors
    output += `${outputTable}\n\n`
  })

  if (reportContainsErrorRuleIDs) {
    output +=
      'Search for the ' +
      chalk.underline(chalk.red('keywords')) +
      ' to learn more about each error.'
  }

  return output
}

export default formatter
