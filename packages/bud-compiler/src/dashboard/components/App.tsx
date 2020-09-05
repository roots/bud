import React, {useState, FunctionComponent} from 'react'
import {Box, Text, useInput} from 'ink'

import {Nav} from './Nav'
import Progress from './Progress'
import {BuildInfo} from './BuildInfo'
import {Init} from './Init'
import Assets from './Assets'
import Errors from './Errors'
import Warnings from './Warnings'

import Screen from './UI/Screen'
import Spinner from 'ink-spinner'
import DevServer from './DevServer'

interface AppInterface {
  build: any
  width: number
  height: number
  bud: any
  config: any
}

const App: FunctionComponent<AppInterface> = ({
  build,
  width,
  height,
  bud,
  config,
}) => {
  const [screen, setScreen] = useState('init')

  useInput((input, key) => {
    if (input == 'i' || input == '1') setScreen('init')
    if (input == 'a' || input == '2') setScreen('assets')
    if (input == 'e' || input == '3') setScreen('errors')
    if (input == 'w' || input == '4') setScreen('warnings')
    if (input == 'd' || input == '5') setScreen('devServer')

    key.tab &&
      setScreen(
        screen == 'init'
          ? 'assets'
          : screen == 'assets'
          ? 'errors'
          : screen == 'errors'
          ? 'warnings'
          : screen == 'warnings'
          ? 'devServer'
          : 'init',
      )
  })

  return (
    <Box
      width={width}
      height={height}
      minHeight={height}
      paddingRight={1}
      paddingBottom={2}
      paddingTop={1}
      flexDirection="column"
      justifyContent="space-between">
      <Box
        paddingLeft={1}
        flexDirection="column"
        justifyContent="flex-start">
        <Text color={'#545DD7'}>
          {width > 70 ? '' : ' '}@roots/bud
        </Text>

        <Box
          flexDirection={width > 70 ? 'row' : 'column'}
          justifyContent="flex-start">
          <Nav
            width={width}
            height={height}
            build={build}
            focus={screen || {}}
          />

          <Box
            flexDirection="column"
            flexGrow={1}
            justifyContent="flex-start">
            {build?.percentage < 1 ? (
              <Screen>
                <Box paddingTop={1}>
                  <Text color="white" dimColor={true}>
                    <Spinner type="dots" /> Loading
                  </Text>
                </Box>
              </Screen>
            ) : (
              <>
                {screen == 'init' && (
                  <Init config={config} bud={bud} />
                )}
                {screen == 'assets' && (
                  <Assets assets={build.assets} />
                )}
                {screen == 'errors' && (
                  <Errors errors={build.errors} />
                )}
                {screen == 'warnings' && (
                  <Warnings warnings={build.warnings} />
                )}
                {screen == 'devServer' && (
                  <DevServer build={build} />
                )}

                <BuildInfo build={build} />
              </>
            )}
          </Box>
        </Box>
      </Box>

      <Progress build={build} />
    </Box>
  )
}

export {App}
