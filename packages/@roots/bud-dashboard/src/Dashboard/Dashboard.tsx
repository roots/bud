/**
 * @module @roots/bud-dashboard
 */

import type {Framework} from '@roots/bud-framework'
import {useStyle} from '@roots/ink-use-style'
import {Box, Newline, Static, Text, useStdin} from 'ink'
import {isEqual} from 'lodash'
import * as patchConsole from 'patch-console'
import * as React from 'react'
import {Fragment, useRef, useState} from 'react'
import type {StatsCompilation} from 'webpack'

import {Progress} from '../components/Progress'
import {useForceUpdate} from '../hooks/useForceUpdate'
import {useFormatter} from '../hooks/useFormatter'
import {Input} from './Input'

/**
 * @const Dashboard
 */
const Dashboard = ({bud}: {bud: Framework}) => {
  const instance = useRef<Framework>(bud)
  const [stderr, setStderr] = useState<string[]>([])
  const [progress, setProgress] = useState<any>(null)
  const [stats, setStats] = useState<StatsCompilation>({
    errors: [],
  })

  const {isRawModeSupported} = useStdin()
  const {fileSize, duration} = useFormatter()
  const theme = useStyle(bud?.store?.get('theme'))

  patchConsole((stream, data) => {
    isEqual(stream, 'stderr') && setStderr([...stderr, data])
  })

  setInterval(() => {
    setStats(instance.current.compiler.stats)
    setProgress(instance.current.compiler.progress)
  }, 10)

  useForceUpdate()

  return (
    <Box flexDirection="column">
      {isRawModeSupported && <Input bud={instance.current} />}
      <Static items={stderr}>
        {(stdout, k) => (
          <Text key={`stdout-${k}`}>
            {stdout ?? ''}
            <Newline />
          </Text>
        )}
      </Static>

      <Static items={stats?.errors ?? []}>
        {(err, k) =>
          err ? (
            <Fragment key={`stats-err-${k}`}>
              <Newline />
              <Text>
                {err.file ? `Error in ${err.file}` : ``}
              </Text>
              <Text>{err.message ?? ''}</Text>
            </Fragment>
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

/**
 * @exports Dashboard
 */
export {Dashboard}
