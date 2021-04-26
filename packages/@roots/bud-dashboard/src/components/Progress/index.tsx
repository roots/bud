import type {Dashboard} from '@roots/bud-framework'

import React from 'react'
import {Box, Text} from 'ink'
import Spinner from 'ink-spinner'
import {Bar} from './Bar'

export const Progress: Dashboard.Component = ({
  progress,
  hasErrors,
  theme,
}) => {
  const guard =
    progress?.decimal &&
    theme.bounds.width &&
    typeof theme.bounds.width == 'number'

  if (!guard) return null

  return (
    <Box flexDirection="row">
      <Box width={13}>
        <Text wrap="truncate">
          {progress?.decimal < 1 ? (
            <>
              <Text color={theme.colors.primary}>
                <Spinner /> {progress.message ?? ''}
              </Text>
            </>
          ) : (
            <>
              {hasErrors ? (
                <Text color={theme.colors.error}>X Error</Text>
              ) : (
                <Text color={theme.colors.success}>
                  ✔ Complete
                </Text>
              )}
            </>
          )}
        </Text>
      </Box>

      <Box>
        <Bar
          character={'='}
          maxWidth={theme.bounds.width - 22}
          colors={
            !hasErrors
              ? [theme.colors.primary, theme.colors.primaryAlt]
              : [theme.colors.error, theme.colors.error]
          }
          percent={progress?.decimal}
        />
        <Text> {progress.percentage}</Text>
      </Box>
    </Box>
  )
}
