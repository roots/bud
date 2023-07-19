import {Box, Text} from '@roots/bud-support/ink'

export default function Messages({
  messages,
  ...props
}: {
  color: string
  messages: Array<{message: string}>
}) {
  if (!messages?.length) return null

  return (
    <Box flexDirection="column" gap={1} overflowX="hidden">
      {messages.map((error, id: number) => (
        <Message error={error} key={id} {...props} />
      ))}
    </Box>
  )
}

const Message = ({color, error}) =>
  error?.message && (
    <Box
      borderBottom={false}
      borderLeftColor={color ?? `gray`}
      borderRight={false}
      borderStyle="single"
      borderTop={false}
      flexDirection="column"
      overflowX="hidden"
      paddingLeft={1}
    >
      <Text>{error.message}</Text>
    </Box>
  )
