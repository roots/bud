import {humanReadable} from '@roots/bud-support'
import {Styles} from '@roots/ink-use-style'
import {Box, Text} from 'ink'
import React from 'react'
import {StatsAsset, StatsCompilation} from 'webpack'

const fileSize = humanReadable.sizeFormatter({
  decimalPlaces: 2,
  keepTrailingZeroes: false,
})

export const Asset = ({
  compilation,
  asset,
  theme,
  hasErrors,
}: {
  compilation: StatsCompilation
  asset: StatsAsset
  theme: Styles
  hasErrors: boolean
}) => {
  const color = hasErrors
    ? 'red'
    : asset.emitted
    ? theme.colors.success
    : theme.colors.faded

  return (
    <Box flexDirection="column">
      <Box flexDirection="row" justifyContent="flex-start" width={`100%`}>
        <Box display={'flex'} width={theme.ctx([`5%`])}>
          <Text wrap="truncate-end" color={color}>
            {asset.emitted ? '✔ ' : '… '}
          </Text>
        </Box>

        <Box display={'flex'} width={theme.ctx([`30%`])}>
          <Text wrap="truncate-end" color={color}>
            {asset.name}
          </Text>
        </Box>

        <Box display={'flex'} width={theme.ctx([`30%`])}>
          {asset?.info?.minimized ? (
            <Text wrap="truncate-end" color={theme.colors.success}>
              ✔ minimized
            </Text>
          ) : (
            <Text wrap="truncate-end" color={theme.colors.faded}>
              ✘ minimized
            </Text>
          )}
        </Box>

        <Box display={'flex'} width={theme.ctx([`30%`])}>
          <Text wrap="truncate-end" color={theme.colors.faded}>
            {fileSize(asset.size)}
          </Text>
        </Box>
      </Box>
    </Box>
  )
}
