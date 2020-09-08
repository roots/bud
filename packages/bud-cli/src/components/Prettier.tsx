import React from 'react'
import {Box, Text, Spacer} from 'ink'
import {Bud} from '@roots/bud-typings'
import {highlight} from 'cli-highlight'
import {format} from 'prettier'

const Prettier = ({code, options}) => (
  <Box
    marginTop={1}
    flexDirection="column"
    justifyContent="flex-start"
    alignItems="flex-start"
    alignSelf="flex-start">
    <Text>
      {highlight(format(code, options ?? {parser: 'babel'}))}
    </Text>
  </Box>
)

export {Prettier as default}
