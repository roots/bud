import React, {useEffect} from 'react'
import {Box, useApp, useInput} from 'ink'
import PropTypes from 'prop-types'
import notifier from 'node-notifier'
import useStdoutDimensions from 'ink-use-stdout-dimensions'

import useWebpack from './hooks/useWebpack'
import useFocusState from './hooks/useFocusState'

import App from './components/App'
import Assets from './components/Assets'
import BrowserSync from './components/BrowserSync'
import Debug from './components/Debug'
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
const BudpackCLI = ({compiler, config, options}) => {
  const [state, actions] = useFocusState()
  const [columns, rows] = useStdoutDimensions();
  const {exit} = useApp()
  useInput((input) => {
		input == 'q' && exit()
  })

  const build = useWebpack({compiler, options})
  useEffect(() => {
    successfulBuild(build) && notifier.notify({
      title: 'Build complete',
      message: `${build.assets.length} assets built.`,
    })
  }, [build?.percentage])

  return (
    <Box minHeight={rows} flexDirection="column">
      <App build={build} state={state} options={options}>
        <Assets actions={actions} build={build} />
        <Errors actions={actions} build={build} />
        <Warnings actions={actions} build={build} />
        {!options.debug && options.browserSync.enabled && <BrowserSync actions={actions} />}
        {options.debug && <Debug actions={actions} config={config} options={options} />}
      </App>
    </Box>
  )
}

BudpackCLI.propTypes = {
  compiler: PropTypes.object,
  config: PropTypes.object,
  options: PropTypes.object,
}

export default BudpackCLI
