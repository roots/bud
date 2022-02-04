import {lodash} from '@roots/bud-support'
import {Box, Text} from 'ink'
import React from 'react'

import {Bar} from './bar'

const {isNumber, isString} = lodash

/**
 * Progress component
 *
 * @public
 */
export const Progress = ({progress, theme}) => {
  if (!Array.isArray(progress)) return null

  const [value, message] = progress
  const hasMessage = message && isString(message)
  const hasValue = value && isNumber(value)

  return value < 1 ? (
    <Box flexDirection={`column`}>
      <Text wrap={`truncate-end`}>
        {hasMessage ? message : 'instantiating..'}
      </Text>

      <Bar
        character={`▇`}
        maxWidth={theme.bounds.width}
        colors={[theme.colors.primary, theme.colors.accent]}
        width={hasValue ? value : 0}
      />
    </Box>
  ) : null
}
