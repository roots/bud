import type {StatsCompilation} from '@roots/bud-support/webpack'

import Assets from '@roots/bud-dashboard/components/assets'
import View from '@roots/bud-dashboard/components/view'
import {useCompilationColor} from '@roots/bud-dashboard/hooks/useCompilationColor'
import {longestNamedObjectLength} from '@roots/bud-dashboard/hooks/useLongestNamedObjectLength'
import {size} from '@roots/bud-support/human-readable'
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

  return entrypoints.map(({assets, assetsSize, name}, key) => (
    <View
      compact={compact}
      footer={<Foot bytes={assetsSize} />}
      head={<Head color={compilationColor} name={name} />}
      key={key}
    >
      <Assets assets={assets} minWidth={minWidth} />
    </View>
  ))
}

const Head = ({color, name}) => (
  <Box flexDirection="column">
    <Text color={color}>{name ?? `entrypoint`}</Text>
  </Box>
)

const Foot = ({bytes}: {bytes: number}) => {
  return (
    <Box flexDirection="row">
      <Text dimColor>{`${size(bytes)}`}</Text>
    </Box>
  )
}

export {Entrypoints as default}
