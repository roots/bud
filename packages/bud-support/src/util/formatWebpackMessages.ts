import chalk from 'chalk'

const friendlySyntaxErrorLabel = 'Syntax error:'

const isLikelyASyntaxError = message =>
  message.indexOf(friendlySyntaxErrorLabel) !== -1

const filterForSyntaxErrors = errors =>
  errors.some(isLikelyASyntaxError)
    ? errors.filter(isLikelyASyntaxError)
    : errors

/**
 * @see https://github.com/webpack/webpack/blob/master/lib/ModuleError.js
 */
const formatMessage = (message: string) => {
  const lines = message
    .split('\n')
    .filter(line => !/Module [A-z ]+\(from/.test(line))
    .map(line => {
      const parsingError = /Line (\d+):(?:(\d+):)?\s*Parsing error: (.+)$/.exec(
        line,
      )

      if (!parsingError) {
        return line
      }

      const [
        ,
        errorLine,
        errorColumn,
        errorMessage,
      ] = parsingError

      return `${friendlySyntaxErrorLabel} ${errorMessage} (${errorLine}:${errorColumn})`
    })
    .join('\n')
    .replace(
      /SyntaxError\s+\((\d+):(\d+)\)\s*(.+?)\n/g,
      `${friendlySyntaxErrorLabel} $3 ($1:$2)\n`,
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
    .split('\n')

  lines.length > 2 &&
    lines[1].trim() === '' &&
    lines.splice(1, 1)

  return [
    chalk`{bgRed.whiteBright  ${lines[0]
      .split(/ \(/)[0]
      .replace('./', '')} } `
      .concat(
        lines[1]
          .replace('Error:', '')
          .replace(
            'Module not found: Cannot find file:',
            'Cannot find file:',
          )
          .replace('resolve-url-loader: CSS error', 'CSS Error')
          .trim(),
      )
      .trim()
      .concat('\n'),
    ...lines.splice(2),
  ]
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
    .map(line => line.trim())
    .join('\n')
    .replace(/@ /, `\n@`)
    .trim()
}

export const formatWebpackMessages = (json: {
  [key: string]: any
}): {[key: string]: any} => ({
  errors: filterForSyntaxErrors(json.errors.map(formatMessage)),
  warnings: json.warnings.map(formatMessage),
})
