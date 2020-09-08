import React, {FunctionComponent} from 'react'
import {Screen} from '@roots/bud-cli'
import Asset from './Asset'

interface AssetsProps {
  assets: any
}

const Assets: FunctionComponent<AssetsProps> = ({assets}) => {
  assets = assets?.map(asset => ({
    ...asset,
    hot:
      assets.filter(
        check =>
          check.name.split('.').shift() ==
            asset.name.split('.').shift() &&
          check.name.includes('hot-update'),
      ).length > 0,
  }))

  return (
    <Screen title="Assets">
      {assets?.map((asset, id) => (
        <Asset
          key={id}
          name={asset.name}
          size={asset.size}
          emitted={asset.emitted}
          hot={asset.hot}
        />
      ))}
    </Screen>
  )
}

export {Assets as default}
