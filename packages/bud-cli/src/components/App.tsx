import React, {FunctionComponent, useEffect} from 'react'
import {useApp, useInput, Box} from 'ink'
import useStdOutDimensions from 'ink-use-stdout-dimensions'

import Compiler from '@roots/bud-compiler'
import Server from '@roots/bud-server'

import useCompilation from '../hooks/useCompilation'
import Assets from './Assets'
import BuildInfo from './BuildInfo'
import Progress from './Progress'
import Screen from './Screen'

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

  useEffect(() => {
    if (
      !compilation?.listening &&
      compilation?.stats?.assets?.length > 0 &&
      compilation?.progress?.percentage == 1
    ) {
      app.exit()
      terminate()
    }
  }, [compilation])

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
          <Box marginBottom={1}>
            <Assets assets={compilation?.stats?.assets} />
          </Box>
          <Box marginBottom={1}>
            <Progress progress={compilation?.progress} />
          </Box>
          <Box marginBottom={1}>
            <BuildInfo stats={compilation?.stats} />
          </Box>
        </>
      </Screen>
    </Box>
  )
}

export {App as default, ApplicationCli, ApplicationCliProps}
