import React, {FunctionComponent} from 'react'
import {useApp, useInput, Box} from 'ink'
import useStdOutDimensions from 'ink-use-stdout-dimensions'
import {Configuration} from 'webpack'

import Compiler from '@roots/bud-compiler'
import Server, {ServerConfig} from '@roots/bud-server'

import useCompilation from '../hooks/useCompilation'
import Screen from './Screen'
import Assets from './Assets'

interface ApplicationCliProps {
  name: string
  webpackConfig: Configuration
  serverConfig: ServerConfig
  terminate: CallableFunction
  compiler: Compiler
  server: Server
}

type ApplicationCli = FunctionComponent<ApplicationCliProps>

const App: ApplicationCli = ({
  name,
  webpackConfig,
  serverConfig,
  terminate,
  compiler,
  server,
}) => {
  const app = useApp()
  const [width, height] = useStdOutDimensions()

  useInput(input => {
    if (input == 'q') {
      app.exit()
      terminate()
    }
  })

  const compilation = useCompilation(
    compiler,
    server,
    webpackConfig,
  )

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
        <Assets assets={compilation?.stats?.assets} />
      </Screen>
    </Box>
  )
}

export {App as default, ApplicationCli, ApplicationCliProps}
