import {humanReadable} from '@roots/bud-support'
import {Styles} from '@roots/ink-use-style'
import {Box, Static, Text} from 'ink'
import React, {Fragment} from 'react'
import {StatsCompilation} from 'webpack'

import {Asset} from './asset.component'

export interface Props {
  childCompilers: StatsCompilation['children']
  theme: Styles
}

const duration = humanReadable.durationFormatter({
  allowMultiples: ['m', 's', 'ms'],
})

export const Assets = ({childCompilers: children, theme}: Props) => {
  return (
    <Static items={children}>
      {(child, id) => (
        <Fragment key={`stats-${child.name}-${child.hash}-${id}`}>
          {child.errorsCount
            ? child.errors.map((error, id) => (
                <Box
                  key={`${child.name}-${child.hash}-warning-${id}`}
                  flexDirection="column"
                  display="flex"
                  justifyContent="flex-start"
                  width={theme.col(8)}
                  borderStyle="round"
                  borderColor={theme.colors.error}
                  margin={1}
                  paddingX={1}
                >
                  <Text>{error.message}</Text>
                </Box>
              ))
            : null}

          {child.warningsCount
            ? child.warnings.map((warning, id) => (
                <Box
                  key={`${child.name}-${child.hash}-warning-${id}`}
                  display="flex"
                  flexDirection="column"
                  justifyContent="flex-start"
                  width={theme.col(8)}
                  borderStyle="round"
                  borderColor={theme.colors.warning}
                  margin={1}
                  paddingX={1}
                >
                  <Text>{warning.message}</Text>
                </Box>
              ))
            : null}

          {child.warningsCount && child.errorsCount ? (
            child.assets
              .filter(
                ({name, size}) =>
                  !name.includes('.json') &&
                  !name.includes('hot-update') &&
                  size > 0,
              )
              .map((asset, id) => (
                <Asset
                  key={`${child.name}-${child.hash}-asset-${id}`}
                  compilation={child}
                  theme={theme}
                  asset={asset}
                />
              ))
          ) : (
            <Fragment></Fragment>
          )}

          <Box
            key={`compilation-${id}`}
            flexDirection="column"
            marginTop={1}
            marginBottom={1}
          >
            <Text color={theme.colors.faded}>
              … compiled in{' '}
              <Text color={theme.colors.flavor}>
                {duration(child.time)}
              </Text>{' '}
              using{' '}
              <Text color={theme.colors.accent}>
                webpack v{child.version}
              </Text>
            </Text>
          </Box>
        </Fragment>
      )}
    </Static>
  )
}
