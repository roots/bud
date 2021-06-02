import {Dashboard} from '@roots/bud-framework'

import React from 'react'
import {Text, Static, Box, useInput} from 'ink'
import {useStyle} from '@roots/ink-use-style'
import {isEqual} from 'lodash'

import {Assets, Progress, Module} from '../components'
import {useCompilation, useGit} from '../hooks'

const Dashboard: Dashboard.Component = ({bud}) => {
  const compilation = useCompilation(bud)
  const git = useGit()
  const theme = useStyle(bud.store.get('theme'))

  useInput(input => {
    if (isEqual(input, 'q')) {
      try {
        process.exit()
      } catch (err) {}
    }
  })

  const appProps: Dashboard.AppProps = {
    bud,
    theme,
    ...compilation,
  }

  return (
    <Box flexDirection="column">
      {appProps.errors?.length > 0 && (
        <Static marginBottom={1} items={appProps.errors}>
          {(err: Dashboard.Compilation.WebpackMessage, id) => (
            <Module
              key={`${id}-webpack-error`}
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

      {appProps.stats?.assets && <Assets {...appProps} />}

      <Box flexDirection="column" marginY={1}>
        {appProps.stats && (
          <Box flexDirection="row" marginBottom={1}>
            <Text>
              Compiled{' '}
              <Text color={appProps?.theme.colors.success}>
                {
                  Object.entries(appProps.stats.entrypoints)
                    .length
                }{' '}
                {Object.entries(appProps.stats.entrypoints)
                  .length > 1
                  ? 'entrypoints'
                  : 'entrypoint'}
              </Text>{' '}
              in{' '}
            </Text>
            <Text color={appProps?.theme.colors.success}>
              {appProps.stats.time / 1000}s
            </Text>
          </Box>
        )}

        <Box flexDirection="column" marginBottom={1}>
          <Box>
            <Text color={appProps?.theme.colors.white}>
              Overview:{'  '}
            </Text>
          </Box>
          <Box flexDirection="row">
            <Box flexDirection="column" width={2}></Box>
            <Box flexDirection="column">
              <Box flexDirection="row">
                <Text color={appProps?.theme.colors.white}>
                  Build ident{'      '}
                </Text>
                <Text color={appProps?.theme.colors.faded}>
                  {appProps.stats?.hash ?? <Text>Loading</Text>}
                </Text>
              </Box>

              <Box flexDirection="row">
                <Text>Webpack version{'  '}</Text>
                <Text color={appProps?.theme.colors.faded}>
                  {appProps.stats?.version ?? (
                    <Text>Loading</Text>
                  )}
                </Text>
              </Box>

              <Box flexDirection="row">
                <Text>Mode{'             '}</Text>
                <Text color={appProps?.theme.colors.success}>
                  {appProps.bud.mode}
                </Text>
              </Box>

              <Box flexDirection="row">
                <Text>Optimized{'        '}</Text>
                <Text color={appProps?.theme.colors.success}>
                  {appProps.bud.build.config.optimization
                    ? 'true'
                    : 'false'}
                  <>
                    {appProps.bud.build.config.optimization
                      .minimize ?? (
                      <Text
                        color={appProps?.theme.colors.secondary}>
                        [minified]
                      </Text>
                    )}
                  </>
                </Text>
              </Box>

              <Box flexDirection="row">
                <Text>Devtool{'          '}</Text>
                <Text color={appProps?.theme.colors.faded}>
                  {appProps.bud.build.config.devtool ? (
                    <Text color={appProps?.theme.colors.success}>
                      {appProps.bud.build.config.devtool}
                    </Text>
                  ) : (
                    'false'
                  )}
                </Text>
              </Box>

              <Box flexDirection="row">
                <Text>Target{'           '}</Text>
                <Text color={appProps?.theme.colors.faded}>
                  {appProps.bud.build.config.target ? (
                    <Text color={appProps?.theme.colors.success}>
                      {appProps.bud.build.config.target}
                    </Text>
                  ) : (
                    'false'
                  )}
                </Text>
              </Box>
            </Box>
          </Box>
        </Box>

        {isEqual(git.isRepo, true) && (
          <Box flexDirection="column" marginBottom={1}>
            <Box>
              <Text>Versioning:{'  '}</Text>
            </Box>

            <Box flexDirection="row">
              <Box flexDirection="column" width={2}></Box>
              <Box flexDirection="column">
                <Box flexDirection="row">
                  <Text>Branch{'  '}</Text>
                  {git.branch ? (
                    <Text color={appProps?.theme.colors.success}>
                      {git.branch.toString()}
                    </Text>
                  ) : (
                    <Text>Loading</Text>
                  )}
                </Box>

                <Box flexDirection="row">
                  <Text>Head{'    '}</Text>
                  {git.head ? (
                    <Text>#{git.head.toString()}</Text>
                  ) : (
                    <Text>Loading</Text>
                  )}
                </Box>

                <Box flexDirection="row">
                  <Text>Status{'  '}</Text>
                  {git.status ? (
                    <Text color={appProps?.theme.colors.accent}>
                      [M] {git.status?.length} [U]{' '}
                      {git.untracked?.length}
                    </Text>
                  ) : (
                    <Text>Loading</Text>
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
        )}
      </Box>

      <Progress {...appProps} />
    </Box>
  )
}

export {Dashboard}
