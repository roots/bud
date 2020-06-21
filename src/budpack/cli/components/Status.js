import React from 'react'
import {Text, Box, Color} from 'ink'
import Spinner from 'ink-spinner'

import pkg from './../../../../package.json'

/**
 * Build message
 *
 * @prop {object} assets
 * @prop {string} mode
 */
const Message = ({assets, mode}) => (
  <Box>
    {assets.length == 0 ? (
      <Color blue>
        <Spinner /> Compiling project assets
      </Color>
    ) : mode == 'dev' ? (
      <Color green>
        <Spinner /> Watching files
      </Color>
    ) : (
      <Color green>Finished.</Color>
    )}
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
 * Status
 *
 * @prop {object} assets
 * @prop {string} mode
 */
const Status = ({assets, mode, width}) => {
  return (
    <Box
      width={width}
      flexDirection="row"
      justifyContent="space-between"
      marginTop={1}
      paddingLeft={1}>
      <Message assets={assets} mode={mode} />

      <Info name={pkg.name} version={pkg.version} />
    </Box>
  )
}

export default Status
