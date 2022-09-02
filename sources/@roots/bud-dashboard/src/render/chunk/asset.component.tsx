import {Box, Text} from 'ink'
import React from 'react'
import type {StatsAsset} from 'webpack'

import Title from '../display/title.component.js'
import {color, size as formatSize} from '../format.js'

const Asset = ({
  minWidth,
  name,
  size,
  emitted,
  final,
  cached,
  indent,
  info,
}: {
  cached?: boolean
  minWidth: number
  name: string
  size?: number
  emitted?: boolean
  final?: boolean
  indent?: any
  info?: StatsAsset['info']
}) => {
  return (
    <Title indent={indent} final={final}>
      <Box minWidth={minWidth} marginRight={1}>
        <Text color={color.dim}>{name}</Text>
      </Box>

      {size && size > 0 ? (
        <Box minWidth={10} justifyContent="flex-end">
          <Text color={color.dim} dimColor>
            {(formatSize(size) as string).trim()}
          </Text>
        </Box>
      ) : null}
    </Title>
  )
}

export default Asset
