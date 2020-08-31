import React, {FunctionComponent} from 'react'
import {Box, Text} from 'ink'

interface TitleInterface {
  children: string
}

const Title: FunctionComponent<TitleInterface> = ({children}) => (
  <Box flexDirection="column" marginTop={1} marginBottom={1}>
    <Text color="white" bold>
      {children}
    </Text>
  </Box>
)

export {Title as default}
