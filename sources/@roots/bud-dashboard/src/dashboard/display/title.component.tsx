import Ink from '@roots/bud-support/ink'
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
    <Ink.Box flexDirection="row">
      <Ink.Text dimColor>
        {indent.map(indent => (indent ? `${VERT} ` : `  `))}
        {final ? `└─ ` : `├─ `}
      </Ink.Text>
      {children}
    </Ink.Box>
  )
}

export default Title
