import type {StatsAsset} from '@roots/bud-framework/config'

import {Box} from '@roots/bud-support/ink'

import {useLongestNamedObjectLength} from '../hooks/useLongestNamedObjectLength.js'
import Asset from './asset.component.js'

interface Props {
  assets?: Array<Partial<StatsAsset> & {name?: string; size?: number}>
  minWidth?: number
}

const Assets = ({assets, minWidth}: Props) => {
  const fallbackMinWidth = useLongestNamedObjectLength(assets)

  if (!assets) return null

  return (
    <Box flexDirection="column" overflowX="hidden" width="100%">
      {assets.map((asset, index) => (
        <Asset
          key={index}
          {...asset}
          minWidth={minWidth ?? fallbackMinWidth}
        />
      ))}
    </Box>
  )
}

export default Assets
