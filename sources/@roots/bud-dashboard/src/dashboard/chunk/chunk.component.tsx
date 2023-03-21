import type {StatsAsset} from '@roots/bud-support/webpack'
import * as Ink from 'ink'

import {longestAssetNameLength} from '../format.js'
import Asset from './asset.component.js'

const Chunk = ({
  final,
  indent,
  minWidth,
  ...chunk
}: {
  assets: Array<Partial<StatsAsset>>
  final?: boolean
  minWidth?: number
  indent?: any
  emitted?: boolean
}) => {
  return (
    <Ink.Box flexDirection="column">
      {chunk?.assets?.map((asset, index) => (
        <Asset
          key={index}
          {...asset}
          emitted={chunk?.emitted}
          minWidth={longestAssetNameLength(chunk?.assets)}
          final={index == chunk?.assets.length - 1}
          indent={[!final]}
        />
      ))}
    </Ink.Box>
  )
}

export default Chunk
