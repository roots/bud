import figures from '@roots/bud-support/figures'
import {size as formatSize} from '@roots/bud-support/human-readable'
import {Box, Text} from '@roots/bud-support/ink'

interface Props {
  auxillaryChunkNames?: string[]
  cached?: boolean
  emitted?: boolean
  id?: string
  indent?: any
  info?: {
    chunkhash?: string | string[]
    contenthash?: string | string[]
    development?: boolean
    fullhash?: string | string[]
    hotModuleReplacement?: boolean
    immutable?: boolean
    javascriptModule?: boolean
    minimized?: boolean
    modulehash?: string | string[]
    related?: Record<string, string | string[]>
    size?: number
    sourceFilename?: string
  }
  minWidth: number
  name?: string
  size?: number
}

const Asset = ({minWidth, ...asset}: Props) => {
  if (!asset) return null

  return (
    <Box flexDirection="column">
      <Box flexDirection="row" gap={1}>
        <Text dimColor={!asset.emitted}>
          {!asset.emitted ? figures.almostEqual : figures.pointerSmall}
        </Text>

        <Box
          flexDirection="row"
          gap={1}
          minWidth={minWidth}
          overflowX="hidden"
        >
          <Text dimColor={!asset.emitted} wrap="truncate-middle">
            {asset.name}
          </Text>
        </Box>

        <Box flexDirection="row" justifyContent="flex-end" minWidth={10}>
          <Text dimColor>{`${formatSize(asset.size)}`.trim()}</Text>
        </Box>

        <Box flexDirection="row" gap={1} minWidth={1}>
          {asset.info?.minimized && (
            <Text color="green" dimColor={!asset.emitted}>
              {figures.tick}
            </Text>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export {Asset as default}
