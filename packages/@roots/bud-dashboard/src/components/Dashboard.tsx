import type {Framework} from '@roots/bud-framework'
import {useStyle} from '@roots/ink-use-style'
import {Box, Newline, Static, Text, useStdin} from 'ink'
import {isString} from 'lodash'
import React, {
  Fragment,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import type {StatsCompilation} from 'webpack'

import {useForceUpdate} from '../hooks/useForceUpdate'
import {useFormatter} from '../hooks/useFormatter'
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
   * stream
   */
  const [stdio, setStdio] = useState<string[]>([])

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
    if (stream === 'stdout') {
      setStdio([...stdio, data])
    }
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

  const hasErrors = stats?.errors?.length > 0

  useLayoutEffect(() => {
    if (
      progress &&
      progress[0] &&
      progress[0] == 1 &&
      instance?.current?.isProduction
    ) {
      instance.current.close(() => process.exit(0))
    }
  }, [progress])

  return (
    <Box flexDirection="column" marginTop={1}>
      {isRawModeSupported && <Input bud={instance.current} />}

      {hasErrors && (
        <Box marginTop={1}>
          <Static items={[...stdio, ...stats.errors]}>
            {(out, k) => (
              <Text key={`stdio-${k}`}>
                {' '}
                <Newline />
                {isString(out) && out}
                {!isString(out) && (
                  <Fragment>
                    <Text>
                      <Newline />
                      {out.file ? `Error in ${out.file}` : ``}
                    </Text>

                    <Text>{out.message ?? ''}</Text>
                  </Fragment>
                )}
              </Text>
            )}
          </Static>
        </Box>
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
            flexDirection={'column'}
          >
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
                    justifyContent="flex-start"
                  >
                    <Box
                      width={theme.ctx([
                        theme.col(12),
                        theme.col(4),
                      ])}
                    >
                      <Text wrap="truncate-end">
                        {' '}
                        - {asset.name}{' '}
                      </Text>
                    </Box>

                    <Box
                      width={theme.ctx([
                        theme.col(12),
                        theme.col(4),
                      ])}
                    >
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
                      ])}
                    >
                      <Text> {fileSize(asset.size)} </Text>
                    </Box>
                  </Box>
                ))}
            </Box>

            <Text>
              {' '}
              compiled in{' '}
              <Text color={theme.colors.flavor}>
                {duration(child.time)}
              </Text>{' '}
            </Text>
          </Box>
        ))}

      {/**
       * #todo this type-guarding is stanky
       */}
      {instance &&
        theme &&
        progress &&
        typeof progress[0] === 'number' && (
          <Box flexDirection="column" marginBottom={1}>
            {progress[0] < 1 && progress[0] > 0 && (
              <Progress progress={progress} theme={theme} />
            )}

            {instance.current.mode == 'development' && (
              <>
                <Text color={theme?.colors.text}>
                  <Newline /> dev:{' '}
                  <Text color={theme?.colors.primary}>
                    http://
                    {instance.current.store.get('server.host')}:
                    {instance.current.store.get('server.port')}
                  </Text>
                </Text>

                {instance.current.store.is(
                  'server.middleware.proxy',
                  true,
                ) && (
                  <Text color={theme?.colors.text}>
                    {' '}
                    proxy target:{' '}
                    <Text color={theme?.colors.primaryAlt}>
                      {instance.current.store.isString(
                        'server.proxy.target',
                      )
                        ? instance.current.store.get(
                            'server.proxy.target',
                          )
                        : JSON.stringify(
                            instance.current.store.get(
                              'server.proxy.target',
                            ),
                          )}
                    </Text>
                  </Text>
                )}
              </>
            )}

            <Text color={theme?.colors.faded}>
              <Newline /> 🆀 to exit
            </Text>
          </Box>
        )}
    </Box>
  )
}
