import {humanReadable} from '@roots/bud-support'
import {Styles} from '@roots/ink-use-style'
import {Box, Text} from 'ink'
import React from 'react'
import {StatsCompilation} from 'webpack'

import {Asset} from './asset.component'

export interface Props {
  stats: StatsCompilation
  theme: Styles
}

const duration = humanReadable.durationFormatter({
  allowMultiples: ['m', 's', 'ms'],
})
const hasErrors = (stats: StatsCompilation) => stats.errorsCount > 0
const hasWarnings = (stats: StatsCompilation) => stats.warningsCount > 0

export const Assets = ({stats, theme}: Props) => {
  return (
    <Box flexDirection="column" width={`100%`}>
      {hasErrors(stats) &&
        stats.errors.map((error, id) => (
          <Box
            key={`${stats.name}-${stats.hash}-warning-${id}`}
            flexDirection="column"
            display="flex"
            justifyContent="flex-start"
            width={`90%`}
            borderStyle="round"
            borderColor={theme.colors.error}
            paddingX={1}
            marginTop={1}
          >
            <Text>{error.message}</Text>
          </Box>
        ))}

      {hasWarnings(stats) &&
        stats.warnings.slice(0, 4).map((warning, id) => (
          <Box
            key={`${stats.name}-${stats.hash}-warning-${id}`}
            display="flex"
            flexDirection="column"
            justifyContent="flex-start"
            width={`90%`}
            borderStyle="round"
            borderColor={theme.colors.warning}
            paddingX={1}
            marginTop={1}
          >
            <Text>{warning.message}</Text>
          </Box>
        ))}

      {Object.entries(stats.entrypoints).map(([key, entry], id) => (
        <Box key={id} flexDirection="column" marginTop={1}>
          <Text
            color={hasErrors(stats) ? 'red' : 'blue'}
            underline={true}
            inverse={true}
          >
            {entry.name}
          </Text>
          {entry.assets.map((asset, id) => (
            <Asset
              key={`${stats.name}-${stats.hash}-asset-${id}`}
              compilation={stats}
              hasErrors={hasErrors(stats)}
              asset={stats.assets.find(a => a.name === asset.name)}
              theme={theme}
            />
          ))}
        </Box>
      ))}

      <Box flexDirection="column" marginTop={1}>
        <Text color={theme.colors.faded}>
          … compiled in{' '}
          <Text color={theme.colors.flavor}>{duration(stats.time)}</Text>{' '}
          using{' '}
          <Text color={theme.colors.accent}>webpack v{stats.version}</Text>
        </Text>
      </Box>
    </Box>
  )
}
