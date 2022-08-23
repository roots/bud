import {Box, Text} from 'ink'
import React from 'react'

import Title from '../display/title.component.js'
import {longestAssetNameLength} from '../format.js'
import Asset from './asset.component.js'

const ChunkGroup = ({
  indent,
  color,
  final,
  ...chunk
}: {
  name?: string
  assets?: Array<any>
  indent: Array<boolean>
  color: string
  final: boolean
  emitted?: boolean
  cached?: boolean
}) => {
  return (
    <Box flexDirection="column">
      <Box flexDirection="row">
        <Title indent={indent} final={final}>
          {chunk?.name && <Text color={color}>{chunk.name}</Text>}
        </Title>
      </Box>

      {chunk.assets?.map((asset, index) => (
        <Asset
          key={index}
          {...asset}
          emitted={chunk.emitted}
          minWidth={longestAssetNameLength(chunk.assets) + 1}
          final={index == chunk.assets?.length - 1}
          indent={[true, !final]}
        />
      ))}
    </Box>
  )
}

export default ChunkGroup
