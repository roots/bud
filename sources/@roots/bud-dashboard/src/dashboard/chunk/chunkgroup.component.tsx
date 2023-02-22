import Ink, {React} from '@roots/bud-support/ink'

import Title from '../display/title.component.js'
import {color} from '../format.js'
import Asset from './asset.component.js'

interface Props extends React.ComponentProps {
  name?: string
  assetsSize?: number
  assets?: Array<any>
  indent: Array<boolean>
  final: boolean
  minWidth?: number
  emitted?: boolean
  cached?: boolean
}

const ChunkGroup = ({indent, final, minWidth, name, assets}: Props) => {
  return (
    <Ink.Box flexDirection="column">
      <Ink.Box flexDirection="row">
        <Title indent={indent} final={final}>
          <Ink.Text color={color.foregroundColor}>{name ?? ``}</Ink.Text>
        </Title>
      </Ink.Box>

      {assets?.map((asset, index) => (
        <Asset
          key={index}
          {...asset}
          minWidth={minWidth}
          final={index == assets?.length - 1}
          indent={[true, !final]}
        />
      ))}
    </Ink.Box>
  )
}

export default ChunkGroup
