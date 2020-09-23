import React, {FunctionComponent, useEffect} from 'react'
import {useApp, useInput, Box} from 'ink'

import Compiler from '@roots/bud-compiler'
import Server from '@roots/bud-server'

import Assets from './Assets'
import Errors from './Errors'
import BuildInfo from './BuildInfo'
import Progress from './Progress'
import Screen from './Screen'

import useAppStyles from '../hooks/useAppStyles'
import useCompilation from '../hooks/useCompilation'

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
  const {dimensions, col, ctx} = useAppStyles()
  const compilation = useCompilation({compiler, server})

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
      compilation?.progress?.percentage == 100
    ) {
      app.exit()
      terminate()
    }
  }, [compilation])

  return (
    <Box
      width={ctx([col(12)])}
      minHeight={dimensions.height}
      paddingRight={1}
      paddingBottom={2}
      paddingTop={1}
      justifyContent="space-between">
      <Screen title={name}>
        <Box flexDirection="column">
          {compilation.errors?.length > 0 && (
            <Box flexDirection="column" marginBottom={1}>
              <Errors errors={compilation.errors} />
            </Box>
          )}
          <>
            <Box flexDirection="column" marginBottom={1}>
              <Assets assets={compilation.stats?.assets} />
            </Box>

            <Box flexDirection="column" marginBottom={1}>
              <Progress progress={compilation.progress} />
            </Box>
          </>
          <Box flexDirection="column" marginBottom={1}>
            <BuildInfo stats={compilation.stats} />
          </Box>
        </Box>
      </Screen>
    </Box>
  )
}

export {App as default, ApplicationCli, ApplicationCliProps}
