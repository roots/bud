import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {Text, Box, Color} from 'ink'
import Spinner from 'ink-spinner'
import useStdoutDimensions from 'ink-use-stdout-dimensions'

import useWebpack from './hooks/useWebpack'
import Assets from './components/Assets'
import Banner from './components/Banner'
import pkg from '../../package.json'

/**
 * Budpack CLI interface
 *
 * @prop {object} compiler webpack compiler
 * @prop {string} mode watch or run
 */
const Budpack = props => {
  const [columns, rows] = useStdoutDimensions()
  const [mode] = useState(props.mode)
  const {assets} = useWebpack(props)
  const padding = 4

  return (
    <Box
      paddingLeft={2}
      paddingRight={2}
      height={rows-padding}
      flexDirection="column"
      justifyContent="space-between">
      <Box flexDirection="column">
        <Banner />
        <Assets
          width={columns-padding}
          assets={assets}
        />
      </Box>

      <Box
        width={columns-padding}
        flexDirection="row"
        justifyContent="space-between"
        marginTop={1}
        marginBottom={0}
        paddingBottom={0}
        paddingTop={0}>
        <Box>
          {assets.length == 0
            ? <Color green><Spinner /> Compiling project assets</Color>
            : mode == 'dev' && <Color green><Spinner /> Watching files</Color>
          }
        </Box>

        <Box>
          <Text bold>
            <Color green>
              ⚡️ {pkg.name} [{pkg.version}]
            </Color>
          </Text>
        </Box>
      </Box>
    </Box>
  )
}

module.exports = Budpack
