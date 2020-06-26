import React from 'react'
import {Box, Color} from 'ink'

/**
 * Assets
 */
const Assets = ({assets, errors, width}) => {
  return (
    <Box width={width} flexDirection="column">
      {assets
        .filter(asset => !asset.name.includes('.map'))
        .filter(asset => !asset.name.includes('.json'))
        .map((asset, id) => (
          <Box
            width={width}
            justifyContent="space-between"
            key={id}>
            <Box>
              <Color
                hex={
                  asset.emitted
                    ? '#545DD7'
                    : errors?.length > 0
                    ? '#dc3545'
                    : '#6C758F'
                }>
                ⦿
              </Color>{' '}
              <Color
                keyword={asset.emitted ? 'white' : 'gray'}>
                {asset.name}
              </Color>
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
