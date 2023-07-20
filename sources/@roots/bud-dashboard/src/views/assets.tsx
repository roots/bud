import type {StatsCompilation} from '@roots/bud-framework/config'

import Assets from '@roots/bud-dashboard/components/assets'
import {useCompilationColor} from '@roots/bud-dashboard/hooks/useCompilationColor'
import figures from '@roots/bud-support/figures'
import {size as formatSize} from '@roots/bud-support/human-readable'
import {Box, Text} from '@roots/bud-support/ink'

export interface Props {
  compact?: boolean
  compilation?: StatsCompilation
  displayAssets?: boolean
  limit?: number
}

export default function CompilationAssets({
  compact,
  compilation,
  displayAssets,
  limit = 5,
}: Props) {
  const compilationColor = useCompilationColor(compilation, `cyan`)

  if (!displayAssets) return null
  if (!compilation?.assets) return null

  const filteredAssets = [...compilation.assets]
    .sort((a, b) => {
      if (a.size < b.size) return 1
      if (a.size > b.size) return -1
      return 0
    })
    .sort((a, b) => {
      if (a.emitted && !b.emitted) return -1
      if (!a.emitted && b.emitted) return 1
      return 0
    })
    .filter(
      asset =>
        !asset.name?.endsWith(`js`) &&
        !asset.name?.endsWith(`css`) &&
        !asset.name?.endsWith(`map`) &&
        !asset.name?.endsWith(`json`),
    )

  const assets = filteredAssets.splice(limit * -1)

  if (assets.length === 0) return null

  const hiddenCount = compilation.assets.length - assets.length

  return compact ? (
    <Box
      flexDirection="row"
      flexWrap="wrap"
      justifyContent="space-between"
    >
      <Text color={compilationColor}>assets</Text>
      <Box flexDirection="row" flexWrap="wrap" gap={2}>
        <Text>{assets.length} modules</Text>
        <Text>
          {`${formatSize(
            assets.reduce((acc, asset) => acc + asset.size, 0),
          )}`}
        </Text>
      </Box>
    </Box>
  ) : (
    <Box flexDirection="column">
      <Box
        flexDirection="row"
        flexWrap="wrap"
        justifyContent="space-between"
      >
        <Text color={compilationColor}>{`assets`}</Text>
      </Box>

      <Assets assets={assets} />

      {hiddenCount > 0 && (
        <Text dimColor wrap="truncate-end">
          {` ${figures.ellipsis} ${hiddenCount} additional ${
            hiddenCount > 1 ? `assets` : `asset`
          } not shown`}
        </Text>
      )}
    </Box>
  )
}
