import React from 'react'
import {Box, Text} from 'ink'

export const Component = ({children, ...props}) => {
  return (
    <Box flexDirection="column" borderStyle="round" {...props}>
      <Text color={`white`} wrap="wrap">
        {children}
      </Text>
    </Box>
  )
}
