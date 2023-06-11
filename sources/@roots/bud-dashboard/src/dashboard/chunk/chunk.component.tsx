import type {StatsAsset} from '@roots/bud-framework/config'

import {Box} from '@roots/bud-support/ink'

import {longestAssetNameLength} from '../format.js'
import Asset from './asset.component.js'

const Chunk = ({
  final,
  indent,
  minWidth,
  ...chunk
}: {
  assets: Array<Partial<StatsAsset>>
  emitted?: boolean
  final?: boolean
  indent?: any
  minWidth?: number
}) => {
  return (
    <Box flexDirection="column">
      {chunk?.assets?.map((asset, index) => (
        <Asset
          key={index}
          {...asset}
          emitted={chunk?.emitted}
          final={index == chunk?.assets.length - 1}
          indent={[!final]}
          minWidth={longestAssetNameLength(chunk?.assets)}
        />
      ))}
    </Box>
  )
}

export default Chunk
