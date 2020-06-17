import React from 'react'
import {Box, Color, Text} from 'ink'

/**
 * Asset
 */
const Asset = ({name, size, width}) =>
  <Box
    height={1}
    textWrap="truncate"
    flexDirection="row"
    justifyContent="space-between"
    width={width}
    paddingLeft={1}
    paddingRight={2}>
    <Box textWrap="truncate" width={width}>
      <Text><Color white>{name}</Color></Text>
    </Box>

    <Box>
      <Text><Color dim>{size/1000}kb</Color></Text>
    </Box>
  </Box>

/**
 * Assets
 */
const Assets = ({assets, width}) => {
  return assets.map((asset, id) => (
    <Asset
      key={id}
      name={asset.name}
      size={asset.size}
      width={width}
    />
  ))
}

export default Assets