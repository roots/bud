import React, {useEffect, useState} from 'react'
import {Color, Box, Text} from 'ink'
import ProgressBar from 'ink-progress-bar'
import Spinner from 'ink-spinner'

import useStdOutDimensions from 'ink-use-stdout-dimensions'
import useWebpack from './hooks/useWebpack'

import notifier from 'node-notifier'

import Assets from './components/Assets'

console.log = () => null
console.error = () => null
console.dir = () => null

const Error = ({error}) => {
  const lines = error.split('\n').splice(0, 2)
  const file = lines[0]
  const message = lines[1]
  const [noticeSet, setNoticeSet] = useState(null)

  useEffect(() => {
    message &&
      !noticeSet &&
      notifier.notify({
        title: 'Build error',
        message: message,
        subtitle: 'There was a problem with your build',
      })
  }, [noticeSet, message])

  return (
    <Box marginTop={1} flexDirection="column">
      <Box marginRight={2} textWrap="truncate">
        <Text textWrap="truncate">
          <Color red>
            ⚠️{'  '}
            {file}
          </Color>
        </Text>
      </Box>
      <Box textWrap="truncate">{message}</Box>
    </Box>
  )
}

/**
 * Budpack build status display
 *
 * @prop {object} compiler webpack compiler
 * @prop {string} mode watch or run
 */
const BudpackCLI = ({compiler, mode}) => {
  const [width, height] = useStdOutDimensions()
  const build = useWebpack({compiler, mode})
  const [errors, setErrors] = useState(null)
  useEffect(() => {
    build?.buildStats && setErrors(build.buildStats.errors)
  }, [build])

  useEffect(() => {
    build?.percentage &&
      !errors?.length > 0 &&
      build.percentage == 1 &&
      notifier.notify({
        title: 'Build complete',
        message: 'Project assets have been live reloaded.',
      })
  }, [build?.percentage, errors])

  return (
    <Box
      flexDirection="column"
      height={height - 1}
      padding={1}>
      <Color green>⚡️ @roots/bud</Color>

      <Box flexDirection="row" marginTop={1}>
        <Box minWidth={13} marginRight={3}>
          {Math.round(build?.percentage * 100)}% complete
        </Box>

        <Box>
          <Color blue>
            <ProgressBar
              maxWidth={width - 2}
              left={18}
              percent={build?.percentage ?? 0.01}
            />
          </Color>
        </Box>
      </Box>

      {errors?.map((error, id) => (
        <Error error={error} key={id} />
      ))}

      <Box
        maxWidth={width - 2}
        width={width - 2}
        marginTop={1}
        marginBottom={1}>
        <Assets width={width - 2} assets={build?.assets} />
      </Box>

      <Text>
        {mode == 'development' && (
          <Color green>
            {build?.percentage == 1 && (
              <>
                <Spinner /> Watching files
              </>
            )}
          </Color>
        )}
      </Text>
    </Box>
  )
}

export default BudpackCLI
