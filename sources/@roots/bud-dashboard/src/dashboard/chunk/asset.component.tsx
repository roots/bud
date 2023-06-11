import type {StatsAsset} from '@roots/bud-framework/config'
import {size as formatSize} from '@roots/bud-support/human-readable'
import {Box, Text} from '@roots/bud-support/ink'

import Title from '../display/title.component.js'

interface Props {
  cached?: boolean
  minWidth: number
  name?: string
  size?: number
  emitted?: boolean
  final?: boolean
  indent?: any
  info?: StatsAsset['info']
}

const Asset = ({minWidth, name, size, final, indent}: Props) => {
  return (
    <Title indent={indent} final={final}>
      <Box minWidth={minWidth}>
        <Text dimColor>{name}</Text>
      </Box>

      <Box minWidth={10} justifyContent="flex-end">
        <Text dimColor>{(formatSize(size) as string).trim()}</Text>
      </Box>
    </Title>
  )
}

export {Asset as default}
