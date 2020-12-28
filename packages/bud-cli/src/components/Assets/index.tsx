import {React, FunctionComponent, Box} from '@roots/bud-support'
import {useStyle} from '@roots/ink-use-style'

import {CompilationAsset} from '../../hooks/useCompilation'
import {Asset} from './Asset'

const Assets: FunctionComponent<{
  assets: Array<CompilationAsset>
}> = ({assets}) => {
  const {col} = useStyle()

  return (
    <Box flexDirection="column" width={col(12)}>
      {assets?.map((asset, id) => (
        <Asset key={id} {...asset} />
      ))}
    </Box>
  )
}

export {Assets}
