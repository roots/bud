import type {StatsCompilation} from 'webpack'

import {Box, Text} from '@roots/bud-support/ink'

export default function Messages({
  color,
  figure,
  messages,
  type,
}: {
  color: string
  figure: string
  messages: StatsCompilation['errors'] | StatsCompilation['warnings']
  type: `error` | `warning`
}) {
  if (!messages?.length) return null

  return (
    <Box flexDirection="column">
      {messages.map((error, id: number) => (
        <Message
          color={color}
          error={error}
          figure={figure}
          key={id}
          type={type}
        />
      ))}
    </Box>
  )
}

const Message = ({color, error, figure, type}) =>
  !error ? null : (
    <Box flexDirection="column" marginBottom={1}>
      <Box
        borderBottom={false}
        borderLeftColor={color}
        borderRight={false}
        borderStyle="bold"
        borderTop={false}
        flexDirection="column"
        paddingLeft={1}
      >
        <Text>
          {`\n`}
          {error.message.trim()}
          {`\n`}
        </Text>
      </Box>
    </Box>
  )
