import {React, FunctionComponent, Box} from '@roots/bud-support'
import {useStyle} from '@roots/ink-use-style'
import {Asset} from './Asset'

const Assets: FunctionComponent<{
  assets: any
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
