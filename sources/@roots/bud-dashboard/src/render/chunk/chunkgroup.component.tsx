import {Box, Text} from 'ink'
import React from 'react'

import Title from '../display/title.component.js'
import {longestAssetNameLength} from '../format.js'
import Asset from './asset.component.js'

const ChunkGroup = ({
  name,
  assets,
  indent,
  color,
  final,
  emitted,
}: {
  name: string
  assets: Array<any>
  indent: Array<boolean>
  color: string
  final: boolean
  emitted?: boolean
}) => {
  return (
    <Box flexDirection="column">
      <Box flexDirection="row">
        <Title indent={indent} final={final}>
          <Text color={color}>{name}</Text>
          {!emitted && <Text dimColor> (not emitted) </Text>}
        </Title>
      </Box>

      {emitted &&
        assets.map((asset, index) => (
          <Asset
            key={index}
            {...asset}
            emitted={emitted}
            minWidth={longestAssetNameLength(assets) + 1}
            final={index == assets?.length - 1}
            indent={[true, !final]}
          />
        ))}
    </Box>
  )
}

export default ChunkGroup
