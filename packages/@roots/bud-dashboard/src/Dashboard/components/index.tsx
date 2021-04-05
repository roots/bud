import {Framework} from '@roots/bud-framework'
import {
  React,
  FunctionComponent,
  useEffect,
  Box,
  useInput,
  Static,
  Text,
} from '@roots/bud-support'

import {Dashboard as IDashboard} from '../'
import {
  Assets,
  DevStatus,
  Time,
  Git,
  Screen,
  Progress,
  Module,
} from '../../components'
import {useStyle} from '@roots/ink-use-style'
import {useCompilation, usePackageJson} from '../../hooks'
import {isEqual} from 'lodash'

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

  const theme = useStyle(bud.store.get('options.theme'))
  const pkg = usePackageJson(bud)

  useInput(input => {
    if (isEqual(input, 'q')) {
      try {
        process.exit()
      } catch (err) {}
    }
  })

  useEffect(() => {
    if (!bud.isProduction) return

    const isComplete = progress?.decimal >= 1
    const shouldExit = isComplete || hasErrors

    shouldExit && setTimeout(() => process.exit())
  }, [stats, progress, errors])

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
      <Box flexDirection="column">
        {/** Static: errors */}
        {appProps.hasErrors && appProps.errors?.length > 0 && (
          <Static marginBottom={1} items={appProps.errors}>
            {err => (
              <Module
                key={err.moduleIdentifier}
                color={appProps.theme.colors.error}
                labelColor={theme.colors.foreground}
                label={`Error: ${err.moduleName}`}>
                <Box width={theme.bounds.width - 4}>
                  <Text>{err.message}</Text>
                </Box>
              </Module>
            )}
          </Static>
        )}

        {/** Static: warnings */}
        {appProps.hasWarnings && appProps.warnings?.length > 0 && (
          <Static marginBottom={1} items={appProps.warnings}>
            {warning => (
              <Module
                key={warning.moduleIdentifier}
                color={appProps.theme.colors.warning}
                labelColor={theme.colors.foreground}
                label={`Error: ${warning.moduleName}`}>
                <Box width={theme.bounds.width - 4}>
                  <Text>{warning.message}</Text>
                </Box>
              </Module>
            )}
          </Static>
        )}

        {/** Main  */}
        <Box flexDirection="column">
          {/** Assets */}
          <Module
            label="Assets"
            marginBottom={1}
            color={theme.colors.faded}>
            <Assets {...appProps} />
          </Module>

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

          {/** Progress */}
          <Box marginBottom={1}>
            <Progress {...appProps} />
          </Box>

          {/** Git */}
          <Box marginBottom={1}>
            <Git theme={appProps.theme} />
          </Box>

          {/** Time */}
          <Box flexDirection="row" marginBottom={1}>
            <Time {...appProps} />
          </Box>
        </Box>
      </Box>
    </Screen>
  )
}
