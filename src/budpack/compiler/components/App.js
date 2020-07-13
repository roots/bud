/** Modules */
import React, {useState, useEffect} from 'react'
import {Box, Text, Spacer} from 'ink'
import PropTypes from 'prop-types'

/** Application components */
import {Nav} from './Nav'
import {Loading} from './Loading'
import {Watching} from './Watching'

/**
 * App: CLI Webpack Compiler
 *
 * @prop {React.Component[]} children
 * @prop {object}        state
 * @prop {object}        build
 * @prop {object}        options
 * @prop {number}        width
 * @prop {number}        height
 * @prop {React.Component}
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
      <Box flexDirection="column" paddingTop={1}>
        {build?.percentage == 1 && build?.hash && (
          <Text color="#6C758F" marginTop={1}>
            Build {build?.hash}. Finished in{' '}
            {build?.time / 1000}s.
          </Text>
        )}

        <Loading build={build} width={width} />
        {config?.features?.watching && (
          <Watching config={config} build={build} />
        )}
      </Box>
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
