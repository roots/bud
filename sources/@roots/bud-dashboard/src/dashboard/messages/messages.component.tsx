import figures from '@roots/bud-support/figures'
import chalk from 'chalk'
import * as Ink from 'ink'
import type {StatsCompilation} from 'webpack'

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
  if (!messages?.length) return null

  return (
    <Ink.Box flexDirection="column">
      {messages.map(({message}, id: number) => (
        <Ink.Box key={id} flexDirection="column">
          <Ink.Box flexDirection="row">
            <Ink.Text dimColor>├─</Ink.Text>
            <Ink.Text>{` `}</Ink.Text>
            <Ink.Text color={color}>{figure}</Ink.Text>
            <Ink.Text>{`  `}</Ink.Text>
            <Ink.Text color={color}>{type}</Ink.Text>
          </Ink.Box>

          <Ink.Box flexDirection="column">
            <Ink.Text>{chalk.dim(figures.lineVertical)}</Ink.Text>
            <Ink.Text>{message.trim()}</Ink.Text>
            <Ink.Text dimColor>{chalk.dim(figures.lineVertical)}</Ink.Text>
          </Ink.Box>
        </Ink.Box>
      ))}
    </Ink.Box>
  )
}

export default Messages
