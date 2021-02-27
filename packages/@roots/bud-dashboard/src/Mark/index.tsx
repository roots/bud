import {
  React,
  Box,
  BigText,
  staticRender as render,
  Gradient,
} from '@roots/bud-support'

export const Mark = (text: string): string => {
  const {lastFrame} = render(
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="flex-start">
      <Gradient name="teen">
        <BigText font="tiny" text={text} />
      </Gradient>
    </Box>,
  )

  return lastFrame()
}
