import chalk from 'chalk'

import * as box from './box.factory.js'
import {theme} from './theme.js'

export const make = (
  {message, file}: {message: string; file?: string},
  color: string,
) => box.make(file ?? 'error', message, {color})

export const makeWarning = ({message, file, type}) =>
  `${chalk.bgHex(theme.foregroundColor).hex(theme.yellow)(
    type ?? ' WARNING ',
  )} ${file}\n\n${message}\n\n`

export const makeError = ({message, file, type}) =>
  `${chalk
    .bgHex(theme.red)
    .white(type ?? ' ERROR ')} ${file}\n${message}\n`

export const mapMessages = (
  messages: Array<{message: string; file: string}>,
  color: string,
) => messages.map(message => make(message, color))
