import {Box, Text} from 'ink'
import React from 'react'

import {SPACE, VERT} from '../format.js'

const Space = ({
  children,
  final = false,
}: React.PropsWithChildren<{final?: boolean}>) => {
  const arrayedChildren = Array.isArray(children) ? children : [children]

  return (
    <Box flexDirection="column">
      {arrayedChildren.map((Child, index) => (
        <Box key={index} flexDirection="row">
          <Text dimColor>
            {!final ? VERT : SPACE}
            {SPACE}
            {SPACE}
          </Text>

          {Child}
        </Box>
      ))}
    </Box>
  )
}

export default Space
