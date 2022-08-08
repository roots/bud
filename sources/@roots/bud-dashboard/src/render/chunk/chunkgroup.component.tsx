import {Box, Text} from 'ink'
import React from 'react'

import Title from '../display/title.component.js'
import Asset from './asset.component.js'

const ChunkGroup = ({
  name,
  assets,
  emitted,
  indent,
  assetsSize,
  color,
  final,
}) => {
  return (
    <Box flexDirection="column">
      <Box flexDirection="row">
        <Title indent={indent} final={final}>
          <Text color={color} dimColor={emitted === false}>
            {name}
          </Text>
        </Title>
      </Box>

      {assets.map((asset, index) => (
        <Asset
          key={index}
          {...asset}
          final={index == assets?.length - 1}
          indent={[true, !final]}
        />
      ))}
    </Box>
  )
}

export default ChunkGroup
