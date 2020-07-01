import React, {useState, useEffect} from 'react'
import {Box, Text, Spacer} from 'ink'
import Spinner from 'ink-spinner'
import ProgressBar from 'ink-progress-bar'

import Nav from './Nav'

/**
 * Loading (Progress Plugin)
 */
const Loading = ({build, width}) =>
  build?.percentage > 0 && build?.percentage < 1 ? (
    <Box
      maxWidth={width}
      textWrap="truncate"
      flexDirection="row">
      <Text bgcolor={'#171c56'}>
        <Text width={6}>
          {Math.round(build?.percentage * 100)}%
          {build?.percentage < 1 ? '  ' : ' '}
        </Text>
      </Text>

      <Text color={'#545DD7'}>
        <ProgressBar
          character="█"
          percent={build?.percentage ?? 0.01}
        />
      </Text>
    </Box>
  ) : (
    []
  )

/**
 * Watch mode indicator
 */
const Watching = ({options, build}) => (
  <Box flexDirection="row">
    {options?.mode == 'development' &&
    build?.errors?.length > 0 ? (
      <Text color="#dc3545">
        <Text>
          <Spinner type="dots" />
        </Text>
        {' Watching for fixes'}
      </Text>
    ) : build?.percentage == 1 ? (
      <Text color="#28a745">
        <Text>
          <Spinner type="dots" />
        </Text>
        {' Watching for changes'}
      </Text>
    ) : (
      []
    )}
  </Box>
)

/**
 * App frame
 *
 * @prop {React.Element} children
 * @prop {object}        state
 * @prop {object}        build
 * @prop {object}        options
 * @prop {number}        width
 */
const App = ({children, state, build, options, width}) => {
  const [focused, setFocused] = useState({})
  useEffect(() => {
    setFocused(state)
  }, [state])

  return (
    <Box
      textWrap="truncate"
      paddingRight={1}
      paddingBottom={1}
      paddingTop={1}
      flexDirection="column">
      <Nav
        build={build}
        focused={focused}
        options={options}
      />
      {children}
      <Spacer />
      <Box flexDirection="column" paddingTop={1}>
        {build?.percentage == 1 && build?.buildStats?.hash && (
          <Text color="#6C758F" marginTop={1}>
            Build {build?.buildStats?.hash}. Finished in{' '}
            {build?.buildStats?.time / 1000}s
          </Text>
        )}
        <Loading build={build} width={width} />
        <Watching options={options} build={build} />
      </Box>
    </Box>
  )
}

export default App
