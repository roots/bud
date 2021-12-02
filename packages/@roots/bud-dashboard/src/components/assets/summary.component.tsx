import {Styles} from '@roots/ink-use-style'
import {Newline, Text} from 'ink'
import React from 'react'
import {StatsCompilation} from 'webpack'

import {useFormatter} from '../../hooks'

export interface Props {
  theme: Styles
  compilation: StatsCompilation
}

export const Summary = ({theme, compilation}: Props) => {
  const {duration} = useFormatter()
  return (
    <Text color={theme.colors.faded}>
      <Newline />… compiled in{' '}
      <Text color={theme.colors.flavor}>
        {duration(compilation.time)}
      </Text>{' '}
      using{' '}
      <Text color={theme.colors.accent}>
        webpack v{compilation.version}
      </Text>
      <Newline />
    </Text>
  )
}
