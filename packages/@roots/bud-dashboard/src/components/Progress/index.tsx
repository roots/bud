import React, {FunctionComponent} from 'react'
import {Box, Text} from 'ink'
import {Bar} from './Bar'
import {Dashboard} from '../../interface'
import Spinner from 'ink-spinner'

export const Progress: FunctionComponent<
  Partial<Dashboard.AppProps>
> = ({progress, hasErrors, theme}) => {
  const guard =
    progress?.decimal &&
    theme.bounds.width &&
    typeof theme.bounds.width == 'number'

  if (!guard) return null

  return (
    <Box flexDirection="row" justifyContent="space-between">
      <Box width={7}>
        <Text wrap="truncate">
          {progress?.decimal < 1 ? (
            <>
              <Spinner /> {progress.percentage}{' '}
            </>
          ) : (
            <>
              {hasErrors ? 'X ' : '✔ '}
              {progress.percentage}{' '}
            </>
          )}
        </Text>
      </Box>
      <Box width={theme.bounds.width - 7}>
        <Bar
          character={'█'}
          maxWidth={theme.bounds.width - 7}
          colors={
            !hasErrors
              ? [theme.colors.primary, theme.colors.primaryAlt]
              : [theme.colors.error, theme.colors.error]
          }
          percent={progress?.decimal}
        />
      </Box>
    </Box>
  )
}
