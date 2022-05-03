import {chalk} from '@roots/bud-support'

import {theme} from './theme'

export const make = (
  title: string,
  content: string,
  options?: {color?: string},
) =>
  `${chalk.hex(options?.color ?? theme.foregroundColor)(
    title,
  )}\n${content}`
