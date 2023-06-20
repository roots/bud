import type {
  StatsAsset,
  StatsCompilation,
} from '@roots/bud-framework/config'
import type {Context} from '@roots/bud-framework/options/context'

import figures from '@roots/bud-support/figures'
import {duration} from '@roots/bud-support/human-readable'
import {Box, Text} from '@roots/bud-support/ink'
import {relative} from 'node:path'

import View from '../components/view.component.js'
import {useCompilationColor} from '../hooks/useCompilationColor.js'
import Assets from './assets.view.js'
import Entrypoints from './entrypoints.view.js'

export interface Props {
  compilation: StatsCompilation
  context: Context
  debug?: boolean
  displayAssets?: boolean
  displayDebug?: boolean
  displayEntrypoints?: boolean
}

export interface Asset extends Partial<StatsAsset> {}

export interface AssetGroup {
  assets?: Array<Asset>
}

const Compilation = ({
  compilation,
  context,
  displayAssets = true,
  displayDebug = false,
  displayEntrypoints = true,
}: Props) => {
  return (
    <View
      footer={<Footer compilation={compilation} />}
      head={<Head compilation={compilation} context={context} />}
    >
      <Box flexDirection="column" gap={1}>
        <Entrypoints
          compilation={compilation}
          displayEntrypoints={displayEntrypoints}
        />

        <Assets compilation={compilation} displayAssets={displayAssets} />
      </Box>
    </View>
  )
}

const Head = ({compilation, context}: Props) => {
  const color = useCompilationColor(compilation)

  if (!compilation) return <Text dimColor>Loading</Text>

  return (
    <Box flexDirection="row" gap={2}>
      <Text color={color}>
        {compilation.errorsCount > 0 ? figures.cross : figures.hamburger}
      </Text>

      <Text color={color}>
        {compilation.name?.split(`/`)?.pop() ?? ``}
      </Text>

      {context.basedir && compilation.outputPath && (
        <Text>./{relative(context.basedir, compilation.outputPath)}</Text>
      )}

      <Text dimColor>[{compilation.hash ?? ``}]</Text>
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

  const emitCount = compilation.assets.filter(
    asset => asset.emitted && asset.type === `asset`,
  ).length

  const formattedTime = `${duration(compilation.time)}`

  if (compilation.errorsCount > 0) {
    return (
      <Text color="red">
        {figures.warning} Built with errors in{` `}
        {formattedTime}
      </Text>
    )
  }

  if (compilation.warningsCount > 0) {
    return (
      <Text color="yellow">
        {figures.warning} Built with warnings in{` `}
        {formattedTime}
      </Text>
    )
  }

  if (emitCount === 0) {
    return (
      <Text color="green">
        {figures.tick} No changes to built assets ({formattedTime})
      </Text>
    )
  }

  return (
    <Box flexDirection="row" gap={1}>
      <Text color="green">
        {figures.tick}
        {` `}
      </Text>
      <Text>Built in {formattedTime}</Text>
      <Text dimColor>[{formattedModuleCount}]</Text>
    </Box>
  )
}

export default Compilation
