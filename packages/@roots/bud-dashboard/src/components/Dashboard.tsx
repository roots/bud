import type {Framework} from '@roots/bud-framework'
import {lodash} from '@roots/bud-support'
import {useStyle} from '@roots/ink-use-style'
import {Box, Newline, Text, useApp, useStdin} from 'ink'
import React, {useRef, useState} from 'react'
import type {StatsCompilation} from 'webpack'

import {useForceUpdate} from '../hooks/useForceUpdate'
import {useFormatter} from '../hooks/useFormatter'
import {Events} from './Events'
import {Input} from './Input'
import {Progress} from './Progress'

const {isUndefined} = lodash

/**
 * Dashboard display component
 *
 * @public
 */
export const Dashboard = ({
  application,
}: {
  application: Framework
}) => {
  useForceUpdate()

  /* bud instance */
  const instance = useRef<Framework>(application)
  const ink = useApp()

  const [isComplete, setIsComplete] = useState<boolean>(false)
  const [progress, setProgress] = useState<any>(null)
  const [stats, setStats] = useState<StatsCompilation>(null)
  const {isRawModeSupported} = useStdin()
  const {fileSize, duration} = useFormatter()
  const theme = useStyle(instance?.current?.store?.get('theme'))

  setInterval(() => {
    const updateComplete = () => {
      if (
        !instance.current?.compiler?.progress ||
        !instance.current?.compiler?.progress[0]
      )
        return

      setIsComplete(instance.current.compiler?.progress[0] >= 1)
    }

    const updateStats = () => {
      if (isUndefined(instance?.current?.compiler?.stats)) return

      setStats(instance.current.compiler.stats)
    }

    const updateProgress = () => {
      if (isUndefined(instance?.current?.compiler?.progress))
        return
      setProgress(instance.current.compiler?.progress)
    }

    const updateExit = () => {
      if (
        !instance.current ||
        !instance.current.isProduction ||
        !isComplete
      )
        return

      instance.current.hooks.filter(
        'event.dashboard.done',
        ink.exit,
      )
    }

    updateStats()
    updateProgress()
    updateComplete()
    updateExit()
  }, 50)

  return !instance.current?.compiler?.progress ? null : (
    <Box flexDirection="column" marginTop={1}>
      {isRawModeSupported && <Input bud={instance.current} />}
      <Events
        stdout={instance.current.dashboard.stdout}
        stderr={instance.current.dashboard.stderr}
        stats={stats}
        theme={theme}
      />

      {stats?.children?.map((child, id) => (
        <Box
          flexDirection={'column'}
          marginTop={1}
          key={`stats-${child.name}-${id}`}
        >
          <Text color="dim">{`${child.name}`}</Text>
          <Box
            flexDirection={'column'}
            borderStyle="single"
            borderColor="dim"
          >
            <Box flexDirection="column">
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
                        theme.col(8),
                      ])}
                    >
                      <Text wrap="truncate-end">
                        {asset.name}{' '}
                      </Text>
                    </Box>

                    <Box
                      width={theme.ctx([
                        theme.col(12),
                        theme.col(2),
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
                        theme.col(2),
                      ])}
                    >
                      <Text> {fileSize(asset.size)} </Text>
                    </Box>
                  </Box>
                ))}
            </Box>

            <Text color="dim">
              compiled in{' '}
              <Text color={theme.colors.flavor}>
                {duration(child.time)}
              </Text>{' '}
              using webpack v{stats.version}
            </Text>
          </Box>
        </Box>
      ))}

      {instance.current?.compiler?.progress &&
        instance.current.compiler.progress[0] < 1 && (
          <Progress progress={progress} theme={theme} />
        )}

      {instance.current.mode == 'development' && (
        <>
          <Text color={theme?.colors.text}>
            <Newline />
            dev:{' '}
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
      {instance.current.compiler.instance && (
        <Box marginBottom={1}>
          <Text color={theme?.colors.faded}>
            <Newline />
            🆀 to exit
          </Text>
        </Box>
      )}
    </Box>
  )
}
