import {Styles} from '@roots/ink-use-style'

import React from 'react'
import {Box, Text} from 'ink'
import Spinner from 'ink-spinner'
import {Bar} from './Bar'

export const Progress = ({
  progress,
  theme,
  mode,
}: {
  mode: string
  progress: any
  theme: Styles
}) => {
  const guard =
    progress?.decimal &&
    theme?.bounds.width &&
    typeof theme.bounds.width == 'number'

  if (!guard) return null

  return (
    <Box flexDirection="row">
      <Box width={13}>
        <Text wrap="truncate">
          {progress?.decimal < 1 ? (
            <>
              <Text color={theme.colors.primary}>
                <Spinner />{' '}
                {JSON.stringify(progress?.message) ?? ''}
              </Text>
            </>
          ) : (
            <>
              <Text color={theme.colors.success}>
                ✔ {'Complete'}
              </Text>
            </>
          )}
        </Text>
      </Box>

      <Box>
        <Bar
          character={'='}
          maxWidth={theme.bounds.width - 22}
          colors={[
            theme.colors.primary,
            theme.colors.primaryAlt,
          ]}
          percent={progress?.decimal}
        />
        <Text> {progress.percentage}</Text>
      </Box>
    </Box>
  )
}
