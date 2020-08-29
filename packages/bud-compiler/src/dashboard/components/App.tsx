import React, {useEffect, useState} from 'react'
import {Box, Spacer} from 'ink'
import {Nav} from './Nav'
import {BuildInfo} from './BuildInfo'

const App = ({children, state, build, bud, width, height}) => {
  const [focused, setFocused] = useState({})

  useEffect(() => {
    setFocused(state)
  }, [state])

  return (
    <Box
      width={width}
      minHeight={height}
      paddingRight={1}
      paddingBottom={1}
      paddingTop={1}
      flexDirection="column">
      <Nav build={build} focused={focused || {}} bud={bud} />
      {children}
      <Spacer />
      <BuildInfo build={build} width={width} />
    </Box>
  )
}

export {App}
