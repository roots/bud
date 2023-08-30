import type {StatsAsset} from '@roots/bud-framework/config'

import figures from '@roots/bud-support/figures'
import {size as formatSize} from '@roots/bud-support/human-readable'
import {Box, Text} from '@roots/bud-support/ink'
import isNumber from '@roots/bud-support/lodash/isNumber'

interface Props extends Partial<StatsAsset> {
  name?: string
  size?: number
}

const Asset = (asset: Props) => {
  if (!asset) return null

  return (
    <Box
      flexDirection="row"
      gap={1}
      justifyContent="space-between"
      overflowX="hidden"
      width="100%"
    >
      <Box flexDirection="row" overflowX="hidden">
        <Text dimColor={!asset.emitted} wrap="truncate-end">
          {` `}
          {!asset.emitted ? figures.circle : figures.circleFilled}
          {` `}
          {asset.name}
        </Text>
      </Box>

      <Box flexDirection="row" justifyContent="flex-end" minWidth={11}>
        <Box flexDirection="row" minWidth={1}>
          {asset.info?.minimized && (
            <Text color="green" dimColor={!asset.emitted}>
              {figures.tick}
              {` `}
            </Text>
          )}
        </Box>

        <Text dimColor>
          {`${
            isNumber(asset?.size) && asset.size > 0
              ? formatSize(asset.size)
              : `ø`
          }`.trim()}
        </Text>
      </Box>
    </Box>
  )
}

export {Asset as default}
