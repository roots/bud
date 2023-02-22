import Ink, {React} from '@roots/bud-support/ink'
import type {StatsAsset} from '@roots/bud-support/webpack'

import Title from '../display/title.component.js'
import {color, size as formatSize} from '../format.js'

interface Props extends React.ComponentProps {
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
