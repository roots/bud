import React from 'react'
import {Box} from 'ink'
import Asset from './Asset'
import useAssetTransform from './useAssetTransform'
import {useStyle} from '@roots/ink-use-style'

const Assets = ({assets}) => {
  const processedAssets = useAssetTransform(assets)
  const {col} = useStyle()

  return (
    <Box flexDirection="column" width={col(12)}>
      {processedAssets?.map(({name, size, emitted, hot}, id) => (
        <Asset
          key={id}
          name={name}
          size={size}
          active={emitted}
          hot={hot}
        />
      )) ?? null}
    </Box>
  )
}

export {Assets as default}
