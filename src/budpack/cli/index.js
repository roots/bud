import React, {useEffect, useState} from 'react'
import notifier from 'node-notifier'

import useWebpack from './hooks/useWebpack'
import useFocusState from './hooks/useFocusState'

import BrowserSync from './components/BrowserSync'
import Errors from './components/Errors'
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
  const [errors, setErrors] = useState(null)
  useEffect(() => {
    build?.errors && setErrors(build.errors)
  }, [build])

  useEffect(() => {
    !errors?.length > 0 &&
      build?.percentage == 1 &&
      notifier.notify({
        title: 'Build complete',
        message: build?.assets?.length > 0 ? `${build?.assets?.length} assets built.` : `Assets built.`,
      })
  }, [build?.percentage, errors])

  return (
    <App build={build} errors={errors} state={state} mode={mode}>
      <Assets actions={actions} build={build} />
      <Errors actions={actions} errors={errors} />
      <BrowserSync actions={actions} />
    </App>
  )
}

export default BudpackCLI
