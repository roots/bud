import React, {FunctionComponent} from 'react'
import {Box} from 'ink'
import {Stats} from 'webpack'

import Asset from './Asset'
import useAssetTransform from './useAssetTransform'

interface AssetsProps {
  assets: Stats.ToJsonOutput['assets']
}

const Assets: FunctionComponent<AssetsProps> = ({assets}) => {
  const processedAssets = useAssetTransform(assets)

  return (
    <Box>
      {processedAssets?.map((asset, id) => (
        <Asset
          key={id}
          name={asset.name}
          size={asset.size}
          emitted={asset.emitted}
          hot={asset.hot}
        />
      ))}
    </Box>
  )
}

export {Assets as default}
