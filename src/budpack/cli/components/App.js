import React, {useState, useEffect} from 'react'
import {Box, Spacer, Text} from 'ink'
import Spinner from 'ink-spinner'
import ProgressBar from 'ink-progress-bar'
import useStdOutDimensions from 'ink-use-stdout-dimensions'

const Bullet = ({active}) => (
  <Text>{active ? '◉' : ' '}</Text>
)

/**
 * App frame
 *
 * @prop {React.Element} children
 */
const App = ({children, state, build, mode}) => {
  const [width] = useStdOutDimensions()

  const [focused, setFocused] = useState({})
  useEffect(() => {
    setFocused(state)
  }, [state])

  return (
    <Box padding={1} flexDirection="column">
      <Box
        flexDirection="row"
        justifyContent="space-between">
        <Box>
          <Text color={'#545DD7'}>@roots/bud</Text>
        </Box>
        <Spacer />
        <Spacer />
        <Spacer />
        <Box>
          <Text
            color={focused?.assets ? 'white' : '#6C758F'}>
            <Bullet active={focused.assets} /> Assets
          </Text>
        </Box>
        <Spacer />
        <Box>
          <Text
            color={
              build?.errors?.length > 0
                ? '#dc3545'
                : focused?.errors
                ? 'white'
                : '#6C758F'
            }>
            <Bullet active={focused?.errors} /> Errors
            {build?.errors?.length > 0
              ? ` [${build?.errors.length}]`
              : `  `}
          </Text>
        </Box>
        <Spacer />
        <Box>
          <Text
            color={
              focused?.browserSync ? 'white' : '#6C758F'
            }>
            <Bullet active={focused.browserSync} />{' '}
            BrowserSync{' '}
          </Text>
        </Box>
      </Box>
      {build?.assets?.length > 0 && (
        <Box
          padding={1}
          flexDirection="column"
          borderColor="#6C758F"
          borderStyle="round">
          {children}
        </Box>
      )}

      {build?.percentage == 1 && build?.buildStats?.hash && (
        <Text color="#6C758F" marginTop={1}>
          Build {build?.buildStats?.hash}. Finished in{' '}
          {build.buildStats.time / 1000}s
        </Text>
      )}

      <Box flexDirection="row" marginTop={1}>
        {build?.percentage == 0 && (
          <Box flexDirection="row">
            <Text color="gray">Reticulating splines</Text>
          </Box>
        )}

        {build?.percentage > 0 && build.percentage < 1 && (
          <Box
            maxWidth={width - 8}
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
        )}
      </Box>

      {mode == 'development' &&
        (build?.errors?.length > 0 ? (
          <Text color="#dc3545">
            <Text>
              <Spinner type="dots" />
            </Text>
            {' Watching for fixes'}
          </Text>
        ) : (
          build?.percentage == 1 && (
            <Text color="#28a745">
              <Text>
                <Spinner type="dots" />
              </Text>
              {' Watching for changes'}
            </Text>
          )
        ))}
    </Box>
  )
}

export default App
