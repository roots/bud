import type {StatsAsset} from '@roots/bud-support/webpack'
import * as Ink from 'ink'

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
      <Ink.Box minWidth={minWidth}>
        <Ink.Text color={color.dim}>{name}</Ink.Text>
      </Ink.Box>

      <Ink.Box minWidth={10} justifyContent="flex-end">
        <Ink.Text dimColor>{(formatSize(size) as string).trim()}</Ink.Text>
      </Ink.Box>
    </Title>
  )
}

export default Asset
