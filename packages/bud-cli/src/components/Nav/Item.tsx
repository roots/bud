import React, {FunctionComponent} from 'react'
import {Text, Box} from 'ink'
import {Indicator} from '../UI/Indicator'
import {useFocus} from '../../hooks/useFocus'
import {useStyle} from '@roots/ink-use-style'

export const Item: FunctionComponent<{
  name: string
  color: string
  display: string
}> = ({name, color, display}) => {
  const [focus] = useFocus()
  const {colors} = useStyle()

  return (
    <Box>
      <Indicator active={focus == name} primary={color} />
      <Text
        color={
          focus == name ? color ?? colors.primary : colors.faded
        }>
        {' '}
        {display}
        {'   '}
      </Text>
    </Box>
  )
}
