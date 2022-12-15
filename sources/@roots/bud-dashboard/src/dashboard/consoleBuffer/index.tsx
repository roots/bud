import {Box, Text} from '@roots/bud-support/ink'
import React from '@roots/bud-support/react'

const ConsoleBuffer = ({
  color,
  label,
  messages,
}: {
  color: string
  label: string
  messages: Array<string>
}) => {
  return (
    <>
      {messages.map((message, id) => (
        <Box flexDirection="column" key={id}>
          <Text>
            <Text color={color}>[{label}]</Text> <Text>{message}</Text>
          </Text>
        </Box>
      ))}
    </>
  )
}

export default ConsoleBuffer
