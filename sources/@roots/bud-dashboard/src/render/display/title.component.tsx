import {Box, Text} from 'ink'
import React from 'react'

import {VERT} from '../format.js'

const Title = ({
  children,
  final = false,
  indent = [],
}: React.PropsWithChildren<{
  final?: boolean
  inset?: number
  indent?: Array<boolean>
}>) => {
  return (
    <Box flexDirection="row">
      <Text dimColor>
        {indent.map(indent => (indent ? `${VERT} ` : `  `))}
        {final ? `└─ ` : `├─ `}
      </Text>

      {children}
    </Box>
  )
}

export default Title
