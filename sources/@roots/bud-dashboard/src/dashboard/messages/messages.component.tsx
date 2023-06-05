import {Box, Text} from 'ink'
import type {StatsCompilation} from 'webpack'

export default function Messages({
  figure,
  type,
  messages,
  color,
}: {
  figure: string
  type: `error` | `warning`
  messages: StatsCompilation['errors'] | StatsCompilation['warnings']
  color: string
}) {
  if (!messages?.length) return null

  return (
    <Box flexDirection="column">
      {messages.map((error, id: number) => (
        <Message
          key={id}
          error={error}
          color={color}
          figure={figure}
          type={type}
        />
      ))}
    </Box>
  )
}

const Message = ({error, color, figure, type}) =>
  !error ? null : (
    <Box flexDirection="column" marginBottom={1}>
      <Box
        flexDirection="column"
        paddingLeft={1}
        borderStyle="bold"
        borderRight={false}
        borderTop={false}
        borderBottom={false}
        borderLeftColor={color}
      >
        <Text>
          {`\n`}
          {error.message.trim()}
          {`\n`}
        </Text>
      </Box>
    </Box>
  )
