import {React, Text, Box} from '@roots/bud-support'

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
