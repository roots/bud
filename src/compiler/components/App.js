/** Modules */
import React, {useState, useEffect} from 'react'
import {Box, Spacer} from 'ink'
import PropTypes from 'prop-types'

/** Application components */
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

const App = ({
  children,
  state,
  build,
  config,
  width,
  height,
}) => {
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
      <Nav
        build={build}
        focused={focused || {}}
        config={config}
      />
      {children}
      <Spacer />
      <BuildInfo
        build={build}
        config={config}
        width={width}
      />
    </Box>
  )
}

App.propTypes = {
  children: PropTypes.array,
  state: PropTypes.object,
  build: PropTypes.object,
  config: PropTypes.object,
  width: PropTypes.number,
  height: PropTypes.number,
}

export {App}
