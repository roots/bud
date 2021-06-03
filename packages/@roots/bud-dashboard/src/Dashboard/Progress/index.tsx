import {Styles} from '@roots/ink-use-style'

import React from 'react'
import {Box, Text} from 'ink'
import Spinner from 'ink-spinner'
import {Bar} from './Bar/index'

export const Progress = ({
  hasErrors,
  hasWarnings,
  progress,
  theme,
  development,
}: {
  development: boolean
  hasWarnings: boolean
  hasErrors: boolean
  progress
  theme: Styles
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
                <Text color={theme.colors.error}>
                  X {development ? 'Watching' : 'Error'}
                </Text>
              ) : (
                <Text
                  color={
                    hasWarnings
                      ? theme.colors.warning
                      : theme.colors.success
                  }>
                  ✔ {development ? 'Watching' : 'Complete'}
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
