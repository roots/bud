import {size as formatSize} from '@roots/bud-support/human-readable'
import Ink from '@roots/bud-support/ink'
import React from '@roots/bud-support/react'
import type {StatsAsset} from '@roots/bud-support/webpack'

import Title from '../display/title.component.js'

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
        <Ink.Text dimColor>{name}</Ink.Text>
      </Ink.Box>

      {size && size > 0 ? (
        <Ink.Box minWidth={10} justifyContent="flex-end">
          <Ink.Text dimColor>
            {(formatSize(size) as string).trim()}
          </Ink.Text>
        </Ink.Box>
      ) : null}
    </Title>
  )
}

export default Asset
