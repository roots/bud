import {Box} from 'ink'
import React from 'react'

import Asset from './asset.component.js'

const Chunk = ({
  assets,
  final,
  indent,
  emitted,
}: {
  assets: Array<{name: string; emitted: boolean}>
  final?: boolean
  indent?: any
  emitted?: boolean
}) => {
  const minWidth = assets?.reduce((longest, asset) => {
    return asset.name?.length > longest ? asset.name.length : longest
  }, 0)

  return (
    <Box flexDirection="column">
      {assets
        ?.filter(asset => asset.emitted)
        ?.map((asset, index) => (
          <Asset
            key={index}
            {...asset}
            emitted={asset.emitted && emitted}
            minWidth={minWidth + 1}
            final={index == assets.length - 1}
            indent={[!final]}
          />
        ))}
    </Box>
  )
}

export default Chunk
