import chalk from 'chalk'

import {theme} from '../../theme.js'

export const make = (
  title: string,
  content: string,
  options?: {color?: string},
) =>
  `${chalk.hex(options?.color ?? theme.foregroundColor)(
    title,
  )}\n${content}`
