import React from 'react'
import {Box, Color} from 'ink'

/**
 * Assets
 */
const Assets = ({assets, width}) => {
  return (
    <Box width={width} flexDirection="column">
      {assets.map((asset, id) => (
        <Box
          width={width}
          justifyContent="space-between"
          key={id}>
          <Box>
            <Color
              keyword={asset.emitted ? 'green' : 'yellow'}>
              ⦿
            </Color>{' '}
            {asset.name}
          </Box>
          <Box>
            <Color dim>{asset.size / 1000}kb</Color>
          </Box>
        </Box>
      ))}
    </Box>
  )
}

export default Assets
