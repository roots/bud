import React from 'react'
import {Text} from 'ink'
import useView from './hooks/useView'
import useWebpack from './hooks/useWebpack'

import Assets from './components/Assets'
import App from './components/App'

/**
 * Budpack build status display
 *
 * @prop {object} compiler webpack compiler
 * @prop {string} mode watch or run
 */
const BudpackCLI = ({compiler, mode}) => {
  const {height, width} = useView()
  const build = useWebpack({compiler, mode})

  return (
    <App
      assets={build?.assets}
      height={height}
      mode={mode}
      width={width}>
      <Assets assets={build?.assets} width={width} />
      {build?.errors && (
        <Text>{JSON.stringify(build.errors)}</Text>
      )}
    </App>
  )
}

export default BudpackCLI
