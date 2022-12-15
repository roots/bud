import {Box, Text} from '@roots/bud-support/ink'
import React from '@roots/bud-support/react'

import Title from '../display/title.component.js'
import {color} from '../format.js'
import Asset from './asset.component.js'

const ChunkGroup = ({
  indent,
  final,
  minWidth,
  ...chunk
}: {
  name?: string
  assetsSize?: number
  assets?: Array<any>
  indent: Array<boolean>
  final: boolean
  minWidth?: number
  emitted?: boolean
  cached?: boolean
}) => {
  return (
    <Box flexDirection="column">
      <Box flexDirection="row">
        <Title indent={indent} final={final}>
          {chunk.name ? (
            <Text color={color.foregroundColor}>{chunk.name}</Text>
          ) : (
            <Text color={color.foregroundColor}>unnamed chunk</Text>
          )}
        </Title>
      </Box>

      {chunk.assets?.map((asset, index) => (
        <Asset
          key={index}
          {...asset}
          minWidth={minWidth}
          final={index == chunk.assets?.length - 1}
          indent={[true, !final]}
        />
      ))}
    </Box>
  )
}

export default ChunkGroup
