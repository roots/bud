import * as Ink from 'ink'
import Spinner from 'ink-spinner'
import React from 'react'

const BootDisplay = () => {
  return (
    <Ink.Box marginY={1}>
      <Ink.Text color="green">
        <Spinner /> initializing
      </Ink.Text>
    </Ink.Box>
  )
}

export const Boot = () => Ink.render(<BootDisplay />)
