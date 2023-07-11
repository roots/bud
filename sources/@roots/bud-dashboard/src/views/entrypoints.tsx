import type {StatsCompilation} from '@roots/bud-support/webpack'

import Assets from '@roots/bud-dashboard/components/assets'
import {useCompilationColor} from '@roots/bud-dashboard/hooks/useCompilationColor'
import {longestNamedObjectLength} from '@roots/bud-dashboard/hooks/useLongestNamedObjectLength'
import {Box, Text} from '@roots/bud-support/ink'

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

  const entrypoints = Object.values(compilation.entrypoints).map(
    entrypoint => ({
      ...entrypoint,
      assets:
        entrypoint.assets?.map(asset => ({
          ...(asset ?? {}),
          ...(compilation?.assets?.find(a => a?.name === asset?.name) ??
            {}),
        })) ?? [],
    }),
  )

  const minWidth = entrypoints.reduce(
    (longest, entry) =>
      Math.max(
        entry.assets ? longestNamedObjectLength(entry.assets) : 0,
        longest,
      ),
    0,
  )

  return entrypoints.map(({assets, name}, key) => (
    <Box flexDirection="column" key={key}>
      {compact ? (
        <Box
          flexDirection="row"
          flexWrap="wrap"
          justifyContent="space-between"
        >
          <Text color={compilationColor}>{name ?? `entrypoint`}</Text>
          <Text>{assets.length} modules</Text>
        </Box>
      ) : (
        <Box flexDirection="column" key={key}>
          <Box
            flexDirection="row"
            flexWrap="wrap"
            justifyContent="space-between"
          >
            <Text color={compilationColor}>{name ?? `entrypoint`}</Text>
          </Box>
          <Assets assets={assets} minWidth={minWidth} />
        </Box>
      )}
    </Box>
  ))
}

export {Entrypoints as default}
