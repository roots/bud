import type {StatsAsset} from '@roots/bud-framework/config'

import {size as formatSize} from '@roots/bud-support/human-readable'
import {Box, Text} from '@roots/bud-support/ink'

import Title from '../display/title.component.js'

interface Props {
  emitted?: boolean
  final?: boolean
  indent?: any
  info?: StatsAsset['info']
  minWidth: number
  name?: string
  size?: number
}

const Asset = ({emitted, final, indent, minWidth, name, size}: Props) => {
  return (
    <Title final={final} indent={indent}>
      <Box minWidth={minWidth}>
        <Text dimColor={!emitted}>{name}</Text>
      </Box>

      <Box justifyContent="flex-end" minWidth={10}>
        <Text dimColor={!emitted}>{`${formatSize(size)}`.trim()}</Text>
      </Box>
    </Title>
  )
}

export {Asset as default}
