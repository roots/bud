import React, {useState, useCallback, useRef} from 'react'
import {Box, Newline, Text, useInput, Static} from 'ink'
import {isEqual} from 'lodash'
import {durationFormatter, sizeFormatter} from 'human-readable'
import patchConsole from 'patch-console'

import {useStyle} from '@roots/ink-use-style'
import {Progress} from './Progress'

import {Framework} from '@roots/bud-framework'
import {StatsCompilation} from 'webpack/types'

const useFormatter = () => {
  return {
    fileSize: sizeFormatter({
      decimalPlaces: 2,
      keepTrailingZeroes: false,
    }),
    duration: durationFormatter({
      allowMultiples: ['m', 's', 'ms'],
    }),
  }
}

const useForceUpdate = () => {
  const [, forceUpdate] = React.useState(true)

  return useCallback(() => {
    forceUpdate(s => !s)
  }, [])
}

const RawDashboard = ({bud}: {bud: Framework}) => {
  useForceUpdate()
  const instance = useRef<Framework>(bud)
  const {fileSize, duration} = useFormatter()

  const theme = useStyle(bud?.store?.get('theme'))
  const [progress, setProgress] = useState<any>(null)
  const [stats, setStats] = useState<StatsCompilation>({
    errors: [],
  })

  const [stdout, _setStdout] = useState<string[]>([])
  patchConsole(() => null)

  setInterval(() => {
    setStats(instance.current.compiler.stats)
    setProgress(instance.current.compiler.progress)
  }, 10)

  useInput(input => {
    if (isEqual(input, 'q')) {
      try {
        bud.compiler.instance.close(() => {
          setTimeout(() => process.exit(), 10)
        })
      } catch (err) {}
    }
  })

  return (
    <Box flexDirection="column">
      <Static flexDirection="column" items={stdout}>
        {(stdout, k) =>
          stdout ? (
            <Text key={`stdout-${k}`}>
              {stdout ?? ''}
              <Newline />
            </Text>
          ) : (
            []
          )
        }
      </Static>

      {stats?.errors?.length <= 1 &&
        progress &&
        stats?.children?.map((child, id) => (
          <Box
            key={`stats-${child.name}-${id}`}
            marginBottom={1}
            flexDirection={'column'}>
            <Text backgroundColor={theme.colors.primary}>
              {' '}
              {child.name}{' '}
            </Text>

            <Box flexDirection="column" marginY={1}>
              {child.assets
                .filter(
                  ({name, size}) =>
                    !name.includes('.json') &&
                    !name.includes('hot-update') &&
                    size > 0,
                )
                .map((asset, id) => (
                  <Box
                    key={`asset-${id}`}
                    flexDirection="row"
                    justifyContent="flex-start">
                    <Box
                      width={theme.ctx([
                        theme.col(12),
                        theme.col(4),
                      ])}>
                      <Text wrap="truncate-end">
                        {' '}
                        - {asset.name}
                      </Text>
                    </Box>

                    <Box
                      width={theme.ctx([
                        theme.col(12),
                        theme.col(4),
                      ])}>
                      {asset?.info?.minimized && (
                        <Text color={theme.colors.success}>
                          minimized
                        </Text>
                      )}
                    </Box>

                    <Box
                      width={theme.ctx([
                        theme.col(12),
                        theme.col(4),
                      ])}>
                      <Text>{fileSize(asset.size)}</Text>
                    </Box>
                  </Box>
                ))}
            </Box>
            <Text>Compiled in {duration(child.time)}</Text>
          </Box>
        ))}

      {progress && progress[0] && progress[0] < 1 ? (
        <Progress
          progress={progress}
          theme={theme}
          mode={instance.current.mode}
        />
      ) : (
        instance.current.mode == 'development' && (
          <Box flexDirection="column" marginBottom={1}>
            <Text color={theme?.colors.faded}>
              Press Q to exit
            </Text>
          </Box>
        )
      )}
    </Box>
  )
}

export {RawDashboard}
