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
}> = ({assets, colors, col}) => {
  return (
    <Box
      borderStyle="round"
      borderColor="white"
      marginBottom={1}
      paddingX={1}
      flexDirection="column">
      {assets?.length > 0 ? (
        assets.map((asset, id) => (
          <Asset col={col} colors={colors} key={id} {...asset} />
        ))
      ) : (
        <Text>
          <Spinner /> Compiling
        </Text>
      )}
    </Box>
  )
}

export {Assets}
