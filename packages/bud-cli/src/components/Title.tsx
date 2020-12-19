import React, {FunctionComponent} from 'react'
import {Box, Text} from 'ink'
import {useStyle} from '@roots/ink-use-style'
import {Props} from 'ink/build/components/Box'

interface TitleInterface {
  frame?: Props
  children: string
}

const Title: FunctionComponent<TitleInterface> = ({
  frame,
  children,
}) => {
  const {colors} = useStyle()
  return (
    <Box {...(frame ?? [])} flexDirection="column">
      <Text
        backgroundColor={colors.primary}
        color={colors.white}>
        {` ${children} `}
      </Text>
    </Box>
  )
}

export {Title}
