import {Box, Text} from '@roots/bud-support/ink'

export default function Messages({
  messages,
  ...props
}: {
  color?: string
  messages?: Array<{message: string}>
}) {
  if (!messages?.length) return null

  return (
    <Box flexDirection="column" gap={1} overflowX="hidden">
      {messages.map((message, id: number) => (
        <Message key={id} message={message.message} {...props} />
      ))}
    </Box>
  )
}

const Message = ({color, message}: {color?: string; message?: string}) =>
  !message ? null : (
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
      <Text>{message}</Text>
    </Box>
  )
