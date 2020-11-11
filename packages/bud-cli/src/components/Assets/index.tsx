import React, {FunctionComponent} from 'react'
import {Box} from 'ink'
import Asset from './Asset'
import useAssetTransform from './useAssetTransform'
import {useStyle} from '@roots/ink-use-style'
import {UseCompilation} from '../../hooks/useCompilation'

const Assets: Assets.Component = ({assets}) => {
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

export declare namespace Assets {
  export type Component = FunctionComponent<Props>
  export interface Props {
    assets: UseCompilation.Compilation['stats']['assets']
  }
}

export {Assets as default}
