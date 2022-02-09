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

  const hasMessage = message && isString(message) && message !== '[0] '
  const hasValue = value && isNumber(value)

  return (
    <Box flexDirection={`column`}>
      <Text wrap={`truncate-end`}>
        {hasMessage ? message.replace('[0] ', '') : ''}
      </Text>

      <Bar
        character={`▇`}
        maxWidth={theme.bounds.width}
        colors={[theme.colors.primary, theme.colors.accent]}
        width={hasValue ? value : 0}
      />
    </Box>
  )
}
