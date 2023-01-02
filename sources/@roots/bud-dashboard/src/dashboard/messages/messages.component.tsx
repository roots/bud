import chalk from '@roots/bud-support/chalk'
import Ink from '@roots/bud-support/ink'
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
    <Ink.Box flexDirection="column">
      {messages.map(({message}, id: number) => (
        <Ink.Box key={id} flexDirection="column">
          <Ink.Box flexDirection="row">
            <Ink.Text dimColor>├─</Ink.Text>
            <Ink.Text>{` `}</Ink.Text>
            <Ink.Text color={color}>{figure}</Ink.Text>
            <Ink.Text>{` `}</Ink.Text>
            <Ink.Text color={color}>{type}</Ink.Text>
          </Ink.Box>

          <Ink.Box flexDirection="column">
            <Ink.Text>{message}</Ink.Text>
            <Ink.Text dimColor>{chalk.dim(VERT)}</Ink.Text>
          </Ink.Box>
        </Ink.Box>
      ))}
    </Ink.Box>
  )
}

export default Messages
