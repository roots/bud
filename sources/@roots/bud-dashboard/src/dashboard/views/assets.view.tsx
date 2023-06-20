import type {StatsCompilation} from '@roots/bud-framework/config'

import figures from '@roots/bud-support/figures'
import {size} from '@roots/bud-support/human-readable'
import {Text} from '@roots/bud-support/ink'

import Assets from '../components/assets.component.js'
import View from '../components/view.component.js'
import {useCompilationColor} from '../hooks/useCompilationColor.js'
import {useLongestNamedObjectLength} from '../hooks/useLongestNamedObjectLength.js'

export interface Props {
  compilation?: StatsCompilation
  displayAssets?: boolean
  limit?: number
}

export default function CompilationAssets({
  compilation,
  displayAssets = true,
  limit = 5,
}: Props) {
  const minWidth = useLongestNamedObjectLength(
    [...(compilation?.assets ?? [])]
      .filter(
        asset =>
          !asset.name?.endsWith(`js`) &&
          !asset.name?.endsWith(`css`) &&
          asset.size > 0,
      )
      .slice(0, limit),
  )
  const compilationColor = useCompilationColor(compilation, `cyan`)

  if (!displayAssets) return null
  if (!compilation?.assets) return null

  const assets = [...compilation.assets].filter(
    asset =>
      !asset.name?.endsWith(`js`) &&
      !asset.name?.endsWith(`css`) &&
      asset.size > 0,
  )

  const hidden = assets.splice(limit)

  return (
    <View
      footer={<Footer assets={assets} hidden={hidden} />}
      head={<Text color={compilationColor}>assets</Text>}
    >
      <Assets assets={assets} minWidth={minWidth} />

      {hidden?.length > 0 && (
        <Text dimColor>
          {`${figures.ellipsis} ${hidden.length} additional ${
            hidden.length > 1 ? `assets` : `asset`
          } not shown`}
        </Text>
      )}
    </View>
  )
}

const Footer = ({
  assets,
  hidden,
}: {
  assets?: Array<{size: number}>
  hidden?: Array<{size: number}>
}) => {
  if (!assets) return <Text dimColor>...</Text>

  const totalFileSize = size(
    [...assets, ...(hidden ?? [])].reduce(
      (value, asset): number => value + asset.size,
      0,
    ),
  )
  return <Text dimColor>{`${totalFileSize}`}</Text>
}
