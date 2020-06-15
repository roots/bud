import React from 'react'
import {Box, Color, Text} from 'ink'
import Spinner from 'ink-spinner'

/**
 * Asset
 */
const Asset = ({name, size, width}) =>
  <Box height={1} textWrap="truncate" width={width} flexDirection="row" justifyContent="space-between">
    <Box textWrap="truncate" height={1}>
      <Text><Color white>{name}</Color></Text>
    </Box>
    <Box>
      <Text><Color dim>{size/1000}kb</Color></Text>
    </Box>
  </Box>

/**
 * Assets
 */
const Assets = ({assets, width}) =>
  assets.map((asset, id) => (
    <Asset
      width={width}
      key={id}
      name={asset.name}
      size={asset.size}
    />
  ))

export default Assets