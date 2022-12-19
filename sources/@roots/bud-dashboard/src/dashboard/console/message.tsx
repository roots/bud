import {Box, Text} from '@roots/bud-support/ink'
import React from '@roots/bud-support/react'

export interface Props {
  color: string
  label: string
  message: string
}

export const Message = ({label, message, color}: Props) => (
  <Box flexDirection="column">
    <Text>
      <Text color={color}>[{label}]</Text>
      {` `}
      <Text>{message}</Text>
    </Text>
  </Box>
)
