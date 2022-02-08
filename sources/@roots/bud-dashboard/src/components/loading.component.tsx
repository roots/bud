import {Box, Text} from 'ink'
import Spinner from 'ink-spinner'
import React from 'react'

/**
 * Loading component
 *
 * @public
 */
export const Loading = () => {
  return (
    <Box flexDirection="column">
      <Text>
        <Spinner /> Loading
      </Text>
    </Box>
  )
}
