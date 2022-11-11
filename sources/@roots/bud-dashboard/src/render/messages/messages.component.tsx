import {Box, Text} from '@roots/bud-support/ink'
import React from '@roots/bud-support/react'
import chalk from 'chalk'
import type {StatsCompilation} from 'webpack'

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
  const formatted = messages?.reverse().map(({stack, message}) => ({
    stack,
    message: message
      .split(`\n`)
      .map(ln => `${chalk.dim(VERT)} ${ln.replace(process.cwd(), `.`)}`)
      .join(`\n`)
      .split(`    at`)
      .shift(),
  }))

  if (!formatted) return null

  return (
    <Box flexDirection="column">
      {formatted?.map(({message, stack}, index: number) => (
        <Box key={index} flexDirection="column">
          <Box flexDirection="row">
            <Text dimColor>├─</Text>
            <Text>{` `}</Text>
            <Text color={color}>{figure}</Text>
            <Text>{` `}</Text>
            <Text color={color}>{type}</Text>
          </Box>

          <Box flexDirection="column">
            <Text>{message.trim() as string} </Text>
            <Text dimColor>{chalk.dim(VERT)}</Text>
          </Box>
        </Box>
      ))}
    </Box>
  )
}

export default Messages
