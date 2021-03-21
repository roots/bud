import {Framework} from '@roots/bud-framework'
import {Dashboard as IDashboard} from '../interface'

import React, {
  FunctionComponent,
  useEffect,
  useState,
} from 'react'
import {Box, useApp, useInput, Static, Text} from 'ink'
import {
  Assets,
  Console,
  DevStatus,
  Time,
  Git,
  Main,
  Screen,
  Progress,
  Module,
} from '../components'
import {useStyle} from '@roots/ink-use-style'
import {useCompilation, usePackageJson} from '../hooks'

export const Dashboard: FunctionComponent<{bud: Framework}> = ({
  bud,
}) => {
  const {
    stats,
    progress,
    errors,
    hasErrors,
    warnings,
    hasWarnings,
  } = useCompilation(bud)

  const app = useApp()

  useInput(input => {
    if (input == 'q') {
      console.clear()
      app.exit()
      process.exit()
    }
  })

  const theme = useStyle(bud.store.get('options.theme'))
  const [themeLoaded, setThemeLoaded] = useState(false)
  const pkg = usePackageJson(bud)

  useEffect(() => {
    if (!bud.isProduction) return

    const isComplete = progress?.decimal >= 1
    const shouldExit = isComplete || hasErrors

    shouldExit && setTimeout(() => process.exit(), 1000)
  }, [stats, progress, errors])

  useEffect(() => {
    theme &&
      theme.bounds &&
      theme.col &&
      theme.colors &&
      setThemeLoaded(true)
  }, [theme])

  const appProps: IDashboard.AppProps = {
    bud,
    theme,
    pkg,
    progress,
    stats,
    errors,
    hasErrors,
    warnings,
    hasWarnings,
  }

  return (
    <Screen>
      <Main>
        {themeLoaded && (
          <Box flexDirection="column">
            {/** Static: errors */}
            {appProps.hasErrors && appProps.errors && (
              <Static
                items={appProps.errors.map((body, id) => ({
                  id,
                  body,
                }))}>
                {error => (
                  <Module
                    key={error.id}
                    color={appProps.theme.colors.error}
                    label="Error">
                    <Text>{error.body}</Text>
                  </Module>
                )}
              </Static>
            )}

            {/** Static: warnings */}
            {appProps.hasWarnings && appProps.warnings && (
              <Static
                items={appProps.warnings.map((body, id) => ({
                  id,
                  body,
                }))}>
                {warning => (
                  <Module
                    key={warning.id}
                    color={appProps.theme.colors.warning}
                    label="Warning">
                    <Text>{warning.body}</Text>
                  </Module>
                )}
              </Static>
            )}

            {/** Main  */}
            <Box marginTop={1} flexDirection="column">
              {/** Assets */}
              {appProps.stats?.assets?.length > 0 && (
                <Module
                  label="Assets"
                  marginBottom={1}
                  color={theme.colors.faded}>
                  <Assets {...appProps} />
                </Module>
              )}

              {/** Server info */}
              {bud.isDevelopment &&
                bud.server.config.isTrue('middleware.dev') && (
                  <Module
                    label="Dev Server"
                    marginBottom={1}
                    color={theme.colors.faded}>
                    <DevStatus {...appProps} />
                  </Module>
                )}

              <Box
                marginBottom={1}
                width={appProps.theme.col(12)}>
                <Console {...appProps} />
              </Box>

              {/** Progrss Bar */}
              <Box marginBottom={1}>
                <Progress {...appProps} />
              </Box>

              {/** Git Repo */}
              <Box flexDirection="row" marginBottom={1}>
                <Time {...appProps} />
                <Git theme={appProps.theme} />
              </Box>
            </Box>
          </Box>
        )}
      </Main>
    </Screen>
  )
}
