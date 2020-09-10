import {Bud, WebpackConfig} from '@roots/bud-typings'
import React, {
  useEffect,
  useState,
  FunctionComponent,
} from 'react'
import {Box, useInput} from 'ink'
import useStdOutDimensions from 'ink-use-stdout-dimensions'
import {useWebpack} from './hooks/useWebpack'
import {App} from '@roots/bud-cli'
import {Artifact} from './components/Artifact'
import {BuildInfo} from './components/BuildInfo'
import Progress from './components/Progress'
import {Init} from './components/Init'
import Assets from './components/Assets'
import Errors from './components/Errors'
import {Nav} from './components/Nav'
import Warnings from './components/Warnings'
import DevServer from './components/DevServer'

interface DashboardProps {
  bud: Bud
  config: WebpackConfig
}

type DashboardComponent = FunctionComponent<DashboardProps>

const Dashboard: DashboardComponent = ({bud, config}) => {
  const [width, height] = useStdOutDimensions()
  const build = useWebpack(bud)
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

  useEffect(() => {
    if (
      build?.assets.length > 0 &&
      build?.errors.length == 0 &&
      build?.percentage == 1
    ) {
      const title = bud.hooks.filter(
        'compiler.notify.success.title',
        'Build complete.',
      )

      bud.util.notify({title})
    }
  }, [build])

  return bud.features.enabled('dev') ? (
    <App bud={bud}>
      <Box
        height={height}
        flexDirection="column"
        justifyContent="space-between">
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
          </Box>
        </Box>
        <Box paddingTop={1}>
          <Progress build={build} />
        </Box>
      </Box>
    </App>
  ) : (
    <Artifact width={width} build={build} />
  )
}

export {Dashboard as default}
