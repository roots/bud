import type {Framework} from '@roots/bud-framework'
import {useStyle} from '@roots/ink-use-style'
import {Box, Newline, Static, Text, useStdin} from 'ink'
import React, {Fragment, useRef, useState} from 'react'
import type {StatsCompilation} from 'webpack'

import {useForceUpdate} from '../hooks/useForceUpdate'
import {useFormatter} from '../hooks/useFormatter'
import {isEqual} from '../services/lodash'
import {patchConsole} from '../services/patch-console'
import {Input} from './Input'
import {Progress} from './Progress'

/**
 * Dashboard display component
 *
 * @public
 */
export const Dashboard = ({bud}: {bud: Framework}) => {
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
   * CLI theme provider
   *
   * @remarks
   * {@link @roots/ink-use-style#useStyle | @roots/ink-use-style useStyle hook}
   */
  const theme = useStyle(bud?.store?.get('theme'))

  /**
   * Patch console pipes stdout/stderr through a callback
   * so we can still show important messages while
   * also keeping the terminal clean
   */
  patchConsole((stream, data) => {
    isEqual(stream, 'stderr') && setStderr([...stderr, data])
  })

  /**
   * Set interval to update progress
   */
  setInterval(() => {
    instance?.current?.compiler?.stats &&
      setStats(instance.current.compiler.stats)

    instance?.current?.compiler?.progress &&
      setProgress(instance.current.compiler.progress)
  }, 10)

  /**
   * Force React re-renders
   */
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
      instance.current.close(() => process.exit(0)),
    )
  }

  return (
    <Box flexDirection="column" marginTop={1}>
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
                <Text>
                  <Newline />
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

      {/**
       * Display assets
       *
       * #todo: move this to a separate component
       */}
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

      {/**
       * #todo this type-guarding is stanky
       */}
      {instance &&
      theme &&
      progress &&
      progress[0] &&
      progress[0] < 1 ? (
        <Progress progress={progress} theme={theme} />
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
