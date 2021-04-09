import {React, Text, Box, useStyle} from '@roots/bud-support'
import {Indicator} from '../Assets/Indicator'
import {useFocus} from '../../hooks/useFocus'

export const Item: React.FunctionComponent<{
  name: string
  color: string
  display: string
}> = ({name, color, display}) => {
  const [focus] = useFocus()
  const {colors} = useStyle()

  return (
    <Box>
      <Indicator active={focus.active == name} primary={color} />
      <Text
        color={
          focus.active == name
            ? color ?? colors.primary
            : colors.faded
        }>
        {' '}
        {display}
        {'   '}
      </Text>
    </Box>
  )
}
