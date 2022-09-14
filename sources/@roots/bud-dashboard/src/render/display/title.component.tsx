import {Box, Text} from '@roots/bud-support/ink'
import React from '@roots/bud-support/react'

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
