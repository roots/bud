import React, {FunctionComponent} from 'react'
import {useApp, useInput, Box, Text} from 'ink'
import useStdOutDimensions from 'ink-use-stdout-dimensions'

import useCompiler, {
  CompilerDerivedState,
} from '../hooks/useCompiler'

import Screen from './Screen'
import {Configuration} from 'webpack'
import {ServerConfig} from '@roots/bud-server'

interface ApplicationCliProps {
  name: string
  webpackConfig: Configuration
  serverConfig: ServerConfig
  terminate: CallableFunction
}

type ApplicationCli = FunctionComponent<ApplicationCliProps>

const App: ApplicationCli = ({
  name,
  webpackConfig,
  serverConfig,
  terminate,
}) => {
  const app = useApp()
  const [width, height] = useStdOutDimensions()
  const {
    serverInstance,
    progress,
  }: CompilerDerivedState = useCompiler(
    webpackConfig,
    serverConfig,
  )

  useInput(input => {
    if (input == 'q') {
      app.exit()
      terminate()
    }
  })

  return (
    <Box
      width={width}
      minHeight={height}
      paddingRight={1}
      paddingBottom={2}
      paddingTop={1}
      flexDirection="column"
      justifyContent="space-between">
      <Screen title={name}>
        <>
          <Text>
            {webpackConfig && JSON.stringify(webpackConfig)}
          </Text>
          <Text>
            {serverConfig && JSON.stringify(serverConfig)}
          </Text>
          <Text>{progress && JSON.stringify(progress)}</Text>
          <Text>
            {serverInstance && JSON.stringify(serverInstance)}
          </Text>
        </>
      </Screen>
    </Box>
  )
}

export {App as default, ApplicationCli, ApplicationCliProps}
