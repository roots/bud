import chalk from 'chalk'
import {Box, Text} from 'ink'
import React from 'react'
import type {StatsCompilation} from 'webpack'
import {formatMessage} from 'webpack-format-messages'

import {SPACE, VERT} from '../format.js'

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
    ?.filter(str => !str.moduleIdentifier)
    ?.map(formatMessage)
    ?.map((message: string) =>
      message
        .replace(/^\t/g, '')
        .split('\n')
        .map(
          (ln, id) =>
            `${chalk.dim(VERT)}${SPACE}${ln.replace(process.cwd(), '.')}`,
        )
        .join('\n'),
    )

  if (!formatted) return null

  return (
    <Box flexDirection="column">
      {formatted?.map((msg: string, index: number) => (
        <Box key={index} flexDirection="column">
          <Box flexDirection="row">
            <Text dimColor>├─{SPACE}</Text>

            <Text color={color}>
              {figure}
              {SPACE}
              {type}
            </Text>
          </Box>

          <Box flexDirection="column">
            <Text>{msg.trim() as string}</Text>
          </Box>
        </Box>
      ))}
    </Box>
  )
}

export default Messages
