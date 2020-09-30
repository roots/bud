import React, {FunctionComponent, useEffect} from 'react'
import {useApp, useInput, Box} from 'ink'

import Compiler from '@roots/bud-compiler'
import Server from '@roots/bud-server'

import Assets from '../components/Assets'
import Errors from '../components/Errors'
import BuildInfo from '../components/BuildInfo'
import Progress from '../components/Progress'
import Screen from '../components/Screen'

import useAppStyles from '../hooks/useAppStyles'
import useCompilation from '../hooks/useCompilation'

interface ApplicationCliProps {
  name: string
  compiler: Compiler
  server: Server
}

type ApplicationCli = FunctionComponent<ApplicationCliProps>

const App: ApplicationCli = ({name, compiler, server}) => {
  const app = useApp()
  const {dimensions, col, ctx} = useAppStyles()
  const compilation = useCompilation({
    compiler,
    server,
  })

  useInput(input => {
    if (input == 'q') {
      app.exit()
      process.exit()
    }
  })

  useEffect(() => {
    if (
      !compilation?.listening &&
      compilation?.stats?.assets?.length > 0 &&
      compilation?.progress?.percentage == 100
    ) {
      app.exit()
      process.exit()
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
