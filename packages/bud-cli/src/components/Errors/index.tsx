import React, {FunctionComponent} from 'react'
import {Box, Text} from 'ink'
import {Compilation} from '../../hooks/useCompilation'

interface ErrorProps {
  errors: Compilation['errors']
}

const Errors: FunctionComponent<ErrorProps> = ({errors}) => (
  <Box flexDirection="column">
    <Box
      flexDirection="column"
      borderColor="red"
      borderStyle="round"
      padding={1}>
      {errors.map((err, id) => (
        <Text key={id} wrap="wrap">
          {err}
        </Text>
      ))}
    </Box>
  </Box>
)

export {Errors as default}
