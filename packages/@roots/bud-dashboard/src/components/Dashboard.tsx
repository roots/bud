import type {Framework} from '@roots/bud-framework'
import {
  Ink,
  InkSpinner,
  InkUseStyle,
  React,
} from '@roots/bud-support'
import {isEqual} from 'lodash'
import patchConsole from 'patch-console'
import type {StatsCompilation} from 'webpack'

import {useForceUpdate} from '../hooks/useForceUpdate'
import {useFormatter} from '../hooks/useFormatter'
import {Input} from './Input'
import {Progress} from './Progress'

const {useStyle} = InkUseStyle
const {Fragment, useRef, useState} = React
const {Box, Newline, Static, Text, useStdin} = Ink

/**
 * Dashboard display component
 *
 * @param app - {@link @roots/bud-framework#Framework | Framework}
 * @returns ReactElement
 *
 * @public
 */
const Dashboard = ({bud}: {bud: Framework}) => {
  /**
   * Bud instance
   */
  const instance = useRef<Framework>(bud)

  /**
   * Stderr stream
   */
  const [stderr, setStderr] = useState<string[]>([])

  /**
   * ProgressPlugin reportage
   */
  const [progress, setProgress] = useState<any>(null)

  /**
   * WebpackStatsPlugin reportage
   */
  const [stats, setStats] = useState<StatsCompilation>({
    errors: [],
  })

  /**
   * True if `rawmode` is supported in terminal
   */
  const {isRawModeSupported} = useStdin()

  /**
   * Formatting utilities for filesize, duration in seconds
   */
  const {fileSize, duration} = useFormatter()

  /**
   * CLI theming
   *
   * @see {@link @roots/ink-use-style#useStyle | @roots/ink-use-style useStyle hook}
   */
  const theme = useStyle(bud?.store?.get('theme'))

  patchConsole((stream, data) => {
    isEqual(stream, 'stderr') && setStderr([...stderr, data])
  })

  setInterval(() => {
    instance?.current?.compiler?.stats &&
      setStats(instance.current.compiler.stats)

    instance?.current?.compiler?.progress &&
      setProgress(instance.current.compiler.progress)
  }, 10)

  useForceUpdate()

  const hasCompilerErrors =
    stats && stats?.errors && stats?.errors?.length > 0
  const hasStdErr = stderr && stderr.length > 0
  const hasErrors = hasStdErr || hasCompilerErrors

  if (
    progress &&
    progress[0] &&
    progress[0] == 1 &&
    instance?.current?.isProduction
  ) {
    setTimeout(() =>
      instance.current.close(() => {
        process.exit(0)
      }),
    )
  }

  return (
    <Box flexDirection="column" marginTop={1}>
      {!progress && !hasErrors && (
        <Box marginBottom={1} flexDirection={'column'}>
          <Text backgroundColor={theme.colors.primary}>
            {' '}
            <InkSpinner /> Loading{' '}
          </Text>
        </Box>
      )}

      {isRawModeSupported && <Input bud={instance.current} />}

      {hasErrors && (
        <Static items={stderr}>
          {(stdout, k) => (
            <Text key={`stdout-${k}`}>
              {stdout ?? ''}
              <Newline />
            </Text>
          )}
        </Static>
      )}

      {hasCompilerErrors && (
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
      )}

      {!hasErrors &&
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
                        - {asset.name}{' '}
                      </Text>
                    </Box>

                    <Box
                      width={theme.ctx([
                        theme.col(12),
                        theme.col(4),
                      ])}>
                      {asset?.info?.minimized && (
                        <Text color={theme.colors.success}>
                          {' '}
                          minimized{' '}
                        </Text>
                      )}
                    </Box>

                    <Box
                      width={theme.ctx([
                        theme.col(12),
                        theme.col(4),
                      ])}>
                      <Text> {fileSize(asset.size)} </Text>
                    </Box>
                  </Box>
                ))}
            </Box>

            <Text> Compiled in {duration(child.time)} </Text>
          </Box>
        ))}

      {instance &&
      theme &&
      progress &&
      progress[0] &&
      progress[0] < 1 ? (
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

export {Dashboard}
