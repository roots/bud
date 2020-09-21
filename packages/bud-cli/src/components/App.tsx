import React, {FunctionComponent} from 'react'
import {useApp, useInput, Box} from 'ink'
import useStdOutDimensions from 'ink-use-stdout-dimensions'

import Compiler from '@roots/bud-compiler'
import Server from '@roots/bud-server'

import useCompilation from '../hooks/useCompilation'
import Screen from './Screen'
import Assets from './Assets'

interface ApplicationCliProps {
  name: string
  compiler: Compiler
  server: Server
  terminate: CallableFunction
}

type ApplicationCli = FunctionComponent<ApplicationCliProps>

const App: ApplicationCli = ({
  name,
  compiler,
  server,
  terminate,
}) => {
  const app = useApp()
  const [width, height] = useStdOutDimensions()
  const compilation = useCompilation(compiler, server)

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
        <Assets assets={compilation?.stats?.assets} />
      </Screen>
    </Box>
  )
}

export {App as default, ApplicationCli, ApplicationCliProps}
