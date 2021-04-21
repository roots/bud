import React, {useEffect} from 'react'
import {Text, Static, Box, useInput} from 'ink'
import {useStyle} from '@roots/ink-use-style'
import {isEqual} from 'lodash'

import {
  Assets,
  DevStatus,
  Time,
  Git,
  Progress,
  Module,
} from '../../components'
import {useCompilation, usePackageJson} from '../../hooks'
import {Dashboard} from '@roots/bud-framework'

/**
 * @exports Dashboard
 */
export {Dashboard}

/**
 * Dashboard CLI interface
 */
const Dashboard: Dashboard.Component = ({bud}) => {
  const compilation = useCompilation(bud)
  const theme = useStyle(bud.store.get('theme'))
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

    const isComplete = compilation?.progress?.decimal >= 1
    const shouldExit = isComplete || compilation?.hasErrors

    shouldExit && setTimeout(() => process.exit())
  }, [
    compilation.stats,
    compilation.progress,
    compilation.errors,
  ])

  const appProps: Dashboard.AppProps = {
    bud,
    theme,
    pkg,
    ...compilation,
  }

  return (
    <Box flexDirection="column">
      {appProps.hasErrors && appProps.errors?.length > 0 && (
        <Static marginBottom={1} items={appProps.errors}>
          {(err: Dashboard.Compilation.WebpackMessage) => (
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

      {appProps.hasWarnings && appProps.warnings?.length > 0 && (
        <Static marginBottom={1} items={appProps.warnings}>
          {(warning: Dashboard.Compilation.WebpackMessage) => (
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

      <Box flexDirection="column">
        {appProps.stats?.assets && (
          <Box
            flexDirection="column"
            paddingX={1}
            borderStyle="single"
            borderColor={appProps.theme.colors.faded}>
            <Assets {...appProps} />
          </Box>
        )}

        <Box flexDirection="row">
          <Box
            flexDirection="column"
            paddingX={1}
            borderStyle="single"
            borderColor={appProps.theme.colors.faded}>
            <Text>
              Mode: <Text color="green">{bud.mode}</Text>
            </Text>

            <Text>
              Entry:{' '}
              <Text color="green">
                {Object.keys(
                  bud.hooks.filter('build/entry'),
                ).reduce((a, k) => `${a} ${k}`)}
              </Text>
            </Text>

            <Time {...appProps} />
          </Box>

          {bud.isDevelopment &&
            bud.server.config.isTrue('middleware.dev') && (
              <Box
                flexDirection="column"
                paddingX={1}
                borderStyle="single"
                borderColor={appProps.theme.colors.faded}>
                <DevStatus {...appProps} />
              </Box>
            )}

          <Box flexDirection="column">
            <Git theme={appProps.theme} />
          </Box>
        </Box>

        <Box flexDirection="column">
          {appProps.progress?.decimal < 1 && (
            <Box marginBottom={1}>
              <Progress {...appProps} />
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  )
}
