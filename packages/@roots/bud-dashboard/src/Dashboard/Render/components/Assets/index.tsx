import {React, FunctionComponent, Box} from '@roots/bud-support'
import {Asset} from './Asset'

const Assets: FunctionComponent<{
  assets: any
  colors: any
  col: any
}> = ({assets, colors, col}) => {
  return (
    <Box flexDirection="column" width={col(12)}>
      {assets?.map((asset, id) => (
        <Asset col={col} colors={colors} key={id} {...asset} />
      ))}
    </Box>
  )
}

export {Assets}
