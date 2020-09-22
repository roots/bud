import React, {FunctionComponent} from 'react'
import {Box, Text} from 'ink'

interface ErrorProps {
  message: {errors: string; warnings: string}
}

const Error: FunctionComponent<ErrorProps> = ({message}) => (
  <Box flexDirection="column">
    <Box
      flexDirection="column"
      borderColor="red"
      borderStyle="round"
      padding={1}>
      <Text wrap="wrap">{message || ''}</Text>
    </Box>
  </Box>
)

export {Error as default}
