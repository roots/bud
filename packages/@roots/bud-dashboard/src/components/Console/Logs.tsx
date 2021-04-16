import React from 'react'
import {Box, Text} from 'ink'

/**
 * Non-static logs
 */
export const Logs = ({logs}) => (
  <Box marginBottom={1} flexDirection="column">
    <Box>
      <Text>{logs.pop()}</Text>
    </Box>
  </Box>
)
