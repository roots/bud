import React, {FunctionComponent} from 'react'
import {Box, Text} from 'ink'

const Publish: FunctionComponent<{file: string}> = ({file}) => (
  <Box
    display="flex"
    margin={1}
    justifyContent="flex-start"
    flexDirection="column">
    <Box display="flex" margin={1} justifyContent="flex-start">
      <Text>
        <Text color="green" bold>
          {file}
        </Text>{' '}
        copied to{' '}
        <Text color="green" bold>
          {process.cwd()}/publish/{file}
        </Text>
      </Text>
    </Box>
  </Box>
)

export {Publish as default}
