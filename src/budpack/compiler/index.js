import React, {useEffect} from 'react'
import {useApp, useInput} from 'ink'
import PropTypes from 'prop-types'
import notifier from 'node-notifier'
import useStdOutDimensions from 'ink-use-stdout-dimensions'

import useWebpack from './hooks/useWebpack'
import useFocusState from './hooks/useFocusState'

import App from './components/App'
import Assets from './components/Assets'
import BrowserSync from './components/BrowserSync'
import Errors from './components/Errors'
import Warnings from './components/Warnings'

const successfulBuild = build =>
  !build?.errors?.length > 0 &&
  build?.percentage == 1 &&
  build?.assets?.length > 0

/**
 * Budpack build status display
 *
 * @prop {object} compiler webpack compiler
 * @prop {string} config   webpack compiler config
 * @prop {object} options  project options
 */
const Runner = ({compiler, config}) => {
  const [width] = useStdOutDimensions()
  const [state, actions] = useFocusState()
  const {exit} = useApp()
  useInput(input => {
    if (input == 'q') {
      exit()
      process.exit()
    }
  })

  useEffect(() => {
    !config?.features?.watch &&
      build?.assets &&
      build?.percentage &&
      exit()
  })

  const build = useWebpack({compiler, config})
  useEffect(() => {
    successfulBuild(build) &&
      notifier.notify({
        title: 'Build complete',
        message: `${build.assets.length} assets built.`,
      })
  }, [build?.percentage])

  const showBrowserSync =
    !config?.features?.debug &&
    config?.features?.browserSync

  return (
    <App
      width={width}
      build={build}
      state={state}
      config={config}>
      <Assets
        width={width}
        actions={actions}
        build={build}
      />
      <Errors actions={actions} build={build} />
      <Warnings actions={actions} build={build} />
      {showBrowserSync && <BrowserSync actions={actions} />}
    </App>
  )
}

Runner.propTypes = {
  compiler: PropTypes.object,
  config: PropTypes.object,
  webpackConfig: PropTypes.object,
}

export {Runner}
