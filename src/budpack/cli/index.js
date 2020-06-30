import React, {useEffect, useState} from 'react'
import notifier from 'node-notifier'

import useWebpack from './hooks/useWebpack'
import useFocusState from './hooks/useFocusState'

import BrowserSync from './components/BrowserSync'
import Errors from './components/Errors'
import Warnings from './components/Warnings'
import Assets from './components/Assets'
import App from './components/App'

/**
 * Budpack build status display
 *
 * @prop {object} compiler webpack compiler
 * @prop {string} mode watch or run
 */
const BudpackCLI = ({compiler, mode}) => {
  const [state, actions] = useFocusState()
  const build = useWebpack({compiler, mode})

  useEffect(() => {
    !build?.errors?.length > 0 &&
      build?.percentage == 1 &&
      build?.assets?.length > 0 &&
      notifier.notify({
        title: 'Build complete',
        message: `${build.assets.length} assets built.`,
      })
  }, [build?.percentage])

  return (
    <App build={build} state={state} mode={mode}>
      <Assets actions={actions} build={build} />
      <Errors actions={actions} build={build} />
      <Warnings actions={actions} build={build} />
      <BrowserSync actions={actions} />
    </App>
  )
}

export default BudpackCLI
