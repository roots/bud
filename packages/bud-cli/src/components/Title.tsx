import {
  React,
  FunctionComponent,
  Box,
  Text,
  BoxProps,
} from '@roots/bud-support'
import {useStyle} from '@roots/ink-use-style'

interface TitleInterface {
  frame?: BoxProps
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
