import {Box, Text, React, Spinner} from '@roots/bud-support'
import {Dashboard} from '@roots/bud-framework'
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
