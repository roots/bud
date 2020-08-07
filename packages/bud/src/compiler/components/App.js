import React, {useEffect, useState} from 'react'
import {Box, Spacer} from 'ink'
import PropTypes from 'prop-types'
import {Nav} from './Nav'
import {BuildInfo} from './BuildInfo'

/**
 * App
 *
 * @prop {React.Component[]} children
 * @prop {object} state
 * @prop {object} build
 * @prop {object} options
 * @prop {number} width
 * @prop {number} height
 * @return {PropTypes.Component}
 */
const App = ({children, state, build, bud, width, height}) => {
  const [focused, setFocused] = useState({})

  useEffect(() => {
    setFocused(state)
  }, [state])

  return (
    <Box
      width={width}
      maxWidth={width}
      minHeight={height}
      textWrap="truncate"
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

App.propTypes = {
  children: PropTypes.array,
  state: PropTypes.object,
  build: PropTypes.object,
  bud: PropTypes.object,
  width: PropTypes.number,
  height: PropTypes.number,
}

export {App}
