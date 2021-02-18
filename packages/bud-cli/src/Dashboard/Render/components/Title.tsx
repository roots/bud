import {
  React,
  FunctionComponent,
  Box,
  Text,
  BoxProps,
} from '@roots/bud-support'
import {useStyle} from '@roots/ink-use-style'

export const Title: FunctionComponent<{
  frame?: BoxProps
  children: string
}> = ({frame, children}) => {
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
