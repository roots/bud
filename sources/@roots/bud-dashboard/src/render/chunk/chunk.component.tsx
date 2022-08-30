import {Box} from 'ink'
import React from 'react'
import type {StatsAsset} from 'webpack'

import {longestAssetNameLength} from '../format.js'
import Asset from './asset.component.js'

const Chunk = ({
  assets,
  final,
  indent,
  minWidth,
  emitted,
}: {
  assets: Array<StatsAsset>
  final?: boolean
  minWidth?: number
  indent?: any
  emitted?: boolean
}) => {
  return (
    <Box flexDirection="column">
      {assets
        ?.filter(asset => asset.emitted)
        ?.map((asset, index) => (
          <Asset
            key={index}
            {...asset}
            emitted={asset.emitted && emitted}
            minWidth={longestAssetNameLength(assets)}
            final={index == assets.length - 1}
            indent={[!final]}
          />
        ))}
    </Box>
  )
}

export default Chunk
