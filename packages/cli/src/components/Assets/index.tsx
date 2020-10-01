import React, {FunctionComponent} from 'react'
import {Stats} from 'webpack'

import Asset from './Asset'

import useAssetTransform from './useAssetTransform'

interface AssetsProps {
  assets: Stats.ToJsonOutput['assets']
}

const Assets: FunctionComponent<AssetsProps> = ({assets}) => {
  const processedAssets = useAssetTransform(assets)

  return (
    <>
      {processedAssets?.length
        ? processedAssets.map((asset, id) => (
            <Asset
              key={id}
              name={asset.name}
              size={asset.size}
              emitted={asset.emitted}
              hot={asset.hot}
            />
          ))
        : []}
    </>
  )
}

export {Assets as default}
