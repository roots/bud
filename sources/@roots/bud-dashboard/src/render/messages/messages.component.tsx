import chalk from 'chalk'
import {Box, Text} from 'ink'
import React from 'react'
import type {StatsCompilation} from 'webpack'
import {formatMessage} from 'webpack-format-messages'

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
  const formatted = messages?.map(formatMessage)?.map((message: string) =>
    message
      .split(`\n`)
      .filter(ln => !ln.includes(`ModuleBuildError:`))
      .map(
        (ln, id) =>
          `${chalk.dim(VERT)} ${ln
            .replace(process.cwd(), `.`)
            .replace(/^\t/g, ``)}`,
      )
      .join(`\n`),
  )

  if (!formatted) return null

  return (
    <Box flexDirection="column">
      {formatted?.map((msg: string, index: number) => (
        <Box key={index} flexDirection="column">
          <Box flexDirection="row">
            <Text dimColor>├─</Text>
            <Text>{` `}</Text>
            <Text color={color}>{figure}</Text>
            <Text>{` `}</Text>
            <Text color={color}>{type}</Text>
          </Box>

          <Box flexDirection="column">
            <Text>{msg.trim() as string}</Text>
            <Text dimColor>{chalk.dim(VERT)}</Text>
          </Box>
        </Box>
      ))}
    </Box>
  )
}

export default Messages
