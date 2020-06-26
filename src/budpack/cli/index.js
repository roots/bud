import React, {useEffect, useState} from 'react'
import {Color, Box, Text} from 'ink'
import ProgressBar from 'ink-progress-bar'
import Spinner from 'ink-spinner'
import Gradient from 'ink-gradient'

import useStdOutDimensions from 'ink-use-stdout-dimensions'
import useWebpack from './hooks/useWebpack'

import Error from './components/Error'
import Assets from './components/Assets'
import App from './components/App'

import notifier from 'node-notifier'

/**
 * Budpack build status display
 *
 * @prop {object} compiler webpack compiler
 * @prop {string} mode watch or run
 */
const BudpackCLI = ({compiler, mode}) => {
  const [width] = useStdOutDimensions()
  const build = useWebpack({compiler, mode})
  const [errors, setErrors] = useState(null)
  useEffect(() => {
    build?.buildStats?.errors &&
      setErrors(build.buildStats.errors)
  }, [build])

  useEffect(() => {
    !errors?.length > 0 &&
      build?.percentage == 1 &&
      notifier.notify({
        title: 'Build complete',
        message: 'Project assets have been live reloaded.',
      })
  }, [build?.percentage, errors])

  return (
    <App>
      <Box flexDirection="row" marginBottom={1}>
        <Box marginRight={1}>
          <Text>
            <Color hex={'#545DD7'}>⚡️ @roots/bud</Color>
          </Text>
        </Box>

        {build?.percentage == 0 && (
          <Box flexDirection="row" marginRight={1}>
            <Color gray>Reticulating splines</Color>
          </Box>
        )}

        {build?.percentage == 1 && build?.buildStats?.hash && (
          <Box flexDirection="row">
            {errors?.length > 0 && (
              <Text>
                <Color hex="#dc3545">Errors </Color>
              </Text>
            )}
            {errors?.length == 0 && (
              <Text>
                <Color hex="#28a745">Success </Color>
              </Text>
            )}
            <Text>
              <Color hex="#6C758F">
                Build {build?.buildStats?.hash}. Finished in{' '}
                {build.buildStats.time / 1000}s
              </Color>
            </Text>
          </Box>
        )}

        {build?.percentage > 0 && build.percentage < 1 && (
          <Box
            maxWidth={width - 8}
            textWrap="truncate"
            flexDirection="row">
            <Color bgHex={'#171c56'}>
              <Text width={6}>
                {' '}
                {Math.round(build?.percentage * 100)}%
                {build?.percentage < 1 ? '  ' : ' '}
              </Text>
            </Color>
            <Gradient colors={['#545DD7', '#323fd6']}>
              <ProgressBar
                character="█"
                left={10}
                right={8}
                percent={build?.percentage ?? 0.01}
              />
            </Gradient>
          </Box>
        )}
      </Box>

      {errors?.length > 0 && (
        <Box flexDirection="column" marginBottom={1}>
          {errors?.map((error, id) => (
            <Error error={error} key={id} />
          ))}
        </Box>
      )}

      {build?.assets?.length > 0 && (
        <Box marginBottom={1} flexDirection="column">
          <Assets
            errors={errors}
            width={width - 2}
            assets={build?.assets}
          />
        </Box>
      )}

      <Text>
        {mode == 'development' && (
          <Color hex="#28a745">
            {errors?.length > 0 ? (
              <Color hex="#dc3545">
                <Spinner /> Watching for fixes
              </Color>
            ) : (
              build?.percentage == 1 && (
                <>
                  <Spinner /> Watching for changes
                </>
              )
            )}
          </Color>
        )}
      </Text>
    </App>
  )
}

export default BudpackCLI
