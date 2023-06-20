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
    <Box
      flexDirection="row"
      justifyContent="space-between"
      overflowX="hidden"
      width="100%"
    >
      <Box
        minWidth={
          compilation.name?.split(`/`)?.pop()?.length
            ? compilation.name?.split(`/`)?.pop()?.length + 2
            : 2
        }
        overflowX="hidden"
      >
        <Text color={color} wrap="truncate-end">
          {compilation.errorsCount > 0 ? figures.cross : figures.hamburger}
          {` `}
          {compilation.name?.split(`/`)?.pop() ?? ``}
        </Text>
      </Box>

      <Text dimColor wrap="truncate-middle">
        {` `}[{compilation.hash ?? ``}]{` `}
      </Text>

      {context.basedir && compilation.outputPath && (
        <Text wrap="truncate">
          ./{relative(context.basedir, compilation.outputPath)}
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

  const emitCount = compilation.assets.filter(
    asset => asset.emitted && asset.type === `asset`,
  ).length

  const formattedTime = `${duration(compilation.time)}`

  if (compilation.errorsCount > 0) {
    return (
      <Text color="red" wrap="truncate-end">
        {figures.warning} Built with errors in{` `}
        {formattedTime}
      </Text>
    )
  }

  if (compilation.warningsCount > 0) {
    return (
      <Text color="yellow" wrap="truncate-start">
        {figures.warning} Built with warnings in{` `}
        {formattedTime}
      </Text>
    )
  }

  if (emitCount === 0) {
    return (
      <Text color="green" wrap="truncate-start">
        {figures.tick} No changes to built assets ({formattedTime})
      </Text>
    )
  }

  return (
    <Box flexDirection="row" gap={1} overflowX="hidden" width="100%">
      <Text color="green">
        {figures.tick}
        {` `}
      </Text>
      <Text wrap="truncate-start">
        Built in {formattedTime}
        {` `}
      </Text>
      <Text dimColor wrap="truncate-end">
        [{formattedModuleCount}]
      </Text>
    </Box>
  )
}

export default Compilation
