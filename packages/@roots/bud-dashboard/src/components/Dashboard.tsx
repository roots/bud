import type {Framework} from '@roots/bud-framework'
import {lodash} from '@roots/bud-support'
import {useStyle} from '@roots/ink-use-style'
import {Box, Newline, Text, useApp, useStdin} from 'ink'
import React, {useRef, useState} from 'react'
import type {StatsCompilation} from 'webpack'

import {useForceUpdate} from '../hooks/useForceUpdate'
import * as Assets from './assets'
import {Input} from './Input'
import * as Messages from './message'
import {Progress} from './progress'
import {Serve} from './serve'

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
  const ink = useApp()
  const {isRawModeSupported} = useStdin()

  useForceUpdate()

  const instance = useRef<Framework>(application)

  const [isComplete, setIsComplete] = useState<boolean>(false)
  const [progress, setProgress] = useState<any>(null)
  const [stats, setStats] = useState<StatsCompilation>(null)
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

  return (
    <Box flexDirection="column" marginTop={1}>
      {isRawModeSupported && <Input bud={instance.current} />}

      <Messages.Dashboard
        stats={stats}
        stdout={instance.current.dashboard.stdout}
        stderr={instance.current.dashboard.stderr}
        theme={theme}
      />

      <Assets.Dashboard
        stats={stats}
        theme={theme}
        progress={progress}
      />

      <Progress progress={progress} theme={theme} />

      {instance.current.mode == 'development' && (
        <Serve
          theme={theme}
          server={instance.current.store.get('server')}
        />
      )}

      {instance.current.compiler.instance && (
        <Box flexDirection="column">
          <Text color={theme?.colors.faded}>
            🆀 to exit
            <Newline />
          </Text>
        </Box>
      )}
    </Box>
  )
}
