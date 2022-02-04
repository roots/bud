import {humanReadable} from '@roots/bud-support'
import {Styles} from '@roots/ink-use-style'
import {Box, Newline, Static, Text} from 'ink'
import React from 'react'
import {StatsCompilation} from 'webpack'

import {Asset} from './asset.component'

export interface Props {
  stats: StatsCompilation['children']
  theme: Styles
}

const duration = humanReadable.durationFormatter({
  allowMultiples: ['m', 's', 'ms'],
})

const hasErrors = (compilation: StatsCompilation) => compilation.errorsCount > 0
const hasWarnings = (compilation: StatsCompilation) =>
  compilation.warningsCount > 0

export const Assets = ({stats, theme}: Props) => {
  return (
    <Static items={stats ?? []}>
      {(compilation, id) => (
        <Box
          key={`stats-${compilation.name}-${compilation.hash}-${id}`}
          flexDirection="column"
          width={`100%`}
        >
          {hasErrors(compilation) &&
            compilation.errors.map((error, id) => (
              <Box
                key={`${compilation.name}-${compilation.hash}-warning-${id}`}
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

          {hasWarnings(compilation) &&
            compilation.warnings.map((warning, id) => (
              <Box
                key={`${compilation.name}-${compilation.hash}-warning-${id}`}
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

          {Object.entries(compilation.entrypoints).map(([key, entry], id) => (
            <Box key={id} flexDirection="column" marginTop={1}>
              <Text
                color={hasErrors(compilation) ? 'red' : 'blue'}
                underline={true}
                inverse={true}
              >
                {' '}
                {entry.name} <Newline />
              </Text>
              {entry.assets.map((asset, id) => (
                <Asset
                  key={`${compilation.name}-${compilation.hash}-asset-${id}`}
                  compilation={compilation}
                  hasErrors={hasErrors(compilation)}
                  asset={compilation.assets.find(a => a.name === asset.name)}
                  theme={theme}
                />
              ))}
            </Box>
          ))}

          <Box key={`compilation-${id}`} flexDirection="column" marginTop={1}>
            <Text color={theme.colors.faded}>
              … compiled in{' '}
              <Text color={theme.colors.flavor}>
                {duration(compilation.time)}
              </Text>{' '}
              using{' '}
              <Text color={theme.colors.accent}>
                webpack v{compilation.version}
              </Text>
            </Text>
          </Box>
        </Box>
      )}
    </Static>
  )
}
