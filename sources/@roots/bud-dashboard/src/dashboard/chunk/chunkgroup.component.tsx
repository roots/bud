import * as Ink from '@roots/bud-support/ink'

import Title from '../display/title.component.js'
import {color} from '../format.js'
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
    <Ink.Box flexDirection="column">
      <Ink.Box flexDirection="row">
        <Title final={final} indent={indent}>
          <Ink.Text color={color.foregroundColor}>
            {chunk.name ?? ``}
          </Ink.Text>
        </Title>
      </Ink.Box>

      {chunk.assets?.map((asset, index) => (
        <Asset
          key={index}
          {...asset}
          final={index == chunk.assets?.length - 1}
          indent={[true, !final]}
          minWidth={minWidth}
        />
      ))}
    </Ink.Box>
  )
}

export default ChunkGroup
