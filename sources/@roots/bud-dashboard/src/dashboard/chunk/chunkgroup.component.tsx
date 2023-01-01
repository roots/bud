import Ink from '@roots/bud-support/ink'

import Title from '../display/title.component.js'
import {color} from '../format.js'
import Asset from './asset.component.js'
import React from '@roots/bud-support/react'

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
    <Ink.Box flexDirection="column">
      <Ink.Box flexDirection="row">
        <Title indent={indent} final={final}>
          {chunk.name ? (
            <Ink.Text color={color.foregroundColor}>{chunk.name}</Ink.Text>
          ) : (
            <Ink.Text color={color.foregroundColor}>
              unnamed chunk
            </Ink.Text>
          )}
        </Title>
      </Ink.Box>

      {chunk.assets?.map((asset, index) => (
        <Asset
          key={index}
          {...asset}
          minWidth={minWidth}
          final={index == chunk.assets?.length - 1}
          indent={[true, !final]}
        />
      ))}
    </Ink.Box>
  )
}

export default ChunkGroup
