import type {StatsAsset} from '@roots/bud-framework/config'

import Asset from '@roots/bud-dashboard/components/asset'
import {useLongestNamedObjectLength} from '@roots/bud-dashboard/hooks/useLongestNamedObjectLength'
import {Box} from '@roots/bud-support/ink'

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
