import {Box, Text} from '@roots/bud-support/ink'

import Title from '../display/title.component.js'
import Asset from './asset.component.js'

const ChunkGroup = ({
  final,
  indent,
  minWidth,
  ...chunk
}: {
  assets?: Array<any>
  assetsSize?: number
  cached?: boolean
  emitted?: boolean
  final: boolean
  indent: Array<boolean>
  minWidth?: number
  name?: string
}) => {
  return (
    <Box flexDirection="column">
      <Box flexDirection="row">
        <Title final={final} indent={indent}>
          <Text>{chunk.name ?? ``}</Text>
        </Title>
      </Box>

      {chunk.assets?.map((asset, index) => (
        <Asset
          key={index}
          {...asset}
          final={index == chunk.assets?.length - 1}
          indent={[true, !final]}
          minWidth={minWidth}
        />
      ))}
    </Box>
  )
}

export default ChunkGroup
