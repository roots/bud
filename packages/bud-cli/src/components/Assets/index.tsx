import React, {FunctionComponent} from 'react'
import {Box} from 'ink'
import Asset from './Asset'
import {UseCompilation} from '../../hooks/useCompilation'
import {useTransform} from './useAssetTransform'
import {useStyle} from '@roots/ink-use-style'

const Assets: Assets.Component = ({assets}) => {
  const processedAssets = useTransform(assets)
  const {col} = useStyle()

  return (
    <Box flexDirection="column" width={col(12)} marginTop={1}>
      {processedAssets?.map(
        ({name, size, info, emitted, hot}, id) => (
          <Asset
            key={id}
            name={name}
            size={size}
            info={info}
            active={emitted}
            hot={hot}
          />
        ),
      )}
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
