import React, {FunctionComponent} from 'react'
import {Box, Text} from 'ink'

interface TitleInterface {
  children: string
}

const Title: FunctionComponent<TitleInterface> = ({
  children,
}) => (
  <Box flexDirection="column" marginTop={1} marginBottom={1}>
    <Text backgroundColor={'#545DD7'} color={'white'}>
      {` ${children} `}
    </Text>
  </Box>
)

export {Title as default}
