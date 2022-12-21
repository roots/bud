import chalk from '@roots/bud-support/chalk'
import {Box, Text} from '@roots/bud-support/ink'
import React from '@roots/bud-support/react'
import type {StatsCompilation} from '@roots/bud-support/webpack'

import {VERT} from '../format.js'

const Messages = ({
  figure,
  type,
  messages,
  color,
}: {
  figure: string
  type: ('error' | 'warning') & string
  messages: StatsCompilation['errors'] | StatsCompilation['warnings']
  color: string
}) => {
  const formatted = messages
    ?.reverse()
    .filter(({message}) => !message?.includes(`HookWebpackError`))
    .map(({message}: {message: string}) => ({
      message: message
        /* Discard unhelpful stack traces */
        .split(/  at /)
        .shift()
        /* Discard unhelpful stuff preceeding message */
        .split(/SyntaxError:?/)
        .pop()
        .split(/Error:?/)
        .pop()
        .split(/ModuleError:?/)
        .pop()
        /* Discard empty lines */
        .split(`\n`)
        // trim and format
        .filter(ln => ![``, ` `, `\n`].includes(ln))
        // replace cwd with `.`
        .map(ln => `${chalk.dim(VERT)} ${ln.replace(process.cwd(), `.`)}`)
        .join(`\n`),
    }))

  if (!formatted) return null

  return (
    <Box flexDirection="column">
      {formatted?.map(({message}, index: number) => (
        <Box key={index} flexDirection="column">
          <Box flexDirection="row">
            <Text dimColor>├─</Text>
            <Text>{` `}</Text>
            <Text color={color}>{figure}</Text>
            <Text>{` `}</Text>
            <Text color={color}>{type}</Text>
          </Box>

          <Box flexDirection="column">
            <Text>{message}</Text>
            <Text dimColor>{chalk.dim(VERT)}</Text>
          </Box>
        </Box>
      ))}
    </Box>
  )
}

export default Messages
