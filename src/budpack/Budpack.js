import React, {useState} from 'react'
import {Text, Box, Color} from 'ink'
import Spinner from 'ink-spinner'

import useWebpack from './hooks/useWebpack'
import useView from './hooks/useView'

import Assets from './components/Assets'
import Banner from './components/Banner'
import pkg from '../../package.json'

/**
 * Build status
 *
 * @prop {object} assets
 * @prop {string} mode
 */
const Status = ({assets, mode}) => (
  <Box>
    {assets.length == 0
      ? <Color green><Spinner /> Compiling project assets</Color>
      : mode == 'dev' && <Color green><Spinner /> Watching files</Color>
    }
  </Box>
)

/**
 * Budpack info
 *
 * @prop {string} name
 * @prop {string} version
 */
const Info = ({name, version}) => (
  <Box>
    <Text bold>
      <Color green>
        ⚡️ {name} [{version}]
      </Color>
    </Text>
  </Box>
)

/**
 * Footer
 *
 * @prop {object} assets
 * @prop {string} mode
 */
const Footer = ({assets, mode}) => {
  const [width] = useView()

  return (
    <Box
      width={width}
      flexDirection="row"
      justifyContent="space-between"
      marginTop={1}>
      <Status
        assets={assets}
        mode={mode}
      />

      <Info
        name={pkg.name}
        version={pkg.version}
      />
    </Box>
  )
}

const App = ({children}) => {
  const [width, height] = useView()

  return (
    <Box
      paddingLeft={2}
      paddingRight={2}
      height={height}
      flexDirection="column"
      justifyContent="space-between">
      <Box flexDirection="column">
        <Banner />

        {children}
      </Box>
    </Box>
  )
}

/**
 * Budpack CLI interface
 *
 * @prop {object} compiler webpack compiler
 * @prop {string} mode watch or run
 */
const Budpack = props => {
  const [mode] = useState(props.mode)
  const {assets} = useWebpack(props)

  return (
    <App>
      <Box flexDirection="column">
        <Banner />
        <Assets assets={assets} />
      </Box>
      <Footer
        mode={mode}
        assets={assets}
      />
    </App>
  )
}

module.exports = Budpack
