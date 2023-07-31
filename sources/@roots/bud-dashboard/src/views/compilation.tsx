import type {
  StatsAsset,
  StatsCompilation,
} from '@roots/bud-framework/config'

import {relative} from 'node:path'

import Messages from '@roots/bud-dashboard/components/messages'
import View from '@roots/bud-dashboard/components/view'
import {useCompilationColor} from '@roots/bud-dashboard/hooks/useCompilationColor'
import {duration} from '@roots/bud-support/human-readable'
import {Box, Text, useEffect, useState} from '@roots/bud-support/ink'
import isNumber from '@roots/bud-support/lodash/isNumber'

import Assets from './assets.js'
import Entrypoints from './entrypoints.js'

export interface Props {
  basedir?: string
  borderColor?: string
  compact?: boolean
  compilation: StatsCompilation
  debug?: boolean
  displayAssets?: boolean
  displayEntrypoints?: boolean
  id: number
  total?: number
}

export interface Asset extends Partial<StatsAsset> {}

export interface AssetGroup {
  assets?: Array<Asset>
}

const Compilation = ({
  basedir,
  compact,
  compilation,
  displayAssets,
  displayEntrypoints,
  id,
  total,
}: Props) => {
  const [current, setCurrent] = useState(compilation)
  const compilationColor = useCompilationColor(compilation)

  useEffect(() => {
    if (!current) {
      setCurrent(compilation)
      return
    }

    if (!compilation.hash) return
    if (compilation.hash === current?.hash) return

    setCurrent(compilation)
  }, [current, compilation])

  return (
    <View
      head={
        <Head
          basedir={basedir}
          compilation={current}
          id={id}
          total={total}
        />
      }
      borderColor={compilationColor}
      footer={<Footer compilation={current} />}
      paddingY={compact ? 0 : 1}
    >
      <Box flexDirection="column" gap={compact ? 0 : 1}>
        <Messages color="red" messages={current?.errors} />
        <Messages color="yellow" messages={current?.warnings} />

        {current.errorsCount === 0 && (
          <>
            <Entrypoints
              compact={compact}
              compilation={current}
              displayEntrypoints={displayEntrypoints}
            />

            <Assets
              compact={compact}
              compilation={current}
              displayAssets={displayAssets}
            />
          </>
        )}
      </Box>
    </View>
  )
}

const Head = ({basedir, compilation, id, total}: Props) => {
  const color = useCompilationColor(compilation)
  if (!compilation) return <Text dimColor>Loading</Text>

  return (
    <Box
      flexDirection="row"
      justifyContent="space-between"
      overflow="hidden"
      width="100%"
    >
      <Box flexDirection="row" overflow="hidden">
        <Text color={color} wrap="truncate">
          {compilation.name?.split(`/`).pop() ?? `compilation`}
        </Text>

        {total && total > 1 && (
          <Text dimColor wrap="truncate">
            {` `}[{id}/{total}]
          </Text>
        )}

        {compilation.hash && (
          <Text dimColor wrap="truncate">
            {` `}[{compilation.hash}]
          </Text>
        )}
      </Box>

      {basedir && compilation.outputPath && (
        <Text wrap="truncate">
          ./{relative(`${basedir}`, `${compilation.outputPath}`)}
        </Text>
      )}
    </Box>
  )
}

const Footer = ({compilation}: Partial<Props>) => {
  if (!compilation || !compilation?.assets)
    return <Text dimColor>...</Text>

  const errorsCount = isNumber(compilation.errorsCount)
    ? compilation.errorsCount
    : 0
  const formattedErrorCount =
    errorsCount > 1 ? `${errorsCount} errors` : `${errorsCount} error`

  const cachedModuleCount =
    compilation.modules?.filter(mod => mod?.cached)?.length ?? 0
  const totalModuleCount =
    compilation.modules?.filter(mod => mod && mod.hasOwnProperty(`cached`))
      ?.length ?? 0

  const formattedModuleCount = `${cachedModuleCount}/${totalModuleCount} modules cached`

  const formattedTime = compilation.time
    ? `${duration(compilation.time)} `
    : ``

  if (errorsCount > 0) {
    return (
      <Box flexDirection="row" gap={1} overflowX="hidden" width="100%">
        <Text wrap="truncate-end">{formattedErrorCount}</Text>
      </Box>
    )
  }

  return (
    <Box flexDirection="row" gap={1} overflowX="hidden" width="100%">
      <Text wrap="truncate-end">
        {formattedTime}
        <Text dimColor>{`${totalModuleCount} modules`}</Text>
        <Text dimColor>{` [${formattedModuleCount}]`}</Text>
      </Text>
    </Box>
  )
}

export default Compilation
