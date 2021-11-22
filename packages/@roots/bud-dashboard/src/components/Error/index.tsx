import {Box, Text} from 'ink'
import React from 'react'

/**
 * Error component
 *
 * @public
 */
export const Error = ({title = 'Error', body}) => {
  return (
    <Box
      flexDirection="column"
      borderColor="red"
      borderStyle="round"
      marginBottom={1}
      padding={1}
    >
      <Text wrap="wrap" bold>
        {title}
      </Text>

      <Text wrap="wrap">{body}</Text>
    </Box>
  )
}
