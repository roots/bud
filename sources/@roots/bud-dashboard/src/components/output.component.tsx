import type {Framework} from '@roots/bud-framework'
import {useStyle} from '@roots/ink-use-style'
import chalk from 'chalk'
import {Box, Newline, Text} from 'ink'
import React, {useEffect, useState} from 'react'
import {useUpdate} from 'react-use'

import {Assets} from './assets/assets.component'
import {Progress} from './progress'
import {Serve} from './serve'

/**
 * Dashboard display component
 *
 * @public
 */
export const Output = ({tap}: {tap: () => Framework}) => {
  const update = useUpdate()
  const [updateTimer, setUpdateTimer] = useState<NodeJS.Timer>(null)
  const app = tap()
  const theme = useStyle(app?.store?.get('theme'))

  const formatProgress = string => {
    app.compiler.stats?.children?.map(({name}, id) => {
      string = string.replace(
        `[${id}]`,
        chalk.hex(theme.colors.primary)(`[${name}]`),
      )
    })

    return `\n${string}`
  }

  useEffect(() => {
    setUpdateTimer(setInterval(update, 4))
  }, [update])

  if (app.isProduction) {
    if (
      (app.compiler.progress &&
        app.compiler.progress[0] &&
        app.compiler.progress[0] >= 1) ||
      app.compiler.stats?.errorsCount > 0
    ) {
      setTimeout(() => {
        updateTimer.unref()
        app.close()
      }, 200)
    }
  }

  return (
    <Box flexDirection="column">
      {app?.compiler?.stats?.children ? (
        <Assets
          childCompilers={app.compiler.stats.children}
          theme={theme}
        />
      ) : null}

      {app.compiler?.progress &&
      app.compiler?.progress[1] &&
      app.compiler.progress[0] < 1 ? (
        <Box>
          <Newline />
          <Text wrap={`truncate-end`}>
            {formatProgress(app.compiler.progress[1])}
          </Text>
          <Newline />
        </Box>
      ) : null}

      {app?.compiler?.progress?.length ? (
        <Progress progress={app.compiler.progress} theme={theme} />
      ) : null}

      {app.isDevelopment &&
      app?.compiler?.stats?.assets &&
      app.compiler.progress?.length &&
      app.compiler.progress[0] == 1 ? (
        <Serve theme={theme} app={app} />
      ) : null}
    </Box>
  )
}
