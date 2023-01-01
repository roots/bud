import Ink from '@roots/bud-support/ink'
import React from '@roots/bud-support/react'

import {VERT} from '../format.js'

const Space = ({
  children,
  final = false,
}: React.PropsWithChildren<{final?: boolean}>) => {
  const arrayedChildren = Array.isArray(children) ? children : [children]

  return (
    <Ink.Box flexDirection="column">
      {arrayedChildren.map((Child, index) => (
        <Ink.Box key={index} flexDirection="row">
          <Ink.Text dimColor>{!final ? VERT : `  `}</Ink.Text>
          {Child}
        </Ink.Box>
      ))}
    </Ink.Box>
  )
}

export default Space
