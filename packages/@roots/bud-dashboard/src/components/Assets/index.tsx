import {
  React,
  FunctionComponent,
  Box,
  Spinner,
  Text,
} from '@roots/bud-support'
import {Asset} from './Asset'

const Assets: FunctionComponent<{
  assets: any
  colors: any
  col: any
  progress: any
}> = ({assets, colors, col, progress}) => {
  return (
    <Box flexDirection="column">
      {assets?.length > 0 ? (
        assets.map((asset, id) => (
          <Asset col={col} colors={colors} key={id} {...asset} />
        ))
      ) : (
        <Text>
          <Spinner /> {progress?.message ?? 'Compiling'}
        </Text>
      )}
    </Box>
  )
}

export {Assets}
