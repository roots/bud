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
  if (!messages) return null

  return (
    <Box flexDirection="column">
      {messages.map(({message}, id: number) => (
        <Box key={id} flexDirection="column">
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
