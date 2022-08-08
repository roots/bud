import {Box} from 'ink'
import React from 'react'

import Asset from './asset.component.js'

const Chunk = ({
  assets,
  final,
  indent,
}: {
  assets: Array<{name: string}>
  final?: boolean
  indent?: any
}) => {
  const minWidth = assets?.reduce((longest, asset) => {
    return asset.name?.length > longest ? asset.name.length : longest
  }, 0)

  return (
    <Box flexDirection="column">
      {assets?.map((asset, index) => (
        <Asset
          key={index}
          {...asset}
          minWidth={minWidth + 1}
          indent={indent}
          final={index == assets.length - 1}
        />
      ))}
    </Box>
  )
}

export default Chunk
