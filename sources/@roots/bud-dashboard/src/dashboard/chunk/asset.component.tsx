import Ink from '@roots/bud-support/ink'
import type {StatsAsset} from '@roots/bud-support/webpack'
import React from '@roots/bud-support/react'

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
  name?: string
  size?: number
  emitted?: boolean
  final?: boolean
  indent?: any
  info?: StatsAsset['info']
}) => {
  return (
    <Title indent={indent} final={final}>
      <Ink.Box minWidth={minWidth} marginRight={1}>
        <Ink.Text color={color.dim}>{name}</Ink.Text>
      </Ink.Box>

      {size && size > 0 ? (
        <Ink.Box minWidth={10} justifyContent="flex-end">
          <Ink.Text color={color.dim} dimColor>
            {(formatSize(size) as string).trim()}
          </Ink.Text>
        </Ink.Box>
      ) : null}
    </Title>
  )
}

export default Asset
