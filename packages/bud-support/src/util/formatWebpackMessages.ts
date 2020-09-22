/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict'

import chalk from 'chalk'
const friendlySyntaxErrorLabel = 'Syntax error:'

function isLikelyASyntaxError(message) {
  return message.indexOf(friendlySyntaxErrorLabel) !== -1
}

// Cleans up webpack error messages.
function formatMessage(message) {
  let lines = message.split('\n')

  // Strip webpack-added headers off errors/warnings
  // https://github.com/webpack/webpack/blob/master/lib/ModuleError.js
  lines = lines.filter(
    line => !/Module [A-z ]+\(from/.test(line),
  )

  // Transform parsing error into syntax error
  // TODO: move this to our ESLint formatter?
  lines = lines.map(line => {
    const parsingError = /Line (\d+):(?:(\d+):)?\s*Parsing error: (.+)$/.exec(
      line,
    )
    if (!parsingError) {
      return line
    }
    const [, errorLine, errorColumn, errorMessage] = parsingError
    return `${friendlySyntaxErrorLabel} ${errorMessage} (${errorLine}:${errorColumn})`
  })

  message = lines.join('\n')
  // Smoosh syntax errors (commonly found in CSS)
  message = message.replace(
    /SyntaxError\s+\((\d+):(\d+)\)\s*(.+?)\n/g,
    `${friendlySyntaxErrorLabel} $3 ($1:$2)\n`,
  )
  // Clean up export errors
  message = message.replace(
    /^.*export '(.+?)' was not found in '(.+?)'.*$/gm,
    `Attempted import error: '$1' is not exported from '$2'.`,
  )
  message = message.replace(
    /^.*export 'default' \(imported as '(.+?)'\) was not found in '(.+?)'.*$/gm,
    `Attempted import error: '$2' does not contain a default export (imported as '$1').`,
  )
  message = message.replace(
    /^.*export '(.+?)' \(imported as '(.+?)'\) was not found in '(.+?)'.*$/gm,
    `Attempted import error: '$1' is not exported from '$3' (imported as '$2').`,
  )
  lines = message.split('\n')

  // Remove leading newline
  if (lines.length > 2 && lines[1].trim() === '') {
    lines.splice(1, 1)
  }
  // Clean up file name
  lines[0] = lines[0].replace(/^(.*) \d+:\d+-\d+$/, '$1')

  // Cleans up verbose "module not found" messages for files and packages.
  if (lines[1] && lines[1].indexOf('Module not found: ') === 0) {
    lines = [
      lines[0],
      lines[1]
        .replace('Error: ', '')
        .replace(
          'Module not found: Cannot find file:',
          'Cannot find file:',
        ),
    ]
  }

  lines[0] = chalk.bgRed.whiteBright(` ${lines[0]} `)
  lines[0] = `${lines[0]}\n`

  return lines
    .join('\n')
    .replace(
      /^\s*at\s((?!webpack:).)*:\d+:\d+[\s)]*(\n|$)/gm,
      '',
    ) // at ... ...:x:y
    .replace(/^\s*at\s<anonymous>(\n|$)/gm, '') // at <anonymous>
    .split('\n')
    .filter(
      (line, index, arr) =>
        index === 0 ||
        line.trim() !== '' ||
        line.trim() !== arr[index - 1].trim(),
    )
    .join('\n')
    .replace(/\n @ /, `\n\n@ `)
    .trim()
}

function formatWebpackMessages(json) {
  const formattedErrors = json.errors.map(formatMessage)
  const formattedWarnings = json.warnings.map(formatMessage)
  const result = {
    errors: formattedErrors,
    warnings: formattedWarnings,
  }
  if (result.errors.some(isLikelyASyntaxError)) {
    // If there are any syntax errors, show just them.
    result.errors = result.errors.filter(isLikelyASyntaxError)
  }
  return result
}

export {formatWebpackMessages as default}
