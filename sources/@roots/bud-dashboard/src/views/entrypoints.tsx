import type {StatsCompilation} from '@roots/bud-support/webpack'

import Assets from '@roots/bud-dashboard/components/assets'
import {useCompilationColor} from '@roots/bud-dashboard/hooks/useCompilationColor'
import {longestNamedObjectLength} from '@roots/bud-dashboard/hooks/useLongestNamedObjectLength'
import {size as formatSize} from '@roots/bud-support/human-readable'
import {Box, Text} from '@roots/bud-support/ink'
import isNumber from '@roots/bud-support/lodash/isNumber'

interface Props {
  compact?: boolean
  compilation?: StatsCompilation
  displayEntrypoints?: boolean
}

const Entrypoints = ({
  compact,
  compilation,
  displayEntrypoints,
}: Props) => {
  const compilationColor = useCompilationColor(compilation, `cyan`)

  if (!displayEntrypoints) return null
  if (!compilation?.entrypoints) return null

  const entrypoints = Object.values(compilation.entrypoints)
    .map(entrypoint => ({
      ...entrypoint,
      assets:
        entrypoint.assets
          ?.filter(asset => !asset?.name?.includes(`hot-update`))
          .map(asset => ({
            ...(asset ?? {}),
            ...(compilation?.assets?.find(a => a?.name === asset?.name) ??
              {}),
          })) ?? [],
    }))
    .filter(({assets}) => assets.length > 0)

  const minWidth = entrypoints.reduce(
    (longest, entry) =>
      Math.max(
        entry.assets ? longestNamedObjectLength(entry.assets) : 0,
        longest,
      ),
    0,
  )

  if (entrypoints.length === 0) return null

  return entrypoints.map(({assets, name}, key) => (
    <Box flexDirection="column" key={key}>
      {compact ? (
        <Box
          flexDirection="row"
          flexWrap="wrap"
          justifyContent="space-between"
        >
          {name && <Text color={compilationColor}>{name}</Text>}
          <Box flexDirection="row" flexWrap="wrap" gap={2}>
            <Text>{assets.length} modules</Text>
            <Text>
              {`${formatSize(
                assets.reduce(
                  (acc, asset) =>
                    acc +
                    (asset?.size && isNumber(asset.size) ? asset.size : 0),
                  0,
                ),
              )}`}
            </Text>
          </Box>
        </Box>
      ) : (
        <Box flexDirection="column" key={key}>
          <Box
            flexDirection="row"
            flexWrap="wrap"
            justifyContent="space-between"
          >
            {name && name !== compilation.name && (
              <Text color={compilationColor}>{name}</Text>
            )}
          </Box>
          <Assets assets={assets} minWidth={minWidth} />
        </Box>
      )}
    </Box>
  ))
}

export {Entrypoints as default}
