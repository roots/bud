import {Box, Text} from '@roots/bud-support/ink'
import React from '@roots/bud-support/react'

import {VERT} from '../format.js'

interface Props
  extends React.PropsWithChildren<{
    final?: boolean
    inset?: number
    indent?: Array<boolean>
  }> {}

const Title = ({children, final = false, indent = []}: Props) => {
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
