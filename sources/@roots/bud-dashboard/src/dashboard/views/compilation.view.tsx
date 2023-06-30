import type {
  StatsAsset,
  StatsCompilation,
} from '@roots/bud-framework/config'
import type {Context} from '@roots/bud-framework/context'

import figures from '@roots/bud-support/figures'
import {duration} from '@roots/bud-support/human-readable'
import {Box, Text} from '@roots/bud-support/ink'
import {relative} from 'node:path'

import Messages from '../components/messages.component.js'
import View from '../components/view.component.js'
import {useCompilationColor} from '../hooks/useCompilationColor.js'
import Assets from './assets.view.js'
import Entrypoints from './entrypoints.view.js'

export interface Props {
  borderColor?: string
  collapsed?: boolean
  compilation: StatsCompilation
  context: Context
  debug?: boolean
  displayAssets?: boolean
  displayEntrypoints?: boolean
  id: number
  total: number
}

export interface Asset extends Partial<StatsAsset> {}

export interface AssetGroup {
  assets?: Array<Asset>
}

const Compilation = ({
  collapsed,
  compilation,
  context,
  displayAssets = true,
  displayEntrypoints = true,
  id,
  total,
}: Props) => {
  const compilationColor = useCompilationColor(compilation)
  return (
    <View
      head={
        <Head
          compilation={compilation}
          context={context}
          id={id}
          total={total}
        />
      }
      borderColor={compilationColor}
      collapsed={collapsed}
      footer={<Footer compilation={compilation} />}
    >
      <Box flexDirection="column" gap={1}>
        <Messages color="red" messages={compilation.errors} />
        <Messages color="yellow" messages={compilation.warnings} />

        <Entrypoints
          compilation={compilation}
          displayEntrypoints={displayEntrypoints}
        />

        <Assets compilation={compilation} displayAssets={displayAssets} />
      </Box>
    </View>
  )
}

const Head = ({compilation, context, id, total}: Props) => {
  const color = useCompilationColor(compilation)
  const figure =
    compilation.errorsCount > 0 ? figures.cross : figures.hamburger
  if (!compilation) return <Text dimColor>Loading</Text>

  return (
    <Box
      flexDirection="row"
      justifyContent="space-between"
      overflowX="hidden"
      width="100%"
    >
      <Box flexDirection="row" flexShrink={0} gap={1} overflowX="hidden">
        <Text color={color}>{figure}</Text>
        <Text color={color}>{compilation.name.split(`/`).pop()}</Text>

        {total > 1 && (
          <Text dimColor>
            [{id}/{total}]
          </Text>
        )}

        {compilation.hash && <Text dimColor>[{compilation.hash}]</Text>}
      </Box>

      {context.basedir && compilation.outputPath && (
        <Text wrap="truncate">
          {` `}./{relative(context.basedir, compilation.outputPath)}
        </Text>
      )}
    </Box>
  )
}

const Footer = ({compilation}: Partial<Props>) => {
  if (!compilation?.assets) return <Text dimColor>...</Text>

  const moduleCount = compilation.modules?.filter(mod =>
    mod.hasOwnProperty(`cached`),
  ).length
  const cachedModuleCount = compilation.modules?.filter(
    mod => mod?.cached,
  ).length

  const formattedModuleCount = `${`${cachedModuleCount}/${moduleCount} modules cached`}`
  const formattedTime = `${duration(compilation.time)}`

  if (compilation.errorsCount > 0) {
    return (
      <Box flexDirection="row" gap={1} overflowX="hidden" width="100%">
        <Text wrap="truncate-end">
          <Text color="red">{figures.cross}</Text>
          {` `}
          {formattedTime}
        </Text>
      </Box>
    )
  }

  if (compilation.warningsCount > 0) {
    return (
      <Box flexDirection="row" gap={1} overflowX="hidden" width="100%">
        <Text wrap="truncate-end">
          <Text color="yellow">{figures.warning}</Text>
          {` `}
          {formattedTime}
          {` `}
          <Text dimColor>[{formattedModuleCount}]</Text>
        </Text>
      </Box>
    )
  }

  return (
    <Box flexDirection="row" gap={1} overflowX="hidden" width="100%">
      <Text wrap="truncate-end">
        <Text color="green">{figures.tick}</Text>
        {` `}
        {formattedTime}
        {` `}
        <Text dimColor>[{formattedModuleCount}]</Text>
      </Text>
    </Box>
  )
}

export default Compilation
