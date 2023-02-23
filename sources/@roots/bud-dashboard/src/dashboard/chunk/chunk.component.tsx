import Ink, {React} from '@roots/bud-support/ink'
import type {StatsAsset} from '@roots/bud-support/webpack'

import {longestAssetNameLength} from '../format.js'
import Asset from './asset.component.js'

interface Props extends React.ComponentProps {
  assets: Array<Partial<StatsAsset>>
  final?: boolean
  minWidth?: number
  indent?: any
  emitted?: boolean
}

const Chunk = ({final, indent, minWidth, ...chunk}: Props) => {
  return (
    <Ink.Box flexDirection="column">
      {chunk?.assets?.map((asset, index) => (
        <Ink.Box key={index}>
          <Asset
            {...asset}
            emitted={chunk?.emitted}
            minWidth={longestAssetNameLength(chunk?.assets)}
            final={index == chunk?.assets.length - 1}
            indent={[!final]}
          />
        </Ink.Box>
      ))}
    </Ink.Box>
  )
}

export default Chunk
