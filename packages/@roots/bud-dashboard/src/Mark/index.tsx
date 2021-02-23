import {
  React,
  Box,
  BigText,
  staticRender as render,
} from '@roots/bud-support'

export const Mark = (text: string): string => {
  const {lastFrame} = render(
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="flex-start">
      <BigText
        font="simple3d"
        gradient={['blue', 'cyan']}
        text={text}
      />
    </Box>,
  )

  return lastFrame()
}
